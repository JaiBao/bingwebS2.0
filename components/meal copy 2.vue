<template>
  <!-- 餐點 -->
  <div class="productArea">
    <div class="menuArea">
      <q-tabs align="center" id="mealCartTabs" v-model="activeTab" active-color="pink-6" mobile-arrows>
        <span class="spanText">團訂流程</span>
        <span class="spanLine">
          <div class="verticalLine"></div>
        </span>
        <div class="tabContent">
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
              <p>所有單點</p>
            </div>
          </q-tab>
          <q-tab name="riceBox" @click="scrollTo('riceBox')">
            <div class="row justify-center items-center">
              <img loading="lazy" class="deliciousTabImg" src="/delicious/2-pic-4.svg" />
              <p>米香油飯盒</p>
            </div>
          </q-tab>
          <q-tab name="guabao" @click="scrollTo('guabao')">
            <div class="row justify-center items-center">
              <img loading="lazy" class="deliciousTabImg" src="/delicious/2-icon-5.svg" />
              <p>太ONE刈包</p>
            </div>
          </q-tab>
        </div>
      </q-tabs>

      <div class="orderMeal">
        <div class="bandongArea">
          <div class="title">
            <img loading="lazy" class="deliciousTabImg" src="/delicious/2-pic-1.svg" />
            <h3 id="bandong">潤餅便當</h3>
          </div>
          <bandongMealCard />
        </div>

        <div class="boxArea">
          <div class="title">
            <img loading="lazy" class="deliciousTabImg" src="/delicious/2-pic-2.svg" />
            <h3 id="box">午茶盒餐</h3>
          </div>

          <boxMealCard />
        </div>
        <div class="soloArea">
          <div class="title">
            <img loading="lazy" class="deliciousTabImg" src="/delicious/2-pic-3.svg" />
            <h3 id="solo">所有單點</h3>
          </div>

          <soloMealCard />
        </div>
        <div class="bandongArea">
          <div class="title">
            <img loading="lazy" class="deliciousTabImg" src="/delicious/2-pic-4.svg" />
            <h3 id="riceBox">米香油飯盒</h3>
          </div>
          <riceBoxMealCard />
        </div>
        <div class="bandongArea">
          <div class="title">
            <img loading="lazy" class="deliciousTabImg" src="/delicious/2-icon-5.svg" />
            <h3 id="guabao">刈包便當</h3>
          </div>
          <guabaoBandongMealCard />
          <div class="title">
            <img loading="lazy" class="deliciousTabImg" src="/delicious/2-icon-5.svg" />
            <h3>刈包午茶盒餐</h3>
          </div>
          <guabaoLunchboxMealCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const activeTab = ref('bandong')
let isScrolling = false

const scrollTo = id => {
  activeTab.value = id
  isScrolling = true
  const orderMealElement = document.querySelector('.orderMeal')
  const targetElement = document.getElementById(id)
  const targetTop = targetElement.offsetTop
  const relativeTop = targetTop - orderMealElement.offsetTop

  orderMealElement.scrollTo({
    top: relativeTop,
    behavior: 'smooth'
  })
}

onMounted(() => {
  const orderMealElement = document.querySelector('.orderMeal')
  let scrollTimeout

  const handleScroll = () => {
    if (!isScrolling) {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const anchorElements = ['#bandong', '#box', '#solo', '#riceBox', '#guabao'].map(id => document.querySelector(id))
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

  orderMealElement.addEventListener('scroll', handleScroll)

  onUnmounted(() => {
    orderMealElement.removeEventListener('scroll', handleScroll)
  })

  orderMealElement.addEventListener('scroll', () => {
    if (isScrolling) {
      isScrolling = false
    }
  })
})
</script>

<style lang="scss" scoped>
@import '/assets/components/meal';
</style>
