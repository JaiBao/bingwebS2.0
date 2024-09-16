<template>
  <div class="carousel__item column">
    <q-card class="readCard col-12" v-for="(slide, index) in slides" :key="index" @click="openDialog(slide)">
      <div class="card-content row">
        <img v-if="slide.card.image" loading="lazy" class="card-image col-6 col-sm-12" :src="slide.card.image" alt="輪撥圖" />
        <div class="card-info col col-sm-12">
          <div class="cardText">
            <div class="top">
              <h5>
                {{ slide.card.title }}
                <span>{{ slide.card.price }}</span>
              </h5>

              <h6>
                {{ slide.card.text.main }}
                <br />
                {{ slide.card.text.main2 }}
                <br />
                {{ slide.card.text.main3 }}
                <span>{{ slide.card.text.span }}</span>
              </h6>

              <p>{{ slide.card.text.text2 }}</p>
              <p>{{ slide.card.text.note }}</p>
            </div>
            <div class="bottom">
              <p class="smallNote">{{ slide.card.text.smallNote }}</p>
            </div>
          </div>
        </div>
      </div>
    </q-card>

    <!-- Dialog部分 -->
    <q-dialog v-model="isDialogOpen">
      <q-card class="selectedDialog">
        <!-- 新增的關閉按鈕 -->
        <q-btn
          flat
          dense
          round
          icon="close"
          color="white"
          class="close-dialog-button"
          @click="isDialogOpen = false"
          :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderColor: 'black' }" />
        <div class="dialog">
          <div class="dialogCard">
            <div class="card-content row">
              <div class="totalImg">
                <div class="totalQuantity">
                  <span class="total">{{ mainDishQuantity }}</span>
                  <span>數量</span>
                </div>
                <img v-if="selectedSlide.dialog.image" loading="lazy" class="card-image col-6 col-sm-12" :src="selectedSlide.dialog.image" alt="輪撥圖" />
              </div>
              <div class="card-info col col-sm-12">
                <div class="cardText">
                  <div class="top">
                    <h5>
                      {{ selectedSlide.card.title }}
                      <span>{{ selectedSlide.card.price }}</span>
                    </h5>

                    <h6>
                      {{ selectedSlide.card.text.main }}
                      <br />
                      {{ selectedSlide.card.text.main2 }}
                      <br />
                      {{ selectedSlide.card.text.main3 }}
                      <span>{{ selectedSlide.card.text.span }}</span>
                    </h6>
                    <!-- <h6>
                      {{ selectedSlide.card.text.main2 }}
                      <span>{{ selectedSlide.card.text.span2 }}</span>
                    </h6> -->

                    <p>{{ selectedSlide.card.text.text2 }}</p>
                    <p>{{ selectedSlide.card.text.note }}</p>
                  </div>
                  <div class="bottom">
                    <p class="smallNote">{{ selectedSlide.card.text.smallNote }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialogContainer">
          <div v-if="selectedSlide.dialog.listItems" class="dialogContent row">
            <div v-for="(listGroup, listGroupIndex) in selectedSlide.dialog.listItems" :key="listGroupIndex" class="titles">
              <h6>
                {{ listGroup.title }}
                <span>{{ listGroup.span }}</span>
              </h6>

              <div v-for="(item, itemIndex) in listGroup.items" :key="itemIndex" class="lists">
                <div class="add">
                  <q-btn
                    :class="{
                      custom: !(item.quantity === 0),
                      'custom-disabled': item.quantity === 0
                    }"
                    :disable="item.quantity === 0 || !item.open"
                    icon="remove"
                    @click="decrementQuantity(listGroupIndex, itemIndex)"
                    round
                    outline />
                  <!-- <span>{{ item.quantity }}</span> -->
                  <q-input
                    class="itemsInput"
                    type="number"
                    min="0"
                    v-model.number="item.quantity"
                    @change="handleInput(listGroupIndex, itemIndex, $event)"
                    :disable="!item.open" />
                  <q-btn
                    class="custom"
                    icon="add"
                    @click="incrementQuantity(listGroupIndex, itemIndex)"
                    round
                    outline
                    :disable="!item.open"
                    :class="{
                      custom: item.open,
                      'custom-disabled': !item.open
                    }" />

                  <img v-if="item.image" :src="item.image" alt="餐點" />
                  <div v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  <div class="name">
                    {{ item.text }}

                    <span v-if="item.note || item.open" class="item-note">{{ item.note }}</span>
                    <span v-if="!item.open" class="item-note">預訂滿單，無法選訂</span>
                  </div>
                </div>
                {{ item.price ? `$${item.price}` : `$${listGroup.price}` }}
              </div>
            </div>
          </div>
        </div>
        <div class="saveBtn">
          <!-- <q-input v-model="selectedSlide.dialog.comment" filled type="textarea" label="備註"></q-input> -->
          <q-btn @click="save">我已完成點餐，新增至我的預訂餐點</q-btn>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { useCartStore } from '/stores/cart'
import { showNotify } from '/stores/notifications.js'
import axios from 'axios'

const config = useRuntimeConfig()
const quantityApiUrl = config.public.quantityApiBaseUrl
const cartStore = useCartStore()
onBeforeMount(() => {
  cartStore.initializeStore()
})
const slides = ref([
  {
    card: {
      // image: '/delicious/2-pic-11.png',
      title: '6 種潤餅口味',
      text: { main: '美味潤餅皆為 6 吋，將淋上各種醬汁搭配上生鮮蘿蔓與多重配料。' },
      price: 'NT$80'
    },
    dialog: {
      id: 1062,
      // image: '/delicious/2-pic-11.png',
      title: '其它商品組',
      main_category_code: '',
      price: 0,
      comment: '',
      text: {
        main: '特製薯泥與素鬆包覆在美味潤餅中，淋上蜂蜜芥末醬後搭配上生鮮蘿蔓與多重配料，清爽美味、鬆脆順口的經典美味。',
        span: '*蛋奶素'
      },
      listItems: [
        {
          title: '單點6吋潤餅',
          name: '6吋潤餅',
          id: 3,
          product_option_id: 109, //主餐ID
          price: 80,
          isMainDishGroup: false,
          span: '+$80',
          items: [
            { text: '薯泥香素鬆潤餅', name: '薯泥潤餅', note: '蛋奶素', image: '/delicious/2-pic-11.png', product_option_value_id: 531, price: 80, open: true },
            { text: '千島香酥蝦潤餅', name: '炸蝦潤餅', image: '/delicious/2-pic-12.png', product_option_value_id: 532, price: 80, open: false },
            { text: '蜂蜜芥末雞潤餅', name: '芥雞潤餅', note: '微辣', image: '/delicious/2-pic-13.png', product_option_value_id: 533, price: 80, open: true },
            { text: '蒜味鄉村魚潤餅', name: '酥魚潤餅', image: '/delicious/2-pic-14.png', product_option_value_id: 534, price: 80, open: false },
            { text: '凱薩烤培根潤餅', name: '培根潤餅', image: '/delicious/2-pic-15.png', product_option_value_id: 535, price: 80, open: true },
            { text: '媽手老滷肉潤餅', note: '預訂供應', name: '滷肉潤餅', image: '/delicious/2-pic-16.png', product_option_value_id: 536, price: 80, open: true }
          ]
        }
      ]
    }
  },
  {
    card: {
      // image: '/delicious/2-pic-11.png',
      title: '各式飲品&湯品',
      text: { main: '各種讓人回味無窮的古早味', main2: '飲品：紅茶、奶茶、豆漿', main3: '湯品：季節甜品、季節濃湯' },
      price: 'NT$30-NT$45'
    },
    dialog: {
      id: 1062,
      // image: '/delicious/2-pic-11.png',
      title: '其它商品組',
      main_category_code: '',
      price: 0,
      comment: '',
      text: {
        main: '特製薯泥與素鬆包覆在美味潤餅中，淋上蜂蜜芥末醬後搭配上生鮮蘿蔓與多重配料，清爽美味、鬆脆順口的經典美味。',
        span: '*蛋奶素'
      },
      listItems: [
        {
          title: '單點湯飲品',
          id: 2,
          product_option_id: 104, //飲料ID
          price: 30,
          name: '飲料',
          isMainDishGroup: false,
          // span: '+$30',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 493, price: 30, open: true },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 494, price: 30, open: true },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 495, price: 30, open: true },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 496, price: 30, open: true },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 497, price: 45, span: '+$45', open: true }
            // { text: '季節甜品', name: '季節甜品', product_option_value_id: 498, price: 45, span: '+$45', open: true }
          ]
        }
      ]
    }
  }
])

// 用來更新數據的函數
async function updateSlidesOpenStatus() {
  try {
    const response = await axios.get(`${quantityApiUrl}/product-controls`)
    const updates = response.data

    slides.value.forEach(slide => {
      slide.dialog.listItems.forEach(list => {
        list.items.forEach(item => {
          const update = updates.find(u => u.product_option_value_id === item.product_option_value_id)
          if (update) {
            item.open = update.open
          }
        })
      })
    })
  } catch (error) {
    console.error('Failed to update slides:', error)
  }
}

const isDialogOpen = ref(false)

const selectedSlide = ref(null)

const handleInput = (listGroupIndex, itemIndex, value) => {
  const numericValue = parseInt(value, 10)
  if (!isNaN(numericValue) && numericValue >= 0) {
    selectedSlide.value.dialog.listItems[listGroupIndex].items[itemIndex].quantity = numericValue
  } else {
    selectedSlide.value.dialog.listItems[listGroupIndex].items[itemIndex].quantity = 0
  }
}
const mainDishQuantity = computed(() => {
  if (!selectedSlide.value) return 0

  // Initialize total quantity for main dishes
  let totalMainDishQuantity = 0

  // Loop through each item group
  selectedSlide.value.dialog.listItems.forEach(group => {
    // Check if the group represents main dishes
    if (group.name === '飲料' || group.name === '6吋潤餅') {
      // Add the quantity of each main dish item to the total
      group.items.forEach(item => {
        totalMainDishQuantity += item.quantity
      })
    }
  })

  // Return the total quantity of main dishes
  return totalMainDishQuantity
})

// 彈窗
const openDialog = slide => {
  updateSlidesOpenStatus()
  // 龜苓膏
  slide.dialog.listItems.forEach(listGroup => {
    listGroup.items.forEach(item => {
      if (item.quantity === undefined) {
        item.quantity = 0 // 龜苓膏
      }
    })
  })

  selectedSlide.value = slide
  isDialogOpen.value = true
}
//加購檢查
const calculateAddonsTotal = () => {
  const addonsGroup = selectedSlide.value.dialog.listItems.find(group => group.id === 2)
  return addonsGroup.items.reduce((total, item) => total + item.quantity, 0)
}

// +
const incrementQuantity = (listGroupIndex, itemIndex) => {
  const item = selectedSlide.value.dialog.listItems[listGroupIndex].items[itemIndex]
  item.quantity = (item.quantity || 0) + 1
}

// -
const decrementQuantity = (listGroupIndex, itemIndex) => {
  const item = selectedSlide.value.dialog.listItems[listGroupIndex].items[itemIndex]
  if (item.quantity > 0) {
    item.quantity = item.quantity - 1
  }
}

// 檢查除了當前項目以外的其他項目是否有被選擇的項目
function checkIfOtherItemSelected(listGroupIndex, itemIndex) {
  const item = selectedSlide.value.dialog.listItems[listGroupIndex].items[itemIndex]
  if (!item.open) {
    return true // 如果item的open為false，直接返回true表示應該禁用
  }

  const currentGroupItems = selectedSlide.value.dialog.listItems[listGroupIndex].items
  // 檢查當前組別中是否有任何其他項目的數量大於 0
  return currentGroupItems.some((item, index) => item.quantity > 0 && index !== itemIndex)
}

const save = () => {
  if (selectedSlide.value && selectedSlide.value.dialog.listItems) {
    const items = []
    // 直接使用 computed 属性计算出来的 mainDishQuantity
    let totalQuantity = mainDishQuantity.value

    selectedSlide.value.dialog.listItems.forEach(group => {
      group.items.forEach(item => {
        if (item.quantity > 0) {
          items.push({
            name: item.name,
            text: item.text,
            quantity: item.quantity,
            isMainDish: group.isMainDishGroup,
            product_option_value_id: item.product_option_value_id,
            product_option_id: group.product_option_id,
            groupName: group.name,
            price: item.price
          })
        }
      })
    })

    selectedSlide.value.dialog.listItems.forEach(group => {
      group.items.forEach(item => {
        if (item.quantity > 0) {
          item.quantity = 0
        }
      })
      group.comment = ''
    })
    const addonGroup = selectedSlide.value.dialog.listItems.find(group => group.id === 2 || group.id === 3)
    const addonPrice = addonGroup ? addonGroup.price : 0
    if (items.length > 0) {
      const dialogInfo = {
        image: selectedSlide.value.dialog.image,
        title: selectedSlide.value.dialog.title,
        mainDishQuantity: totalQuantity, // 使用 computed 属性的值
        id: selectedSlide.value.dialog.id,
        text: selectedSlide.value.dialog.text,
        price: selectedSlide.value.dialog.price,
        addonPrice: addonPrice,
        main_category_code: selectedSlide.value.dialog.main_category_code,
        comment: selectedSlide.value.dialog.comment
      }

      cartStore.addOrder(selectedSlide.value.dialog.id, dialogInfo.title, items, dialogInfo, totalQuantity, dialogInfo.main_category_code, dialogInfo.comment)
      showNotify('商品已加入購物車 ', true)
    } else {
      showNotify('餐點數量不可為0 ', false)
    }

    isDialogOpen.value = false
  }
}

onMounted(updateSlidesOpenStatus)
</script>
<style lang="scss" scoped>
@import '/assets/components/mealCard';
</style>
