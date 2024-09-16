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
        <img loading="lazy" class="card-image col-6 col-sm-12" :src="slide.card.image" alt="單點" />
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
      image: '/delicious/2-pic-11.png',
      title: '薯泥香素鬆  6 吋潤餅',
      text: { main: '特製薯泥與素鬆包覆在美味潤餅中，淋上蜂蜜芥末醬後搭配上生鮮蘿蔓與多重配料，清爽美味、鬆脆順口的經典美味。' },
      price: 'NT$80',
      note: ' # 蛋奶素',
      isNew: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-11.png',
      title: '薯泥香素鬆  6 吋潤餅',
      text: {
        main: '特製薯泥與素鬆包覆在美味潤餅中，淋上蜂蜜芥末醬後搭配上生鮮蘿蔓與多重配料，清爽美味、鬆脆順口的經典美味。',
        span: '*蛋奶素'
      },
      price: 'NT$80'
      // listItems: [
      //   {
      //     title: '3吋潤餅口味',
      //     span: '6擇1',
      //     items: [
      //       { text: '薯泥香素鬆潤餅', note: '*蛋奶素' },
      //       { text: '千島香酥蝦潤餅' },
      //       { text: '蜂蜜芥末雞潤餅', note: '*微辣' },
      //       { text: '蒜味鄉村魚潤餅' },
      //       { text: '凱薩烤培根潤餅' },
      //       { text: '媽手老滷肉潤餅' }
      //     ]
      //   },
      //   {
      //     title: '加購湯飲品',
      //     span: '+$15',
      //     // 沒有備註的項目可以只有text字段
      //     items: [
      //       { text: '微甜豆漿' },
      //       { text: '無糖豆漿' },
      //       { text: '古早味紅茶' },
      //       { text: '古早味奶茶' },
      //       { text: '季節甜品' },
      //       { text: '季節濃湯', note: '' }
      //     ]
      //   }
      // ]
    }
  },
  {
    card: {
      image: '/delicious/2-pic-12.png',
      title: '千島香酥蝦  6 吋潤餅',
      text: { main: '特製千島沙拉醬搭配酥脆唰嘴炸蝦與新鮮蘿蔓、薯泥、洋蔥、醃冬瓜等豐富配料，吃上一口的滿足與飽足。' },
      price: 'NT$80',
      isNew: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-12.png',
      title: '千島香酥蝦  6 吋潤餅',
      text: {
        main: '特製千島沙拉醬搭配酥脆唰嘴炸蝦與新鮮蘿蔓、薯泥、洋蔥、醃冬瓜等豐富配料，吃上一口的滿足與飽足。'
        // span: '*蛋奶素'
      },
      price: 'NT$80'
    }
  },
  {
    card: {
      image: '/delicious/2-pic-13.png',
      title: '蜂蜜芥末雞  6 吋潤餅',
      text: { main: '用鮮嫩烤雞為主角，結合新鮮蘿蔓、薯泥、洋蔥、醃冬瓜等滿滿配料，最後抹上蜂蜜芥末醬，是超人氣的口味選擇。' },
      price: 'NT$80',
      note: ' # 微辣',
      isNew: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-13.png',
      title: '蜂蜜芥末雞  6 吋潤餅',
      text: {
        main: '鮮嫩雞肉融在香辣新鮮配料中拌炒，結合新鮮蘿蔓、薯泥、洋蔥等配料，最後抹上蜂蜜芥末醬，是超人氣的口味選擇。',
        span: '*微辣'
      },
      price: 'NT$80'
    }
  },
  {
    card: {
      image: '/delicious/2-pic-14.png',
      title: '蒜味鄉村魚  6 吋潤餅',
      text: { main: '用蒜味鄉村醬為基底，以酥炸鮮魚為主角，結合新鮮蘿蔓、薯泥、洋蔥、醃冬瓜等滿滿配料，鮮嫩爽口，讓人一口接一口。' },
      price: 'NT$80',
      isNew: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-14.png',
      title: '蒜味鄉村魚  6 吋潤餅',
      text: {
        main: '用蒜味鄉村醬為基底，以酥炸鮮魚為主角，結合新鮮蘿蔓、薯泥、洋蔥、醃冬瓜等滿滿配料，鮮嫩爽口，讓人一口接一口。'
        // span: '*蛋奶素'
      },
      price: 'NT$80'
    }
  },
  {
    card: {
      image: '/delicious/2-pic-15.png',
      title: '凱薩烤培根  6 吋潤餅',
      text: { main: '香烤美味培根結合新鮮蘿蔓、薯泥、醃冬瓜等豐富配料，淋上特製的凱薩沙拉醬，給喜愛輕食的您最佳推薦。' },
      price: 'NT$80',
      isNew: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-15.png',
      title: '凱薩烤培根  6 吋潤餅',
      text: {
        main: '香烤美味培根結合新鮮蘿蔓、薯泥、醃冬瓜等豐富配料，淋上特製的凱薩沙拉醬，給喜愛輕食的您最佳推薦。'
        // span: '*蛋奶素'
      },
      price: 'NT$80'
    }
  },
  {
    card: {
      image: '/delicious/2-pic-16.png',
      title: '媽手老滷肉  6 吋潤餅',
      text: { main: '就像媽媽親手滷製的好吃滷肉，內容包覆滷肉、酸菜、花生粉、酥皮、菜脯等滿滿內餡配料，肥而不膩的好味道。' },
      price: 'NT$80',
      note: '#預訂供應',
      isNew: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-16.png',
      title: '媽手老滷肉  6 吋潤餅',
      text: {
        main: '就像媽媽親手滷製的好吃滷肉，內容包覆滷肉、酸菜、花生粉、酥皮、菜脯等滿滿內餡配料，肥而不膩的好味道。',
        span: '*預訂供應'
      },
      price: 'NT$80'
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
@import '/assets/components/deliciousSoloCard.scss';
</style>
