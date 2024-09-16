<template>
  <div class="budgetTitle">
    <h1>Select by budget</h1>
  </div>
  <div class="budgetArea">
    <!-- 100元 -->
    <div class="select1Title" id="select1">
      <div class="selectTitle"><h4>預算100元內</h4></div>
      <div class="selectCard">
        <budgetCard1 />
      </div>
    </div>
    <!-- 125元以上 -->
    <div class="select2Title" id="select2">
      <div class="selectTitle"><h4>預算125-220元</h4></div>
      <div class="selectCard">
        <budgetCard2 />
      </div>
    </div>
  </div>
  <!-- 客製化標題 -->
  <div class="budgetTitle2" id="select3">
    <h1 class="gt-xs">Flexible Customized Meal Box</h1>
    <h1 class="xs">
      Flexible Customized
      <br />
      Meal Box
    </h1>

    <!-- <h3>靈活客製餐盒</h3> -->
  </div>
  <!-- 內容區 -->
  <div class="customArea">
    <q-card class="customCard">
      <div class="customCardContent">
        <h4>您的需求，我們全新傾聽。</h4>
        <h5>期待與您深入討論，專屬調整每一餐。</h5>
        <h5>價格依輕食選擇，確保符合您的預算。</h5>
        <q-btn class="gt-xs" @click="dialNumber">立即通話</q-btn>
        <h6 style="margin-top: 3%">注意事項</h6>
        <h6>
          <span># 最低起定量 20 份</span>
          <span># 五天前預訂</span>
          <span># 餐盒售價依選擇輕食</span>
        </h6>
        <div class="mealBtn lt-sm">
          <q-btn @click="dialNumber">立即通話</q-btn>
        </div>
      </div>
    </q-card>
    <img loading="lazy" src="/budget/3-pic-12.png" class="lunchBox" />
    <img loading="lazy" src="/budget/3-pic-13.png" class="food1" />
    <img loading="lazy" src="/budget/3-pic-14.png" class="food2" />
    <img loading="lazy" src="/budget/3-pic-17.png" class="food3" />
    <img loading="lazy" src="/budget/3-pic-15.png" class="food4" />
    <img loading="lazy" src="/budget/3-pic-16.png" class="food5" />
  </div>

  <!-- 訂購區 -->
  <div class="orderDescription">
    <orderType />
  </div>
  <lastSectionGrey />
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useUniversal } from '~/stores/universal'

const { dialNumber } = useUniversal()

useHead({
  title: '中華一餅 | 預算選擇',
  meta: [
    // Description Meta Tag
    {
      name: 'description',
      content: '台北80元起團體餐盒、台北100元起團體便當、大安區便當外送，讓您以不同預算享受著著高級會議便當，同時提供客製化預算服務，讓您不用為了便當大小事傷腦筋。'
    },
    // Open Graph
    {
      property: 'og:title',
      content: '中華一餅預算選擇'
    },
    {
      property: 'og:description',
      content: '台北80元起團體餐盒、台北100元起團體便當、大安區便當外送，讓您以不同預算享受著著高級會議便當，同時提供客製化預算服務，讓您不用為了便當大小事傷腦筋。'
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
      content: 'https://www.chinabing.net/budget'
    },
    {
      property: 'og:type',
      content: 'website'
    }
    // ...
  ]
})

let tl

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // 設置初始的動畫狀態
  gsap.set(['.food1', '.food2', '.food3', '.food4', '.food5'], { autoAlpha: 0, scale: 0, x: '50%', y: '-50%' })

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.customCard',
      start: 'center bottom',
      onEnter: () => tl.play()
    }
  })

  // 使用Back.easeInOut效果曲線，使食物像從盒子中彈出一樣
  // 同時播放的動畫效果
  tl.to('.food1', { autoAlpha: 1, scale: 1.2, x: '-170%', y: '-90%', duration: 1, opacity: 1, ease: 'Elastic.easeInOut', yoyo: true })
    .to('.food2', { autoAlpha: 1, scale: 1.2, x: '120%', y: '-110%', duration: 1, opacity: 1, ease: 'Elastic.easeInOut', yoyo: true }, '<')
    .to('.food3', { autoAlpha: 1, scale: 1.2, x: '-110%', y: '275%', duration: 1, opacity: 1, ease: 'Elastic.easeInOut', yoyo: true }, '<')
    .to('.food4', { autoAlpha: 1, scale: 1.2, x: '160%', y: '235%', duration: 1, opacity: 1, ease: 'Elastic.easeInOut', yoyo: true }, '<')
    .to('.food5', { autoAlpha: 1, scale: 1.2, x: '40%', y: '250%', duration: 1, opacity: 1, ease: 'Elastic.easeInOut', yoyo: true }, '<')

  // 在動畫結束後，啟動漂浮動畫
  tl.call(startFloating)
})

onUnmounted(() => {
  if (tl) {
    tl.kill()
  }

  gsap.killTweensOf('.food1')
  gsap.killTweensOf('.food2')
  gsap.killTweensOf('.food3')
  gsap.killTweensOf('.food4')
  gsap.killTweensOf('.food5')
})

function startFloating() {
  gsap.to('.food1', { y: '+=10%', yoyo: true, repeat: -1, duration: 1.4, ease: 'power1.easeIn', yoyo: true })
  gsap.to('.food2', { y: '-=10%', yoyo: true, repeat: -1, duration: 1.2, ease: 'power1.easeIn', yoyo: true })
  gsap.to('.food3', { y: '-=10%', yoyo: true, repeat: -1, duration: 1.3, ease: 'power1.easeIn', yoyo: true })
  gsap.to('.food4', { y: '+=10%', yoyo: true, repeat: -1, duration: 1.2, ease: 'power1.easeIn', yoyo: true })
  gsap.to('.food5', { y: '+=10%', yoyo: true, repeat: -1, duration: 1.9, ease: 'power1.easeIn', yoyo: true })
}
</script>

<style lang="scss" scoped>
.orderDescription {
  background: #f5f5f5;

  padding: 5%;
}
.budgetTitle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffefad;
  color: #f50077;
  padding: 0% 0;
  h1 {
    font-size: 2rem;
    font-weight: bolder;

    line-height: 6rem;
    // margin: 0 0 0 21%;
  }

  @media (min-width: 568px) {
    h1 {
      font-size: 2.5rem;
    }
  }
  @media (min-width: 768px) {
    h1 {
      font-size: 3rem;
    }
  }
  @media (min-width: 992px) {
    align-items: flex-start;
    h1 {
      font-size: 2.375rem;
      margin: 0 0 0 10%;
    }
    h3 {
      margin: 0 0 0 21%;
    }
  }
}

.budgetTitle2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffefad;
  color: #f50077;
  padding: 0% 0;
  h1 {
    font-size: 2em;
    font-weight: bolder;
    text-align: center;

    line-height: 2rem;
    margin: 21.44px 0;
  }
  h3 {
    font-size: 2rem;
    margin: 0 0 0 0;
  }
  @media (min-width: 576px) {
    h1 {
      font-size: 2.5rem;
      line-height: 6rem;
    }
    h3 {
      font-size: 3rem;
    }
  }
  @media (min-width: 768px) {
    h1 {
      font-size: 3rem;
      margin: 32.16px 0;
      line-height: 6rem;
    }
  }
  @media (min-width: 992px) {
    align-items: flex-start;
    h1 {
      font-size: 2.375rem;
      margin: 0 0 0 10%;
    }
    h3 {
      font-size: 3rem;
      margin: 0 0 0 21%;
    }
  }
}
.budgetArea {
  background-color: #f5f5f5;
  padding: 1% 2%;
  @media (min-width: 1024px) {
    padding: 1% 10%;
  }
}
.select1Title,
.select2Title {
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  // margin: 3% 0 2% 0;
  .selectTitle {
    background: url('/budget/3-pic-11.png') no-repeat center center / contain;
    padding: 2% 3%;
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  h4 {
    color: #f50077;
    font-weight: 600;
    color: #ebe9ea;
    font-size: 1.3rem;
  }
  @media (min-width: 992px) {
    .selectTitle {
      width: 29%;
    }
    h4 {
      font-size: 1.3125rem;
    }
  }
}
.selectCard {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1% 1%;
  @media (min-width: 1024px) {
    padding: 0%;
  }
}
//客製化
.customArea {
  background-color: #fffaf3;
  padding: 1% 1%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;

  .lunchBox {
    position: absolute;
    z-index: 2000;
    width: 40%;
    // transform: translate(-50%, -50%);
    left: 55%;
    top: 30%;
    object-fit: contain;
    @media (min-width: 576px) {
      top: 20%;
    }
    @media (min-width: 768px) {
      top: 30%;
    }
    @media (min-width: 1024px) {
      top: 14%;
    }
  }
  .food1,
  .food2,
  .food3,
  .food4,
  .food5 {
    position: absolute;
    z-index: 2000;
    transform: translate(-50%, -50%);
    left: 75%;
    top: 40%;
    width: 11%;
    @media (min-width: 576px) {
      top: 34%;
    }
    @media (min-width: 768px) {
      top: 40%;
      left: 75%;
    }
    @media (min-width: 1024px) {
      top: 25%;
    }
    @media (min-width: 1700px) {
      top: 30%;
    }
  }
}
.customCard {
  width: 100%;
  margin: 5%;
  padding: 0% 2% 2%;
  z-index: 1000;
  // background-color: #ffefad;
  box-shadow: none;
  background: transparent;
  @media (min-width: 992px) {
    background: url('/budget/bg.png') no-repeat center/cover;
  }
  .customCardContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    font-size: 1rem;
    margin: 1%;
    h4 {
      color: #f50077;
      font-family: 'Noto Sans TC', sans-serif;
      font-size: 28px;
      font-size: 1.3rem;
      text-align: center;
      width: 100%;
      // font-style: normal;
      font-weight: 700;
      line-height: 160%; /* 60.8px */
    }
    h5 {
      margin: 0;
      font-weight: 600;
      font-size: 0.9rem;
      width: 50%;
      line-height: 1.3rem;
      // text-align: center;
    }
    h6 {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      flex-wrap: wrap;
      width: 70%;
      line-height: 1.3rem;
      margin: 0%;
      color: #3d3123;
      font-weight: 700;
      color: #f50077;
      font-size: 0.8rem;
      span {
        font-size: 0.7rem;
        margin: 0 1%;
      }
    }
    button {
      // background-color: #F50077;
      color: #f50077;
      margin-top: 5%;
      width: 40%;
      border: 1px solid var(--e-5006-e, #f50077);
      &:hover {
        background: #f50077;
        color: #fff;
      }
      &:active {
        opacity: 0.7;
      }
      &::before {
        box-shadow: none;
      }
    }
    .mealBtn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    @media (min-width: 500px) {
      h4 {
        text-align: left;
      }
      h6 {
        width: 40%;
      }
    }
    @media (min-width: 768px) {
      h4 {
        font-size: 2rem;
        text-align: left;
      }
      h5 {
        font-size: 1.5rem;
        line-height: 2rem;
      }

      h6 {
        font-size: 1.3rem;
        width: 40%;
        // text-align: left;
        // margin-left: 40%;
        span {
          font-size: 1rem;
        }
      }
      button {
        // background-color: #F50077;

        width: 40%;
        font-size: 1rem;
      }
    }
    @media (min-width: 992px) {
      align-items: flex-start;
      padding-left: 9%;
      h4 {
        font-size: 1.7rem;
        text-align: left;
      }
      h5 {
        font-size: 1.2rem;
      }
      h6 {
        font-size: 1rem;
        justify-content: flex-start;
        width: 50%;
        flex-wrap: wrap;
        span {
          font-size: 1rem;
        }
      }
      button {
        width: 20%;
        font-size: 1rem;
      }
    }
    @media (min-width: 1024px) {
      align-items: flex-start;
      padding-left: 9%;
      h4 {
        font-size: 1.7rem;
      }
      h5 {
        font-size: 1.2rem;
        width: auto;
      }
      h6 {
        font-size: 1rem;
        justify-content: flex-start;
        width: 60%;
        flex-wrap: wrap;
        span {
          font-size: 1rem;
        }
      }
      button {
        width: 20%;
        font-size: 1rem;
      }
    }
    @media (min-width: 1700px) {
      h5 {
        font-size: 1.6rem;
      }
      h6 {
        font-size: 1.3rem;
      }
    }
    @media (min-width: 1700px) {
      h4 {
        color: var(--e-5006-e, #f50077);
        font-family: Inter;
        font-size: 38px;
        font-style: normal;
        font-weight: 700;
        line-height: 160%; /* 60.8px */
      }
      h5 {
        color: #444;
        font-family: Inter;
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: 160%; /* 48px */
      }
      h6 {
        font-size: 1.3rem;
      }
      button {
        // background-color: #F50077;

        display: flex;
        width: 195px;
        padding: 10px 48px;
        justify-content: center;
        align-items: center;
        // width: 100%;
        font-size: 1rem;
        margin: 2%;
      }
    }
  }
}
//其他客製
.orderProcess {
  background-color: #f4ede5;
  padding: 1% 1%;
}
.processCard {
  margin: 2% 15%;
  background-color: black;
  color: #ebe9ea;
  display: flex;
  flex-direction: column;
  padding: 3% 2%;

  .processTitle {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .processText {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h5 {
        margin: 5% 0;
      }
      p {
        font-size: 1.3rem;
      }
    }
  }

  .processImg {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1% 10%;
    img {
      object-fit: contain;
      width: 20%;
    }
  }
}
.processCard2 {
  margin: 2% 15%;
  background-color: black;
  color: #ebe9ea;
  display: flex;
  flex-direction: column;
  padding: 3% 2%;

  .processTitle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .processText {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 12% 0;
      // padding: 0;
      position: relative;
      padding-bottom: 0.5rem; // 給偽元素線留空間

      &:not(:last-child)::after {
        content: '';
        position: absolute;
        left: 50%; // 將線放在中心
        bottom: 0;
        height: 4rem; // 設定線的長度，可以根據需求調整
        width: 2px; // 設定線的寬度
        background-color: white;
        transform: translateY(100%); // 將線移到元素的下方
      }

      h5 {
        margin: 5% 0;
      }
      p {
        font-size: 1.3rem;
      }
      img {
        width: 30%;
      }
    }
  }
}
.whiteHr {
  color: white;
  width: 100%;
  // position: absolute;
  // transform: translate(-50%, -50%);
  // top: 0%;
  // left: 0%;
}
</style>
