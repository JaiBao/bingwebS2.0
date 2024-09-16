<template>
  <Carousel v-bind="settings" :breakpoints="breakpoints" :wrap-around="true" class="historyCarousel">
    <Slide v-for="(slide, index) in slides" :key="index">
      <div class="carousel__item">
        <q-card class="readCard" style="box-shadow: 0 0 0 #ccc">
          <div class="card-content row">
            <img loading="lazy" class="card-image col-6 col-sm-12" :src="slide.image" alt="輪撥圖" />
            <div class="card-info col col-sm-12">
              <q-card-section>
                <h5>{{ slide.title }}</h5>
                <p>{{ slide.text }}</p>
              </q-card-section>
            </div>
          </div>
        </q-card>
      </div>
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script setup>
import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

const slides = ref([
  {
    image: '/history/1-pic-15.jpg',
    title: '獨家配方',
    text: '傳承道地古法配方，熬製獨特醬汁，堅持傳統風味，潛心研究數十種香料配方，以特有烹調技術，調和出各式獨家口味內餡。\n餅皮則傳承老師傅傳授數十年經驗及獨家配方，堅持絕不添加吊白塊依然讓每張餅皮薄、韌、香、Q。'
  },
  {
    image: '/history/1-pic-16.jpg',
    title: '天然食材',
    text: '遴選優質廠商配合，採用嚴選新鮮蔬果及上等CAS優良肉品，精心挑選後經過多道過濾、清洗、處理流程，在運送、保存、製作上皆依循著標準作業程序，使食材得以保持新鮮並符合衛生標準。'
  },
  {
    image: '/history/1-pic-17.jpg',
    title: '手工現做',
    text: '在中華一餅，每位夥伴們都學得神乎其技的擦皮功夫，以及製作每份潤餅的俐落、流利的動作，讓好吃的潤餅手工製作出最佳美味。'
  },
  {
    image: '/history/1-pic-18.jpg',
    title: '品質保證',
    text: '中華一餅專業的工作團隊，秉持著品質至上的理念，呈現給消費者獨特口味，製作過程經由專業品管人員把關，維持每捲潤餅份量的穩定與最佳美味！'
  }
])
const settings = ref({
  itemsToShow: 1,
  snapAlign: 'center'
})
// const breakpoints = ref({
//   576: {
//     itemsToShow: 1,
//     snapAlign: 'left'
//   },
//   768: {
//     itemsToShow: 2,
//     snapAlign: 'left'
//   },
//   992: {
//     itemsToShow: 2,
//     snapAlign: 'left'
//   },
//   1200: {
//     itemsToShow: 3,
//     snapAlign: 'center'
//   },
//   1920: {
//     itemsToShow: 4,
//     snapAlign: 'left'
//   }
// })
</script>

<style lang="scss" scoped>
.historyCarousel {
  margin: 5% 5%;
  // padding: 0 15%;
}
.carousel__item {
  width: 100%;
}
.card-content {
  display: flex;
  flex-direction: column;
  margin: 5% 14%;
  @media (min-width: 568px) {
    margin: 1% 13%;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    margin: 1% 10%;
  }
}

.card-image {
  flex: 1;
  object-fit: contain;
  width: 100%;
}

.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 15px;
  text-align: left;
  h5 {
    color: #f50077;
    margin: 2% 0;
    font-weight: 600;
  }
  p {
    font-weight: 600;
    white-space: pre-line;
    font-size: 0.9rem;
  }
  @media (min-width: 768px) {
    padding-left: 20px;
    h5 {
      font-size: 1.6rem;
    }
    p {
      margin: 0;
    }
  }
  @media (min-width: 992px) {
    // padding-top: 10%;
    h5 {
      font-size: 1.8rem;
    }
    p {
      font-size: 1rem;
    }
  }
  @media (min-width: 1200px) {
    h5 {
      font-size: 2rem;
    }
    p {
      font-size: 1.2rem;
    }
  }
  @media (min-width: 1500px) {
    h5 {
      font-size: 2rem;
    }
    p {
      font-size: 1.3rem;
    }
  }
  @media (min-width: 1700px) {
    h5 {
      font-size: 2rem;
    }
    p {
      font-size: 1.5rem;
    }
  }
  @media (min-width: 1900px) {
    h5 {
      font-size: 2rem;
    }
    p {
      font-size: 1.7rem;
    }
  }
}
</style>
