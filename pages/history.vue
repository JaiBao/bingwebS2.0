<template>
  <!-- 食安把關 -->

  <div class="one">
    <h5>食安把關 成立央廚、遵循標準作業流程</h5>
    <p>
      中華一餅為了維持產品的品質，成立了專屬的中央廚房，每一樣食材都是經過精挑細選與層層把關，確保原物料的穩定性，以及嚴謹控管原物料的來源。同時，嚴格要求每位夥伴遵照標準作業流程製作每一項餐點，確保大量潤餅餐盒、潤餅便當生產口味的一致性與餐點的美味。
    </p>
  </div>
  <div class="two">
    <h5>食安堅持 不添加吊白塊</h5>
    <p>中華一餅手工製作每一張潤餅皮，堅持絕不添加危害身體的「吊白塊」，這是中華一餅給您食在安心的最好承諾，也是給您最安心的美味潤餅！</p>
  </div>
  <div class="historyTimeline">
    <!-- Timeline -->
    <div class="timeTitle">
      <!-- <hr /> -->
      <!-- <h1>品牌故事｜里程碑</h1> -->
      <!-- 時間軸 -->
      <div class="isTime">
        <q-timeline layout="comfortable" side="right" class="mainTimeLine">
          <q-timeline-entry heading><h1>品牌故事｜里程碑</h1></q-timeline-entry>

          <q-timeline-entry v-for="(chronicle, index) in chronicles" :key="index" side="left" :icon="chronicle.icon" color="black" class="chronicleTimeline">
            <div v-for="(text, index) in chronicle.texts" :key="index" class="avatarContent">
              <q-avatar v-if="text.image" class="bounce-in">
                <img loading="lazy" :src="text.image" />
              </q-avatar>

              <h5 class="avatarH4">{{ chronicle.year }}</h5>
              <h5 class="avatarH5">{{ text.text }}</h5>
            </div>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </div>
    <div class="video">
      <div class="videoWrapper">
        <video controls muted>
          <source src="/history/fontMovie.mp4" type="video/mp4" class="iframe" />
        </video>
      </div>
    </div>
  </div>
  <lastSectionGrey />
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

useHead({
  title: '中華一餅 | 年賣出潤餅高度可疊500座101大樓',
  meta: [
    // Description Meta Tag
    {
      name: 'description',
      content:
        '早期攤車起家的台灣潤餅，實在好呷是客人的讚美聲，一路走來中華一餅堅持只做台灣最好吃的潤餅。現今獨創的潤餅餐盒、潤餅便當，更曾創下單日突破2000套，突破新的里程碑。'
    },
    // Open Graph
    {
      property: 'og:title',
      content: '中華一餅年賣出潤餅高度可疊500座101大樓'
    },
    {
      property: 'og:description',
      content:
        '早期攤車起家的台灣潤餅，實在好呷是客人的讚美聲，一路走來中華一餅堅持只做台灣最好吃的潤餅。現今獨創的潤餅餐盒、潤餅便當，更曾創下單日突破2000套，突破新的里程碑。'
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
      content: 'https://www.chinabing.net/history'
    },
    {
      property: 'og:type',
      content: 'website'
    }
    // ...
  ]
})
interface ChronicleEvent {
  icon: string
  year?: string
  texts: Array<{
    text: string
    image: string
  }>
}
const chronicles = ref<ChronicleEvent[]>([
  {
    icon: 'circle',
    year: '起家 1987',

    texts: [
      {
        text: '起緣於民國76年台北縣土城地區，「實在好呷」是在阿爸的潤餅攤前最常聽到的聲音..在記憶中，我們在爸媽務實的打拼精神中成長，他們在賴以維生的“潤餅攤”裡領悟出這不被時代淘汰的傳統美食。在接下阿爸的棒子，清楚知道真正好吃的潤餅關鍵在於〜「餅皮」!',
        image: '/history/1-pic-1.png'
      }
    ]
  },
  {
    icon: 'circle',
    year: '起厝 2003',
    texts: [
      {
        text: '在擺潤餅攤的時代，吃過的顧客都會上癮，更不乏遠地而來的饕客，這令我們興起企業化經營的念頭，進駐店鋪是我們的第一步！2003年,“潤品屋”正式成立！新風貌予消費大眾最道地且更多元的潤餅選擇，並提供外送到府服務。十年來，我們每年創造千萬以上營業額，秉持做得最好的堅持與發揚中華美食的理念於我們決定～大躍進！',
        image: '/history/1-pic-2.png'
      }
      // {
      //   text: '我們精益求精，研發各式餅皮並將各式捲餅統稱為“華餅”，以創新、天然、營養為主軸。不僅廣受企業、團體等上班族的喜愛，成為團體餐盒外送的的首選品牌。不侷限餐點理念，更發展出各式多元創意餐點，讓中華一餅餐點推進更多元的新食代！',
      //   image: '/history/1-pic-3.png'
      // }
    ]
  },
  {
    icon: 'circle',
    year: '起大樓 2008',
    texts: [
      {
        text: '2008年我們設立食品公司，打造高規格食品衛生等級之中央廚房，同時招募海內外菁英成立連鎖總部，並將“潤品屋”正式更名為“中華一餅”，以全新名號，嶄新商標呈現於台灣餐飲市場！',
        image: '/history/1-pic-3.png'
      }
    ]
  },
  {
    icon: 'circle',
    // year: '起厝 2003',
    texts: [
      {
        text: '我們精益求精，研發各式餅皮並將各式捲餅統稱為“華餅”，以創新、天然、營養為主軸。不僅廣受企業、團體等上班族的喜愛，成為團體餐盒外送的的首選品牌。不侷限餐點理念，更發展出各式多元創意餐點，讓中華一餅餐點推進更多元的新食代！',
        image: '/history/1-pic-4.png'
      }
    ]
  },
  {
    icon: 'circle',
    year: '創大單 2020',
    texts: [
      {
        text: '2020年中華一餅服務量能大躍進，單日顧客委任企業家庭日活動，潤餅盒餐完成2,000套的訂單。中華一餅不僅完成顧客重要委託，也再次證明團隊合作的最大產能也讓中華一餅邁向新的里程碑！',
        image: '/history/1-pic-5.png'
      }
    ]
  }
])

onMounted(async () => {
  await nextTick()
  gsap.registerPlugin(ScrollTrigger)

  gsap.utils.toArray<HTMLElement>('.bounce-in').forEach(el => {
    gsap.from(el, {
      scale: 0,
      x: '-100%',
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
      scrollTrigger: {
        trigger: el,
        start: '0% 70%', // 當元素的底部進入視窗底部時開始
        toggleActions: 'play complete none none',
        markers: false,
        once: true
      }
    })
  })
})
onUnmounted(() => {
  // 清除所有與該組件相關的ScrollTriggers
  ScrollTrigger.getAll().forEach(st => {
    if (gsap.utils.toArray('.bounce-in').includes(st.trigger)) {
      st.kill()
    }
  })
})
</script>

<style lang="scss" scoped>
.one {
  /* 中華一餅/web/小標/noto 24px */
  // font-family: 'Noto Sans';
  h5 {
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;

    line-height: normal;
    color: #f50077;
    margin-bottom: 28px;
  }
  p {
    color: #000;
    /* 中華一餅/web/小標/noto 18px */

    font-size: 0.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  padding: 0 4%;
  margin-bottom: 28px;
  @media (min-width: 992px) {
    padding: 0 16%;
    p {
      font-size: 1.1rem;
    }
  }
}
.two {
  /* 中華一餅/web/小標/noto 24px */
  // font-family: 'Noto Sans';
  h5 {
    color: #000;
    /* 中華一餅/web/小標/noto 21px */

    font-size: 1.1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0;
  }
  p {
    color: #000;
    /* 中華一餅/web/小標/noto 18px */

    font-size: 0.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  padding: 0 4%;
  margin-bottom: 48px;
  @media (min-width: 992px) {
    padding: 0 16%;
    h5 {
      font-size: 1.4rem;
    }
    p {
      font-size: 1.1rem;
    }
  }
}
.historyTimeline {
  background: #f5f5f5;
}
.timeTitle {
  h1 {
    // padding-left: 4%;
    font-size: 1.5rem;
    color: #f50077;

    // font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 3%;
  }
  @media (min-width: 992px) {
    h1 {
      margin-bottom: 3%;
    }
  }
}
.chronicleTimeline {
  li {
    margin: 20px;
  }
  img {
    // margin-top:20px ;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    z-index: 1;
    // border: 12px solid #e60012;
  }
  @media (min-width: 768px) {
    img {
      width: 100%;
      // height: 200px;
    }
  }
  @media (min-width: 996px) {
    img {
      width: 90%;
      // height: 400px;
    }
  }
}
.chronicleHr {
  background: #f50077;
  height: 1px;
  width: 100%;
  display: inline-block;
  margin: 0;
  @media (min-width: 568px) {
    width: 100%;
  }
  @media (min-width: 768px) {
    width: 100%;
  }
  @media (min-width: 1024px) {
    width: 90%;
  }
}

.q-avatar {
  position: relative;
  vertical-align: middle;
  display: inline-block;
  border-radius: 50%;
  font-size: 5rem;
  height: 1em;
  width: 1em;
  @media (min-width: 568px) {
    font-size: 6rem;
  }
  @media (min-width: 768px) {
    font-size: 7rem;
  }
  @media (min-width: 992px) {
    font-size: 7rem;
  }
  @media (min-width: 1200px) {
    font-size: 9rem;
  }
  @media (min-width: 1700px) {
    font-size: 11em;
  }
}
.avatarP {
  color: grey;
  font-size: 0.8rem;
  margin: 0;
  @media (min-width: 768px) {
    font-size: 1.3rem;
  }
}

.avatarH5 {
  margin: 0 0 1% 0;
  font-weight: 600;
  line-height: 1.3rem;
  font-size: 0.8rem;
  @media (min-width: 768px) {
    line-height: 2rem;
    font-size: 1.1rem;
  }
}
.avatarH4 {
  margin: 0 0 5% 0;
  font-weight: 600;
  color: #f50077;
  line-height: 1.3rem;
  font-size: 1.1rem;
  @media (min-width: 768px) {
    line-height: 2rem;
    font-size: 1.5rem;
  }
}

.mainTimeLine {
  @media (min-width: 555px) {
    margin-left: 7%;
  }
  @media (min-width: 768px) {
    margin-left: 7%;
  }
  @media (min-width: 992px) {
    margin-left: 15%;
  }
  // margin-left: 20%;
}

.isTime {
  padding: 5% 1% 0% 1%;
  width: 100%;
  background: #f5f5f5;
}

.bounce-in {
  position: absolute;
  top: -10px;
  left: -36%;
  img {
    width: 100%;
  }
  @media (min-width: 555px) {
    top: -13px;
    left: -29%;
    img {
      width: 100%;
    }
  }
  @media (min-width: 768px) {
    top: -30px;
    left: -23%;
    img {
      width: 100%;
    }
  }
  @media (min-width: 992px) {
    top: -30px;
    left: -22%;
    img {
      width: 100%;
    }
  }
  @media (min-width: 1200px) {
    top: -40px;
    left: -23%;
    img {
      width: 100%;
    }
  }
  @media (min-width: 1500px) {
    top: -40px;
    left: -21%;
    img {
      width: 100%;
    }
  }
  @media (min-width: 1700px) {
    top: -40px;
    left: -20%;
    img {
      width: 100%;
    }
  }
  @media (min-width: 2100px) {
    top: -40px;
    left: -19%;
    img {
      width: 100%;
    }
  }
}
//影片
.video {
  position: relative;
  width: 80%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio (9 / 16 * 100) */
  overflow: hidden;
  margin: 4% auto;
  margin-bottom: 0;
  margin-top: 0;
  @media (min-width: 1024px) {
    padding-bottom: 58%;
  }
}

.videoWrapper {
  position: absolute;
  top: 0;
  left: 0;
  border: 2px solid #000; /* 將邊框添加到 videoWrapper */
  background-color: #000;

  @media (min-width: 1024px) {
    position: absolute;
    width: 100%;
    top: 50%; /* 垂直居中 */
    left: 50%; /* 水平居中 */
    transform: translate(-50%, -50%); /* 向上和向左移動自身寬度和高度的一半 */
  }
}

.videoWrapper video {
  width: 100%;
  height: 100%;
}

.avatarContent {
  position: relative;
  padding-bottom: 3%;
  padding-right: 10%;
}

//卡片
.jobCard01 {
  display: flex;
  flex-direction: column;
  width: 70vw;
  margin: 5vw 15vw;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
  .jobText {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    // text-align: center;
    font-size: 15px;
    padding: 5%;
    h5 {
      color: #f50077;
      font-weight: 1000;
      font-size: 1.2rem;
    }
    p {
      font-size: 1rem;
      font-weight: 600;
    }
  }

  @media (min-width: 768px) {
    .jobText {
      h5 {
        font-size: 2.3rem;
      }
      p {
        font-size: 1.5rem;
      }
    }
  }
  @media (min-width: 992px) {
    .jobText {
      h5 {
        font-size: 2.3rem;
      }
      p {
        font-size: 1.5rem;
      }
    }
  }
  @media (min-width: 1024px) {
    flex-direction: row;

    .jobText {
      padding: 0 5%;
      h5 {
        font-size: 1.3rem;
        margin: 3% 0;
      }
      p {
        font-size: 1rem;
      }
    }
  }
  @media (min-width: 1200px) {
    .jobText {
      h5 {
        font-size: 1.6rem;
      }
      p {
        font-size: 1.1rem;
      }
    }
  }
  @media (min-width: 1400px) {
    .jobText {
      h5 {
        font-size: 1.8rem;
      }
      p {
        font-size: 1.3rem;
      }
    }
  }
  @media (min-width: 1500px) {
    .jobText {
      h5 {
        font-size: 2rem;
      }
      p {
        font-size: 1.5rem;
      }
    }
  }
  @media (min-width: 1700px) {
    width: 70vw;
    margin: 5vw 15vw;
    .jobText {
      font-size: 1.5rem;
    }
  }
}

//圖片區
#photoNews {
  // max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // width: 80vw;
  margin: 0 10%;
  h5 {
    color: #f50077;
    font-weight: 800;
  }
  @media (min-width: 768px) {
    h5 {
      font-size: 2.5rem;
    }
  }
  @media (min-width: 1200px) {
    margin: 0 5%;
    h5 {
      font-size: 2rem;
    }
  }
}

//圖片區卡片
.image-card {
  position: relative;
  overflow: hidden;
  margin: 1% 5px;
  width: 99%;
  @media (min-width: 992px) {
    width: 48%;
  }
  @media (min-width: 1200px) {
    width: 24%;
  }
}

//圖片區卡片內容
.image-content {
  position: relative;
}

.image-content img {
  width: 100%;
  height: 100%;
  display: block; /* 去掉下方的空白 */
  transition: transform 0.3s; /* 添加過渡效果 */
}

.image-card:hover .image-content img {
  transform: scale(1.1); /* 滑鼠觸碰圖片放大效果 */
}

//圖片區卡片文字
.image-title {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 96%;
  left: 50%;
  width: 100%;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  padding: 5px;
  z-index: 1;
  transition: opacity 0.3s; /* 添加過渡效果 */
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
  @media (min-width: 992px) {
    opacity: 0; /* 默認文字不顯示 */
  }
  @media (min-width: 1024px) {
    font-size: 1.2rem;
    top: 94%;
  }
  @media (min-width: 1200px) {
    font-size: 1rem;
    top: 93%;
  }
  @media (min-width: 1700px) {
    font-size: 1.2rem;
    top: 93%;
  }
  @media (min-width: 2100px) {
    font-size: 1.2rem;
    top: 94%;
  }
}

.image-card:hover .image-title {
  opacity: 1; /* 懸停時文字顯示 */
}
// .ig {
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
// }
</style>
