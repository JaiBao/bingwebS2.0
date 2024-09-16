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
      image: '/delicious/guabao-bangdong-4.png',
      title: '招牌刈包便當',

      text: {
        main: '刈包',
        span: '(口味 6 擇 1)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      price: 'NT$100'
    },
    dialog: {
      id: 1670,
      image: '/delicious/guabao-bangdong-4.png',
      title: '刈包便當',
      main_category_code: 'bento',
      price: 100,
      comment: '',
      text: {
        main: '3吋刈包',
        span: '(口味6擇1)',
        text2: '梅汁蕃茄+鹽水煮蛋+季節時蔬+廚娘油飯＋酥炸菇菇＋香滷豆干',
        note: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      listItems: [
        {
          title: '選擇 刈包口味',
          name: '主餐',
          id: 1,
          product_option_id: 191, //主餐ID
          spanSp: '※每筆僅供選擇一款刈包口味；若有不同口味刈包選擇可新增於下一筆。',
          spans: '6擇1',
          items: [
            // { text: '招牌刈包便當', name: '虛擬刈包', image: '/delicious/guabao-bangdong-4.png', product_option_value_id: 795 }
            { text: '薯泥香素鬆刈包', note: '蛋奶素', name: '薯泥刈包', image: '/delicious/guabao-bangdong-11.png', product_option_value_id: 1905 },
            { text: '千島香酥蝦刈包', name: '炸蝦刈包', image: '/delicious/guabao-bangdong-12.png', product_option_value_id: 1906 },
            { text: '蜂蜜芥末雞刈包', note: '微辣', name: '芥雞刈包', image: '/delicious/guabao-bangdong-13.png', product_option_value_id: 1907 },
            { text: '蒜味鄉村魚刈包', name: '酥魚刈包', image: '/delicious/guabao-bangdong-14.png', product_option_value_id: 1908 },
            { text: '凱薩烤培根刈包', name: '培根刈包', image: '/delicious/guabao-bangdong-15.png', product_option_value_id: 1909 },
            { text: '媽手老滷肉刈包', note: '預訂供應', name: '滷肉刈包', image: '/delicious/guabao-bangdong-16.png', product_option_value_id: 1910 }
          ]
        },
        {
          title: '加購湯飲品',
          id: 2,
          product_option_id: 192, //飲料ID
          price: 15,
          name: '飲料',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 1911 },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 1912 },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 1913 },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 1914 },
            { text: '季節甜品', name: '季節甜品', product_option_value_id: 1916 },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 1915 }
          ]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/guabao-bangdong-5.png',
      title: '素食刈包便當',
      text: {
        main: '刈包',
        span: '(薯泥香素鬆)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '地瓜 + 酥炸菇菇 + 香滷豆干',
        smallNote: '# 蛋奶素'
      },
      price: 'NT$100',
      note: ' '
    },
    dialog: {
      id: 1685,
      image: '/delicious/guabao-bangdong-4.png',
      title: '素食便當',
      main_category_code: 'bento',
      price: 100,
      comment: '',
      text: {
        main: '3吋刈包',
        span: '(口味6擇1)',
        text2: '梅汁蕃茄+鹽水煮蛋+季節時蔬+地瓜＋酥炸菇菇＋香滷豆干',
        note: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      listItems: [
        {
          title: '選擇 數量',
          name: '主餐',
          id: 1,
          product_option_id: 224,
          // span: '2擇1',
          items: [
            // { text: '全素薯泥香素鬆刈包', name: '全素刈包', image: '/delicious/guabao-bangdong-11.png', product_option_value_id: 1847 },
            { text: '素食刈包便當', name: '蛋素刈包', image: '/delicious/guabao-bangdong-5.png', product_option_value_id: 2129 }
          ]
        },
        {
          title: '加購湯飲品',
          id: 2,
          product_option_id: 225,
          price: 15,
          name: '飲料',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 2131 },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 2132 },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 2133 },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 2134 },
            { text: '季節甜品', name: '季節甜品', product_option_value_id: 2136 },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 2135 }
          ]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/guabao-bangdong-6.png',
      title: '雙主餐刈包便當 - 清蒸嫩雞胸',
      text: {
        main: 'A 主餐 刈包',
        span: '(口味 6 擇 1)',
        main2: 'B 主餐',
        span2: '(清蒸嫩雞胸)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      price: 'NT$125',
      note: ' # 爽口'
    },
    dialog: {
      id: 1671,
      image: '/delicious/guabao-bangdong-6.png',
      title: '雞胸刈包便當',
      main_category_code: 'bento',
      price: 125,
      comment: '',
      text: {
        main: 'A 主餐 刈包',
        span: '(口味 6 擇 1)',
        main2: '+B 主餐',
        span2: '(清蒸嫩雞胸)',
        text2: ' 梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        note: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },

      listItems: [
        {
          title: '選擇 刈包口味',
          name: '主餐',
          spanSp: '※每筆僅供選擇一款刈包口味；若有不同口味刈包選擇可新增於下一筆。',
          spans: '6擇1',
          id: 1,
          product_option_id: 194, //主餐ID
          // span: '6擇1',
          items: [
            // { text: '雙主餐刈包便當 - 清蒸嫩雞胸', name: '虛擬刈包', image: '/delicious/guabao-bangdong-6.png', product_option_value_id: 794 }
            { text: '薯泥香素鬆刈包', note: '蛋奶素', name: '薯泥刈包', image: '/delicious/guabao-bangdong-11.png', product_option_value_id: 1926 },
            { text: '千島香酥蝦刈包', name: '炸蝦刈包', image: '/delicious/guabao-bangdong-12.png', product_option_value_id: 1927 },
            { text: '蜂蜜芥末雞刈包', note: '微辣', name: '芥雞刈包', image: '/delicious/guabao-bangdong-13.png', product_option_value_id: 1928 },
            { text: '蒜味鄉村魚刈包', name: '酥魚刈包', image: '/delicious/guabao-bangdong-14.png', product_option_value_id: 1929 },
            { text: '凱薩烤培根刈包', name: '培根刈包', image: '/delicious/guabao-bangdong-15.png', product_option_value_id: 1930 },
            { text: '媽手老滷肉刈包', note: '預訂供應', name: '滷肉刈包', image: '/delicious/guabao-bangdong-16.png', product_option_value_id: 1931 }
          ]
        },
        {
          title: '加購湯飲品',
          id: 2,
          product_option_id: 195, //飲料ID
          price: 15,
          name: '飲料',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 1932 },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 1933 },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 1934 },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 1935 },
            { text: '季節甜品', name: '季節甜品', product_option_value_id: 1937 },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 1936 }
          ]
        }
      ]
    }
  },
  // {
  //   card: {
  //     image: '/delicious/guabao-bangdong-5V.png',
  //     title: '雙主餐素食刈包便當 - 素肉排',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(薯泥香素鬆)',
  //       main2: 'B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
  //       note: '地瓜 + 酥炸菇菇 + 香滷豆干',
  //       smallNote: '# 蛋奶素'
  //     },
  //     price: 'NT$125',
  //     note: ' '
  //   },
  //   dialog: {
  //     id: 1686,
  //     image: '/delicious/guabao-bangdong-5V.png',
  //     title: '素排刈包便當125元',
  //     main_category_code: 'bento',
  //     price: 125,
  //     comment: '',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(薯泥香素鬆)',
  //       main2: 'B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄+鹽水煮蛋+季節時蔬+地瓜＋酥炸菇菇＋香滷豆干',
  //       note: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
  //     },
  //     listItems: [
  //       {
  //         title: '選擇 數量',
  //         name: '主餐',
  //         id: 1,
  //         product_option_id: 227,
  //         // span: '2擇1',
  //         items: [
  //           // { text: '全素薯泥香素鬆刈包', name: '全素刈包', image: '/delicious/guabao-bangdong-11.png', product_option_value_id: 577 },
  //           { text: '雙主餐素食刈包便當 - 素肉排', name: '蛋素刈包', image: '/delicious/guabao-bangdong-5V.png', product_option_value_id: 2145 }
  //         ]
  //       },
  //       {
  //         title: '加購湯飲品',
  //         id: 2,
  //         product_option_id: 228,
  //         price: 15,
  //         name: '飲料',
  //         span: '+$15',
  //         // 沒有備註的項目可以只有text字段
  //         items: [
  //           { text: '微甜豆漿', name: '微豆', product_option_value_id: 2153 },
  //           { text: '無糖豆漿', name: '無豆', product_option_value_id: 2154 },
  //           { text: '古早味紅茶', name: '紅茶', product_option_value_id: 2155 },
  //           { text: '古早味奶茶', name: '奶茶', product_option_value_id: 2156 },
  //           { text: '季節甜品', name: '季節甜品', product_option_value_id: 2158 },
  //           { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 2157 }
  //         ]
  //       }
  //     ]
  //   }
  // },
  {
    card: {
      image: '/delicious/guabao-bangdong-g.png',
      title: '雙主餐刈包便當 - 傳香滷雞腿',
      text: {
        main: 'A 主餐 刈包',
        span: '(口味 6 擇 1)',
        main2: 'B 主餐',
        span2: '(傳香滷雞腿)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      price: 'NT$150'
    },
    dialog: {
      id: 1674,
      image: '/delicious/guabao-bangdong-g.png',
      title: '雞腿刈包便當',
      main_category_code: 'bento',
      price: 150,
      comment: '',
      text: {
        main: 'A 主餐 刈包',
        span: '(口味 6 擇 1)',
        main2: 'B 主餐',
        span2: '(傳香滷雞腿)',
        text2: ' 梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        note: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      listItems: [
        {
          title: '選擇 刈包口味',
          name: '主餐',
          id: 1,
          product_option_id: 202, //主餐ID
          spanSp: '※每筆僅供選擇一款刈包口味；若有不同口味刈包選擇可新增於下一筆。',
          spans: '6擇1',
          items: [
            // { text: '雙主餐刈包便當 - 傳香滷雞腿', name: '虛擬刈包', image: '/delicious/guabao-bangdong-g.png', product_option_value_id: 796 }
            { text: '薯泥香素鬆刈包', note: '蛋奶素', name: '薯泥刈包', image: '/delicious/guabao-bangdong-11.png', product_option_value_id: 1972 },
            { text: '千島香酥蝦刈包', name: '炸蝦刈包', image: '/delicious/guabao-bangdong-12.png', product_option_value_id: 1973 },
            { text: '蜂蜜芥末雞刈包', note: '微辣', name: '芥雞刈包', image: '/delicious/guabao-bangdong-13.png', product_option_value_id: 1974 },
            { text: '蒜味鄉村魚刈包', name: '酥魚刈包', image: '/delicious/guabao-bangdong-14.png', product_option_value_id: 1975 },
            { text: '凱薩烤培根刈包', name: '培根刈包', image: '/delicious/guabao-bangdong-15.png', product_option_value_id: 1976 },
            { text: '媽手老滷肉刈包', note: '預訂供應', name: '滷肉刈包', image: '/delicious/guabao-bangdong-16.png', product_option_value_id: 1977 }
          ]
        },
        {
          title: '加購湯飲品',
          id: 2,
          product_option_id: 203, //飲料ID
          price: 15,
          name: '飲料',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 1978 },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 1979 },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 1980 },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 1981 },
            { text: '季節甜品', name: '季節甜品', product_option_value_id: 1983 },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 1982 }
          ]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/guabao-bangdong-m.png',
      title: '雙主餐刈包便當 - 家常厚滷牛',
      text: {
        main: 'A 主餐 刈包',
        span: '(口味 6 擇 1)',
        main2: 'B 主餐',
        span2: '(家常厚滷牛)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      price: 'NT$150',
      note: ' # 滿足'
    },
    dialog: {
      id: 1673,
      image: '/delicious/guabao-bangdong-m.png',
      title: '滷牛刈包便當',
      main_category_code: 'bento',
      price: 150,
      comment: '',
      text: {
        main: 'A 主餐 刈包',
        span: '(口味 6 擇 1)',
        main2: 'B 主餐',
        span2: '(家常厚滷牛)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        note: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      listItems: [
        {
          title: '選擇 刈包口味',
          name: '主餐',
          id: 1,
          product_option_id: 198, //主餐ID
          spanSp: '※每筆僅供選擇一款刈包口味；若有不同口味刈包選擇可新增於下一筆。',
          spans: '6擇1',
          items: [
            // { text: '雙主餐刈包便當 - 家常厚滷牛', name: '虛擬刈包', image: '/delicious/guabao-bangdong-m.png', product_option_value_id: 797 }
            { text: '薯泥香素鬆刈包', note: '蛋奶素', name: '薯泥刈包', image: '/delicious/guabao-bangdong-11.png', product_option_value_id: 1950 },
            { text: '千島香酥蝦刈包', name: '炸蝦刈包', image: '/delicious/guabao-bangdong-12.png', product_option_value_id: 1951 },
            { text: '蜂蜜芥末雞刈包', note: '微辣', name: '芥雞刈包', image: '/delicious/guabao-bangdong-13.png', product_option_value_id: 1952 },
            { text: '蒜味鄉村魚刈包', name: '酥魚刈包', image: '/delicious/guabao-bangdong-14.png', product_option_value_id: 1953 },
            { text: '凱薩烤培根刈包', name: '培根刈包', image: '/delicious/guabao-bangdong-15.png', product_option_value_id: 1954 },
            { text: '媽手老滷肉刈包', note: '預訂供應', name: '滷肉刈包', image: '/delicious/guabao-bangdong-16.png', product_option_value_id: 1955 }
          ]
        },
        {
          title: '加購湯飲品',
          id: 2,
          product_option_id: 199, //飲料ID
          price: 15,
          name: '飲料',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 1957 },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 1958 },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 1959 },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 1960 },
            { text: '季節甜品', name: '季節甜品', product_option_value_id: 1962 },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 1961 }
          ]
        }
      ]
    }
  },
  // {
  //   card: {
  //     image: '/delicious/guabao-bangdong-5V.png',
  //     title: '雙主餐素食刈包便當(增量) - 素肉排 ',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(薯泥香素鬆)',
  //       main2: 'B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
  //       note: '地瓜 + 酥炸菇菇 + 香滷豆干',
  //       smallNote: '# 蛋奶素'
  //     },
  //     price: 'NT$150',
  //     note: ' '
  //   },
  //   dialog: {
  //     id: 1687,
  //     image: '/delicious/guabao-bangdong-5V.png',
  //     title: '素排便當150元',
  //     main_category_code: 'bento',
  //     price: 150,
  //     comment: '',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(薯泥香素鬆)',
  //       main2: 'B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄+鹽水煮蛋+季節時蔬+地瓜＋酥炸菇菇＋香滷豆干',
  //       note: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
  //     },
  //     listItems: [
  //       {
  //         title: '選擇 數量',
  //         name: '主餐',
  //         id: 1,
  //         product_option_id: 231,
  //         // span: '2擇1',
  //         items: [
  //           // { text: '全素薯泥香素鬆刈包', name: '全素刈包', image: '/delicious/guabao-bangdong-11.png', product_option_value_id: 602 },
  //           { text: '雙主餐素食刈包便當(增量) - 素肉排', name: '蛋素刈包', image: '/delicious/guabao-bangdong-5V.png', product_option_value_id: 2168 }
  //         ]
  //       },
  //       {
  //         title: '加購湯飲品',
  //         id: 2,
  //         product_option_id: 232,
  //         price: 15,
  //         name: '飲料',
  //         span: '+$15',
  //         // 沒有備註的項目可以只有text字段
  //         items: [
  //           { text: '微甜豆漿', name: '微豆', product_option_value_id: 2176 },
  //           { text: '無糖豆漿', name: '無豆', product_option_value_id: 2177 },
  //           { text: '古早味紅茶', name: '紅茶', product_option_value_id: 2178 },
  //           { text: '古早味奶茶', name: '奶茶', product_option_value_id: 2179 },
  //           { text: '季節甜品', name: '季節甜品', product_option_value_id: 2181 },
  //           { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 2180 }
  //         ]
  //       }
  //     ]
  //   }
  // },
  {
    card: {
      image: '/delicious/guabao-bangdong-f.png',
      title: '雙主餐刈包便當 -  法式烤鮭魚',
      text: {
        main: 'A 主餐 刈包',
        span: '(口味 6 擇 1)',
        main2: 'B 主餐',
        span2: '(法式烤鮭魚)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      price: 'NT$170'
      // note: ' # 滿足'
    },
    dialog: {
      id: 1675,
      image: '/delicious/guabao-bangdong-f.png',
      title: '鮭魚刈包便當',
      main_category_code: 'bento',
      price: 170,
      comment: '',
      text: {
        main: 'A 主餐 刈包',
        span: '(口味 6 擇 1)',
        main2: 'B 主餐',
        span2: '(法式烤鮭魚)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        note: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      listItems: [
        {
          title: '選擇 刈包口味',
          name: '主餐',
          id: 1,
          product_option_id: 206, //主餐ID
          spanSp: '※每筆僅供選擇一款刈包口味；若有不同口味刈包選擇可新增於下一筆。',
          spans: '6擇1',
          items: [
            // { text: '雙主餐刈包便當 -  法式烤鮭魚', name: '虛擬刈包', image: '/delicious/guabao-bangdong-f.png', product_option_value_id: 832 }
            { text: '薯泥香素鬆刈包', note: '蛋奶素', name: '薯泥刈包', image: '/delicious/guabao-bangdong-11.png', product_option_value_id: 1993 },
            { text: '千島香酥蝦刈包', name: '炸蝦刈包', image: '/delicious/guabao-bangdong-12.png', product_option_value_id: 1994 },
            { text: '蜂蜜芥末雞刈包', note: '微辣', name: '芥雞刈包', image: '/delicious/guabao-bangdong-13.png', product_option_value_id: 1995 },
            { text: '蒜味鄉村魚刈包', name: '酥魚刈包', image: '/delicious/guabao-bangdong-14.png', product_option_value_id: 1996 },
            { text: '凱薩烤培根刈包', name: '培根刈包', image: '/delicious/guabao-bangdong-15.png', product_option_value_id: 1997 },
            { text: '媽手老滷肉刈包', note: '預訂供應', name: '滷肉刈包', image: '/delicious/guabao-bangdong-16.png', product_option_value_id: 1998 }
          ]
        },
        {
          title: '加購湯飲品',
          id: 2,
          product_option_id: 207, //飲料ID
          price: 15,
          name: '飲料',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 2000 },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 2001 },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 2002 },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 2003 },
            { text: '季節甜品', name: '季節甜品', product_option_value_id: 2005 },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 2004 }
          ]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/guabao-bangdong-wine.png',
      title: '雙主餐刈包便當 -  法式紅酒牛肉丸',
      text: {
        main: 'A 主餐 刈包',
        span: '(口味 6 擇 1)',
        main2: 'B 主餐',
        span2: '(法式紅酒牛肉丸)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      price: 'NT$190'
      // note: ' # 滿足'
    },
    dialog: {
      id: 1676,
      image: '/delicious/guabao-bangdong-wine.png',
      title: '牛肉丸刈包便當',
      main_category_code: 'bento',
      price: 190,
      comment: '',
      text: {
        main: 'A 主餐 刈包',
        span: '(口味 6 擇 1)',
        main2: 'B 主餐',
        span2: '(法式紅酒牛肉丸)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        note: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      listItems: [
        {
          title: '選擇 刈包口味',
          name: '主餐',
          id: 1,
          product_option_id: 210, //主餐ID
          spanSp: '※每筆僅供選擇一款刈包口味；若有不同口味刈包選擇可新增於下一筆。',
          spans: '6擇1',
          items: [
            // { text: '雙主餐刈包便當 -  法式紅酒牛肉丸', name: '虛擬刈包', image: '/delicious/guabao-bangdong-wine.png', product_option_value_id: 1810 }
            { text: '薯泥香素鬆刈包', note: '蛋奶素', name: '薯泥刈包', image: '/delicious/guabao-bangdong-11.png', product_option_value_id: 2015 },
            { text: '千島香酥蝦刈包', name: '炸蝦刈包', image: '/delicious/guabao-bangdong-12.png', product_option_value_id: 2016 },
            { text: '蜂蜜芥末雞刈包', note: '微辣', name: '芥雞刈包', image: '/delicious/guabao-bangdong-13.png', product_option_value_id: 2017 },
            { text: '蒜味鄉村魚刈包', name: '酥魚刈包', image: '/delicious/guabao-bangdong-14.png', product_option_value_id: 2018 },
            { text: '凱薩烤培根刈包', name: '培根刈包', image: '/delicious/guabao-bangdong-15.png', product_option_value_id: 2019 },
            { text: '媽手老滷肉刈包', note: '預訂供應', name: '滷肉刈包', image: '/delicious/guabao-bangdong-16.png', product_option_value_id: 2020 }
          ]
        },
        {
          title: '加購湯飲品',
          id: 2,
          product_option_id: 211, //飲料ID
          price: 15,
          name: '飲料',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 2022 },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 2023 },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 2024 },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 2025 },
            { text: '季節甜品', name: '季節甜品', product_option_value_id: 2027 },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 2026 }
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
  const mainDishTotal = selectedSlide.value.dialog.listItems.find(group => group.name === '主餐').items.reduce((total, item) => total + item.quantity, 0)
  const addonsTotal = calculateAddonsTotal()

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
