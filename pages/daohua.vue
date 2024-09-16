<template>
  <div class="deliciousTitle">
    <!-- <img src="/delicious/cicoBannerApp.png" alt="banner" class="lt-md" /> -->

    <img src="/delicious/daohuaBannerBG.png" alt="banner" class="imgBanner" />
    <div class="imgs">
      <img src="/delicious/chinabingBannerImg.png" alt="banner" class="pointer" @click="navigateTo('chinaBing')" />
    </div>
    <button class="imgsBtn pointer gt-sm" @click="navigateTo('chinaBing')">查看菜單</button>

    <img src="/delicious/cicoBannerImg.png" alt="banner" class="imgs2 pointer" @click="navigateTo('cico')" />
    <button class="imgsBtn2 pointer gt-sm" @click="navigateTo('cico')">查看菜單</button>
  </div>
  <!-- 餐點 -->
  <div class="productArea">
    <div class="menuArea">
      <div class="bandongArea">
        <h3 id="riceBox">花豆囍事</h3>
        <daohuaCard />
      </div>
      <!-- <div class="guabaoArea">
          <h3 id="guabao">刈包便當</h3>
          <guabaoBandongCard />
          <h3>刈包盒餐</h3>
          <guabaoLunchboxCard />
        </div> -->
      <!-- <div class="budetCard1Area">
        <h3 id="budetCard1">預算100元內</h3>
        <budgetCard1 />
      </div>
      <div class="budetCard2Area">
        <h3 id="budetCard2">預算125-220元</h3>
        <budgetCard2 />
      </div> -->
    </div>

    <!-- 可能喜歡 -->

    <div class="section1">
      <p class="sectionTitle">你可能會喜歡的中華美食！</p>
      <div class="section1Cards">
        <q-card class="section1Card" v-for="card in section1Cards" :key="card.imgSrc">
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

    <!-- 訂單說明 -->
    <div class="orderDescription">
      <orderType />
    </div>
  </div>
  <lastSection />
</template>

<script lang="ts" setup>
useHead({
  title: '中華一餅 | 美味菜單',
  meta: [
    // Description Meta Tag
    {
      name: 'description',
      content: '全台最好吃的潤餅，美味潤餅便當、招牌潤餅便當、素食潤餅便當、雙主餐便當，會議下午茶會議盒餐、貴賓盒餐、首席盒餐，中華一餅是您需要的會議餐盒外帶外送推薦。'
    },
    // Open Graph
    {
      property: 'og:title',
      content: '中華一餅美味菜單'
    },
    {
      property: 'og:description',
      content: '全台最好吃的潤餅，美味潤餅便當、招牌潤餅便當、素食潤餅便當、雙主餐便當，會議下午茶會議盒餐、貴賓盒餐、首席盒餐，中華一餅是您需要的會議餐盒外帶外送推薦。'
    },
    {
      property: 'og:image',
      // content: '/index/0-pic-1.png' // 使用你的圖片路徑
      content: '/favicon.ico' // 使用你的圖片路徑
    },
    {
      property: 'og:image:alt',
      content: '中華一餅圖片'
    },
    {
      property: 'og:url',
      content: 'https://www.chinabing.net/cico'
    },
    {
      property: 'og:type',
      content: 'website'
    }
    // ...
  ]
})

const router = useRouter()
const navigateTo = (route: string) => {
  router.push(route)
}
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

const toggleOutline = (card: Card) => {
  card.outline = !card.outline
}
</script>

<style lang="scss" scoped>
@import 'assets/daohua.scss';
</style>
