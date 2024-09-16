<template>
  <div class="carousel__item row">
    <q-card class="readCard col-12" v-for="(slide, index) in slides" :key="index" @click="openDialog(slide)">
      <div class="card-content row">
        <div class="card-info col col-sm-12">
          <div class="new-tag" v-if="slide.card.isNew">
            <p>新品</p>
          </div>
          <div class="cardText">
            <div class="top">
              <h5>{{ slide.card.title }}</h5>
              <div class="bottomXs xs">
                <p class="fw-700">
                  {{ slide.card.price }}
                </p>
              </div>
              <h6 class="gt-xs fw-700">
                {{ slide.card.text.main }}
                <span class="gt-xs">{{ slide.card.text.span }}</span>
              </h6>
              <h6 class="gt-xs fw-700">
                {{ slide.card.text.main2 }}
                <span class="gt-xs" style="color: #666">{{ slide.card.text.span2 }}</span>
              </h6>
              <p class="gt-xs">{{ slide.card.text.text }}</p>
              <p class="gt-xs">{{ slide.card.text.text2 }}</p>
              <p class="gt-xs">{{ slide.card.text.note }}</p>
              <p class="gt-xs smallNote">{{ slide.card.text.smallNote }}</p>
            </div>
            <div class="bottom">
              <p class="gt-xs fw-700 mt-5">
                {{ slide.card.price }}
                <span class="gt-xs">{{ slide.card.note }}</span>
              </p>
              <p class="xs">{{ slide.card.note }}</p>
            </div>
          </div>
        </div>
        <img loading="lazy" class="card-image col-6 col-sm-12" :src="slide.card.image" alt="盒餐" />
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
        <div class="dialogContainer">
          <div class="dialogImg">
            <img loading="lazy" :src="selectedSlide.dialog.image" alt="Slide Image" />
          </div>
          <div class="dialogText">
            <h4>
              {{ selectedSlide.dialog.title }}
              <span>{{ selectedSlide.dialog.price }}</span>
            </h4>

            <p>
              {{ selectedSlide.dialog.text.main }}
              <span>{{ selectedSlide.dialog.text.span }}</span>
              {{ selectedSlide.dialog.text.main2 }}
              <span>{{ selectedSlide.dialog.text.span2 }}</span>
            </p>
            <p>{{ selectedSlide.dialog.text.text2 }}</p>
            <p class="dialogNote">{{ selectedSlide.dialog.text.note }}</p>
            <p>{{ selectedSlide.dialog.text.smallNote }}</p>
          </div>
          <div v-if="selectedSlide.dialog.listItems" class="dialogContent row">
            <div v-for="(listGroup, listGroupIndex) in selectedSlide.dialog.listItems" :key="listGroupIndex" class="col-12">
              <h6>
                {{ listGroup.title }}
                <span>{{ listGroup.span }}</span>
              </h6>
              <ul class="ulType column">
                <li v-for="(item, itemIndex) in listGroup.items" :key="itemIndex" class="col-6">
                  {{ item.text }}
                  <span v-if="item.note" class="item-note">{{ item.note }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
const slides = ref([
  {
    card: {
      image: '/delicious/2-pic-9.png',
      title: '貴賓盒餐',
      text: {
        main: '3吋潤餅',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 湯飲品擇1',

        smallNote: '* 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應 ',
        smallNote2: ' * 湯飲品可更換增量的蜂蜜芥末醬地瓜'
      },
      price: 'NT$125',
      isNew: false
      // note: ' # 爽口'
    },
    dialog: {
      image: '/delicious/dialog-2-pic-9.png',
      title: '貴賓盒餐',
      text: {
        main: '3吋潤餅',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 湯飲品擇1',
        note: ' * 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應',
        note2: ' * 湯飲品可更換增量的蜂蜜芥末醬地瓜'
      },
      price: 'NT$125',
      listItems: [
        {
          title: '3吋潤餅口味',
          span: '6擇1',
          items: [
            { text: '薯泥香素鬆潤餅', note: '*蛋奶素' },
            { text: '千島香酥蝦潤餅' },
            { text: '蜂蜜芥末雞潤餅', note: '*微辣' },
            { text: '蒜味鄉村魚潤餅' },
            { text: '凱薩烤培根潤餅' },
            { text: '媽手老滷肉潤餅', note: '*預訂供應' }
          ]
        },
        {
          title: '湯飲品',
          span: '6擇1',
          // 沒有備註的項目可以只有text字段
          items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/2-pic-6.png',
      title: '雙主餐潤餅便當 - 清蒸嫩雞胸',
      text: {
        main: 'A 主餐 潤餅捲2入',
        span: '(口味隨機出餐)',
        main2: 'B 主餐',
        span2: '(清蒸嫩雞胸)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      price: 'NT$125',
      note: ' # 爽口',
      isNew: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-6.png',
      title: '雙主餐潤餅便當 - 清蒸嫩雞胸',
      text: {
        main: 'A 主餐 潤餅捲2入',
        span: '(口味隨機出餐)',
        main2: '+B 主餐',
        span2: '(清蒸嫩雞胸)',
        text2: ' 梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        note: '* 廚娘油飯不足將以芋頭糕或蜜地瓜替換無法自選，敬請諒解！'
      },
      price: 'NT$125',
      listItems: [
        {
          title: 'A主餐',
          // span: '6擇1',
          items: [
            { text: '薯泥香素鬆潤餅', note: '*蛋奶素' },
            { text: '千島香酥蝦潤餅' },
            { text: '蜂蜜芥末雞潤餅', note: '*微辣' },
            { text: '蒜味鄉村魚潤餅' },
            { text: '凱薩烤培根潤餅' },
            { text: '媽手老滷肉潤餅', note: '*預訂供應' }
          ]
        },
        // {
        //   title: 'B主餐',
        //   span: '3擇1',
        //   // 沒有備註的項目可以只有text字段
        //   items: [
        //     { text: '清蒸嫩雞胸', note: '$125' },
        //     { text: '傳香滷雞腿', note: '$150' },
        //     { text: '家常厚滷牛', note: '$150' }
        //   ]
        // },
        {
          title: '加購湯飲品',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
        }
      ]
    }
  },
  // {
  //   card: {
  //     image: '/delicious/2-pic-5V.png',
  //     title: '雙主餐素食潤餅便當-素肉排',
  //     text: {
  //       main: 'A 主餐 潤餅捲2入',
  //       span: '(薯泥香素鬆)',
  //       main2: 'B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
  //       note: '地瓜 + 酥炸菇菇 + 香滷豆干'
  //     },
  //     price: 'NT$125',
  //     note: ' # 蛋奶素',
  //     isNew: false
  //   },
  //   dialog: {
  //     image: '/delicious/dialog-2-pic-5V.png',
  //     title: '雙主餐素食潤餅便當-素肉排',
  //     text: {
  //       main: 'A 主餐 潤餅捲2入',
  //       span: '(薯泥香素鬆)',
  //       main2: '+B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄+鹽水煮蛋+季節時蔬+地瓜＋酥炸菇菇＋香滷豆干'
  //     },
  //     price: 'NT$125',
  //     // price: '$100',
  //     listItems: [
  //       {
  //         title: '加購湯飲品',
  //         span: '+$15',
  //         // 沒有備註的項目可以只有text字段
  //         items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
  //       }
  //     ]
  //   }
  // },
  {
    card: {
      image: '/delicious/2-pic-18.png',
      title: '清蒸嫩雞胸油飯盒',
      text: {
        main: '主餐 (清蒸嫩雞胸)',
        text: '廚娘油飯雙份量 + 梅汁蕃茄 + 鹽水煮蛋',

        text2: '季節時蔬 + 酥炸菇菇 + 香滷豆干 '
      },
      price: 'NT$125',

      note: '#爽口',
      isNew: true
    },
    dialog: {
      image: '/delicious/dialog-2-pic-18.jpg',
      title: '清蒸嫩雞胸油飯盒',
      text: {
        main: '主餐 (清蒸嫩雞胸)',
        main2: '',

        text2: '廚娘油飯雙份量 + 梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 酥炸菇菇 + 香滷豆干 '
      },
      price: 'NT$125',

      listItems: [
        {
          title: '加購湯飲品',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
        }
      ]
    }
  },
  // {
  //   card: {
  //     image: '/delicious/guabao-lunchbox-9.png',
  //     title: '刈包貴賓盒餐',
  //     text: {
  //       main: '刈包',
  //       span: '(口味6擇1)',
  //       text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 湯飲品擇1',

  //       smallNote: '* 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應 ',
  //       smallNote2: ' * 湯飲品可更換增量的蜂蜜芥末醬地瓜'
  //     },
  //     price: 'NT$125',
  //     isNew: true,
  //     note: ' # 芋頭控'
  //   },
  //   dialog: {
  //     image: '/delicious/dialog-guabao-lunchbox-9.png',
  //     title: '刈包貴賓盒餐',
  //     text: {
  //       main: '刈包',
  //       span: '(口味6擇1)',
  //       text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 湯飲品擇1',
  //       note: ' * 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應',
  //       note2: ' * 湯飲品可更換增量的蜂蜜芥末醬地瓜'
  //     },
  //     price: 'NT$125',
  //     listItems: [
  //       {
  //         title: '刈包口味',
  //         span: '6擇1',
  //         items: [
  //           { text: '薯泥香素鬆潤餅', note: '*蛋奶素' },
  //           { text: '千島香酥蝦潤餅' },
  //           { text: '蜂蜜芥末雞潤餅', note: '*微辣' },
  //           { text: '蒜味鄉村魚潤餅' },
  //           { text: '凱薩烤培根潤餅' },
  //           { text: '媽手老滷肉潤餅', note: '*預訂供應' }
  //         ]
  //       },
  //       {
  //         title: '湯飲品',
  //         span: '6擇1',
  //         // 沒有備註的項目可以只有text字段
  //         items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
  //       }
  //     ]
  //   }
  // },
  // {
  //   card: {
  //     image: '/delicious/guabao-bangdong-6.png',
  //     title: '雙主餐刈包便當 - 清蒸嫩雞胸',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(口味 6 擇 1)',
  //       main2: 'B 主餐',
  //       span2: '(清蒸嫩雞胸)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
  //       note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
  //       smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
  //     },
  //     price: 'NT$125',
  //     note: ' # 爽口',
  //     isNew: true
  //   },
  //   dialog: {
  //     image: '/delicious/dialog-guabao-bangdong-6.png',
  //     title: '雙主餐刈包便當 - 清蒸嫩雞胸',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(口味 6 擇 1)',
  //       main2: '+B 主餐',
  //       span2: '(清蒸嫩雞胸)',
  //       text2: ' 梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
  //       note: '* 廚娘油飯不足將以芋頭糕或蜜地瓜替換無法自選，敬請諒解！'
  //     },
  //     price: 'NT$125',
  //     listItems: [
  //       {
  //         title: 'A主餐 刈包',
  //         span: '6擇1',
  //         items: [
  //           { text: '薯泥香素鬆潤餅', note: '*蛋奶素' },
  //           { text: '千島香酥蝦潤餅' },
  //           { text: '蜂蜜芥末雞潤餅', note: '*微辣' },
  //           { text: '蒜味鄉村魚潤餅' },
  //           { text: '凱薩烤培根潤餅' },
  //           { text: '媽手老滷肉潤餅', note: '*預訂供應' }
  //         ]
  //       },
  //       // {
  //       //   title: 'B主餐',
  //       //   span: '3擇1',
  //       //   // 沒有備註的項目可以只有text字段
  //       //   items: [
  //       //     { text: '清蒸嫩雞胸', note: '$125' },
  //       //     { text: '傳香滷雞腿', note: '$150' },
  //       //     { text: '家常厚滷牛', note: '$150' }
  //       //   ]
  //       // },
  //       {
  //         title: '加購湯飲品',
  //         span: '+$15',
  //         // 沒有備註的項目可以只有text字段
  //         items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
  //       }
  //     ]
  //   }
  // },
  // {
  //   card: {
  //     image: '/delicious/guabao-bangdong-5V.png',
  //     title: '雙主餐素食刈包便當-素肉排',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(薯泥香素鬆)',
  //       main2: 'B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
  //       note: '地瓜 + 酥炸菇菇 + 香滷豆干'
  //     },
  //     price: 'NT$125',
  //     note: ' # 蛋奶素',
  //     isNew: true
  //   },
  //   dialog: {
  //     image: '/delicious/dialog-guabao-bangdong-5V.png',
  //     title: '雙主餐素食刈包便當-素肉排',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(薯泥香素鬆)',
  //       main2: '+B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄+鹽水煮蛋+季節時蔬+地瓜＋酥炸菇菇＋香滷豆干'
  //     },
  //     price: 'NT$125',
  //     // price: '$100',
  //     listItems: [
  //       {
  //         title: '加購湯飲品',
  //         span: '+$15',
  //         // 沒有備註的項目可以只有text字段
  //         items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
  //       }
  //     ]
  //   }
  // },
  {
    card: {
      image: '/delicious/2-pic-10-1.png',
      title: '首席盒餐',
      text: {
        main: '3吋潤餅',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 紐澳良雞翅 + 湯飲品擇1',
        smallNote: '* 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應 ',
        smallNote2: ' * 湯飲品可更換增量的蜂蜜芥末醬地瓜'
      },
      price: 'NT$150',
      isNew: false
      // note: ' # 超香'
    },
    dialog: {
      image: '/delicious/dialog-2-pic-10-1.png',
      title: '首席盒餐',
      text: {
        main: '3吋潤餅',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 紐澳良雞翅 + 湯飲品擇1',
        note: ' * 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應',
        note2: ' * 湯飲品可更換增量的蜂蜜芥末醬地瓜'
      },
      price: 'NT$150',
      listItems: [
        {
          title: '3吋潤餅口味',
          span: '6擇1',
          items: [
            { text: '薯泥香素鬆潤餅', note: '*蛋奶素' },
            { text: '千島香酥蝦潤餅' },
            { text: '蜂蜜芥末雞潤餅', note: '*微辣' },
            { text: '蒜味鄉村魚潤餅' },
            { text: '凱薩烤培根潤餅' },
            { text: '媽手老滷肉潤餅', note: '*預訂供應' }
          ]
        },
        {
          title: '湯飲品',
          span: '6擇1',
          // 沒有備註的項目可以只有text字段
          items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
        }
      ]
    }
  },

  {
    card: {
      image: '/delicious/2-pic-g.png',
      title: '雙主餐潤餅便當 - 傳香滷雞腿',
      text: {
        main: 'A 主餐 潤餅捲2入',
        span: '(口味隨機出餐)',
        main2: 'B 主餐',
        span2: '(傳香滷雞腿)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      price: 'NT$150',
      note: ' # 超香',
      isNew: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-g.png',
      title: '雙主餐潤餅便當 - 傳香滷雞腿',
      text: {
        main: 'A 主餐 潤餅捲2入',
        span: '(口味隨機出餐)',
        main2: '+B 主餐',
        span2: '(傳香滷雞腿)',
        text2: ' 梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        note: '* 廚娘油飯不足將以芋頭糕或蜜地瓜替換無法自選，敬請諒解！'
      },
      price: 'NT$150',
      listItems: [
        {
          title: 'A主餐',
          // span: '6擇1',
          items: [
            { text: '薯泥香素鬆潤餅', note: '*蛋奶素' },
            { text: '千島香酥蝦潤餅' },
            { text: '蜂蜜芥末雞潤餅', note: '*微辣' },
            { text: '蒜味鄉村魚潤餅' },
            { text: '凱薩烤培根潤餅' },
            { text: '媽手老滷肉潤餅', note: '*預訂供應' }
          ]
        },
        // {
        //   title: 'B主餐',
        //   span: '3擇1',
        //   // 沒有備註的項目可以只有text字段
        //   items: [
        //     { text: '清蒸嫩雞胸', note: '$125' },
        //     { text: '傳香滷雞腿', note: '$150' },
        //     { text: '家常厚滷牛', note: '$150' }
        //   ]
        // },
        {
          title: '加購湯飲品',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/2-pic-m.png',
      title: '雙主餐潤餅便當 - 家常厚滷牛',
      text: {
        main: 'A 主餐 潤餅捲2入',
        span: '(口味隨機出餐)',
        main2: 'B 主餐',
        span2: '(家常厚滷牛)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      price: 'NT$150',
      note: ' # 滿足',
      isNew: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-m.png',
      title: '雙主餐潤餅便當 - 家常厚滷牛',
      text: {
        main: 'A 主餐 潤餅捲2入',
        span: '(口味隨機出餐)',
        main2: '+B 主餐',
        span2: '(家常厚滷牛)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        note: '* 廚娘油飯不足將以芋頭糕或蜜地瓜替換無法自選，敬請諒解！'
      },
      price: 'NT$150',
      listItems: [
        {
          title: 'A主餐',
          // span: '6擇1',
          items: [
            { text: '薯泥香素鬆潤餅', note: '*蛋奶素' },
            { text: '千島香酥蝦潤餅' },
            { text: '蜂蜜芥末雞潤餅', note: '*微辣' },
            { text: '蒜味鄉村魚潤餅' },
            { text: '凱薩烤培根潤餅' },
            { text: '媽手老滷肉潤餅', note: '*預訂供應' }
          ]
        },

        {
          title: '加購湯飲品',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
        }
      ]
    }
  },
  // {
  //   card: {
  //     image: '/delicious/2-pic-5V.png',
  //     title: '雙主餐素食潤餅便當-素肉排',
  //     text: {
  //       main: 'A 主餐 潤餅捲2入',
  //       span: '(薯泥香素鬆)',
  //       main2: 'B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
  //       note: '地瓜 + 酥炸菇菇 + 香滷豆干'
  //     },
  //     price: 'NT$150',
  //     note: ' # 蛋奶素 ＃配餐增量',
  //     isNew: false
  //   },
  //   dialog: {
  //     image: '/delicious/dialog-2-pic-5V.png',
  //     title: '雙主餐素食潤餅便當-素肉排',
  //     text: {
  //       main: 'A 主餐 潤餅捲2入',
  //       span: '(薯泥香素鬆)',
  //       main2: '+B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄+鹽水煮蛋+季節時蔬+地瓜＋酥炸菇菇＋香滷豆干'
  //     },
  //     price: 'NT$150',
  //     // price: '$100',
  //     listItems: [
  //       {
  //         title: '加購湯飲品',
  //         span: '+$15',
  //         // 沒有備註的項目可以只有text字段
  //         items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
  //       }
  //     ]
  //   }
  // },
  {
    card: {
      image: '/delicious/2-pic-19.png',
      title: '傳香滷雞腿油飯盒',
      text: {
        main: '主餐 (傳香滷雞腿)',
        text: '廚娘油飯雙份量 + 梅汁蕃茄 + 鹽水煮蛋',

        text2: '季節時蔬 + 酥炸菇菇 + 香滷豆干 '
      },
      price: 'NT$150',

      note: '#超香',
      isNew: true
    },
    dialog: {
      image: '/delicious/dialog-2-pic-19.jpg',
      title: '傳香滷雞腿油飯盒',
      text: {
        main: '主餐 (傳香滷雞腿)',
        main2: '',

        text2: '廚娘油飯雙份量 + 梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 酥炸菇菇 + 香滷豆干 '
      },
      price: 'NT$150',

      listItems: [
        {
          title: '加購湯飲品',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/2-pic-21.png',
      title: '家常厚滷牛油飯盒',
      text: {
        main: '主餐 (家常厚滷牛)',
        text: '廚娘油飯雙份量 + 梅汁蕃茄 + 鹽水煮蛋',

        text2: '季節時蔬 + 酥炸菇菇 + 香滷豆干 '
      },
      price: 'NT$150',

      note: '#滿足',
      isNew: true
    },
    dialog: {
      image: '/delicious/dialog-2-pic-21.jpg',
      title: '家常厚滷牛油飯盒',
      text: {
        main: '主餐 (家常厚滷牛)',
        main2: '',

        text2: '廚娘油飯雙份量 + 梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 酥炸菇菇 + 香滷豆干 '
      },
      price: 'NT$150',

      listItems: [
        {
          title: '加購湯飲品',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
        }
      ]
    }
  },
  // {
  //   card: {
  //     image: '/delicious/guabao-lunchbox-10.png',
  //     title: '刈包首席盒餐',
  //     text: {
  //       main: '刈包',
  //       span: '(口味6擇1)',
  //       text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 紐澳良雞翅 + 湯飲品擇1',
  //       smallNote: '* 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應 ',
  //       smallNote2: ' * 湯飲品可更換增量的蜂蜜芥末醬地瓜'
  //     },
  //     price: 'NT$150',
  //     isNew: true
  //     // note: ' # 超香'
  //   },
  //   dialog: {
  //     image: '/delicious/dialog-guabao-lunchbox-10.png',
  //     title: '刈包首席盒餐',
  //     text: {
  //       main: '刈包',
  //       span: '(口味6擇1)',
  //       text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 紐澳良雞翅 + 湯飲品擇1',
  //       note: ' * 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應',
  //       note2: ' * 湯飲品可更換增量的蜂蜜芥末醬地瓜'
  //     },
  //     price: 'NT$150',
  //     listItems: [
  //       {
  //         title: '刈包口味',
  //         span: '6擇1',
  //         items: [
  //           { text: '薯泥香素鬆潤餅', note: '*蛋奶素' },
  //           { text: '千島香酥蝦潤餅' },
  //           { text: '蜂蜜芥末雞潤餅', note: '*微辣' },
  //           { text: '蒜味鄉村魚潤餅' },
  //           { text: '凱薩烤培根潤餅' },
  //           { text: '媽手老滷肉潤餅', note: '*預訂供應' }
  //         ]
  //       },
  //       {
  //         title: '湯飲品',
  //         span: '6擇1',
  //         // 沒有備註的項目可以只有text字段
  //         items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
  //       }
  //     ]
  //   }
  // },
  // {
  //   card: {
  //     image: '/delicious/guabao-bangdong-g.png',
  //     title: '雙主餐刈包便當 - 傳香滷雞腿',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(口味 6 擇 1)',
  //       main2: 'B 主餐',
  //       span2: '(傳香滷雞腿)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
  //       note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
  //       smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
  //     },
  //     price: 'NT$150',
  //     note: ' # 超香',
  //     isNew: true
  //   },
  //   dialog: {
  //     image: '/delicious/dialog-guabao-bangdong-g.png',
  //     title: '雙主餐刈包便當 - 傳香滷雞腿',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(口味 6 擇 1)',
  //       main2: '+B 主餐',
  //       span2: '(傳香滷雞腿)',
  //       text2: ' 梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
  //       note: '* 廚娘油飯不足將以芋頭糕或蜜地瓜替換無法自選，敬請諒解！'
  //     },
  //     price: 'NT$150',
  //     listItems: [
  //       {
  //         title: 'A主餐 刈包',
  //         span: '6擇1',
  //         items: [
  //           { text: '薯泥香素鬆潤餅', note: '*蛋奶素' },
  //           { text: '千島香酥蝦潤餅' },
  //           { text: '蜂蜜芥末雞潤餅', note: '*微辣' },
  //           { text: '蒜味鄉村魚潤餅' },
  //           { text: '凱薩烤培根潤餅' },
  //           { text: '媽手老滷肉潤餅', note: '*預訂供應' }
  //         ]
  //       },
  //       // {
  //       //   title: 'B主餐',
  //       //   span: '3擇1',
  //       //   // 沒有備註的項目可以只有text字段
  //       //   items: [
  //       //     { text: '清蒸嫩雞胸', note: '$125' },
  //       //     { text: '傳香滷雞腿', note: '$150' },
  //       //     { text: '家常厚滷牛', note: '$150' }
  //       //   ]
  //       // },
  //       {
  //         title: '加購湯飲品',
  //         span: '+$15',
  //         // 沒有備註的項目可以只有text字段
  //         items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
  //       }
  //     ]
  //   }
  // },
  // {
  //   card: {
  //     image: '/delicious/guabao-bangdong-m.png',
  //     title: '雙主餐刈包便當 - 家常厚滷牛',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(口味 6 擇 1)',
  //       main2: 'B 主餐',
  //       span2: '(家常厚滷牛)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
  //       note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
  //       smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
  //     },
  //     price: 'NT$150',
  //     note: ' # 滿足',
  //     isNew: true
  //   },
  //   dialog: {
  //     image: '/delicious/dialog-guabao-bangdong-m.png',
  //     title: '雙主餐刈包便當 - 家常厚滷牛',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(口味 6 擇 1)',
  //       main2: '+B 主餐',
  //       span2: '(家常厚滷牛)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
  //       note: '* 廚娘油飯不足將以芋頭糕或蜜地瓜替換無法自選，敬請諒解！'
  //     },
  //     price: 'NT$150',
  //     listItems: [
  //       {
  //         title: 'A主餐 刈包',
  //         span: '6擇1',
  //         items: [
  //           { text: '薯泥香素鬆潤餅', note: '*蛋奶素' },
  //           { text: '千島香酥蝦潤餅' },
  //           { text: '蜂蜜芥末雞潤餅', note: '*微辣' },
  //           { text: '蒜味鄉村魚潤餅' },
  //           { text: '凱薩烤培根潤餅' },
  //           { text: '媽手老滷肉潤餅', note: '*預訂供應' }
  //         ]
  //       },

  //       {
  //         title: '加購湯飲品',
  //         span: '+$15',
  //         // 沒有備註的項目可以只有text字段
  //         items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
  //       }
  //     ]
  //   }
  // },
  // {
  //   card: {
  //     image: '/delicious/guabao-bangdong-5V.png',
  //     title: '雙主餐素食刈包便當-素肉排',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(薯泥香素鬆)',
  //       main2: 'B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
  //       note: '地瓜 + 酥炸菇菇 + 香滷豆干'
  //     },
  //     price: 'NT$150',
  //     note: ' # 蛋奶素 ＃配餐增量',
  //     isNew: true
  //   },
  //   dialog: {
  //     image: '/delicious/dialog-guabao-bangdong-5V.png',
  //     title: '雙主餐素食刈包便當-素肉排',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(薯泥香素鬆)',
  //       main2: '+B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄+鹽水煮蛋+季節時蔬+地瓜＋酥炸菇菇＋香滷豆干'
  //     },
  //     price: 'NT$150',
  //     // price: '$100',
  //     listItems: [
  //       {
  //         title: '加購湯飲品',
  //         span: '+$15',
  //         // 沒有備註的項目可以只有text字段
  //         items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
  //       }
  //     ]
  //   }
  // },
  {
    card: {
      image: '/delicious/2-pic-f.png',
      title: '雙主餐潤餅便當 -  法式烤鮭魚',
      text: {
        main: 'A 主餐 潤餅捲2入',
        span: '(口味隨機出餐)',
        main2: 'B 主餐',
        span2: '(法式烤鮭魚)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      price: 'NT$170',
      isNew: false
      // note: ' # 煙燻熟成'
    },
    dialog: {
      image: '/delicious/dialog-2-pic-f.png',
      title: '雙主餐潤餅便當 -  法式烤鮭魚',
      text: {
        main: 'A 主餐 潤餅捲2入',
        span: '(口味隨機出餐)',
        main2: '+B 主餐',
        span2: '(法式烤鮭魚)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        note: '* 廚娘油飯不足將以芋頭糕或蜜地瓜替換無法自選，敬請諒解！'
      },
      price: 'NT$170',
      listItems: [
        {
          title: 'A主餐',
          // span: '6擇1',
          items: [
            { text: '薯泥香素鬆潤餅', note: '*蛋奶素' },
            { text: '千島香酥蝦潤餅' },
            { text: '蜂蜜芥末雞潤餅', note: '*微辣' },
            { text: '蒜味鄉村魚潤餅' },
            { text: '凱薩烤培根潤餅' },
            { text: '媽手老滷肉潤餅', note: '*預訂供應' }
          ]
        },

        {
          title: '加購湯飲品',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/2-pic-22.png',
      title: '法式烤鮭魚油飯盒',
      text: {
        main: '主餐 (法式烤鮭魚)',
        text: '廚娘油飯雙份量 + 梅汁蕃茄 + 鹽水煮蛋',

        text2: '季節時蔬 + 酥炸菇菇 + 香滷豆干 '
      },
      price: 'NT$170',

      // note: '#滿足',
      isNew: true
    },
    dialog: {
      image: '/delicious/dialog-2-pic-22.jpg',
      title: '法式烤鮭魚油飯盒',
      text: {
        main: '主餐 (法式烤鮭魚)',
        main2: '',

        text2: '廚娘油飯雙份量 + 梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 酥炸菇菇 + 香滷豆干 '
      },
      price: 'NT$170',

      listItems: [
        {
          title: '加購湯飲品',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
        }
      ]
    }
  },
  // {
  //   card: {
  //     image: '/delicious/guabao-bangdong-f.png',
  //     title: '雙主餐刈包便當 -  法式烤鮭魚',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(口味 6 擇 1)',
  //       main2: 'B 主餐',
  //       span2: '(法式烤鮭魚)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
  //       note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
  //       smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
  //     },
  //     price: 'NT$170',
  //     isNew: true
  //     // note: ' # 煙燻熟成'
  //   },
  //   dialog: {
  //     image: '/delicious/dialog-guabao-bangdong-f.png',
  //     title: '雙主餐刈包便當 -  法式烤鮭魚',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(口味 6 擇 1)',
  //       main2: '+B 主餐',
  //       span2: '(法式烤鮭魚)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
  //       note: '* 廚娘油飯不足將以芋頭糕或蜜地瓜替換無法自選，敬請諒解！'
  //     },
  //     price: 'NT$170',
  //     listItems: [
  //       {
  //         title: 'A主餐 刈包',
  //         span: '6擇1',
  //         items: [
  //           { text: '薯泥香素鬆潤餅', note: '*蛋奶素' },
  //           { text: '千島香酥蝦潤餅' },
  //           { text: '蜂蜜芥末雞潤餅', note: '*微辣' },
  //           { text: '蒜味鄉村魚潤餅' },
  //           { text: '凱薩烤培根潤餅' },
  //           { text: '媽手老滷肉潤餅', note: '*預訂供應' }
  //         ]
  //       },

  //       {
  //         title: '加購湯飲品',
  //         span: '+$15',
  //         // 沒有備註的項目可以只有text字段
  //         items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
  //       }
  //     ]
  //   }
  // },
  {
    card: {
      image: '/delicious/2-pic-wine.png',
      title: '雙主餐潤餅便當 -  法式紅酒牛肉丸',
      text: {
        main: 'A 主餐 潤餅捲2入',
        span: '(口味隨機出餐)',
        main2: 'B 主餐',
        span2: '(法式紅酒牛肉丸)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      price: 'NT$190',
      isNew: true,
      note: ' # 醇香'
    },
    dialog: {
      image: '/delicious/dialog-2-pic-wine.png',
      title: '雙主餐潤餅便當 -  法式紅酒牛肉丸',
      text: {
        main: 'A 主餐 潤餅捲2入',
        span: '(口味隨機出餐)',
        main2: '+B 主餐',
        span2: '(法式紅酒牛肉丸)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        note: '* 廚娘油飯不足將以芋頭糕或蜜地瓜替換無法自選，敬請諒解！'
      },
      price: 'NT$190',
      listItems: [
        {
          title: 'A主餐',
          // span: '6擇1',
          items: [
            { text: '薯泥香素鬆潤餅', note: '*蛋奶素' },
            { text: '千島香酥蝦潤餅' },
            { text: '蜂蜜芥末雞潤餅', note: '*微辣' },
            { text: '蒜味鄉村魚潤餅' },
            { text: '凱薩烤培根潤餅' },
            { text: '媽手老滷肉潤餅', note: '*預訂供應' }
          ]
        },

        {
          title: '加購湯飲品',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
        }
      ]
    }
  },

  {
    card: {
      image: '/delicious/2-pic-23.png',
      title: '法式紅酒牛肉丸油飯盒',
      text: {
        main: '主餐 (法式紅酒牛肉丸)',
        text: '廚娘油飯雙份量 + 梅汁蕃茄 + 鹽水煮蛋',

        text2: '季節時蔬 + 酥炸菇菇 + 香滷豆干 '
      },
      price: 'NT$190',

      note: '# 醇香',
      isNew: true
    },
    dialog: {
      image: '/delicious/dialog-2-pic-23.jpg',
      title: '法式紅酒牛肉丸油飯盒',
      text: {
        main: '主餐 (法式紅酒牛肉丸)',
        main2: '',

        text2: '廚娘油飯雙份量 + 梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 酥炸菇菇 + 香滷豆干 '
      },
      price: 'NT$190',

      listItems: [
        {
          title: '加購湯飲品',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
        }
      ]
    }
  },
  // {
  //   card: {
  //     image: '/delicious/guabao-bangdong-wine.png',
  //     title: '雙主餐刈包便當 -  法式紅酒牛肉丸',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(口味 6 擇 1)',
  //       main2: 'B 主餐',
  //       span2: '(法式紅酒牛肉丸)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
  //       note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
  //       smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
  //     },
  //     price: 'NT$190',
  //     isNew: true,
  //     note: ' # 醇香'
  //   },
  //   dialog: {
  //     image: '/delicious/dialog-guabao-bangdong-wine.png',
  //     title: '雙主餐刈包便當 -  法式紅酒牛肉丸',
  //     text: {
  //       main: 'A 主餐 刈包',
  //       span: '(口味 6 擇 1)',
  //       main2: '+B 主餐',
  //       span2: '(法式紅酒牛肉丸)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
  //       note: '* 廚娘油飯不足將以芋頭糕或蜜地瓜替換無法自選，敬請諒解！'
  //     },
  //     price: 'NT$190',
  //     listItems: [
  //       {
  //         title: 'A主餐 刈包',
  //         span: '6擇1',
  //         items: [
  //           { text: '薯泥香素鬆潤餅', note: '*蛋奶素' },
  //           { text: '千島香酥蝦潤餅' },
  //           { text: '蜂蜜芥末雞潤餅', note: '*微辣' },
  //           { text: '蒜味鄉村魚潤餅' },
  //           { text: '凱薩烤培根潤餅' },
  //           { text: '媽手老滷肉潤餅', note: '*預訂供應' }
  //         ]
  //       },

  //       {
  //         title: '加購湯飲品',
  //         span: '+$15',
  //         // 沒有備註的項目可以只有text字段
  //         items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
  //       }
  //     ]
  //   }
  // },
  {
    card: {
      image: '/delicious/2-pic-share.png',
      title: '分享餐',
      text: {
        main: '3 吋潤餅 6 入',
        span: '(口味 6 擇 3 或 2)',
        text2: '超人氣潤餅現正推出多人分享餐，無論三五好友或是公司餐會都能一起快樂分享！'
      },
      price: 'NT$220',
      isNew: false
      // note: ' # 超香'
    },
    dialog: {
      image: '/delicious/dialog-2-pic-share.png',
      title: '分享餐',
      text: {
        main: '3 吋潤餅 6 入',
        span: '(口味 6 擇 3 或 2)',
        text2: '超人氣潤餅現正推出多人分享餐，無論三五好友或是公司餐會都能一起快樂分享！'
      },
      price: 'NT$220',
      listItems: [
        {
          title: '3吋潤餅口味',
          span: '口味 6 擇 3 或 2',
          items: [
            { text: '薯泥香素鬆潤餅', note: '*蛋奶素' },
            { text: '千島香酥蝦潤餅' },
            { text: '蜂蜜芥末雞潤餅', note: '*微辣' },
            { text: '蒜味鄉村魚潤餅' },
            { text: '凱薩烤培根潤餅' },
            { text: '媽手老滷肉潤餅', note: '*預訂供應' }
          ]
        }
      ]
    }
  }
])

const isDialogOpen = ref(false)

const selectedSlide = ref(null) // 初始化為null

const openDialog = slide => {
  selectedSlide.value = slide
  isDialogOpen.value = true
}
</script>
<style lang="scss" scoped>
@import '/assets/components/deliciousCard.scss';
</style>
