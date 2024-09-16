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
              <p class="smallNote2">{{ slide.card.text.smallNote2 }}</p>
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
                <span>{{ listGroup.span }}</span>
                <span class="fw-700 fc-2b">{{ listGroup.spanSp }}</span>
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

                    <span v-if="item.note || item.open" class="item-note">{{ item.note }}</span>
                    <span v-if="!item.open" class="item-note">預訂滿單，無法選訂</span>
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
      image: '/delicious/2-pic-8.png',
      title: '會議盒餐',

      text: {
        main: '3吋潤餅',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 ',
        note: '湯飲品擇1',
        smallNote2: '* 湯飲免費升等豆花'
      },
      price: 'NT$100'
    },
    dialog: {
      id: 1006,
      image: '/delicious/2-pic-8.png',
      title: '會議盒餐',
      main_category_code: 'lunchbox',
      price: 100,
      comment: '',
      text: {
        main: '3吋潤餅',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 ',
        note: '湯飲品擇1'
      },

      listItems: [
        {
          title: '選擇 3 吋潤餅 口味',
          name: '主餐',
          id: 1,
          product_option_id: 24, //主餐ID
          spanSp: '※每筆僅供選擇一款潤餅口味；若有不同口味潤餅選擇可新增於下一筆。',
          spans: '6擇1',
          items: [
            { text: '薯泥香素鬆潤餅', note: '蛋奶素', name: '薯泥潤餅3吋', image: '/delicious/2-pic-11.png', product_option_value_id: 102, open: true },
            { text: '千島香酥蝦潤餅', name: '炸蝦潤餅3吋', image: '/delicious/2-pic-12.png', product_option_value_id: 103, open: false },
            { text: '蜂蜜芥末雞潤餅', note: '微辣', name: '芥雞潤餅3吋', image: '/delicious/2-pic-13.png', product_option_value_id: 104, open: true },
            { text: '蒜味鄉村魚潤餅', name: '酥魚潤餅3吋', image: '/delicious/2-pic-14.png', product_option_value_id: 105, open: false },
            { text: '凱薩烤培根潤餅', name: '培根潤餅3吋', image: '/delicious/2-pic-15.png', product_option_value_id: 106, open: true },
            { text: '媽手老滷肉潤餅', note: '預訂供應', name: '滷肉潤餅3吋', image: '/delicious/2-pic-16.png', product_option_value_id: 107, open: true }
          ]
        },
        {
          title: '湯飲品',
          id: 2,
          product_option_id: 25, //飲料ID
          price: 0,
          name: '飲料',
          span: '可搭配',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 108, open: true },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 109, open: true },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 110, open: true },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 111, open: true },
            { text: '季節甜品', note: '(限時升等豆花甜品)', name: '季節甜品', product_option_value_id: 113, open: true },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 112, open: true }
          ]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/2-pic-9.png',
      title: '貴賓盒餐',
      text: {
        main: '3吋潤餅',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 湯飲品擇1',

        smallNote: '* 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應 ',
        smallNote2: '* 湯飲免費升等豆花'
      },
      price: 'NT$125'
      // note: ' # 爽口'
    },
    dialog: {
      id: 1007,
      image: '/delicious/2-pic-9.png',
      title: '貴賓盒餐',
      main_category_code: 'lunchbox',
      price: 125,
      comment: '',
      text: {
        main: '3吋潤餅',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 湯飲品擇1',
        note: ' * 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應'
      },

      listItems: [
        {
          title: '選擇 3 吋潤餅 口味',
          name: '主餐',
          id: 1,
          product_option_id: 28, //主餐ID
          spanSp: '※每筆僅供選擇一款潤餅口味；若有不同口味潤餅選擇可新增於下一筆。',
          spans: '6擇1',
          items: [
            { text: '薯泥香素鬆潤餅', note: '蛋奶素', name: '薯泥潤餅3吋', image: '/delicious/2-pic-11.png', product_option_value_id: 120, open: true },
            { text: '千島香酥蝦潤餅', name: '炸蝦潤餅3吋', image: '/delicious/2-pic-12.png', product_option_value_id: 121, open: false },
            { text: '蜂蜜芥末雞潤餅', note: '微辣', name: '芥雞潤餅3吋', image: '/delicious/2-pic-13.png', product_option_value_id: 122, open: true },
            { text: '蒜味鄉村魚潤餅', name: '酥魚潤餅3吋', image: '/delicious/2-pic-14.png', product_option_value_id: 123, open: false },
            { text: '凱薩烤培根潤餅', name: '培根潤餅3吋', image: '/delicious/2-pic-15.png', product_option_value_id: 124, open: true },
            { text: '媽手老滷肉潤餅', note: '預訂供應', name: '滷肉潤餅3吋', image: '/delicious/2-pic-16.png', product_option_value_id: 125, open: true }
          ]
        },
        {
          title: '湯飲品',
          id: 2,
          product_option_id: 29, //飲料ID
          price: 0,
          name: '飲料',
          span: '可搭配',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 126, open: true },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 127, open: true },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 128, open: true },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 129, open: true },
            { text: '季節甜品', note: '(限時升等豆花甜品)', name: '季節甜品', product_option_value_id: 131, open: true },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 130, open: true }
          ]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/2-pic-10-1.png',
      title: '首席盒餐',
      text: {
        main: '3吋潤餅',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 紐澳良雞翅 + 湯飲品擇1',
        smallNote: '* 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應 ',
        smallNote2: '* 湯飲免費升等豆花'
      },
      price: 'NT$150'
      // note: ' # 超香'
    },
    dialog: {
      id: 1008,
      image: '/delicious/2-pic-10-1.png',
      title: '首席盒餐',
      main_category_code: 'lunchbox',
      price: 150,
      comment: '',
      text: {
        main: '3吋潤餅',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 紐澳良雞翅 + 湯飲品擇1',
        note: ' * 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應'
      },
      listItems: [
        {
          title: '選擇 3 吋潤餅 口味',
          name: '主餐',
          id: 1,
          product_option_id: 28, //主餐ID
          spanSp: '※每筆僅供選擇一款潤餅口味；若有不同口味潤餅選擇可新增於下一筆。',
          spans: '6擇1',
          items: [
            { text: '薯泥香素鬆潤餅', note: '蛋奶素', name: '薯泥潤餅3吋', image: '/delicious/2-pic-11.png', product_option_value_id: 138, open: true },
            { text: '千島香酥蝦潤餅', name: '炸蝦潤餅3吋', image: '/delicious/2-pic-12.png', product_option_value_id: 139, open: false },
            { text: '蜂蜜芥末雞潤餅', note: '微辣', name: '芥雞潤餅3吋', image: '/delicious/2-pic-13.png', product_option_value_id: 140, open: true },
            { text: '蒜味鄉村魚潤餅', name: '酥魚潤餅3吋', image: '/delicious/2-pic-14.png', product_option_value_id: 141, open: false },
            { text: '凱薩烤培根潤餅', name: '培根潤餅3吋', image: '/delicious/2-pic-15.png', product_option_value_id: 142, open: true },
            { text: '媽手老滷肉潤餅', note: '預訂供應', name: '滷肉潤餅3吋', image: '/delicious/2-pic-16.png', product_option_value_id: 143, open: true }
          ]
        },
        {
          title: '湯飲品',
          id: 2,
          product_option_id: 33, //飲料ID
          price: 0,
          name: '飲料',
          span: '可搭配',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 144, open: true },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 145, open: true },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 146, open: true },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 147, open: true },
            { text: '季節甜品', note: '(限時升等豆花甜品)', name: '季節甜品', product_option_value_id: 149, open: true },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 148, open: true }
          ]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/2-pic-share.png',
      title: '分享餐',
      text: {
        main: '3 吋潤餅 6 入',
        span: '(口味 6 擇 3 或 2)',
        text2: '超人氣潤餅現正推出多人分享餐，無論三五好友或是公司餐會都能一起快樂分享！'
      },
      price: 'NT$220'
      // note: ' # 超香'
    },
    dialog: {
      id: 1597,
      image: '/delicious/2-pic-share.png',
      title: '分享餐',
      main_category_code: 'lunchbox',
      price: 220,
      comment: '',
      text: {
        main: '3 吋潤餅 6 入',
        span: '(口味 6 擇 3 或 2)',
        text2: '超人氣潤餅現正推出多人分享餐，無論三五好友或是公司餐會都能一起快樂分享！'
      },

      listItems: [
        {
          title: '3吋潤餅口味',
          name: '主餐',
          id: 1,
          product_option_id: 143, //主餐ID
          span: '口味 6 擇 3 或 2',
          items: [
            { text: '薯泥香素鬆潤餅', note: '蛋奶素', name: '薯泥潤餅3吋', image: '/delicious/2-pic-11.png', product_option_value_id: 1612, open: true },
            { text: '千島香酥蝦潤餅', name: '炸蝦潤餅3吋', image: '/delicious/2-pic-12.png', product_option_value_id: 1613, open: false },
            { text: '蜂蜜芥末雞潤餅', note: '微辣', name: '芥雞潤餅3吋', image: '/delicious/2-pic-13.png', product_option_value_id: 1614, open: true },
            { text: '蒜味鄉村魚潤餅', name: '酥魚潤餅3吋', image: '/delicious/2-pic-14.png', product_option_value_id: 1615, open: false },
            { text: '凱薩烤培根潤餅', name: '培根潤餅3吋', image: '/delicious/2-pic-15.png', product_option_value_id: 1616, open: true },
            { text: '媽手老滷肉潤餅', note: '預訂供應', name: '滷肉潤餅3吋', image: '/delicious/2-pic-16.png', product_option_value_id: 1617, open: true }
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
  const item = selectedSlide.value.dialog.listItems[listGroupIndex].items[itemIndex]
  if (!item.open) {
    return true // 如果item的open為false，直接返回true表示應該禁用
  }
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
        showNotify('請選滿6卷潤餅口味 ', false)

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

onMounted(updateSlidesOpenStatus)
</script>
<style lang="scss" scoped>
@import '/assets/components/mealCard';
</style>
