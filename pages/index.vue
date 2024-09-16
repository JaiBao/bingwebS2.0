<template>
  <!-- banner -->
  <div class="indexBanner">
    <q-carousel
      v-model="bannerSlide"
      swipeable
      navigation
      infinite
      padding
      animated
      control-color="pink-8"
      class="rounded-borders"
      prev-icon="arrow_circle_left"
      next-icon="arrow_circle_right"
      transition-prev="slide-right"
      transition-next="slide-right"
      arrows
      :autoplay="bannerAutoplay">
      <template v-slot:navigation-icon="{ active, btnProps, onClick }">
        <q-btn v-if="active" size="sm" :icon="btnProps.icon" color="pink" flat round dense @click="onClick" />
        <q-btn v-else size="sm" :icon="btnProps.icon" color="white" flat round dense @click="onClick" />
      </template>

      <!-- 第一張輪播圖片 -->
      <!-- <q-carousel-slide :name="1">
        <nuxt-link to="/cico">
          <img src="/index/Banner01.png" alt="Banner" class="gt-sm" />
          <img src="/index/Banner01App.jpg" alt="Banner" class="lt-md" />
        </nuxt-link>
      </q-carousel-slide> -->
      <!-- 第2張輪播圖片 -->
      <q-carousel-slide :name="1">
        <nuxt-link to="/chinaBing#bandong">
          <img src="/index/Banner02-1.png" alt="Banner2" class="gt-sm" />
          <img src="/index/Banner02App-1.jpg" alt="Banner2" class="lt-md" />
        </nuxt-link>
      </q-carousel-slide>
      <!-- 第3張輪播圖片 -->
      <q-carousel-slide :name="2">
        <nuxt-link to="/cico">
          <img src="/index/Banner03.png" alt="Banner3" class="gt-sm" />
          <img src="/index/Banner03App.jpg" alt="Banner3" class="lt-md" />
        </nuxt-link>
      </q-carousel-slide>
      <!-- 第4張輪播圖片 -->
      <q-carousel-slide :name="3">
        <nuxt-link to="/daohua">
          <img src="/index/Banner05.png" alt="Banner5" class="gt-sm" />
          <img src="/index/Banner05App.jpg" alt="Banner5" class="lt-md" />
        </nuxt-link>
      </q-carousel-slide>
      <!-- 第4張輪播圖片 -->
      <q-carousel-slide :name="4">
        <nuxt-link @click="onFabClick">
          <img src="/index/Banner04.png" alt="Banner4" class="gt-sm" />
          <img src="/index/Banner04App.jpg" alt="Banner4" class="lt-md" />
        </nuxt-link>
      </q-carousel-slide>
    </q-carousel>
  </div>

  <!-- 懸浮div -->
  <div v-if="showFloatingDiv" class="floating-div">
    <div class="content">
      <span class="floating-text">＊預訂喜客油飯加贈豆花甜品</span>
      <q-btn @click="onFabClick" class="order-btn" color="white" text-color="pink-8">立即預訂</q-btn>
    </div>
    <div class="closeBtn">
      <q-btn round flat @click="closeFloatingDiv" class="close-btn" color="white">X</q-btn>
    </div>
  </div>

  <!-- 首頁區-->
  <section class="tenBG">
    <!-- 正餐專區 -->
    <div class="section1">
      <p class="sectionTitle">便當選擇，正餐專區</p>
      <div class="section1Cards">
        <q-card class="section1Card" v-for="card in section1Cards" :key="card.imgSrc">
          <div class="imgContainer">
            <img :src="card.imgSrc" class="foodImg" :alt="card.title" />
            <img :src="card.tagSrc" class="tag" alt="標籤" />
          </div>
          <q-card-section>
            <div class="title" :class="`text-${card.btnColor}`">{{ card.title }}</div>
            <div class="description">{{ card.description }}</div>
          </q-card-section>
          <q-card-section class="w-100 q-pa-md btns">
            <q-btn :outline="card.outline" class="cardBtn" :color="card.btnColor" :to="card.href" @mouseover="toggleOutline(card)" @mouseout="toggleOutline(card)">
              {{ card.btnText }}
            </q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- 下午茶專區 -->
    <div class="section2">
      <p class="sectionTitle">午後食刻，下午茶專區</p>
      <div class="section2Cards">
        <q-card class="section2Card" v-for="card in section2Cards" :key="card.imgSrc">
          <div class="imgContainer">
            <img :src="card.imgSrc" class="foodImg" :alt="card.title" />
            <img :src="card.tagSrc" class="tag" alt="標籤" />
          </div>
          <q-card-section>
            <div class="title" :class="`text-${card.titleColor}`">{{ card.title }}</div>
            <div class="description">{{ card.description }}</div>
          </q-card-section>
          <q-card-section class="w-100 q-pa-md btns">
            <q-btn
              :outline="card.outline"
              class="cardBtn"
              :color="card.btnColor"
              :to="card.href"
              :class="{ disabled: card.disabled }"
              @mouseover="toggleOutline(card)"
              @mouseout="toggleOutline(card)">
              {{ card.btnText }}
            </q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- 企業團體新食主義 -->
    <div class="section3Banner">
      <img src="/index/section3Banner.png" alt="banner" class="gt-sm" />
      <img src="/index/section3BannerApp.png" alt="banner" class="lt-md" />
    </div>
    <!-- 熱賣商品 -->
    <div class="section3">
      <div class="sectionTitle">
        <img src="/index/hot01.png" alt="HOT" />
        熱賣商品
      </div>
      <div class="section3Cards">
        <q-card class="section3Card" v-for="card in section3Cards" :key="card.imgSrc">
          <div class="imgContainer">
            <img :src="card.imgSrc" class="foodImg" :alt="card.title" />
            <div class="tag text-white" :class="`bg-${card.titleColor}`">
              {{ card.tagText }}
            </div>
          </div>
          <q-card-section>
            <div class="title" :class="`text-${card.titleColor}`">{{ card.title }}</div>
            <div class="description">{{ card.description }}</div>
          </q-card-section>
          <q-card-section class="w-100 q-pa-md btns">
            <q-btn
              :outline="card.outline"
              class="cardBtn"
              :color="card.btnColor"
              @click="onFabClick"
              :class="{ disabled: card.disabled }"
              @mouseover="toggleOutline(card)"
              @mouseout="toggleOutline(card)">
              {{ card.btnText }}
            </q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- 傳承區 -->
    <div class="section4">
      <img src="/index/rbei.png" alt="rbei" />
      <div class="text">
        <div class="textDiv">
          <p class="title">五十年手藝の台灣潤餅</p>
          <p class="title2">Taiwanese lumpia with 50 Years of Craftsmanship</p>
          <p class="content">
            傳承阿爸五十年手藝の台灣潤餅
            ，不改古法製程，同時首創潤餅創新經營型態，在走半個世紀後，「中華一餅」以全新風貌，帶給消費者最具有創意多元潤餅盒餐新選擇，並貼心提供外送服務，讓您享受既新穎又不失傳統的「台灣潤餅」。豐富具創意的餐點內容，廣受企業、團體、公家機關的青睞，讓中華一餅儼然成為團體餐盒的最佳首選品牌！
          </p>
          <q-btn class="toHistory" color="pink-7" :outline="outlineActive" @mouseover="toggleOutline2" @mouseout="toggleOutline2" to="/history">品牌故事</q-btn>
        </div>
      </div>
    </div>
    <!-- 傳承banner -->
    <div class="section3Banner">
      <img src="/index/section4Banner.png" alt="banner" class="gt-sm" />
      <img src="/index/section4BannerApp.png" alt="banner" class="lt-md" />
    </div>
    <!-- ig -->
    <showIgImag />
  </section>
  <lastSection />
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useUniversal } from '/stores/universal'
import { useAgreeCollectionStore } from '/stores/agreeCollection'
import { useDialogStore } from '/stores/useDialogStore'
const { onOnlineClick } = useDialogStore()
const agreeCollection = useAgreeCollectionStore()
const { onMessengerClick, onForm1Click, onForm2Click, onMessengerIg, dialNumber, onDownloadClick } = useUniversal()

gsap.registerPlugin(ScrollTrigger)

useHead({
  title: '中華一餅 | 手作輕食 潤餅盒餐外送第一品牌',
  meta: [
    // Description Meta Tag
    {
      name: 'description',
      content:
        '中華一餅傳承台灣潤餅美食並將其發展成企業愛戴的團體便當、團體餐盒。無論是午茶盒餐、潤餅便當、團體盒餐、點心餐盒等或是會議餐盒外送、便當外送，找中華一餅就對囉！'
    },
    // Open Graph
    {
      property: 'og:title',
      content: '中華一餅 | 手作輕食 潤餅盒餐外送第一品牌'
    },
    {
      property: 'og:description',
      content:
        '中華一餅傳承台灣潤餅美食並將其發展成企業愛戴的團體便當、團體餐盒。無論是午茶盒餐、潤餅便當、團體盒餐、點心餐盒等或是會議餐盒外送、便當外送，找中華一餅就對囉！'
    },
    {
      property: 'og:image',
      content: 'https://www.chinabing.net/ogImg.png' // 使用你的圖片路徑
    },
    {
      property: 'og:image:alt',
      content: '中華一餅圖片'
    },
    {
      property: 'og:url',
      content: 'https://www.chinabing.net/'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'author',
      content: 'bao'
    },

    { name: 'google-site-verification', content: '5j6K_dFtD3LNzCJ42rR_OSpfv1rmneTcTEXsdRASwU0' }
    // ...
  ]
})

interface Card {
  imgSrc: string
  tagSrc: string
  title: string
  description: string
  titleColor: string
  btnColor: string
  tagText?: string
  btnText: string
  href?: string
  disabled: boolean
  outline: boolean
}

const showFloatingDiv = ref(true)

const closeFloatingDiv = () => {
  showFloatingDiv.value = false
}

const bannerSlide = ref<number>(2)
const bannerAutoplay = ref<number>(5000)

const isMobile = ref<boolean>(false)

const router = useRouter()

const navigateTo = (route: string) => {
  router.push(route)
}

const onFabClick = () => {
  if (agreeCollection.hasAgreed) {
    router.push('/onlineOrder')
  } else {
    onOnlineClick()
  }
}

const toggleOutline = (card: Card) => {
  card.outline = !card.outline
}
const outlineActive = ref(true)

const toggleOutline2 = () => {
  outlineActive.value = !outlineActive.value
}

const section1Cards = ref<Card[]>([
  {
    imgSrc: '/delicious/dialog-2-pic-4.png',
    tagSrc: '/delicious/bingTag.png',
    title: '潤餅便當',
    description: '中華一餅高人氣潤餅便當，傳承五十年好手藝結合創新技術，以潤餅為主角結合台灣在地好食材，是富有飽足感的美味餐盒！',
    titleColor: 'pink-8',
    btnColor: 'pink-8',
    btnText: '查看潤餅便當菜單',
    href: '/chinaBing',
    disabled: false,
    outline: true
  },
  {
    imgSrc: '/delicious/dialog-2-pic-17.jpg',
    tagSrc: '/delicious/riceBoxTag.png',
    title: '米香油飯盒',
    description: '全新品牌〈喜客油飯〉，用台灣古早味麻油米香油飯為基底主角，同時使用台灣在地食材與精選主餐，製作出獨具特色的「米香油飯餐盒」。',
    titleColor: 'orange-7',
    btnColor: 'orange-7',
    btnText: '查看米香油飯盒菜單',
    href: '/cico',
    disabled: false,
    outline: true
  }
])

const section2Cards = ref<Card[]>([
  {
    imgSrc: '/delicious/dialog-2-pic-10-1.png',
    tagSrc: '/delicious/bingTag.png',
    title: '午茶盒餐',
    description: '午後的忙碌時刻，也要享受中華一餅獨具特色的午茶盒餐，調節繁忙的工作節奏。',
    titleColor: 'pink-8',
    btnColor: 'pink-8',
    btnText: '查看午茶盒餐菜單',
    href: '/chinaBing#box',
    disabled: false,
    outline: true
  },
  {
    imgSrc: '/delicious/dialog-2-pic-share.png',
    tagSrc: '/delicious/bingTag.png',
    title: '分享盒餐',
    description: '美味就是要跟大夥們一起分享，中華一餅分享餐，與同事好友們共享美味！',
    titleColor: 'pink-8',
    btnColor: 'pink-8',
    btnText: '查看午茶盒餐菜單',
    href: '/chinaBing#box',
    disabled: false,
    outline: true
  },
  {
    imgSrc: '/delicious/douhua.png',
    tagSrc: '/delicious/soyTag.png',
    title: '豆花甜湯',
    description: '甜品是讓人感覺到快樂與幸福，讓花豆囍事用最美好的味蕾感受，讓你天天都能Sweet ! Sweet !',
    titleColor: 'yellow-8',
    btnColor: 'yellow-8',
    btnText: '查看花豆囍事菜單',
    href: '/daohua',
    disabled: false,
    outline: true
  }
])

const section3Cards = ref<Card[]>([
  {
    imgSrc: '/delicious/dialog-2-pic-10-1.png',
    tagSrc: '/delicious/bingTag.png',
    title: '午茶盒餐',
    description: '3吋潤餅 + 蜂蜜芥末醬地瓜 + 主廚小點 + 紐澳良雞翅 + 湯飲品選擇 1',
    titleColor: 'pink-8',
    btnColor: 'pink-8',
    tagText: 'Top1',
    btnText: '立即預訂',
    // href: '/delicious',
    disabled: false,
    outline: true
  },
  {
    imgSrc: '/delicious/dialog-2-pic-17.jpg',
    tagSrc: '/delicious/bingTag.png',
    title: '香滷控肉油飯盒',
    description: '極品油飯 + 香滷控肉 + 古早味筍絲 + 家鄉酸菜 + 滷蛋 + 杏鮑菇 + 香滷豆干',
    titleColor: 'orange-7',
    btnColor: 'orange-7',
    tagText: 'Top2',
    btnText: '立即預訂',
    // href: '/delicious',
    disabled: false,
    outline: true
  },
  {
    imgSrc: '/delicious/dialog-2-pic-9.png',
    tagSrc: '/delicious/soyTag.png',
    title: '午茶盒餐-貴賓盒餐',
    description: '3吋潤餅 + 蜂蜜芥末醬地瓜 + 主廚小點 + 湯飲品選擇 1',
    titleColor: 'pink-8',
    btnColor: 'pink-8',
    tagText: 'Top3',
    btnText: '立即預訂',
    // href: '/budget',
    disabled: false,
    outline: true
  }
])

const imagesToPreload = ['/index/Banner01.png', '/index/Banner05.png', '/index/Banner03.png', '/index/Banner04.png']

onMounted(() => {
  imagesToPreload.forEach(image => {
    const img = new Image()
    img.src = image
    img.onload = () => {
      console.log(image + ' loaded')
    }
    img.onerror = () => {
      console.error('Error loading ' + image)
    }
  })

  AOS.init()
  // 定義螢幕寬度
  isMobile.value = window.innerWidth <= 992

  // 監聽螢幕寬度變化
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 992
  })

  gsap.registerPlugin(ScrollTrigger)

  // nextTick()
  // animateImage()
  // 監聽調整效果
})

// watch(slide, async () => {
//   await nextTick()
//   animateImage()
// })

// function animateImage() {
//   gsap.from('.incarouselImg', {
//     // opacity: 0,
//     duration: 1,
//     x: -100
//   })
// }
</script>

<style lang="scss" scoped>
@import '/assets/index.scss';
</style>
