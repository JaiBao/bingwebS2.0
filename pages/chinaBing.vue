<template>
  <div class="deliciousTitle">
    <!-- <img src="/delicious/chinaBingBanner.png" alt="banner" /> -->
    <img src="/delicious/chinabingBannerBG.png" alt="banner" class="imgBanner" />
    <img src="/delicious/cicoBannerImg.png" alt="banner" class="imgs pointer" @click="navigateTo('cico')" />
    <button class="imgsBtn pointer gt-sm" @click="navigateTo('cico')">查看菜單</button>
    <img src="/delicious/daohuaBannerImg.png" alt="banner" class="imgs2 pointer" @click="navigateTo('daohua')" />
    <button class="imgsBtn2 pointer gt-sm" @click="navigateTo('daohua')">查看菜單</button>
  </div>
  <!-- 餐點 -->
  <div class="productArea">
    <div class="menuArea">
      <q-tabs align="center" id="deliciousTabs" v-model="activeTab" mobile-arrows active-color="pink-6">
        <!-- <span>Menu</span>
        <span class="spanLine">｜</span> -->
        <!-- <div class="tabContent"> -->
        <q-tab name="bandong" @click="scrollTo('bandong')">
          <div class="row justify-center items-center">
            <img loading="lazy" class="deliciousTabImg" src="/delicious/2-pic-1.svg" />
            <p>潤餅便當</p>
          </div>
        </q-tab>

        <q-tab name="box" @click="scrollTo('box')">
          <div class="row justify-center items-center">
            <img loading="lazy" class="deliciousTabImg" src="/delicious/2-pic-2.svg" />
            <p>午茶盒餐</p>
          </div>
        </q-tab>
        <q-tab name="solo" @click="scrollTo('solo')">
          <div class="row justify-center items-center">
            <img loading="lazy" class="deliciousTabImg" src="/delicious/2-pic-3.svg" />
            <p>潤餅單點</p>
          </div>
        </q-tab>
      </q-tabs>
      <!-- <div class="backgroundPink"><p>中華一餅</p></div> -->
      <div class="bandongArea">
        <h3 id="bandong">潤餅便當</h3>
        <bandongCard />
      </div>

      <div class="boxArea">
        <h3 id="box">午茶盒餐</h3>
        <boxCard />
      </div>
      <div class="soloArea" name="solo">
        <h3 id="solo">潤餅單點 - 6吋潤餅 80元</h3>
        <soloCard />
      </div>
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
      content: 'https://www.chinabing.net/chinaBing'
    },
    {
      property: 'og:type',
      content: 'website'
    }
    // ...
  ]
})

const router = useRouter()

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

const toggleOutline = (card: Card) => {
  card.outline = !card.outline
}

const navigateTo = (route: string) => {
  router.push(route)
}

const activeTab = ref<string>('bandong')
let isScrolling = false

const scrollTo = async (id: string) => {
  // 在滾動之前先更改活動選項卡
  activeTab.value = id
  isScrolling = true
  // 平滑滾動到相應區域
  const element = document.getElementById(id)

  if (element) {
    // 檢查 element 是否為 null
    const navbarHeight = 140 // 頂部導航的高度
    const y = element.getBoundingClientRect().top + window.scrollY - navbarHeight
    window.scrollTo({ top: y, behavior: 'smooth' })
  } else {
    console.error(`Element with id ${id} not found`)
  }
}

onMounted(() => {
  let scrollTimeout: ReturnType<typeof setTimeout>

  const handleScroll = () => {
    if (!isScrolling) {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const anchorElements = ['#bandong', '#box', '#solo'].map(id => document.querySelector(id))
        for (let i = anchorElements.length - 1; i >= 0; i--) {
          const anchor = anchorElements[i]
          if (anchor) {
            // 檢查 anchor 是否為 null
            const rect = anchor.getBoundingClientRect()
            if (rect.top < window.innerHeight / 2) {
              if (activeTab.value !== anchor.id) {
                activeTab.value = anchor.id
              }
              break
            }
          }
        }
      }, 50)
    }
  }

  window.addEventListener('scroll', handleScroll)

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  // 在滾動完成後，將isScrolling標誌設置為false
  window.addEventListener('scroll', () => {
    if (isScrolling) {
      isScrolling = false
    }
  })
})
</script>

<style lang="scss" scoped>
@import 'assets/chinaBing.scss';
</style>
