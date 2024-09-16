<!-- cart.vue -->
<script setup>
import axios from 'axios'
import { useCartStore } from '/stores/cart'
import { useMealStore } from '/stores/mealStore'
import { useAddressDialogStore } from '/stores/useAddressDialogStore'
import { useCartDialogStore } from '/stores/cartDialogStore'
import { useOrderAddress } from '/stores/orderAddress'
import { showNotify } from '/stores/notifications.js'

const orderAddress = useOrderAddress()
const cartDialogStore = useCartDialogStore()

const { onAddressClick } = useAddressDialogStore()

const mealStore = useMealStore()
const cartStore = useCartStore()

// 訂單數
const mealNameMap = {
  招牌便當: '招牌潤餅便當',
  素食便當: '素食潤餅便當',
  雞胸便當: '雙主餐潤餅便當 - 清蒸嫩雞胸',
  雞腿便當: '雙主餐潤餅便當 - 傳香滷雞腿',
  滷牛便當: '雙主餐潤餅便當 - 家常厚滷牛',
  鮭魚便當: '雙主餐潤餅便當 - 法式烤鮭魚',
  牛肉丸便當: '雙主餐潤餅便當 - 法式紅酒牛肉丸',
  滷牛油飯盒: '香辣滷牛油飯盒',
  雞翅油飯盒: '香炸雞翅油飯盒',
  控肉油飯盒: '香滷控肉油飯盒',
  雞腿油飯盒: '香滷雞腿油飯盒'
}

const orders = computed(() => {
  return cartStore.orders.map(order => {
    // 處理 order.title 的名稱替換
    const orderTitle = mealNameMap[order.title] || order.title

    // 返回替換名稱後的訂單
    return {
      ...order,
      title: orderTitle
    }
  })
})

//計算總額
const totalPrice = computed(() => {
  let total = 0
  cartStore.orders.forEach(order => {
    if (order.id === 1597) {
      // 分享餐價格計算
      const shareMealQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0)
      total += Math.floor(shareMealQuantity / 6) * order.dialog.price
    } else {
      // 其他商品價格計算
      order.items.forEach(item => {
        if (item.isMainDish) {
          total += item.quantity * order.dialog.price
        } else {
          // 單點商品
          if (order.id === 1062) {
            total += item.quantity * item.price
          } else {
            // 其他
            const addonPrice = order.dialog.addonPrice || 0
            total += item.quantity * addonPrice
          }
        }
      })
    }
  })
  return total
})

// 删除
const deleteOrder = uniqueOrderId => {
  cartStore.removeOrder(uniqueOrderId)
}

// dialog處理
const handleClick = () => {
  mealStore.openSelectedMeal()
  cartDialogStore.closeDialog()
}
const handlePickupClick = () => {
  cartStore.clearAddressAndCity()
  cartStore.setPickupMethod('shipping_pickup')
  mealStore.openSelectedMeal()
  cartDialogStore.closeDialog()
}
const handleDeliveryClick = () => {
  console.log(personForm.address, personForm.city)
  if (!personForm.address.value || !personForm.city.value) {
    showNotify('外送請先輸入外送區域', false)
    return
  }

  cartStore.setSelectedAddress(personForm.address)
  cartStore.setSelectedCity(personForm.city)
  cartStore.setPickupMethod('shipping_delivery')
  mealStore.openSelectedMeal()
  cartDialogStore.closeDialog()
}

//12
const personForm = reactive({
  address: cartStore.selectedAddress,
  city: cartStore.selectedCity
})
const limitRef = ref(0)
// 地址獲取
watch(
  () => personForm.address,
  newAddress => {
    orderAddress.updateCityOptions(newAddress.value)
    // console.log(personForm.address)
  }
)
//換縣市清空
watch(
  () => personForm.address,
  (newAddress, oldAddress) => {
    if (newAddress !== oldAddress) {
      personForm.city = '' // 清空區域選項
      personForm.road = '' // 清空路名
      orderAddress.updateCityOptions(newAddress.value) // 更新區域選項
    }
  }
)

// 縣市選項
const addressOptions = orderAddress.addressoptions.map(option => ({ label: option.name, value: option.id }))
// 區域選項
const cityOptions = computed(() => {
  return orderAddress.cityOptions.map(option => ({ label: option.name, value: option.city_id }))
})
const deliveryFee = ref(0)
const showDeliveryNotice = ref(false)
// 監聽城市選擇的變化
watch(
  [() => totalPrice.value, () => personForm.city],
  ([newTotalPrice, newCity]) => {
    if (!newCity || newCity === '') {
      deliveryFee.value = 0 // 沒有選擇城市時運費為0
      showDeliveryNotice.value = false // 不顯示提示信息
      return
    }
    const selectedCityOption = orderAddress.cityOptions.find(option => option.city_id === newCity.value)
    if (selectedCityOption) {
      if ('limit' in selectedCityOption && 'price' in selectedCityOption) {
        // 根據城市選項和最新的totalPrice值更新運費
        if (newTotalPrice >= selectedCityOption.limit) {
          deliveryFee.value = 0 // 訂單總額超過免運費門檻
        } else {
          deliveryFee.value = selectedCityOption.price // 應用城市的運費
        }
        showDeliveryNotice.value = false // 不顯示提示信息
        limitRef.value = selectedCityOption.limit
      } else {
        // 沒有定義運費和免運條件的城市
        deliveryFee.value = 0 // 運費設為0
        showDeliveryNotice.value = true // 顯示提示信息
      }
    } else {
      if (!newCity || newCity === '') {
        // 如果沒找到選擇的城市選項
        deliveryFee.value = 0 // 運費設為0
        showDeliveryNotice.value = true // 不顯示提示信息
      }
    }
  },
  { immediate: true }
)

//---------

onMounted(async () => {
  await cartStore.initializeStore()
})
</script>
<template>
  <div class="cartCard">
    <div v-if="orders.length > 0" class="title">我的訂單</div>
    <div v-else class="title">我的預訂餐點</div>
    <div v-if="orders.length > 0" class="cardContainer2">
      <q-card v-for="order in orders" :key="order.uniqueId" class="orderContainer">
        <div class="orderTitle">{{ order.uniqueId }} . {{ order.title }}</div>
        <div class="items">
          <div class="drink column items-center justify-center">
            <template v-for="item in order.items" :key="`main-${item.text}`">
              <!-- 主餐 -->
              <div v-if="item.isMainDish" class="item column">
                <span class="fuck">{{ item.text }} x {{ item.quantity }}</span>
                <br v-if="item.text === '香炸雞翅油飯盒' || item.text === '香辣滷牛油飯盒' || item.text === '香滷控肉油飯盒' || item.text === '香滷雞腿油飯盒'" />
                <!-- 智障加贈 -->
                <span
                  class="text-red"
                  v-if="item.text === '香炸雞翅油飯盒' || item.text === '香辣滷牛油飯盒' || item.text === '香滷控肉油飯盒' || item.text === '香滷雞腿油飯盒'">
                  加贈豆花 x {{ item.quantity }}
                </span>
              </div>
            </template>
          </div>
          <div class="vertical-line"></div>
          <div class="drink column items-center justify-center">
            <!-- 飲料 -->
            <template v-for="item in order.items" :key="`drink-${item.text}`">
              <div v-if="!item.isMainDish" class="item">
                <span>{{ item.text }} x {{ item.quantity }}</span>
                <br />
              </div>
            </template>
          </div>
          <div class="vertical-line"></div>
          <!-- 總套數 -->
          <div class="all">
            <span>共 {{ order.mainDishQuantity }} 套</span>
          </div>
        </div>
        <q-btn class="deleteBtn" @click="deleteOrder(order.uniqueId)">刪除</q-btn>
      </q-card>
    </div>
    <div v-else class="cardContainer">
      <img src="/online/sell.png" alt="外送員" />
      <p>
        ※本系統提供30天內的預訂，最快可預訂為2日後。
        <br />
        (當日與隔日不提供線上預訂，若有臨時需求可洽詢訂餐專線確認)
      </p>
      預訂開放送餐時段：
      <ul>
        <li>
          周一至周五
          <span class="text-pink-6">10:00 - 18:00</span>
        </li>
        <li>
          周末假日或其它時段請致電
          <span class="text-pink-6 pointer" @click="dialNumber">訂餐專線</span>
          或透過
          <span class="text-pink-6">傳真預訂作業(02)2301-3990</span>
        </li>
      </ul>
      <br />
      <br />
      <p>
        ※
        <span class="text-pink-6">客製化預算</span>
        與
        <span class="text-pink-6">餐點內容</span>
        請致電
      </p>
      <p>
        訂餐
        <span class="text-pink-6">專線 (02)2301-5331</span>
         ​
      </p>

      <br />
      <br />
      <p>
        ※ 本預訂系統當資料送出後，
        <!-- <span class="text-pink-6">訂餐人員</span>
        將於 -->
        <span class="text-pink-6">服務人員會盡速回電確認訂餐資訊，</span>
        後，方完成預訂作業。
      </p>
    </div>

    <div class="row items-end justify-between" id="orderAddress" v-if="!cartDialogStore.noBtn">
      <div class="person w-100">
        <p>選擇外送區域</p>
        <q-select
          color="pink-8"
          class="col-12 personForms"
          type="text"
          outlined
          v-model="personForm.address"
          label="縣市"
          :options="addressOptions"
          :class="{ haveAddress: personForm.address !== '' }" />
      </div>
      <div class="person w-100">
        <q-select class="col-12 personForms" outlined v-model="personForm.city" label="地區" :options="cityOptions" :class="{ haveCity: personForm.city !== '' }" />
      </div>
    </div>
    <div v-if="showDeliveryNotice" class="sb">
      <span class="text-red" v-if="!cartDialogStore.noBtn">*此區域需由服務人員確認後，告知正確地運費金額</span>
    </div>
    <div v-else class="sb" v-if="!cartDialogStore.noBtn">
      <p :class="{ notZero: totalPrice > 0 }">免運金額 {{ limitRef }}元</p>
      <p :class="{ notZero: totalPrice > 0 }">運費 {{ deliveryFee }}元</p>
    </div>
    <div class="total" v-if="!cartDialogStore.noBtn">
      <p :class="{ notZero: cartStore.totalItems > 0 }">總共 {{ cartStore.totalItems }} 套</p>
      <p :class="{ notZero: totalPrice > 0 }">金額 $ {{ totalPrice }}</p>
    </div>

    <div class="btn" v-if="!cartDialogStore.noBtn && orders.length === 0">
      <q-btn :disabled="orders.length === 0" @click="handleClick">
        {{ orders.length > 0 ? '選擇預訂日期' : '請先選擇您的餐點' }}
      </q-btn>
    </div>
    <div class="btn2" v-if="!cartDialogStore.noBtn && orders.length > 0">
      <q-btn :disabled="orders.length === 0" @click="handlePickupClick">自取</q-btn>
      <q-btn :disabled="orders.length === 0" @click="handleDeliveryClick">外送</q-btn>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '/assets/components/cart.scss';
</style>
