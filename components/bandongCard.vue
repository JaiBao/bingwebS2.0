<template>
  <div class="carousel__item row">
    <q-card class="readCard col-12" v-for="(slide, index) in slides" :key="index" @click="openDialog(slide)">
      <div class="card-content row">
        <div class="card-info col col-sm-12">
          <div class="new-tag" v-if="slide.card.isNew">
            <p>新品</p>
          </div>
          <div class="hot-tag" v-if="slide.card.isHot">
            <img src="/delicious/hot.png" alt="Hot" />
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
            <p class="dialogNote">* 配菜會根據季節不定期調整部分餐點，圖片僅供參考，請以實際餐盒為準</p>
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
      image: '/delicious/2-pic-4.png',
      title: '招牌潤餅便當',
      text: {
        main: '3吋潤餅',
        //span: '(口味6擇1)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 杏鮑菇 + 香滷豆干',
        smallNote: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
      },
      price: 'NT$100',
      isNew: false,
      isHot: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-4.png',
      title: '招牌潤餅便當',
      text: {
        main: '3吋潤餅',
        //span: '(口味6擇1)',
        text2: '梅汁蕃茄+鹽水煮蛋+季節時蔬+廚娘油飯＋杏鮑菇＋香滷豆干',
        note: '* 廚娘油飯不足將以芋頭糕或蜜地瓜替換無法自選，敬請諒解！'
      },
      price: 'NT$100',
      listItems: [
        {
          title: '潤餅口味',
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
      image: '/delicious/2-pic-5.png',
      title: '素食潤餅便當',
      text: {
        main: '3吋潤餅',
        span: '(薯泥香素鬆)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '地瓜 + 杏鮑菇 + 香滷豆干'
      },
      price: 'NT$100',
      note: ' # 蛋奶素',
      isNew: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-5.png',
      title: '素食潤餅便當',
      text: {
        main: '3吋潤餅',
        span: '(薯泥香素鬆)',
        text2: '梅汁蕃茄+鹽水煮蛋+季節時蔬+地瓜＋杏鮑菇＋香滷豆干'
      },
      price: 'NT$100',
      // price: '$100',
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
      image: '/delicious/2-pic-rolls.png',
      title: '炸蝦春捲便當 - 假日限定隱藏版',
      text: {
        main: '特製炸蝦春捲',
        // //span: '(口味6擇1)',
        // main2: 'B 主餐',
        // span2: '(法式紅酒牛肉丸)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '地瓜 + 杏鮑菇 + 香滷豆干'
        // smallNote: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
      },
      price: 'NT$100',
      isNew: false,
      isHot: false
      // note: ' # 好盤'
    },
    dialog: {
      image: '/delicious/dialog-2-pic-rolls.png',
      title: '炸蝦春捲便當 - 假日限定隱藏版',
      text: {
        main: '特製炸蝦春捲',
        // //span: '(口味6擇1)',
        // main2: 'B 主餐',
        // span2: '(法式紅酒牛肉丸)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 地瓜 + 杏鮑菇 + 香滷豆干'
        // note: '* 廚娘油飯不足將以芋頭糕或蜜地瓜替換無法自選，敬請諒解！'
      },
      price: 'NT$100',
      listItems: [
        // {
        //   title: 'A主餐',
        //   span: '6擇1',
        //   items: [
        //     { text: '薯泥香素鬆潤餅', note: '*蛋奶素' },
        //     { text: '千島香酥蝦潤餅' },
        //     { text: '蜂蜜芥末雞潤餅', note: '*微辣' },
        //     { text: '蒜味鄉村魚潤餅' },
        //     { text: '凱薩烤培根潤餅' },
        //     { text: '媽手老滷肉潤餅', note: '*預訂供應' }
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
      note: ' # 爽口',
      isNew: false,
      isHot: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-6.png',
      title: '雙主餐潤餅便當 - 清蒸嫩雞胸',
      text: {
        main: 'A 主餐 3吋潤餅',
        //span: '(口味6擇1)',
        main2: '+B 主餐',
        span2: '(清蒸嫩雞胸)',
        text2: ' 梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 杏鮑菇 + 香滷豆干',
        note: '* 廚娘油飯不足將以芋頭糕或蜜地瓜替換無法自選，敬請諒解！'
      },
      price: 'NT$125',
      listItems: [
        {
          title: 'A主餐',
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
  //       main: 'A 主餐 3吋潤餅',
  //       span: '(薯泥香素鬆)',
  //       main2: 'B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
  //       note: '地瓜 + 杏鮑菇 + 香滷豆干'
  //     },
  //     price: 'NT$125',
  //     note: ' # 蛋奶素',
  //     isNew: false
  //   },
  //   dialog: {
  //     image: '/delicious/dialog-2-pic-5V.png',
  //     title: '雙主餐素食潤餅便當-素肉排',
  //     text: {
  //       main: 'A 主餐 3吋潤餅',
  //       span: '(薯泥香素鬆)',
  //       main2: '+B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄+鹽水煮蛋+季節時蔬+地瓜＋杏鮑菇＋香滷豆干'
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
      price: 'NT$150',
      note: ' # 超香',
      isNew: false,
      isHot: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-g.png',
      title: '雙主餐潤餅便當 - 傳香滷雞腿',
      text: {
        main: 'A 主餐 3吋潤餅',
        //span: '(口味6擇1)',
        main2: '+B 主餐',
        span2: '(傳香滷雞腿)',
        text2: ' 梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 杏鮑菇 + 香滷豆干',
        note: '* 廚娘油飯不足將以芋頭糕或蜜地瓜替換無法自選，敬請諒解！'
      },
      price: 'NT$150',
      listItems: [
        {
          title: 'A主餐',
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
        main: 'A 主餐 3吋潤餅',
        //span: '(口味6擇1)',
        main2: 'B 主餐',
        span2: '(家常厚滷牛)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 杏鮑菇 + 香滷豆干',
        smallNote: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
      },
      price: 'NT$150',
      note: ' # 滿足',
      isNew: false,
      isHot: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-m.png',
      title: '雙主餐潤餅便當 - 家常厚滷牛',
      text: {
        main: 'A 主餐 3吋潤餅',
        //span: '(口味6擇1)',
        main2: '+B 主餐',
        span2: '(家常厚滷牛)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 杏鮑菇 + 香滷豆干',
        note: '* 廚娘油飯不足將以芋頭糕或蜜地瓜替換無法自選，敬請諒解！'
      },
      price: 'NT$150',
      listItems: [
        {
          title: 'A主餐',
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
  //       main: 'A 主餐 3吋潤餅',
  //       span: '(薯泥香素鬆)',
  //       main2: 'B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
  //       note: '地瓜 + 杏鮑菇 + 香滷豆干'
  //     },
  //     price: 'NT$150',
  //     note: ' # 蛋奶素 ＃配餐增量',
  //     isNew: false
  //   },
  //   dialog: {
  //     image: '/delicious/dialog-2-pic-5V.png',
  //     title: '雙主餐素食潤餅便當-素肉排',
  //     text: {
  //       main: 'A 主餐 3吋潤餅',
  //       span: '(薯泥香素鬆)',
  //       main2: '+B 主餐',
  //       span2: '(素肉排)',
  //       text2: '梅汁蕃茄+鹽水煮蛋+季節時蔬+地瓜＋杏鮑菇＋香滷豆干'
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
        main: 'A 主餐 3吋潤餅',
        //span: '(口味6擇1)',
        main2: 'B 主餐',
        span2: '(法式烤鮭魚)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 杏鮑菇 + 香滷豆干',
        smallNote: '*若當日廚娘油飯供應不足，我們將以芋頭糕或蜜地瓜替換。敬請見諒！'
      },
      price: 'NT$170',
      isNew: false,
      isHot: false
      // note: ' # 煙燻熟成'
    },
    dialog: {
      image: '/delicious/dialog-2-pic-f.png',
      title: '雙主餐潤餅便當 -  法式烤鮭魚',
      text: {
        main: 'A 主餐 3吋潤餅',
        //span: '(口味6擇1)',
        main2: '+B 主餐',
        span2: '(法式烤鮭魚)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 杏鮑菇 + 香滷豆干',
        note: '* 廚娘油飯不足將以芋頭糕或蜜地瓜替換無法自選，敬請諒解！'
      },
      price: 'NT$170',
      listItems: [
        {
          title: 'A主餐',
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
      price: 'NT$190',
      isNew: false,
      isHot: false,
      note: ' # 醇香'
    },
    dialog: {
      image: '/delicious/dialog-2-pic-wine.png',
      title: '雙主餐潤餅便當 -  法式紅酒牛肉丸',
      text: {
        main: 'A 主餐 3吋潤餅',
        //span: '(口味6擇1)',
        main2: '+B 主餐',
        span2: '(法式紅酒牛肉丸)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 杏鮑菇 + 香滷豆干',
        note: '* 廚娘油飯不足將以芋頭糕或蜜地瓜替換無法自選，敬請諒解！'
      },
      price: 'NT$190',
      listItems: [
        {
          title: 'A主餐',
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
          title: '加購湯飲品',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
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
