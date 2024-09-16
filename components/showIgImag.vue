<template>
  <div class="ig">
    <div class="igTitle">
      <div class="igTitleLeft">
        <img loading="lazy" src="/index/igLogo.png" alt="華餅ig" />
        <div class="leftText">
          <h6>chinabing</h6>
          <p>中華一餅</p>
        </div>
      </div>
      <div class="igTitleRight">
        <a href="https://www.instagram.com/chinabing/" target="_blank">
          <button>追蹤</button>
        </a>
      </div>
    </div>
    <div class="row igContent">
      <div v-for="(item, index) in igItems" :key="item.id" class="igImg">
        <a :href="item.url" target="_blank">
          <div class="igImgContent">
            <div class="overlay">
              <div class="overlays">
                <img loading="lazy" :src="item.icon" alt="愛心" style="width: 25px" />
                {{ item.overlayText }}
              </div>
              <div class="overlays">
                <img loading="lazy" :src="item.icon2" alt="留言" style="width: 25px" />
                {{ item.overlayText }}
              </div>
            </div>
            <img loading="lazy" class="igImgs" :src="item.imageSrc" :alt="item.imageAlt" />
          </div>
        </a>

        <!-- <div class="igIcons" v-if="index === 0">
          <div class="iconLeft">
            <q-rating
              v-model="model3"
              max="1"
              size="2em"
              color="pink-6"
              color-selected="pink-6"
              icon="favorite_border"
              icon-selected="favorite"
              icon-half="favorite"
              no-dimming />
             <img loading="lazy" src="/index/Icons.png" alt="" />
             <img loading="lazy" src="/index/Icons-1.png" alt="" />
          </div>
          <div class="iconRight">
             <img loading="lazy" src="/index/Icons-2.png" alt="" />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
const model3 = ref('')

const igItems = ref([
  {
    id: 1,
    overlayText: '999',
    url: 'https://www.instagram.com/p/CuNt0lDv9Nb/',
    icon: '/index/icon-heart.png',
    icon2: '/index/icon-message.png',
    imageSrc: '/index/0-pic-IG1.jpg',
    imageAlt: '訂單突破'
  },
  {
    id: 2,
    overlayText: '999',
    url: 'https://www.instagram.com/p/CtFnjgGPW0p/',
    icon: '/index/icon-heart.png',
    icon2: '/index/icon-message.png',
    imageSrc: '/index/0-pic-IG2.jpg',
    imageAlt: '美味'
  },
  {
    id: 3,
    overlayText: '999',
    url: 'https://www.instagram.com/p/CqJ2s27vMxV/',
    icon: '/index/icon-heart.png',
    icon2: '/index/icon-message.png',
    imageSrc: '/index/0-pic-IG3.jpg',
    imageAlt: '餐盒'
  },
  {
    id: 4,
    overlayText: '999',
    url: 'https://www.instagram.com/p/CsSwrK1rK0c/',
    icon: '/index/icon-heart.png',
    icon2: '/index/icon-message.png',
    imageSrc: '/index/0-pic-IG4.jpg',
    imageAlt: '餅'
  }
])
</script>
<style lang="scss" scoped>
//ig
.ig {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5%;

  h3 {
    font-size: 2rem;
    font-weight: 600;
  }
  @media (min-width: 568px) {
    h3 {
      font-size: 3rem;
    }
  }
}

.igTitle {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1%;
}
.igTitleLeft {
  display: flex;
  flex-direction: row;
  width: 40%;
  img {
    width: 52.973px;
    height: 52.973px;
  }
  .leftText {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    h6 {
      margin: 0 2%;
      color: var(--2-b-2-b-2-b, #2b2b2b);

      /* 中華一餅/web/小標/noto 21pxB */

      font-size: 1.125rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    p {
      margin: 0 2%;
      color: var(--2-b-2-b-2-b, #2b2b2b);

      /* 中華一餅/web/小標/noto 21pxB */

      font-size: 0.875rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
  @media (min-width: 992px) {
    img {
      width: 70px;
      height: 70px;
    }
    .leftText {
      p {
        font-size: 21px;
      }
    }
  }
}

.igTitleRight {
  display: flex;
  width: 40%;
  height: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  button {
    display: inline-flex;
    // padding: 6px 36px;
    justify-content: center;
    align-items: center;
    width: 88px;
    height: 38px;
    // gap: 8px;
    font-size: 0.875rem;
    font-weight: 700;
    border-radius: 10px;
    background: #f50077;
    border: none;
    color: #fff;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    button {
      font-size: 1.125rem;
      width: 100px;
      height: 42px;
    }
  }
}
.igContent {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}

.igImg {
  // margin: 0 10px;
  width: 48%;
  margin: 1%;
  @media (min-width: 992px) {
    margin: 0;
    width: 23.5%;
  }
  .igImgContent {
    position: relative;
  }
  .igImgs {
    width: 100%;
    object-fit: contain;
    display: block;
    // padding: 2%;
  }
  .overlay {
    position: absolute;
    font-size: 1rem;
    text-align: center;
    padding: 10%;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none; /* 將滑鼠事件傳遞到下面的元素 */
  }
}
.overlays {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 5%;
}
.igIcons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 9px;
  // padding: 0 2%;
  .iconLeft {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // align-items: flex-start;
    img {
      object-fit: contain;
      width: 2em;
      height: 2em;
      margin: 4% 0 0 10%;
    }
  }
  .iconRight {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    img {
      margin-top: 12%;
      object-fit: contain;
      width: 2em;
      height: 2em;
      // margin: 0 3%;
    }
  }
}

.igImg:hover .overlay {
  opacity: 1;
}
</style>
