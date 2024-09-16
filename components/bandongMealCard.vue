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
                    <p class="smallNote">* 配菜會根據季節不定期調整部分餐點，圖片僅供參考，請以實際餐盒為準</p>
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

                    <span v-if="item.note || item.open" class="item-note">{{ item.note }}</span>
                    <span v-if="!item.open" class="item-note">預訂滿單，無法選訂</span>
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
      image: '/delicious/2-pic-4.png',
      title: '招牌潤餅便當',

      text: {
        main: '3吋潤餅',
        //span: '(口味6擇1)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 杏鮑菇 + 香滷豆干',
        smallNote: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
      },
      price: 'NT$100'
    },
    dialog: {
      id: 1001,
      image: '/delicious/2-pic-4.png',
      title: '招牌便當',
      main_category_code: 'bento',
      price: 100,
      comment: '',
      text: {
        main: '3吋潤餅',
        //span: '(口味6擇1)',
        text2: '梅汁蕃茄+鹽水煮蛋+季節時蔬+廚娘油飯＋杏鮑菇＋香滷豆干',
        note: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
      },
      listItems: [
        {
          title: '選擇 口味',
          name: '主餐',
          id: 1,
          product_option_id: 1, //主餐ID
          //span: '6擇1',
          items: [
            // { text: '招牌便當', name: '主廚潤餅3吋', image: '/delicious/2-pic-4.png', product_option_value_id: 795 }
            { text: '薯泥香素鬆潤餅', note: '蛋奶素', name: '薯泥潤餅3吋', image: '/delicious/2-pic-11.png', product_option_value_id: 1, open: true },
            { text: '千島香酥蝦潤餅', name: '炸蝦潤餅3吋', image: '/delicious/2-pic-12.png', product_option_value_id: 2, open: false },
            { text: '蜂蜜芥末雞潤餅', note: '微辣', name: '芥雞潤餅3吋', image: '/delicious/2-pic-13.png', product_option_value_id: 3, open: true },
            { text: '蒜味鄉村魚潤餅', name: '酥魚潤餅3吋', image: '/delicious/2-pic-14.png', product_option_value_id: 4, open: false },
            { text: '凱薩烤培根潤餅', name: '培根潤餅3吋', image: '/delicious/2-pic-15.png', product_option_value_id: 5, open: true },
            { text: '媽手老滷肉潤餅', note: '預訂供應', name: '滷肉潤餅3吋', image: '/delicious/2-pic-16.png', product_option_value_id: 6, open: true }
          ]
        },
        {
          title: '加購湯飲品',
          id: 2,
          product_option_id: 2, //飲料ID
          price: 15,
          name: '飲料',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 7, open: true },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 8, open: true },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 9, open: true },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 10, open: true },
            { text: '季節甜品', name: '季節甜品', product_option_value_id: 12, open: true },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 11, open: true }
          ]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/2-pic-5.png',
      title: '素食潤餅便當',
      text: {
        main: '3吋潤餅',
        span: '(薯泥香素鬆)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '地瓜 + 杏鮑菇 + 香滷豆干',
        smallNote: '# 蛋奶素'
      },
      price: 'NT$100',
      note: ' '
    },
    dialog: {
      id: 1658,
      image: '/delicious/2-pic-5.png',
      title: '素食便當',
      main_category_code: 'bento',
      price: 100,
      comment: '',
      text: {
        main: '3吋潤餅',
        //span: '(口味6擇1)',
        text2: '梅汁蕃茄+鹽水煮蛋+季節時蔬+地瓜＋杏鮑菇＋香滷豆干',
        note: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
      },
      listItems: [
        {
          title: '選擇 數量',
          name: '主餐',
          id: 1,
          product_option_id: 185,
          // span: '2擇1',
          items: [
            // { text: '全素薯泥香素鬆潤餅', name: '全素潤餅3吋', image: '/delicious/2-pic-11.png', product_option_value_id: 1847 },
            { text: '素食潤餅便當', name: '蛋素潤餅3吋', image: '/delicious/2-pic-5.png', product_option_value_id: 1848, open: true }
          ]
        },
        {
          title: '加購湯飲品',
          id: 2,
          product_option_id: 186,
          price: 15,
          name: '飲料',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 1850, open: true },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 1851, open: true },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 1852, open: true },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 1853, open: true },
            { text: '季節甜品', name: '季節甜品', product_option_value_id: 1855, open: true },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 1854, open: true }
          ]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/2-pic-6.png',
      title: '雙主餐潤餅便當 - 清蒸嫩雞胸',
      text: {
        main: 'A 主餐 3吋潤餅',
        //span: '(口味6擇1)',
        main2: 'B 主餐',
        span2: '(清蒸嫩雞胸)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 杏鮑菇 + 香滷豆干',
        smallNote: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
      },
      price: 'NT$125',
      note: ' # 爽口'
    },
    dialog: {
      id: 1002,
      image: '/delicious/2-pic-6.png',
      title: '雞胸便當',
      main_category_code: 'bento',
      price: 125,
      comment: '',
      text: {
        main: 'A 主餐 3吋潤餅',
        //span: '(口味6擇1)',
        main2: '+B 主餐',
        span2: '(清蒸嫩雞胸)',
        text2: ' 梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 杏鮑菇 + 香滷豆干',
        note: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
      },

      listItems: [
        {
          title: '選擇 口味',
          name: '主餐',
          id: 1,
          product_option_id: 5, //主餐ID
          //span: '6擇1',
          items: [
            // { text: '雙主餐潤餅便當 - 清蒸嫩雞胸', name: '主廚潤餅3吋', image: '/delicious/2-pic-6.png', product_option_value_id: 794 }
            { text: '薯泥香素鬆潤餅', note: '蛋奶素', name: '薯泥潤餅3吋', image: '/delicious/2-pic-11.png', product_option_value_id: 21, open: true },
            { text: '千島香酥蝦潤餅', name: '炸蝦潤餅3吋', image: '/delicious/2-pic-12.png', product_option_value_id: 22, open: false },
            { text: '蜂蜜芥末雞潤餅', note: '微辣', name: '芥雞潤餅3吋', image: '/delicious/2-pic-13.png', product_option_value_id: 23, open: true },
            { text: '蒜味鄉村魚潤餅', name: '酥魚潤餅3吋', image: '/delicious/2-pic-14.png', product_option_value_id: 24, open: false },
            { text: '凱薩烤培根潤餅', name: '培根潤餅3吋', image: '/delicious/2-pic-15.png', product_option_value_id: 25, open: true },
            { text: '媽手老滷肉潤餅', note: '預訂供應', name: '滷肉潤餅3吋', image: '/delicious/2-pic-16.png', product_option_value_id: 26, open: true }
          ]
        },
        {
          title: '加購湯飲品',
          id: 2,
          product_option_id: 6, //飲料ID
          price: 15,
          name: '飲料',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 27, open: true },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 28, open: true },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 29, open: true },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 30, open: true },
            { text: '季節甜品', name: '季節甜品', product_option_value_id: 32, open: true },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 31, open: true }
          ]
        }
      ]
    }
  },
  // {
  //   card: {
  //     image: '/delicious/2-pic-5V.png',
  //     title: '雙主餐素食潤餅便當 - 素肉排',
  //     text: {
  //       main: 'A 主餐 3吋潤餅',
  //       span: '(薯泥香素鬆)',
  //       main2: 'B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
  //       note: '地瓜 + 杏鮑菇 + 香滷豆干',
  //       smallNote: '# 蛋奶素'
  //     },
  //     price: 'NT$125',
  //     note: ' '
  //   },
  //   dialog: {
  //     id: 1066,
  //     image: '/delicious/2-pic-5V.png',
  //     title: '素排便當125元',
  //     main_category_code: 'bento',
  //     price: 125,
  //     comment: '',
  //     text: {
  //       main: 'A 主餐 3吋潤餅',
  //       span: '(薯泥香素鬆)',
  //       main2: 'B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄+鹽水煮蛋+季節時蔬+地瓜＋杏鮑菇＋香滷豆干',
  //       note: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
  //     },
  //     listItems: [
  //       {
  //         title: '選擇 數量',
  //         name: '主餐',
  //         id: 1,
  //         product_option_id: 113,
  //         // span: '2擇1',
  //         items: [
  //           // { text: '全素薯泥香素鬆潤餅', name: '全素潤餅3吋', image: '/delicious/2-pic-11.png', product_option_value_id: 577 },
  //           { text: '雙主餐素食潤餅便當 - 素肉排', name: '蛋素潤餅3吋', image: '/delicious/2-pic-5V.png', product_option_value_id: 578 }
  //         ]
  //       },
  //       {
  //         title: '加購湯飲品',
  //         id: 2,
  //         product_option_id: 115,
  //         price: 15,
  //         name: '飲料',
  //         span: '+$15',
  //         // 沒有備註的項目可以只有text字段
  //         items: [
  //           { text: '微甜豆漿', name: '微豆', product_option_value_id: 587 },
  //           { text: '無糖豆漿', name: '無豆', product_option_value_id: 588 },
  //           { text: '古早味紅茶', name: '紅茶', product_option_value_id: 589 },
  //           { text: '古早味奶茶', name: '奶茶', product_option_value_id: 590 },
  //           { text: '季節甜品', name: '季節甜品', product_option_value_id: 592 },
  //           { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 591 }
  //         ]
  //       }
  //     ]
  //   }
  // },
  {
    card: {
      image: '/delicious/2-pic-g.png',
      title: '雙主餐潤餅便當 - 傳香滷雞腿',
      text: {
        main: 'A 主餐 3吋潤餅',
        //span: '(口味6擇1)',
        main2: 'B 主餐',
        span2: '(傳香滷雞腿)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 杏鮑菇 + 香滷豆干',
        smallNote: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
      },
      price: 'NT$150'
    },
    dialog: {
      id: 1003,
      image: '/delicious/2-pic-g.png',
      title: '雞腿便當',
      main_category_code: 'bento',
      price: 150,
      comment: '',
      text: {
        main: 'A 主餐 3吋潤餅',
        //span: '(口味6擇1)',
        main2: 'B 主餐',
        span2: '(傳香滷雞腿)',
        text2: ' 梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 杏鮑菇 + 香滷豆干',
        note: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
      },
      listItems: [
        {
          title: '選擇 口味',
          name: '主餐',
          id: 1,
          product_option_id: 10, //主餐ID
          //span: '6擇1',
          items: [
            // { text: '雙主餐潤餅便當 - 傳香滷雞腿', name: '主廚潤餅3吋', image: '/delicious/2-pic-g.png', product_option_value_id: 796 }
            { text: '薯泥香素鬆潤餅', note: '蛋奶素', name: '薯泥潤餅3吋', image: '/delicious/2-pic-11.png', product_option_value_id: 42, open: true },
            { text: '千島香酥蝦潤餅', name: '炸蝦潤餅3吋', image: '/delicious/2-pic-12.png', product_option_value_id: 43, open: false },
            { text: '蜂蜜芥末雞潤餅', note: '微辣', name: '芥雞潤餅3吋', image: '/delicious/2-pic-13.png', product_option_value_id: 44, open: true },
            { text: '蒜味鄉村魚潤餅', name: '酥魚潤餅3吋', image: '/delicious/2-pic-14.png', product_option_value_id: 45, open: false },
            { text: '凱薩烤培根潤餅', name: '培根潤餅3吋', image: '/delicious/2-pic-15.png', product_option_value_id: 46, open: true },
            { text: '媽手老滷肉潤餅', note: '預訂供應', name: '滷肉潤餅3吋', image: '/delicious/2-pic-16.png', product_option_value_id: 47, open: true }
          ]
        },
        {
          title: '加購湯飲品',
          id: 2,
          product_option_id: 11, //飲料ID
          price: 15,
          name: '飲料',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 48, open: true },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 49, open: true },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 50, open: true },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 51, open: true },
            { text: '季節甜品', name: '季節甜品', product_option_value_id: 53, open: true },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 52, open: true }
          ]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/2-pic-m.png',
      title: '雙主餐潤餅便當 - 家常厚滷牛',
      text: {
        main: 'A 主餐 3吋潤餅',
        //span: '(口味6擇1)',
        main2: 'B 主餐',
        span2: '(家常厚滷牛)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 杏鮑菇 + 香滷豆干',
        smallNote: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
      },
      price: 'NT$150',
      note: ' # 滿足'
    },
    dialog: {
      id: 1004,
      image: '/delicious/2-pic-m.png',
      title: '滷牛便當',
      main_category_code: 'bento',
      price: 150,
      comment: '',
      text: {
        main: 'A 主餐 3吋潤餅',
        //span: '(口味6擇1)',
        main2: 'B 主餐',
        span2: '(家常厚滷牛)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 杏鮑菇 + 香滷豆干',
        note: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
      },
      listItems: [
        {
          title: '選擇 口味',
          name: '主餐',
          id: 1,
          product_option_id: 15, //主餐ID
          //span: '6擇1',
          items: [
            // { text: '雙主餐潤餅便當 - 家常厚滷牛', name: '主廚潤餅3吋', image: '/delicious/2-pic-m.png', product_option_value_id: 797 }
            { text: '薯泥香素鬆潤餅', note: '蛋奶素', name: '薯泥潤餅3吋', image: '/delicious/2-pic-11.png', product_option_value_id: 63, open: true },
            { text: '千島香酥蝦潤餅', name: '炸蝦潤餅3吋', image: '/delicious/2-pic-12.png', product_option_value_id: 64, open: false },
            { text: '蜂蜜芥末雞潤餅', note: '微辣', name: '芥雞潤餅3吋', image: '/delicious/2-pic-13.png', product_option_value_id: 65, open: true },
            { text: '蒜味鄉村魚潤餅', name: '酥魚潤餅3吋', image: '/delicious/2-pic-14.png', product_option_value_id: 66, open: false },
            { text: '凱薩烤培根潤餅', name: '培根潤餅3吋', image: '/delicious/2-pic-15.png', product_option_value_id: 67, open: true },
            { text: '媽手老滷肉潤餅', note: '預訂供應', name: '滷肉潤餅3吋', image: '/delicious/2-pic-16.png', product_option_value_id: 68, open: true }
          ]
        },
        {
          title: '加購湯飲品',
          id: 2,
          product_option_id: 16, //飲料ID
          price: 15,
          name: '飲料',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 69, open: true },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 70, open: true },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 71, open: true },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 72, open: true },
            { text: '季節甜品', name: '季節甜品', product_option_value_id: 74, open: true },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 73, open: true }
          ]
        }
      ]
    }
  },
  // {
  //   card: {
  //     image: '/delicious/2-pic-5V.png',
  //     title: '雙主餐素食潤餅便當(增量) - 素肉排 ',
  //     text: {
  //       main: 'A 主餐 3吋潤餅',
  //       span: '(薯泥香素鬆)',
  //       main2: 'B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
  //       note: '地瓜 + 杏鮑菇 + 香滷豆干',
  //       smallNote: '# 蛋奶素'
  //     },
  //     price: 'NT$150',
  //     note: ' '
  //   },
  //   dialog: {
  //     id: 1067,
  //     image: '/delicious/2-pic-5V.png',
  //     title: '素排便當150元',
  //     main_category_code: 'bento',
  //     price: 150,
  //     comment: '',
  //     text: {
  //       main: 'A 主餐 3吋潤餅',
  //       span: '(薯泥香素鬆)',
  //       main2: 'B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄+鹽水煮蛋+季節時蔬+地瓜＋杏鮑菇＋香滷豆干',
  //       note: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
  //     },
  //     listItems: [
  //       {
  //         title: '選擇 數量',
  //         name: '主餐',
  //         id: 1,
  //         product_option_id: 117,
  //         // span: '2擇1',
  //         items: [
  //           // { text: '全素薯泥香素鬆潤餅', name: '全素潤餅3吋', image: '/delicious/2-pic-11.png', product_option_value_id: 602 },
  //           { text: '雙主餐素食潤餅便當(增量) - 素肉排', name: '蛋素潤餅3吋', image: '/delicious/2-pic-5V.png', product_option_value_id: 603 }
  //         ]
  //       },
  //       {
  //         title: '加購湯飲品',
  //         id: 2,
  //         product_option_id: 117,
  //         price: 15,
  //         name: '飲料',
  //         span: '+$15',
  //         // 沒有備註的項目可以只有text字段
  //         items: [
  //           { text: '微甜豆漿', name: '微豆', product_option_value_id: 602 },
  //           { text: '無糖豆漿', name: '無豆', product_option_value_id: 603 },
  //           { text: '古早味紅茶', name: '紅茶', product_option_value_id: 604 },
  //           { text: '古早味奶茶', name: '奶茶', product_option_value_id: 605 },
  //           { text: '季節甜品', name: '季節甜品', product_option_value_id: 607 },
  //           { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 606 }
  //         ]
  //       }
  //     ]
  //   }
  // },
  {
    card: {
      image: '/delicious/2-pic-f.png',
      title: '雙主餐潤餅便當 -  法式烤鮭魚',
      text: {
        main: 'A 主餐 3吋潤餅',
        //span: '(口味6擇1)',
        main2: 'B 主餐',
        span2: '(法式烤鮭魚)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 杏鮑菇 + 香滷豆干',
        smallNote: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
      },
      price: 'NT$170'
      // note: ' # 滿足'
    },
    dialog: {
      id: 1080,
      image: '/delicious/2-pic-f.png',
      title: '鮭魚便當',
      main_category_code: 'bento',
      price: 170,
      comment: '',
      text: {
        main: 'A 主餐 3吋潤餅',
        //span: '(口味6擇1)',
        main2: 'B 主餐',
        span2: '(法式烤鮭魚)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 杏鮑菇 + 香滷豆干',
        note: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
      },
      listItems: [
        {
          title: '選擇 口味',
          name: '主餐',
          id: 1,
          product_option_id: 136, //主餐ID
          //span: '6擇1',
          items: [
            // { text: '雙主餐潤餅便當 -  法式烤鮭魚', name: '主廚潤餅3吋', image: '/delicious/2-pic-f.png', product_option_value_id: 832 }
            { text: '薯泥香素鬆潤餅', note: '蛋奶素', name: '薯泥潤餅3吋', image: '/delicious/2-pic-11.png', product_option_value_id: 785, open: true },
            { text: '千島香酥蝦潤餅', name: '炸蝦潤餅3吋', image: '/delicious/2-pic-12.png', product_option_value_id: 780, open: false },
            { text: '蜂蜜芥末雞潤餅', note: '微辣', name: '芥雞潤餅3吋', image: '/delicious/2-pic-13.png', product_option_value_id: 781, open: true },
            { text: '蒜味鄉村魚潤餅', name: '酥魚潤餅3吋', image: '/delicious/2-pic-14.png', product_option_value_id: 782, open: false },
            { text: '凱薩烤培根潤餅', name: '培根潤餅3吋', image: '/delicious/2-pic-15.png', product_option_value_id: 783, open: true },
            { text: '媽手老滷肉潤餅', note: '預訂供應', name: '滷肉潤餅3吋', image: '/delicious/2-pic-16.png', product_option_value_id: 784, open: true }
          ]
        },
        {
          title: '加購湯飲品',
          id: 2,
          product_option_id: 137, //飲料ID
          price: 15,
          name: '飲料',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 788, open: true },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 789, open: true },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 790, open: true },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 791, open: true },
            { text: '季節甜品', name: '季節甜品', product_option_value_id: 793, open: true },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 792, open: true }
          ]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/2-pic-wine.png',
      title: '雙主餐潤餅便當 -  法式紅酒牛肉丸',
      text: {
        main: 'A 主餐 3吋潤餅',
        //span: '(口味6擇1)',
        main2: 'B 主餐',
        span2: '(法式紅酒牛肉丸)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 杏鮑菇 + 香滷豆干',
        smallNote: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
      },
      price: 'NT$190'
      // note: ' # 滿足'
    },
    dialog: {
      id: 1657,
      image: '/delicious/2-pic-wine.png',
      title: '牛肉丸便當',
      main_category_code: 'bento',
      price: 190,
      comment: '',
      text: {
        main: 'A 主餐 3吋潤餅',
        //span: '(口味6擇1)',
        main2: 'B 主餐',
        span2: '(法式紅酒牛肉丸)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 杏鮑菇 + 香滷豆干',
        note: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
      },
      listItems: [
        {
          title: '選擇 口味',
          name: '主餐',
          id: 1,
          product_option_id: 178, //主餐ID
          //span: '6擇1',
          items: [
            // { text: '雙主餐潤餅便當 -  法式紅酒牛肉丸', name: '主廚潤餅3吋', image: '/delicious/2-pic-wine.png', product_option_value_id: 1810 }
            { text: '薯泥香素鬆潤餅', note: '蛋奶素', name: '薯泥潤餅3吋', image: '/delicious/2-pic-11.png', product_option_value_id: 1803, open: true },
            { text: '千島香酥蝦潤餅', name: '炸蝦潤餅3吋', image: '/delicious/2-pic-12.png', product_option_value_id: 1804, open: false },
            { text: '蜂蜜芥末雞潤餅', note: '微辣', name: '芥雞潤餅3吋', image: '/delicious/2-pic-13.png', product_option_value_id: 1805, open: true },
            { text: '蒜味鄉村魚潤餅', name: '酥魚潤餅3吋', image: '/delicious/2-pic-14.png', product_option_value_id: 1806, open: false },
            { text: '凱薩烤培根潤餅', name: '培根潤餅3吋', image: '/delicious/2-pic-15.png', product_option_value_id: 1807, open: true },
            { text: '媽手老滷肉潤餅', note: '預訂供應', name: '滷肉潤餅3吋', image: '/delicious/2-pic-16.png', product_option_value_id: 1808, open: true }
          ]
        },
        {
          title: '加購湯飲品',
          id: 2,
          product_option_id: 179, //飲料ID
          price: 15,
          name: '飲料',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [
            { text: '微甜豆漿', name: '微豆', product_option_value_id: 1811, open: true },
            { text: '無糖豆漿', name: '無豆', product_option_value_id: 1812, open: true },
            { text: '古早味紅茶', name: '紅茶', product_option_value_id: 1813, open: true },
            { text: '古早味奶茶', name: '奶茶', product_option_value_id: 1814, open: true },
            { text: '季節甜品', name: '季節甜品', product_option_value_id: 1816, open: true },
            { text: '季節濃湯', note: '', name: '濃湯', product_option_value_id: 1897, open: true }
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
  const item = selectedSlide.value.dialog.listItems[listGroupIndex].items[itemIndex]
  if (!item.open) {
    return true // 如果item的open為false，直接返回true表示應該禁用
  }
  if (selectedSlide.value.dialog.listItems[listGroupIndex].name !== '主餐') {
    return false // 如果不是主餐组，則不進行檢查
  }
  // return selectedSlide.value.dialog.listItems[listGroupIndex].items.some((item, index) => item.quantity > 0 && index !== itemIndex)
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

onMounted(updateSlidesOpenStatus)

//產品抓爛

// let intervalId = null

// onMounted(() => {
//   updateSlidesOpenStatus()
//   intervalId = setInterval(updateSlidesOpenStatus, 1000)
// })

// onBeforeUnmount(() => {
//   if (intervalId) {
//     clearInterval(intervalId)
//   }
// })
</script>
<style lang="scss" scoped>
@import '/assets/components/mealCard';
</style>
