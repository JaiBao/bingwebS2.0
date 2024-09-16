<template>
  <div class="connectionContent">
    <div class="connectionTitle">
      <h1>聯絡我們</h1>
    </div>
    <!-- 卡片 -->
    <q-card class="connectionCard col-4">
      <img loading="lazy" src="/connectionUs/store.jpg" />
    </q-card>
    <!-- ACO -->
    <div class="ACO">
      <div class="address">
        <h6>Address</h6>
        <p>106台北市大安區和平東路 二段311巷43弄26號</p>
      </div>
      <div class="address">
        <h6>Contact</h6>
        <p class="pointer" @click="dialNumber">預訂專線：(02)2301-5331</p>
        <p>外送傳真：(02)2301-3990</p>
        <p class="pointer" @click="onMessengerClick">Line@ ID：@chinabing</p>
        <div class="AOCicon">
          <img loading="lazy" src="/connectionUs/line.png" alt="line" @click="onMessengerClick" class="pointer" />

          <img loading="lazy" src="/connectionUs/fb.png" alt="fb" @click="onMessengerFB" class="pointer" />

          <img loading="lazy" src="/connectionUs/ig.png" alt="ig" @click="onMessengerIg" class="pointer" />
        </div>
      </div>
      <div class="address">
        <h6>Opening Hours</h6>
        <p>Mon - Fri</p>
        <p>營業時間 09:00 – 18:00</p>
        <p>餐點供應 11:00 – 16:00</p>
      </div>
    </div>

    <div class="googleIframe">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6080.117808896405!2d121.54305114322027!3d25.025259996971176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb665149bcd%3A0xefbc6e591ce7362d!2z5Lit6I-v5LiA6aSFLSDlkozlubPlupc!5e0!3m2!1szh-TW!2stw!4v1692859626955!5m2!1szh-TW!2stw"
        style="border: 0"
        allowfullscreen=""
        referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
  <lastSectionNone />
</template>

<script setup>
import { useUniversal } from '~/stores/universal'

const { onMessengerClick, onForm1Click, onForm2Click, onMessengerIg, dialNumber, onDownloadClick, onMessengerFB } = useUniversal()

useHead({
  title: '中華一餅 | 聯絡我們',
  meta: [
    // Description Meta Tag
    {
      name: 'description',
      content: '任何您想與中華一餅聯繫接洽事宜，歡迎您可以直接聯繫我們，或透過聯絡表單與我們聯繫，我們將會盡快與您聯繫。'
    },
    // Open Graph
    {
      property: 'og:title',
      content: '聯絡中華一餅'
    },
    {
      property: 'og:description',
      content: '任何您想與中華一餅聯繫接洽事宜，歡迎您可以直接聯繫我們，或透過聯絡表單與我們聯繫，我們將會盡快與您聯繫。'
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
      content: 'https://www.chinabing.net/connectionUs'
    },
    {
      property: 'og:type',
      content: 'website'
    }
    // ...
  ]
})
</script>

<style lang="scss" scoped>
.connectionContent {
  @media (min-width: 768px) {
    padding: 0 10%;
  }
}
.connectionTitle {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin-bottom: 14px;
  h1 {
    background: url('/connectionUs/bg.png') no-repeat 100% 70% / contain;
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 1.875rem;
    font-weight: 400;
    padding: 0 0.5%;
    color: #f50077;
  }
}
.connectionCard {
  // border-top: 0.5px solid #000;
  // border-bottom: 0.5px solid #000;
  box-shadow: none;
}
.cardText {
  display: flex;
  flex-direction: row;

  height: 166px;
  padding: 0;
  @media (min-width: 768px) {
    max-height: 106px;
    align-items: center;
  }
  @media (min-width: 1024px) {
    max-height: 66px;
  }
  .textLeft {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 20%;
    background: #ffefad;
    p {
      color: #2b2b2b;
      font-family: 'Noto Sans TC', sans-serif;
      font-size: 1.1rem;
      font-style: normal;
      font-weight: 400;
      margin: 0;
      line-height: 22px; /* 129.412% */
      letter-spacing: 0.85px;
    }
    @media (min-width: 768px) {
      height: 100%;
    }
  }
  .textRight {
    // padding: 1% 6% 1% 4%;
    p {
      color: #2b2b2b;
      font-family: 'Noto Sans TC', sans-serif;
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 137.5% */
      max-width: 593px;
      margin: 0.5% 6% 0.5% 4%;
      @media (min-width: 768px) {
        font-size: 1rem;
      }
    }
  }
}
//ACO
.ACO {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 5%;
  padding: 0 10%;
  .address {
    // max-width: 188px;
    h6 {
      color: #2b2b2b;
      /* 中華一餅/web/小標/noto 21px */
      font-family: 'Noto Sans TC', sans-serif;
      font-size: 21px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin-bottom: 6%;
    }
    p {
      color: #2b2b2b;
      /* 中華一餅/web/小標/noto 21px */
      font-family: 'Noto Sans TC', sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px;
      margin-bottom: 4%;
    }
    @media (min-width: 992px) {
      max-width: 188px;
    }
  }
  @media (min-width: 992px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
  }
}
//icon
.AOCicon {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  img {
    width: 21px;
    height: 20px;
    object-fit: contain;
    margin: 0 6px 0 0px;
  }
}
//google
.googleIframe {
  margin: 10% 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 10%;

  iframe {
    width: 100%;
    height: 50%;
  }
  @media (min-width: 768px) {
    height: 361px;
    padding: 0;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
