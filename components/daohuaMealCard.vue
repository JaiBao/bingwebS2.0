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

                    <p>{{ selectedSlide.card.text.text }}</p>
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
                    v-model.number="item.quantity"
                    @change="handleInput(listGroupIndex, itemIndex, $event)"
                    :disable="checkIfOtherItemSelected(listGroupIndex, itemIndex)"
                    min="0" />
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
                <p>{{ listGroup.span }}</p>
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
      image: '/delicious/daohua-1.png',
      title: '綠豆豆花',
      text: {
        // main: '香滷控肉',
        text: '口感綿密豆花，搭配綠豆的清爽清甜'

        // text2: '滷蛋+杏鮑菇+香滷豆干 '
        // note: '湯飲品擇1'
      },
      price: 'NT$45'
    },
    dialog: {
      id: 1714,
      image: '/delicious/daohua-1.png',
      title: '綠豆豆花',
      main_category_code: 'douhua',
      price: 45,
      comment: '',
      text: {
        // main: '香滷控肉',

        text2: '口感綿密豆花，搭配綠豆的清爽清甜'
        // note: '湯飲品擇1'
      },
      listItems: [
        {
          title: '選擇 數量',
          name: '主餐',
          id: 1,
          product_option_id: 261, //主餐ID
          // span: '6擇1',
          items: [{ text: '綠豆豆花', name: '綠豆豆花', image: '/delicious/daohua-1.png', product_option_value_id: 2406 }]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/daohua-2.png',
      title: '紅豆豆花',
      text: {
        // main: '香滷雞翅',
        // text: '極品油飯+古早味筍絲+家鄉酸菜',

        text2: '口感綿密豆花，搭配蜜香紅豆的幸福滋味'
      },
      price: 'NT$45'
      // note: '#爽口'
    },
    dialog: {
      id: 1713,
      image: '/delicious/daohua-2.png',
      title: '紅豆豆花',
      main_category_code: 'douhua',
      price: 45,
      comment: '',
      text: {
        // main: '香滷雞翅',
        // main2: '',

        text2: '口感綿密豆花，搭配蜜香紅豆的幸福滋味'
      },
      listItems: [
        {
          title: '選擇 數量',
          name: '主餐',
          id: 1,
          product_option_id: 260, //主餐ID
          // span: '6擇1',
          items: [{ text: '紅豆豆花', name: '紅豆豆花', image: '/delicious/daohua-2.png', product_option_value_id: 2405 }]
        }
        // {
        //   title: '加購湯飲品',
        //   id: 2,
        //   product_option_id: 189, //飲料ID
        //   price: 15,
        //   name: '飲料',
        //   span: '+$15',
        //   // 沒有備註的項目可以只有text字段
        //   items: [
        //     { text: '微甜豆漿', name: '微豆', product_option_value_id: 1863 },
        //     { text: '無糖豆漿', name: '無豆', product_option_value_id: 1864 },
        //     { text: '古早味紅茶', name: '紅茶', product_option_value_id: 1865 },
        //     { text: '古早味奶茶', name: '奶茶', product_option_value_id: 1866 },
        //     { text: '季節甜品', name: '季節甜品', product_option_value_id: 1868 },
        //     { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 1867 }
        //   ]
        // }
      ]
    }
  },
  {
    card: {
      image: '/delicious/daohua-3.png',
      title: '花生豆花',
      text: {
        // main: '香滷雞翅',
        // text: '極品油飯+古早味筍絲+家鄉酸菜',

        text2: '口感綿密豆花，搭配花生鬆軟香甜的好口感'
      },
      price: 'NT$45'
      // note: '#爽口'
    },
    dialog: {
      id: 1717,
      image: '/delicious/daohua-3.png',
      title: '花生豆花',
      main_category_code: 'douhua',
      price: 45,
      comment: '',
      text: {
        // main: '香滷雞翅',
        // main2: '',

        text2: '口感綿密豆花，搭配花生鬆軟香甜的好口感'
      },
      listItems: [
        {
          title: '選擇 數量',
          name: '主餐',
          id: 1,
          product_option_id: 262, //主餐ID
          // span: '6擇1',
          items: [{ text: '花生豆花', name: '花生豆花', image: '/delicious/daohua-3.png', product_option_value_id: 2414 }]
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
// const calculateAddonsTotal = () => {
//   const addonsGroup = selectedSlide.value.dialog.listItems.find(group => group.id === 2)
//   return addonsGroup.items.reduce((total, item) => total + item.quantity, 0)
// }

// +
const incrementQuantity = (listGroupIndex, itemIndex) => {
  const item = selectedSlide.value.dialog.listItems[listGroupIndex].items[itemIndex]
  const mainDishTotal = selectedSlide.value.dialog.listItems.find(group => group.name === '主餐').items.reduce((total, item) => total + item.quantity, 0)
  // const addonsTotal = calculateAddonsTotal()

  if (listGroupIndex === 1 && addonsTotal >= mainDishTotal) {
    showNotify('加購飲料不可大於主餐數量 ', false)
  } else {
    item.quantity = (item.quantity || 0) + 1
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
  // 其餘正常
  if (selectedSlide.value.dialog.listItems[listGroupIndex].name !== '主餐') {
    return false // 如果不是主餐组，則不進行檢查
  }
  return selectedSlide.value.dialog.listItems[listGroupIndex].items.some((item, index) => item.quantity > 0 && index !== itemIndex)
}

const save = () => {
  if (selectedSlide.value && selectedSlide.value.dialog.listItems) {
    const items = []
    let mainDishQuantity = 0

    selectedSlide.value.dialog.listItems.forEach((group, index) => {
      group.items.forEach(item => {
        if (item.quantity > 0) {
          items.push({
            name: item.name,
            text: item.text,
            quantity: item.quantity,
            isMainDish: index === 0, // 主餐
            product_option_value_id: item.product_option_value_id,
            product_option_id: group.product_option_id,
            groupName: group.name
          })
          if (index === 0) {
            mainDishQuantity += item.quantity
          }
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

    const addonGroup = selectedSlide.value.dialog.listItems.find(group => group.id === 2)
    const addonPrice = addonGroup ? addonGroup.price : 0

    if (items.length > 0) {
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
    } else {
      showNotify('餐點數量不可為0 ', false)
    }

    isDialogOpen.value = false
  }
}
</script>
<style lang="scss" scoped>
@import '/assets/components/mealCard';
</style>
