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
                <p>{{ slide.text }}</p>
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
    image: '/budget/3-pic-1.png',
    name: '便當系列 - 招牌潤餅便當',
    text: '3吋潤餅 + 梅汁蕃茄+鹽水煮蛋+季節時蔬+廚娘油飯＋酥炸菇菇＋香滷豆干',
    price: '$100'
  },
  {
    image: '/budget/3-pic-2.png',
    name: '便當系列 - 素食潤餅便當',
    text: '3吋薯泥香素鬆潤餅 + 梅汁蕃茄+鹽水煮蛋+季節時蔬+地瓜＋酥炸菇菇＋香滷豆干',
    price: '$100'
  },
  {
    image: '/budget/3-pic-3.png',
    name: '午茶系列 -  會議盒餐',
    text: '3吋潤餅 +手作蛋塔+地瓜薯薯+湯飲品擇1',
    price: '$100'
  },
  {
    image: '/budget/3-pic-4.png',
    name: '經濟餐',
    text: '3吋潤餅(口味6擇1)+地瓜薯薯+湯飲品擇1',
    price: '$80'
  },
  {
    image: '/budget/3-pic-5.png',
    name: '單點系列 - 6吋潤餅',
    text: '口味6擇1：薯泥香素鬆、千島香酥蝦、蜂蜜芥末雞、蒜味鄉村魚、凱薩烤培根、媽手老滷肉',
    price: '$65'
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
  //   display: flex;
  //   flex-direction: row; // 如果你的cards是水平排列的
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
  align-items: center;
  //   flex: 1;
  box-shadow: none;
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
  text-align: left;

  h5 {
    font-weight: 600;
    margin: 2% 0;
    color: #f50077;
  }
  p {
    font-weight: 550;
    font-size: 1.1rem;
    color: black;
    line-height: 1.2;
  }
}
.no-margin-bottom {
  margin-bottom: 0;
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
