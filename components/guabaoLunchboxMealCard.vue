<template>
  <div class="carousel__item column">
    <q-card class="readCard col-12" v-for="(slide, index) in slides" :key="index" @click="openDialog(slide)">
      <div class="card-content row">
        <img loading="lazy" class="card-image col-6 col-sm-12" :src="slide.card.image" alt="輪撥圖" />
        <div class="card-info col col-sm-12">
          <div class="cardText">
            <div class="top">
              <h5>
                {{ slide.card.title }}
                <span>{{ slide.card.price }}</span>
              </h5>

              <h6 class="fw-700">
                {{ slide.card.text.main }}
                <span>{{ slide.card.text.span }}</span>
              </h6>
              <h6 class="fw-700">
                {{ slide.card.text.main2 }}
                <span style="color: #666">{{ slide.card.text.span2 }}</span>
              </h6>
              <p>{{ slide.card.text.text }}</p>

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
                <img loading="lazy" class="card-image col-6 col-sm-12" :src="selectedSlide.dialog.image" alt="輪撥圖" />
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
                      <span>{{ selectedSlide.card.text.span }}</span>
                    </h6>
                    <h6>
                      {{ selectedSlide.card.text.main2 }}
                      <span>{{ selectedSlide.card.text.span2 }}</span>
                    </h6>

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
                <span class="fw-700 fc-2b">{{ listGroup.spanSp }}</span>
                <span>{{ listGroup.span }}</span>
              </h6>

              <div v-for="(item, itemIndex) in listGroup.items" :key="itemIndex" class="lists">
                <div class="add">
                  <q-btn
                    :class="{
                      custom: !(item.quantity === 0 || checkIfOtherItemSelected(listGroupIndex, itemIndex)),
                      'custom-disabled': item.quantity === 0 || checkIfOtherItemSelected(listGroupIndex, itemIndex)
                    }"
                    :disable="item.quantity === 0 || checkIfOtherItemSelected(listGroupIndex, itemIndex)"
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
                    :disable="checkIfOtherItemSelected(listGroupIndex, itemIndex)" />
                  <q-btn
                    :class="{
                      custom: !checkIfOtherItemSelected(listGroupIndex, itemIndex),
                      'custom-disabled': checkIfOtherItemSelected(listGroupIndex, itemIndex)
                    }"
                    :disable="checkIfOtherItemSelected(listGroupIndex, itemIndex)"
                    icon="add"
                    @click="incrementQuantity(listGroupIndex, itemIndex)"
                    round
                    outline />

                  <img v-if="item.image" :src="item.image" alt="餐點" />
                  <div v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  <div class="name">
                    {{ item.text }}

                    <span v-if="item.note" class="item-note">{{ item.note }}</span>
                  </div>
                </div>
                <p>{{ listGroup.spans }}</p>
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
const cartStore = useCartStore()
onBeforeMount(() => {
  cartStore.initializeStore()
})
const slides = ref([
  {
    card: {
      image: '/delicious/guabao-lunchbox-8.png',
      title: '刈包會議盒餐',

      text: {
        main: '刈包',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 ',
        note: '湯飲品擇1'
      },
      price: 'NT$100'
    },
    dialog: {
      id: 1678,
      image: '/delicious/guabao-lunchbox-8.png',
      title: '刈包會議盒餐',
      main_category_code: 'lunchbox',
      price: 100,
      comment: '',
      text: {
        main: '刈包',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 ',
        note: '湯飲品擇1'
      },

      listItems: [
        {
          title: '選擇 刈包 口味',
          name: '主餐',
          id: 1,
          product_option_id: 214, //主餐ID
          spanSp: '※每筆僅供選擇一款刈包口味；若有不同口味刈包選擇可新增於下一筆。',
          spans: '6擇1',
          items: [
            { text: '薯泥香素鬆刈包', note: '蛋奶素', name: '薯泥刈包3吋', image: '/delicious/guabao-bangdong-11.png', product_option_value_id: 2037 },
            { text: '千島香酥蝦刈包', name: '炸蝦刈包3吋', image: '/delicious/guabao-bangdong-12.png', product_option_value_id: 2038 },
            { text: '蜂蜜芥末雞刈包', note: '微辣', name: '芥雞刈包3吋', image: '/delicious/guabao-bangdong-13.png', product_option_value_id: 2039 },
            { text: '蒜味鄉村魚刈包', name: '酥魚刈包3吋', image: '/delicious/guabao-bangdong-14.png', product_option_value_id: 2040 },
            { text: '凱薩烤培根刈包', name: '培根刈包3吋', image: '/delicious/guabao-bangdong-15.png', product_option_value_id: 2041 },
            { text: '媽手老滷肉刈包', note: '預訂供應', name: '滷肉刈包3吋', image: '/delicious/guabao-bangdong-16.png', product_option_value_id: 2042 }
          ]
        },
        {
          title: '湯飲品',
          id: 2,
          product_option_id: 215, //飲料ID
          price: 0,
          name: '飲料',
          span: '可搭配',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 2044 },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 2045 },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 2046 },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 2047 },
            { text: '季節甜品', note: '(限時升等豆花甜品)', name: '季節甜品', product_option_value_id: 2049 },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 2048 }
          ]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/guabao-lunchbox-9.png',
      title: '刈包貴賓盒餐',
      text: {
        main: '刈包',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 湯飲品擇1',

        smallNote: '* 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應 '
      },
      price: 'NT$125'
      // note: ' # 爽口'
    },
    dialog: {
      id: 1679,
      image: '/delicious/guabao-lunchbox-9.png',
      title: '刈包貴賓盒餐',
      main_category_code: 'lunchbox',
      price: 125,
      comment: '',
      text: {
        main: '刈包',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 湯飲品擇1',
        note: ' * 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應'
      },

      listItems: [
        {
          title: '選擇 刈包 口味',
          name: '主餐',
          id: 1,
          product_option_id: 217, //主餐ID
          spanSp: '※每筆僅供選擇一款刈包口味；若有不同口味刈包選擇可新增於下一筆。',
          spans: '6擇1',
          items: [
            { text: '薯泥香素鬆刈包', note: '蛋奶素', name: '薯泥刈包3吋', image: '/delicious/guabao-bangdong-11.png', product_option_value_id: 2057 },
            { text: '千島香酥蝦刈包', name: '炸蝦刈包3吋', image: '/delicious/guabao-bangdong-12.png', product_option_value_id: 2058 },
            { text: '蜂蜜芥末雞刈包', note: '微辣', name: '芥雞刈包3吋', image: '/delicious/guabao-bangdong-13.png', product_option_value_id: 2059 },
            { text: '蒜味鄉村魚刈包', name: '酥魚刈包3吋', image: '/delicious/guabao-bangdong-14.png', product_option_value_id: 2060 },
            { text: '凱薩烤培根刈包', name: '培根刈包3吋', image: '/delicious/guabao-bangdong-15.png', product_option_value_id: 2061 },
            { text: '媽手老滷肉刈包', note: '預訂供應', name: '滷肉刈包3吋', image: '/delicious/guabao-bangdong-16.png', product_option_value_id: 2062 }
          ]
        },
        {
          title: '湯飲品',
          id: 2,
          product_option_id: 218, //飲料ID
          price: 0,
          name: '飲料',
          span: '可搭配',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 2064 },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 2065 },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 2066 },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 2067 },
            { text: '季節甜品', note: '(限時升等豆花甜品)', name: '季節甜品', product_option_value_id: 2069 },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 2068 }
          ]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/guabao-lunchbox-10.png',
      title: '刈包首席盒餐',
      text: {
        main: '刈包',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 紐澳良雞翅 + 湯飲品擇1',
        smallNote: '* 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應 '
      },
      price: 'NT$150'
      // note: ' # 超香'
    },
    dialog: {
      id: 1680,
      image: '/delicious/guabao-lunchbox-10.png',
      title: '刈包首席盒餐',
      main_category_code: 'lunchbox',
      price: 150,
      comment: '',
      text: {
        main: '刈包',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 紐澳良雞翅 + 湯飲品擇1',
        note: ' * 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應'
      },
      listItems: [
        {
          title: '選擇 刈包 口味',
          name: '主餐',
          id: 1,
          product_option_id: 220, //主餐ID
          spanSp: '※每筆僅供選擇一款刈包口味；若有不同口味刈包選擇可新增於下一筆。',
          spans: '6擇1',
          items: [
            { text: '薯泥香素鬆刈包', note: '蛋奶素', name: '薯泥刈包3吋', image: '/delicious/guabao-bangdong-11.png', product_option_value_id: 2075 },
            { text: '千島香酥蝦刈包', name: '炸蝦刈包3吋', image: '/delicious/guabao-bangdong-12.png', product_option_value_id: 2076 },
            { text: '蜂蜜芥末雞刈包', note: '微辣', name: '芥雞刈包3吋', image: '/delicious/guabao-bangdong-13.png', product_option_value_id: 2077 },
            { text: '蒜味鄉村魚刈包', name: '酥魚刈包3吋', image: '/delicious/guabao-bangdong-14.png', product_option_value_id: 2078 },
            { text: '凱薩烤培根刈包', name: '培根刈包3吋', image: '/delicious/guabao-bangdong-15.png', product_option_value_id: 2079 },
            { text: '媽手老滷肉刈包', note: '預訂供應', name: '滷肉刈包3吋', image: '/delicious/guabao-bangdong-16.png', product_option_value_id: 2080 }
          ]
        },
        {
          title: '湯飲品',
          id: 2,
          product_option_id: 221, //飲料ID
          price: 0,
          name: '飲料',
          span: '可搭配',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 2082 },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 2083 },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 2084 },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 2085 },
            { text: '季節甜品', note: '(限時升等豆花甜品)', name: '季節甜品', product_option_value_id: 2087 },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 2086 }
          ]
        }
      ]
    }
  }
])

const isDialogOpen = ref(false)

const selectedSlide = ref(null)

const handleInput = (listGroupIndex, itemIndex, value) => {
  const numericValue = parseInt(value, 10)
  const mainDishTotal = selectedSlide.value.dialog.listItems.find(group => group.name === '主餐').items.reduce((total, item) => total + item.quantity, 0)

  if (listGroupIndex === 1) {
    // 如果是飲料組
    const addonsTotalBeforeInput = calculateAddonsTotal() - selectedSlide.value.dialog.listItems[listGroupIndex].items[itemIndex].quantity
    const newAddonsTotal = addonsTotalBeforeInput + numericValue

    if (newAddonsTotal > mainDishTotal) {
      showNotify('加購飲料不可大於主餐數量 ', false)

      // 重置數量為之前的數量或0
      selectedSlide.value.dialog.listItems[listGroupIndex].items[itemIndex].quantity =
        mainDishTotal - addonsTotalBeforeInput > 0 ? mainDishTotal - addonsTotalBeforeInput : 0
    } else if (!isNaN(numericValue) && numericValue >= 0) {
      selectedSlide.value.dialog.listItems[listGroupIndex].items[itemIndex].quantity = numericValue
    } else {
      selectedSlide.value.dialog.listItems[listGroupIndex].items[itemIndex].quantity = 0
    }
  } else {
    // 如果是主餐組或其他組
    if (!isNaN(numericValue) && numericValue >= 0) {
      selectedSlide.value.dialog.listItems[listGroupIndex].items[itemIndex].quantity = numericValue
    } else {
      selectedSlide.value.dialog.listItems[listGroupIndex].items[itemIndex].quantity = 0
    }
  }
}
// 計算主餐的總數量
const mainDishQuantity = computed(() => {
  if (!selectedSlide.value) return 0

  // 分享餐的特殊处理
  if (selectedSlide.value.dialog.id === 1597) {
    const mainDishGroup = selectedSlide.value.dialog.listItems.find(group => group.name === '主餐')
    const totalRolls = mainDishGroup ? mainDishGroup.items.reduce((acc, item) => acc + item.quantity, 0) : 0
    return Math.floor(totalRolls / 6) // 6个主餐算作1个mainDishQuantity
  }

  // 其他餐點的處理
  const mainDishGroup = selectedSlide.value.dialog.listItems.find(group => group.name === '主餐')
  return mainDishGroup ? mainDishGroup.items.reduce((acc, item) => acc + item.quantity, 0) : 0
})

// 彈窗
const openDialog = slide => {
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
  const mainDishGroup = selectedSlide.value.dialog.listItems.find(group => group.name === '主餐')
  const mainDishTotal = mainDishGroup ? mainDishGroup.items.reduce((total, item) => total + item.quantity, 0) : 0

  // 如果是飲料組，檢查總飲料數量是否會超過主餐數量
  if (listGroupIndex === 1) {
    const currentAddonsTotal = calculateAddonsTotal()
    if (currentAddonsTotal < mainDishTotal) {
      item.quantity += 1
    } else {
      showNotify('飲料總數量不得大於主餐數量 ', false)
    }
  } else {
    item.quantity += 1
  }
}

// -
const decrementQuantity = (listGroupIndex, itemIndex) => {
  const item = selectedSlide.value.dialog.listItems[listGroupIndex].items[itemIndex]
  if (item.quantity > 0) {
    item.quantity = item.quantity - 1
    store.updateItemQuantity(listGroup.title, item.text, item.quantity)
  }
}

// 檢查除了當前項目以外的其他項目是否有被選擇的項目
function checkIfOtherItemSelected(listGroupIndex, itemIndex) {
  // 分享餐
  if (selectedSlide.value.dialog.id === 1597) {
    // 取得主餐
    const mainDishGroup = selectedSlide.value.dialog.listItems[listGroupIndex]

    if (mainDishGroup.name !== '主餐') {
      return false // 不是主餐不管
    }
    // 計算數量
    const selectedCount = mainDishGroup.items.reduce((count, item, index) => {
      if (index !== itemIndex) {
        return count + (item.quantity > 0 ? 1 : 0)
      }
      return count
    }, 0)
    // 三個true
    return selectedCount >= 3
  }

  // 其餘正常
  if (selectedSlide.value.dialog.listItems[listGroupIndex].name !== '主餐') {
    return false // 如果不是主餐组，則不進行檢查
  }
  return selectedSlide.value.dialog.listItems[listGroupIndex].items.some((item, index) => item.quantity > 0 && index !== itemIndex)
}

// 檢查主餐是否選擇了多於一種
function checkIfMultipleMainDishesSelected() {
  const mainDishGroup = selectedSlide.value.dialog.listItems.find(group => group.name === '主餐')

  if (selectedSlide.value.dialog.id === 1597) {
    return mainDishGroup.items.filter(item => item.quantity > 0).length > 3
  }

  return mainDishGroup.items.filter(item => item.quantity > 0).length > 1
}

const save = () => {
  if (selectedSlide.value && selectedSlide.value.dialog.listItems) {
    const items = []
    let mainDishQuantity = 0
    let drinkQuantity = 0

    // 檢查主餐是否選擇了多於一種
    if (checkIfMultipleMainDishesSelected()) {
      showNotify('主餐只能選擇一種 ', false)

      return
    }

    selectedSlide.value.dialog.listItems.forEach((group, index) => {
      group.items.forEach(item => {
        if (item.quantity > 0) {
          items.push({
            name: item.name,
            text: item.text,
            quantity: item.quantity,
            isMainDish: group.id === 1, // 主餐
            product_option_value_id: item.product_option_value_id,
            product_option_id: group.product_option_id,
            groupName: group.name
          })
          // 分别累加主餐和飲料的數量
          if (group.name === '主餐') {
            mainDishQuantity += item.quantity
          } else if (group.name === '飲料') {
            drinkQuantity += item.quantity
          }
        }
      })
    })

    // 对于分享餐，主餐的数量必须是6的倍数，不检查主餐与饮料数量是否相等
    if (selectedSlide.value.dialog.id === 1597) {
      const totalRolls = items.filter(item => item.isMainDish).reduce((acc, item) => acc + item.quantity, 0)
      if (totalRolls % 6 !== 0) {
        showNotify('請選滿6卷刈包口味 ', false)

        return
      }
      mainDishQuantity = totalRolls / 6 // 6个主餐算作1个mainDishQuantity
    } else {
      // 对于非分享餐，主餐与饮料数量必须相等
      if (mainDishQuantity !== drinkQuantity) {
        showNotify('主餐和飲料的數量必須相同 ', false)

        return
      }
    }

    selectedSlide.value.dialog.listItems.forEach(group => {
      group.items.forEach(item => {
        if (item.quantity > 0) {
          item.quantity = 0
        }
      })
      group.comment = ''
    })

    const addonGroup = selectedSlide.value.dialog.listItems.find(group => group.id === 2)
    const addonPrice = addonGroup ? addonGroup.price : 0

    if (items.length > 0) {
      console.log(selectedSlide.value.dialog.price)
      const dialogInfo = {
        image: selectedSlide.value.dialog.image,
        title: selectedSlide.value.dialog.title,
        mainDishQuantity: mainDishQuantity, // 主餐數量
        id: selectedSlide.value.dialog.id,
        text: selectedSlide.value.dialog.text,
        price: selectedSlide.value.dialog.price,
        addonPrice: addonPrice, // 加購價格
        main_category_code: selectedSlide.value.dialog.main_category_code,
        comment: selectedSlide.value.dialog.comment
      }

      cartStore.addOrder(
        selectedSlide.value.dialog.id,
        dialogInfo.title,
        items,
        dialogInfo,
        dialogInfo.mainDishQuantity,
        dialogInfo.main_category_code,
        dialogInfo.comment
      )
      showNotify('商品已加入購物車 ', true)

      isDialogOpen.value = false
    } else {
      showNotify('餐點數量不可為0 ', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '/assets/components/mealCard';
</style>
