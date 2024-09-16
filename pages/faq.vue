<template>
  <div class="newsContent">
    <q-tabs align="center" id="newsTabs" v-model="activeTab" active-color="pink-6" mobile-arrows>
      <span class="spanText">常見問題</span>
      <span class="spanLine">
        <div class="verticalLine"></div>
      </span>
      <div class="tabContent">
        <q-tab :ripple="false" name="buyQA" @click="scrollTo('buyQA')" :class="{ active: activeTab === 'buyQA' }">訂購問題</q-tab>
        <q-tab :ripple="{ color: 'white' }" name="payQA" @click="scrollTo('payQA')" :class="{ active: activeTab === 'payQA' }">付款問題</q-tab>
        <q-tab :ripple="{ color: 'white' }" name="storeQA" @click="scrollTo('storeQA')" :class="{ active: activeTab === 'storeQA' }">門市問題</q-tab>
        <q-tab :ripple="{ color: 'white' }" name="orderQA" @click="scrollTo('orderQA')" :class="{ active: activeTab === 'orderQA' }">點餐問題</q-tab>
      </div>
    </q-tabs>
    <!-- 訂購問題 -->
    <div v-for="(question, index) in questions" :key="index" class="QA" id="buyQA">
      <div class="newsTitle text-grey-7" :class="{ 'bg-orange': question.isCardVisible }">
        <div class="leftTitle">
          <img src="/news/QAicon.svg" alt="問號" />
          <h6>{{ question.title }}</h6>
        </div>
        <div class="rightTitle">
          <img src="/news/arrow.png" alt="問號" class="pointer" @click="toggleCardVisibility(index)" :class="{ 'is-visible': question.isCardVisible }" />
        </div>
      </div>
      <q-card v-if="question.isCardVisible" class="bg-orange newsCard">
        <q-card-section class="bg-white cardContent" v-html="question.content" @click="handleClick"></q-card-section>
      </q-card>
    </div>
    <!-- 付款問題 -->
    <div v-for="(question, index) in question2s" :key="index" class="QA" id="payQA">
      <div class="newsTitle text-grey-7" :class="{ 'bg-orange': question.isCardVisible }">
        <div class="leftTitle">
          <img src="/news/QAicon.svg" alt="問號" />
          <h6>{{ question.title }}</h6>
        </div>
        <div class="rightTitle">
          <img src="/news/arrow.png" alt="問號" class="pointer" @click="toggleCardVisibility2(index)" :class="{ 'is-visible': question.isCardVisible }" />
        </div>
      </div>
      <q-card v-if="question.isCardVisible" class="bg-orange newsCard">
        <q-card-section class="bg-white cardContent" v-html="question.content"></q-card-section>
      </q-card>
    </div>
    <!-- 門市問題 -->
    <div v-for="(question, index) in question3s" :key="index" class="QA" id="storeQA">
      <div class="newsTitle text-grey-7" :class="{ 'bg-orange': question.isCardVisible }">
        <div class="leftTitle">
          <img src="/news/QAicon.svg" alt="問號" />
          <h6>{{ question.title }}</h6>
        </div>
        <div class="rightTitle">
          <img src="/news/arrow.png" alt="問號" class="pointer" @click="toggleCardVisibility3(index)" :class="{ 'is-visible': question.isCardVisible }" />
        </div>
      </div>
      <q-card v-if="question.isCardVisible" class="bg-orange newsCard">
        <q-card-section class="bg-white cardContent" v-html="question.content"></q-card-section>
      </q-card>
    </div>
    <!-- 點餐問題 -->
    <div v-for="(question, index) in question4s" :key="index" class="QA" id="orderQA">
      <div class="newsTitle text-grey-7" :class="{ 'bg-orange': question.isCardVisible }">
        <div class="leftTitle">
          <img src="/news/QAicon.svg" alt="問號" />
          <h6>{{ question.title }}</h6>
        </div>
        <div class="rightTitle">
          <img src="/news/arrow.png" alt="問號" class="pointer" @click="toggleCardVisibility4(index)" :class="{ 'is-visible': question.isCardVisible }" />
        </div>
      </div>
      <q-card v-if="question.isCardVisible" class="bg-orange newsCard">
        <q-card-section class="bg-white cardContent" v-html="question.content"></q-card-section>
      </q-card>
    </div>
  </div>
  <lastSectionNone />
</template>

<script lang="ts" setup>
import { useAddressDialogStore } from '/stores/useAddressDialogStore'
const { onAddressClick } = useAddressDialogStore()

useHead({
  title: '中華一餅 | 常見問題',
  meta: [
    // Description Meta Tag
    {
      name: 'description',
      content:
        '訂購中華一餅常見到的問題，您在這裡都可以直接查詢！想了解更多中華一餅訂購方式、付款方式、發票問題、餐點問題以及是否提供素食等訂購問題，都能快速提供明確解答。'
    },
    // Open Graph
    {
      property: 'og:title',
      content: '中華一餅常見問題'
    },
    {
      property: 'og:description',
      content:
        '訂購中華一餅常見到的問題，您在這裡都可以直接查詢！想了解更多中華一餅訂購方式、付款方式、發票問題、餐點問題以及是否提供素食等訂購問題，都能快速提供明確解答。'
    },
    {
      property: 'og:image',
      content: '/favicon.ico' // 使用你的圖片路徑
    },
    {
      property: 'og:image:alt',
      content: '中華一餅圖片'
    },
    {
      property: 'og:url',
      content: 'https://www.chinabing.net/news'
    },
    {
      property: 'og:type',
      content: 'website'
    }
    // ...
  ]
})

interface Card {
  title: string
  content: string
  isCardVisible: boolean
}

const questions = ref<Card[]>([
  {
    title: '如何訂購？',
    content:
      ' 訂購前建議您先致電確認訂餐日期與外送時段，避免遇到當日時段訂單滿單狀況。<br /><br />訂購簡易步驟說明：<br />  1、預訂專線：(02)2301-5331 確認送餐時段 <br />2、下載訂購單：<a class="isLink text-blue pointer wrap" href="/menu.pdf" target="_blank">https://www.chinabing.net/menu.pdf <a/>，依範例填寫<br />3、傳真至(02)2301-3990<br /> 4、致電確認訂單<br /><br />預訂專線：(02)2301-5331<br />外送傳真：(02)2301-3990',
    isCardVisible: false
  },
  {
    title: '外送需要運費嗎？',
    content:
      '台北地區運費與免運金額一覽表請點擊 "<a class="fw-800 text-pink-8 pointer" >查看完整外送服務地區</a>" 查詢；其他地區請來電洽詢，謝謝您！<br /><br />預訂專線：(02)2301-5331',
    isCardVisible: false
  },
  {
    title: '外送需提前多久訂購？',
    content:
      '潤餅均現場手工製作，每日供應量有限，外送預訂請提前一週前預訂(不含六日)。<br />若為近期或當日的訂購，請您洽詢預訂專線確認，謝謝您！<br />預訂專線：(02)2301-5331',
    isCardVisible: false
  },
  {
    title: '週末假日有外送嗎？',
    content:
      '中華一餅的服務時間為週一至週五。若您計畫在假日進行外送，請留意我們需要有一定的訂購數量，同時確保門市有足夠的排班人員才能接單。感謝您的理解與合作！<br />預訂專線：(02)2301-5331<br />外送傳真：(02)2301-3990',
    isCardVisible: false
  },
  {
    title: '外送服務區域？',
    content:
      '我們提供大台北地區的外送服務。有關台北地區的運費與免運金額，請點擊 <a class="fw-800 text-pink-8 pointer" href="/group/address.jpg" target="_blank">查看完整外送服務地區</a> 進行查詢。<br />對於基隆、桃園、新竹或其他地區，如果滿足訂購金額，我們將視狀況進行接單作業，請洽詢訂餐服務人員以獲得更多信息。<br/><br/>預訂專線：(02)2301-5331',
    isCardVisible: false
  },
  {
    title: '菜單在哪查看？',
    content:
      '菜單可以在官網「美味餐點」分頁中查看，或直接點此連結>><a class="text-blue wrap" href="https://www.chinabing.net/delicious"> https://www.chinabing.net/delicious</a>',
    isCardVisible: false
  },
  {
    title: '可以追加或修改？',
    content:
      '訂單完成預訂，若有追加或修改請您務必撥打預訂專線由訂餐人員為您修改，確保訂餐人員能夠協助您進行必要的更改。謝謝您！<br />※若為當日送餐時段則無法進行追加或修改，謝謝您！<br />預訂專線：(02)2301-5331<br />外送傳真：(02)2301-3990',
    isCardVisible: false
  },
  {
    title: '可以在LINE訂餐嗎？',
    content:
      '非常抱歉，因為LINE上的訊息量大，為了確保不會遺失訂單訊息，請將訂購單內容填寫完整，然後回傳至門市。這可以確保門市獲得所有必要的訂單細節。<br />傳真後，再麻煩您致電門市確認訂單內容，才算訂單受理完成。謝謝您！<br/><br />預訂專線：(02)2301-5331<br />外送傳真：(02)2301-3990',
    isCardVisible: false
  },
  {
    title: '電話打不通怎麼辦？',
    content:
      '訂餐人員滿線時，還請您稍後再撥。建議您可以於週一至週五16：00後聯繫，造成您不便之處，請您見諒，感謝您的理解！<br/><br />預訂專線：(02)2301-5331<br />外送傳真：(02)2301-3990',
    isCardVisible: false
  },
  {
    title: '沒有傳真如何訂購？',
    content: '為了確保您的訂購不會漏單，建議您儘量使用傳真訂購方式。如果您不方便使用傳真，也可以直接聯繫我們的預訂專線，我們的服務人員將為您完成預訂。',
    isCardVisible: false
  }
])

const handleClick = (event: string) => {
  if (event.target.classList.contains('address-link')) {
    onAddressClick()
  }
}

// 在你的 HTML 字符串中，给链接添加一个特定的类
questions.value[1].content = questions.value[1].content.replace('查看完整外送服務地區', '<a class="fw-800 text-pink-8 pointer address-link">查看完整外送服務地區</a>')
const question2s = ref<Card[]>([
  {
    title: '如何付款？',
    content: ' 門市點餐或外送，付款方式以現金付款與匯款為主，謝謝您！',
    isCardVisible: false
  },
  {
    title: '匯款帳號？',
    content:
      '若您需要以匯款方式付款，提供給您中華一餅匯款銀行帳號資料，如下：<br /><br />銀行：第一銀行 分行：頭前分行<br />戶名：香臨食品股份有限公司北部分公司<br/>帳號：214-10-161913<br/><br/><span class="text-pink-8">※請您匯款時，在備註上提供訂單編號後六碼，以利會計核帳作業，謝謝您！</span><br/>會計查詢 (02)2278-2325#1803',
    isCardVisible: false
  },
  {
    title: '有開立發票嗎？',
    content: '感謝您選購中華一餅門市的產品，中華一餅發票開立為電子發票；若您為公司行號，您可提供統一編號給我們為您開立發票，謝謝您的合作！',
    isCardVisible: false
  }
])

const question3s = ref<Card[]>([
  {
    title: '門市營業時間？',
    content: '門市營業時間：<br/>週一至週五<br/>營業時間 09:00 – 18:00<br/>餐點供應 11:00 – 16:00<br/>(週六、日及例假日公休)',
    isCardVisible: false
  },
  {
    title: '門市位置在哪？',
    content:
      '門市位置<br />台北市大安區和平東路二段311巷43弄26號<br />鄰近科技大樓捷運站，步行約5分鐘<br />Google Map>> <a class="text-blue wrap" href="https://maps.app.goo.gl/2zfpubT4TPM1auBw7" target="_blank">https://maps.app.goo.gl/2zfpubT4TPM1auBw7',
    isCardVisible: false
  },
  {
    title: '可以內用嗎？',
    content:
      '中華一餅門市僅提供外帶或外送，無提供內用服務，謝謝您！<br/>中華一餅菜單>> <a class="text-blue wrap" href="https://www.chinabing.net/delicious">https://www.chinabing.net/delicious</a><br/><br/>外送預訂/洽詢專線：02 2301 5331',
    isCardVisible: false
  },
  {
    title: '可以外帶嗎？',
    content:
      '感謝您選擇中華一餅門市。我們提供外帶服務，特別建議訂購數量五個以下的餐點時使用外帶服務，以方便快捷取餐。歡迎您親臨門市點餐外帶，謝謝您的支持！<br /><br />中華一餅菜單>><a class="text-blue wrap" href="https://www.chinabing.net/delicious" >https://www.chinabing.net/delicious</a><br /><br />外送預訂/洽詢專線：02 2301 5331<br /><br />門市位置<br />台北市大安區和平東路二段311巷43弄26號<br />鄰近科技大樓捷運站，步行約5分鐘<br />Google Map>> <a class="text-blue wrap" href="https://maps.app.goo.gl/2zfpubT4TPM1auBw7" target="_blank">https://maps.app.goo.gl/2zfpubT4TPM1auBw7',
    isCardVisible: false
  }
])
const question4s = ref<Card[]>([
  {
    title: '餐點賞味時間？',
    content: '感謝您的訂購！為確保最佳的食物品質，我們建議您在收到餐點後的2小時內盡快享用，避免將食物放到隔夜。',
    isCardVisible: false
  },
  {
    title: '有素食嗎？',
    content: '對於素食選擇，您可以選擇我們的素食潤餅便當，其中搭配的潤餅口味為薯泥香素鬆，此口味為蛋奶素。如果您需要全素的餐點，請直接致電我們的預訂專線：(02)2301-5331',
    isCardVisible: false
  },
  {
    title: '潤餅有多少口味？',
    content:
      '我們提供六種口味的潤餅，包括薯泥香素鬆、千島香酥蝦、蜂蜜芥末雞、蒜味鄉村魚、凱薩烤培根和媽手老滷肉。如果您的訂購數量超過100盒，建議您選擇較少種口味，最好是單一種或兩種，以避免對備餐時間的影響。謝謝您的合作與理解！',
    isCardVisible: false
  },
  {
    title: '哪個口味好吃呢？',
    content:
      '我們的潤餅都是手工當天現做，加上獨家的配料，口味上都有一定的水準。<br />目前我們點購率最高的前三名口味是蜂蜜芥末雞、蒜味鄉村魚、凱薩烤培根，您也可以做參考，謝謝您！<br /><br />口味介紹請見菜單>> <a class="text-blue wrap" href="https://www.chinabing.net/delicious">https://www.chinabing.net/delicious</a>',
    isCardVisible: false
  },
  // {
  //   title: '蜂蜜芥末雞會很辣嗎？',
  //   content:
  //     '蜂蜜芥末雞口味為輕微香辣，是拌炒過程時加入辛香辣椒作為提味，整體口味上是不會讓人覺得是辣的口味。<br />但若您是一點點辣都無法入口，建議您改選其他口味，謝謝您！<br /><br />介紹請見菜單>> <a class="text-blue wrap" href="https://www.chinabing.net/delicious">https://www.chinabing.net/delicious</a>',
  //   isCardVisible: false
  // },
  {
    title: '可以選配料嗎？',
    content:
      '感謝您對我們潤餅的喜愛！為了保持潤餅的獨特特色和口感，我們目前不提供配料的調整服務，敬請諒解<br /><br />介紹請見菜單>> <a class="text-blue wrap" href="https://www.chinabing.net/delicious">https://www.chinabing.net/delicious</a>',
    isCardVisible: false
  },
  {
    title: '飲料可以調整冰塊與甜度嗎？',
    content: '我們提供的飲料為微涼到常溫，甜度為微甜。目前暫不提供調整甜度的服務。若您喜歡無糖的口味，我們也有無糖豆漿供您選擇。感謝您的理解',
    isCardVisible: false
  },
  {
    title: '使用的豬肉產地是哪裡？',
    content: '我們使用的豬肉，原產地皆為台灣，謝謝您！',
    isCardVisible: false
  },
  {
    title: '使用的雞蛋產地是哪裡？',
    content: '我們所使用到的雞蛋來源為皆為「台灣國產雞蛋」，並無使用來路不明的雞蛋來源，敬請您安心享用！',
    isCardVisible: false
  }
])
function toggleCardVisibility(index: number) {
  questions.value[index].isCardVisible = !questions.value[index].isCardVisible
}
function toggleCardVisibility2(index: number) {
  question2s.value[index].isCardVisible = !question2s.value[index].isCardVisible
}
function toggleCardVisibility3(index: number) {
  question3s.value[index].isCardVisible = !question3s.value[index].isCardVisible
}
function toggleCardVisibility4(index: number) {
  question4s.value[index].isCardVisible = !question4s.value[index].isCardVisible
}

const activeTab = ref<string>('buyQA')
let isScrolling = false
const $route = useRoute()

const adjustScroll = () => {
  const targetId = $route.hash.slice(1)
  if (targetId) {
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView()
      window.scrollBy(0, -170)
    }
  }
}
const getNavbarHeight = () => {
  const screenWidth = window.innerWidth
  if (screenWidth < 768) {
    return 120
  } else if (screenWidth >= 768 && screenWidth < 1024) {
    return 170
  } else {
    return 200
  }
}

const scrollTo = async (id: string) => {
  // 在滾動之前先更改活動選項卡
  activeTab.value = id
  isScrolling = true
  // 平滑滾動到相應區域
  const element = document.getElementById(id)
  const navbarHeight = getNavbarHeight()
  const y = element.getBoundingClientRect().top + window.scrollY - navbarHeight
  window.scrollTo({ top: y, behavior: 'smooth' })
}

onMounted(() => {
  let scrollTimeout: ReturnType<typeof setTimeout>

  const handleScroll = () => {
    if (!isScrolling) {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const anchorElements = ['#buyQA', '#payQA', '#storeQA', '#orderQA'].map(id => document.querySelector(id))
        for (let i = anchorElements.length - 1; i >= 0; i--) {
          const rect = anchorElements[i].getBoundingClientRect()
          if (rect.top < window.innerHeight / 3) {
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');
#newsTabs {
  background: white;
  position: sticky;
  top: 49px;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  .tabContent {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 0.9rem;
    font-weight: 800;
    background: transparent;
    p {
      margin: 0;
    }
  }
  .spanText {
    width: 20%;
    display: flex;
    margin: 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    white-space: nowrap;
    margin: 10px;
    // font-weight: bolder;
    @media (min-width: 768px) {
      width: 10%;
    }
  }

  .spanLine {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #bebebe;
    height: 100%;
    position: relative;
    margin: 0 5px;
    @media (min-width: 768px) {
      margin: 0 15px;
    }
    @media (min-width: 992px) {
      margin: 0 25px;
    }

    .verticalLine {
      width: 2px;
      height: 40%;
      background-color: #bebebe;
    }
  }
  @media (min-width: 1024px) {
    padding: 0% 10% 0% 0%;
  }
  @media (min-width: 1200px) {
    .spanText {
      font-size: 1.2rem;
    }
  }
  @media (min-width: 1500px) {
    padding: 0% 30% 0% 0%;
  }
  @media (min-width: 1700px) {
    .spanText {
      font-size: 1.5rem;
      width: 10%;
    }
  }
  @media (min-width: 568px) {
    .tabContent {
      font-size: 1.4rem;
    }
  }
  @media (min-width: 768px) {
    top: 89px;
    .tabContent {
      font-size: 1.5rem;
    }
  }
  @media (min-width: 1024px) {
    .tabContent {
      font-size: 1.1rem;
      p {
        margin: 0 0 0 10px;
      }
    }
  }
  @media (min-width: 1200px) {
    .tabContent {
      font-size: 1.3rem;
    }
  }
  @media (min-width: 1400px) {
    .tabContent {
      font-size: 1.6rem;
    }
  }
}

.newsContent {
  padding: 5% 5%;
  @media (min-width: 768px) {
    padding: 5% 10%;
  }
  @media (min-width: 1024px) {
    padding: 5% 16%;
  }
}
.newsTitle {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 999px;
  padding: 0 5%;
  border: 3px solid #ffefad;
  background: white;
  font-size: 1rem;

  .rightTitle img.is-visible {
    transform: rotate(-90deg);
    transition: transform 0.3s ease 0.1s;
  }

  /* 鼠标悬停时仅在 .is-visible 类不存在时应用旋转 */
  .rightTitle img:not(.is-visible):hover {
    transform: rotate(-90deg);
    transition: transform 0.3s ease 0.1s;
  }
  .leftTitle {
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      width: 44px;
      height: 48px;
    }
    h6 {
      font-size: 1rem;
      margin: 10px 0;
    }
  }
  .rightTitle {
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      object-fit: contain;
    }
  }
  @media (min-width: 768px) {
    .leftTitle {
      h6 {
        font-size: 1.5rem;
        margin: 30px 0;
      }
    }
  }
  @media (min-width: 1024px) {
    &:hover {
      background: #ffefad;

      .rightTitle {
        img {
          transform: rotate(-90deg);
          transition: transform 0.3s ease 0.1s;
          object-fit: contain;
        }
      }
    }
  }
}

.newsCard {
  padding: 0 3% 3% 3%;
  margin: 0 9%;
  border-radius: 0px 0px 20px 20px;
  .cardContent {
    font-size: 0.75rem;
  }
  @media (min-width: 768px) {
    margin: 0 5%;
    .cardContent {
      font-size: 1.3125rem;
    }
  }
  @media (min-width: 1700px) {
    margin: 0 4%;
  }
}

.QA {
  margin: 3% 0;
}
</style>
