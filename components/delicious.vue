<template>
  <div class="deliciousTitle">
    <h1>Delicious box meal</h1>
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
        <q-tab name="riceBox" @click="scrollTo('riceBox')">
          <div class="row justify-center items-center">
            <img loading="lazy" class="deliciousTabImg" src="/delicious/2-pic-4.svg" />
            <p>喜客油飯</p>
          </div>
        </q-tab>
        <!-- <q-tab name="guabao" @click="scrollTo('guabao')">
            <div class="row justify-center items-center">
              <img loading="lazy" class="deliciousTabImg" src="/delicious/2-icon-5.svg" />
              <p>太ONE刈包</p>
            </div>
          </q-tab> -->
        <!-- <q-tab name="budetCard1" @click="scrollTo('budetCard1')">
          <div class="row justify-center items-center">
            <img loading="lazy" class="deliciousTabImg" src="/delicious/2-pic-3-1.svg" />
            <p>預算100元內</p>
          </div>
        </q-tab>
        <q-tab name="budetCard2" @click="scrollTo('budetCard2')">
          <div class="row justify-center items-center">
            <img loading="lazy" class="deliciousTabImg" src="/delicious/2-pic-3-2.svg" />
            <p>預算125-220元</p>
          </div>
        </q-tab> -->
        <!-- </div> -->
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
      <div class="bandongArea">
        <h3 id="riceBox">喜客油飯</h3>
        <riceBoxCard />
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
  </div>

  <!-- 訂單說明 -->
  <div class="orderDescription">
    <orderType />
  </div>
  <lastSectionGrey />
</template>

<script setup>
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
      content: 'https://www.chinabing.net/delicious'
    },
    {
      property: 'og:type',
      content: 'website'
    }
    // ...
  ]
})

const activeTab = ref('bandong')
let isScrolling = false

const scrollTo = async id => {
  // 在滾動之前先更改活動選項卡
  activeTab.value = id
  isScrolling = true
  // 平滑滾動到相應區域
  const element = document.getElementById(id)
  const navbarHeight = 140 // 頂部導航的高度
  const y = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight
  window.scrollTo({ top: y, behavior: 'smooth' })
}

onMounted(() => {
  let scrollTimeout

  const handleScroll = () => {
    if (!isScrolling) {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const anchorElements = ['#bandong', '#box', '#solo', '#riceBox'].map(id => document.querySelector(id))
        for (let i = anchorElements.length - 1; i >= 0; i--) {
          const rect = anchorElements[i].getBoundingClientRect()
          if (rect.top < window.innerHeight / 2) {
            if (activeTab.value !== anchorElements[i].id) {
              activeTab.value = anchorElements[i].id
            }
            break
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
.orderDescription {
  background: #f5f5f5;

  padding: 5%;
}
.deliciousTitle {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ffefad;
  color: #f50077;
  h1 {
    font-size: 1.5rem;
    font-weight: bolder;
    margin: 0;
  }
  @media (min-width: 568px) {
    h1 {
      font-size: 1.7rem;
    }
  }
  @media (min-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  }
  @media (min-width: 1024px) {
    justify-content: flex-start;
    h1 {
      margin-left: 10%;
      font-size: 2.375rem;
    }
  }
}
.menuArea {
  // background-color: #FFFAF3;
  padding: 1% 1%;
  span {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5rem;
    // font-weight: bolder;
  }
  .spanLine {
    color: grey;
  }
  @media (min-width: 1024px) {
    padding: 1% 10%;
  }
}
#deliciousTabs {
  background-color: #fffaf3;
  position: sticky;
  top: 49px;
  z-index: 1000;
  // border-bottom: 1px solid grey;
  font-size: 0.875rem;
  margin-bottom: 5%;

  .deliciousTabImg {
    width: 20px;
    margin-right: 3%;
    object-fit: contain;
  }
  p {
    margin: 0;
  }

  @media (min-width: 568px) {
    font-size: 1.4rem;
  }
  @media (min-width: 768px) {
    .deliciousTabImg {
      width: 36px;
    }
    top: 89px;

    font-size: 1.3125rem;
  }
}
.productArea {
  background: #fffaf3 url('/delicious/ten.png') repeat center / contain;
}

.bandongArea,
.boxArea,
.soloArea,
.guabaoArea,
.budetCard1Area,
.budetCard2Area {
  // margin: 10% 5%;
  h3 {
    font-size: 1.75rem;
    font-weight: 400;
    line-height: 160%; /* 38.4px */
    font-family: 'Noto Sans TC', sans-serif;
    margin-bottom: 0;
  }
  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    h3 {
      font-size: 1.3125rem;
      font-weight: 700;
      line-height: 160%; /* 38.4px */
    }
  }
}

// .backgroundPink {
//   background: #f50077;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
//   align-items: center;
// }
.page {
  background: #f5f5f5;
}
</style>
