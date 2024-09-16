<template>
  <Carousel v-bind="settings" :breakpoints="breakpoints" :wrap-around="true" class="budgetCarousel">
    <Slide v-for="(slide, index) in slides" :key="index">
      <div class="carousel__item">
        <q-card class="readCard">
          <img loading="lazy" :src="slide.image" />
          <q-card-section>
            <div class="textContent">
              <div class="text1">
                <h5>{{ slide.name }}</h5>
                <p style="margin-bottom: 0">{{ slide.text }}</p>
                <p>{{ slide.note }}</p>
              </div>
              <div class="price">
                <h6>{{ slide.price }}</h6>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script setup scoped>
import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

const slides = ref([
  {
    image: '/budget/3-pic-6.png',
    name: '午茶系列 -  貴賓盒餐',
    text: '3吋潤餅 +手作蛋塔+地瓜薯薯+甜酥餅+湯飲品擇1  ',
    note: '(※甜酥餅不定期更換主廚小點)',
    price: '$125'
  },
  {
    image: '/budget/3-pic-7.png',
    name: '便當系列 - 清蒸嫩雞胸便當',
    text: '3吋潤餅 + 梅汁蕃茄+鹽水煮蛋+季節時蔬+香菇油飯＋酥炸菇菇＋香滷豆干＋清蒸嫩雞胸',
    price: '$125'
  },
  {
    image: '/budget/3-pic-8.png',
    name: '午茶系列 -  首席盒餐',
    text: '3吋潤餅 +手作蛋塔+地瓜薯薯+甜酥餅+紐澳良雞翅+湯飲品擇1 ',
    note: '(※甜酥餅不定期更換主廚小點)',
    price: '$150'
  },
  {
    image: '/budget/3-pic-9.png',
    name: '便當系列 - 傳香滷雞腿便當',
    text: '3吋潤餅 + 梅汁蕃茄+鹽水煮蛋+季節時蔬+香菇油飯＋酥炸菇菇＋香滷豆干＋傳香滷雞腿',
    price: '$150'
  },
  {
    image: '/budget/3-pic-10.png',
    name: '便當系列 - 家常厚滷牛便當',
    text: '3吋潤餅 + 梅汁蕃茄+鹽水煮蛋+季節時蔬+香菇油飯＋酥炸菇菇＋香滷豆干＋家常厚滷牛',
    price: '$150'
  }
])
const settings = ref({
  itemsToShow: 1,
  snapAlign: 'center'
})
const breakpoints = ref({
  576: {
    itemsToShow: 1,
    snapAlign: 'left'
  },
  768: {
    itemsToShow: 2,
    snapAlign: 'left'
  },
  992: {
    itemsToShow: 2,
    snapAlign: 'left'
  },
  1200: {
    itemsToShow: 3,
    snapAlign: 'left'
  },
  1920: {
    itemsToShow: 4,
    snapAlign: 'left'
  }
})
</script>
<style lang="scss" scoped>
.budgetCarousel {
  margin: 0 5%;
  display: flex;
  flex-direction: row; // 如果你的cards是水平排列的
  align-items: stretch;
}
.carousel__item {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.readCard {
  padding: 0 8%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: none;
  align-items: center;
  flex: 1;
  border-radius: 0;
  img {
    flex: 1;
    object-fit: contain;
    width: 70%;
  }
}
.textContent {
  flex: 1;
  height: 50%;
}

.text1 {
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  h5 {
    font-weight: 600;
    margin: 2% 0;
    color: #f50077;
  }
  p {
    font-weight: 550;
    font-size: 1.1rem;
    line-height: 1.2;
    color: black;
  }
}
.price {
  text-align: left;
  color: #666;
  height: 50px;
  h6 {
    font-weight: 600;
    margin: 1% 0;
    // color: black;
  }
}
</style>
