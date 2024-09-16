<template>
  <div class="carousel__item row">
    <q-card class="readCard col-12" v-for="(slide, index) in slides" :key="index" @click="openDialog(slide)">
      <div class="card-content row">
        <div class="card-info col col-sm-12">
          <div class="cardText">
            <div class="top">
              <h5>{{ slide.card.title }}</h5>
              <div class="bottomXs xs">
                <p class="fw-700">
                  {{ slide.card.price }}
                </p>
              </div>
              <h6 class="gt-xs">
                {{ slide.card.text.main }}
                <span class="gt-xs">{{ slide.card.text.span }}</span>
              </h6>
              <h6 class="gt-xs">
                {{ slide.card.text.main2 }}
                <span class="gt-xs">{{ slide.card.text.span2 }}</span>
              </h6>

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
        <img loading="lazy" class="card-image col-6 col-sm-12" :src="slide.card.image" alt="輪撥圖" />
      </div>
    </q-card>

    <!-- Dialog部分 -->
    <!-- <q-dialog v-model="isDialogOpen">
      <q-card class="selectedDialog"> -->
    <!-- 新增的關閉按鈕 -->
    <!-- <q-btn
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
    </q-dialog> -->
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

        smallNote: '* 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應 '
      },
      price: 'NT$125'
      // note: ' # 爽口'
    },
    dialog: {
      image: '/delicious/dialog-2-pic-9.png',
      title: '貴賓盒餐',
      text: {
        main: '3吋潤餅',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 湯飲品擇1',
        note: ' * 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應'
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
      image: '/delicious/2-pic-10-1.png',
      title: '首席盒餐',
      text: {
        main: '3吋潤餅',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 紐澳良雞翅 + 湯飲品擇1',
        smallNote: '* 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應 '
      },
      price: 'NT$150'
      // note: ' # 超香'
    },
    dialog: {
      image: '/delicious/dialog-2-pic-10-1.png',
      title: '首席盒餐',
      text: {
        main: '3吋潤餅',
        span: '(口味6擇1)',
        text2: '蜂蜜芥末醬地瓜 + 主廚小點 + 紐澳良雞翅 + 湯飲品擇1',
        note: ' * 主廚小點：蛋塔、甜酥餅、芋頭糕 不定期供應'
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
      image: '/delicious/2-pic-6.png',
      title: '雙主餐潤餅便當 - 清蒸嫩雞胸',
      text: {
        main: 'A 主餐',
        span: '(3 吋潤餅,口味 6 擇 1)',
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
      image: '/delicious/dialog-2-pic-6.png',
      title: '雙主餐潤餅便當 - 清蒸嫩雞胸',
      text: {
        main: '潤餅捲2入',
        span: '(A 主餐 , 口味 6 擇 1)',
        main2: '+B 主餐',
        span2: '(清蒸嫩雞胸)',
        text2: ' 梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        note: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
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
  {
    card: {
      image: '/delicious/2-pic-g.png',
      title: '雙主餐潤餅便當 - 傳香滷雞腿',
      text: {
        main: 'A 主餐',
        span: '(3 吋潤餅,口味 6 擇 1)',
        main2: 'B 主餐',
        span2: '(傳香滷雞腿)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      price: 'NT$150',
      note: ' # 超香'
    },
    dialog: {
      image: '/delicious/dialog-2-pic-g.png',
      title: '雙主餐潤餅便當 - 傳香滷雞腿',
      text: {
        main: 'A 主餐',
        span: '(3 吋潤餅,口味 6 擇 1)',
        main2: '+B 主餐',
        span2: '(傳香滷雞腿)',
        text2: ' 梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        note: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
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
        main: 'A 主餐',
        span: '(3 吋潤餅,口味 6 擇 1)',
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
      image: '/delicious/dialog-2-pic-m.png',
      title: '雙主餐潤餅便當 - 家常厚滷牛',
      text: {
        main: 'A 主餐',
        span: '(3 吋潤餅,口味 6 擇 1)',
        main2: '+B 主餐',
        span2: '(家常厚滷牛)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        note: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
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
  {
    card: {
      image: '/delicious/2-pic-f.png',
      title: '雙主餐潤餅便當 -  燻鮭魚馬鈴薯',
      text: {
        main: 'A 主餐',
        span: '(3 吋潤餅,口味 6 擇 1)',
        main2: 'B 主餐',
        span2: '(燻鮭魚馬鈴薯)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬',
        note: '廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        smallNote: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      price: 'NT$180'
      // note: ' # 滿足'
    },
    dialog: {
      image: '/delicious/dialog-2-pic-f.png',
      title: '雙主餐潤餅便當 -  燻鮭魚馬鈴薯',
      text: {
        main: 'A 主餐',
        span: '(3 吋潤餅,口味 6 擇 1)',
        main2: '+B 主餐',
        span2: '(燻鮭魚馬鈴薯)',
        text2: '梅汁蕃茄 + 鹽水煮蛋 + 季節時蔬 + 廚娘油飯 + 酥炸菇菇 + 香滷豆干',
        note: '*廚娘油飯依預訂單當日現作限量供應，不足數將以芋頭糕或蜜地瓜替換，恕無法自選，請您諒解！'
      },
      price: 'NT$180',
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
.carousel__item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (min-width: 992px) {
    justify-content: space-between;
  }
}
// .carousel__item:hover {
//   cursor: pointer;
// }
.readCard {
  background-color: #fff;
  margin: 2% 1%;
  display: block;

  box-shadow: 8px 8px 18px 0px rgba(0, 0, 0, 0.1);
  @media (min-width: 992px) {
    width: 47%;
  }
}
// .readCard:hover {
//   background-color: #ffefad; /* 這是 hover 時的背景色 */
//   border: none;
//   box-shadow: 8px 8px 18px 0px rgba(0, 0, 0, 0.1);
// }

.card-image {
  flex: 0.6;
  object-fit: contain;
  width: 150px;
  // height: 150px;
  @media (min-width: 576px) {
    width: 230px;
    max-height: 230px;
  }
  @media (min-width: 768px) {
    width: 300px;
    // height: 300px;
  }
  @media (min-width: 992px) {
    width: 100%;
  }
}
.card-content {
  padding: 0% 0;
  height: 100%;
  @media (min-width: 768px) {
    padding: 2% 0;
  }
}

.cardText {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 15px;
  text-align: left;
  h5 {
    margin: 2% 0;
    font-weight: 700;
    color: #f50077;
    font-size: 1rem;
  }
  h6 {
    margin: 0% 0;
    line-height: 1.4rem;
    font-weight: 400;
    font-size: 0.75rem;
    color: #666;
    span {
      color: #e388ae;
      font-size: 0.75rem;
    }
  }
  p {
    font-weight: 400;
    white-space: pre-line;
    margin: 0% 0;
    line-height: 1.4rem;
    font-size: 0.75rem;
    color: #666;
    padding-bottom: 5%;
    span {
      color: #e388ae;
      font-size: 0.75rem;
    }
  }
  .bottomXs {
    p {
      font-size: 1.1rem;
    }
    .bottom {
      p {
        font-size: 0.625rem;
      }
    }
    span {
      color: var(--838383, #838383);
      font-size: 0.625rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  // @media (min-width: 576px) {
  //   padding-left: 20px;
  //   h5 {
  //     font-size: 2rem;
  //   }
  //   h6 {
  //     font-size: 1.5rem;
  //     span {
  //       font-size: 1.4rem;
  //     }
  //   }
  //   p {
  //     margin: 0;
  //     font-size: 1.2rem;
  //   }
  //   .bottom {
  //     p {
  //       font-size: 2.2rem;
  //     }
  //     span {
  //       color: var(--838383, #838383);
  //       font-size: 1.25rem;
  //       font-style: normal;
  //       font-weight: 400;
  //       line-height: normal;
  //     }
  //   }
  // }

  @media (min-width: 768px) {
    // padding-top: 10%;
    h5 {
      font-size: 1.3125rem;
    }
    h6 {
      font-size: 1rem;
      span {
        font-size: 1rem;
      }
    }
    p {
      font-size: 1rem;
      padding-bottom: 0%;
    }
    .smallNote {
      font-size: 12px;
      color: #838383;
      font-weight: 400;
      line-height: 160%; /* 19.2px */
      width: 80%;
    }
    .bottom {
      p {
        font-size: 1.5rem;
      }
      span {
        color: var(--838383, #838383);
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
}
</style>
