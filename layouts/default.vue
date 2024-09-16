<template>
  <q-layout view="hHh lpR fff">
    <q-header class="bg-white text-black q-header-custom" height-hint="98">
      <q-toolbar class="isHeader">
        <q-toolbar-title>
          <div class="logoBtn" @click="navigateToHome">
            <img loading="lazy" src="/index/0-pic-1.png" />
          </div>
        </q-toolbar-title>
        <q-tabs align="right" class="gt-sm" id="titleTabs" no-caps active-color="pink-8" indicator-color="transparent">
          <q-route-tab :ripple="false" to="/history" label="品牌故事" />

          <!-- 美味餐點 - 下拉式選單 -->
          <q-route-tab
            :ripple="false"
            label="美味餐點"
            class="titleTab"
            :class="{ 'q-tab--active': isActiveDelicious }"
            @mouseenter="openMenu"
            @mouseleave="closeMenu"
            to="/chinaBing">
            <q-menu ref="menuRef" class="menuRef" @mouseenter="stopCloseMenu" @mouseleave="closeMenu">
              <q-list>
                <q-item :class="{ 'active-item': route.name === 'chinaBing' }" clickable v-close-popup :to="{ name: 'chinaBing' }">
                  <q-item-section>中華一餅</q-item-section>
                </q-item>
                <q-item :class="{ 'active-item': route.name === 'cico' }" clickable v-close-popup :to="{ name: 'cico' }">
                  <q-item-section>喜客油飯</q-item-section>
                </q-item>

                <q-item :class="{ 'active-item': route.name === 'daohua' }" clickable v-close-popup :to="{ name: 'daohua' }">
                  <q-item-section>花豆囍事</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-route-tab>

          <!-- <q-route-tab :ripple="false" to="/budget" label="預算選擇" class="titleTab" /> -->
          <q-route-tab :ripple="false" to="/group" label="團訂流程" class="titleTab" />
          <q-route-tab :ripple="false" to="/faq" label="常見問題" class="titleTab" />
          <q-route-tab :ripple="false" to="/connectionUs" label="聯絡我們" class="titleTab" />
        </q-tabs>
        <!-- 
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" class="lt-md titleDrawer" /> -->
        <a class="menu example5 lt-md" :class="{ 'is-active': isMenuActive }" @click="toggleDrawer"><span></span></a>
      </q-toolbar>

      <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile" bordered class="bg-white text-black" :width="200">
        <q-tabs align="right" id="drawerBtn">
          <div id="drawerBtn" no-caps active-color="pink-8" indicator-color="transparent">
            <q-route-tab to="/history" label="品牌故事" />
            <!-- <q-route-tab to="/delicious" label="美味餐點" id="drawerTab" /> -->
            <!-- 美味餐點 - 下拉式選單 -->

            <q-expansion-item label="美味餐點" class="expansionTab" :class="{ 'expansion-item-active': isActiveDelicious }">
              <q-item :class="{ 'active-item': route.name === 'chinaBing' }" clickable :to="{ name: 'chinaBing' }">
                <q-item-section>中華一餅</q-item-section>
              </q-item>
              <q-item :class="{ 'active-item': route.name === 'cico' }" clickable v-close-popup :to="{ name: 'cico' }">
                <q-item-section>喜客油飯</q-item-section>
              </q-item>

              <q-item :class="{ 'active-item': route.name === 'daohua' }" clickable v-close-popup :to="{ name: 'daohua' }">
                <q-item-section>花豆囍事</q-item-section>
              </q-item>
            </q-expansion-item>

            <!-- <q-route-tab to="/budget" label="預算選擇" id="drawerTab" /> -->
            <q-route-tab to="/group" label="團訂流程" id="drawerTab" />
            <q-route-tab to="/faq" label="常見問題" id="drawerTab" />
            <q-route-tab to="/connectionUs" label="聯絡我們" id="drawerTab" />
          </div>
        </q-tabs>
      </q-drawer>
    </q-header>

    <q-page-container>
      <slot />
    </q-page-container>

    <q-footer reveal class="lt-sm">
      <div class="footer">
        <button @click="onFabClick">
          <img src="/default/order.svg" alt="點餐" />
          <p>線上預訂</p>
        </button>
        <button @click="navigateToSearch">
          <img src="/default/search.svg" alt="查詢" />
          <p>訂單查詢</p>
          <p></p>
        </button>
        <button @click="onDownloadClick">
          <img src="/default/menu.svg" alt="訂單" />
          <p>訂單下載</p>
        </button>
        <button @click="dialNumber">
          <img src="/default/phone.svg" alt="來電" @click="dialNumber" />
          <p>撥打專線</p>
        </button>
      </div>
    </q-footer>
    <!-- 浮動按钮 -->
    <div class="floating-buttons gt-xs">
      <div class="vertical-fab" @click="onFabClick">
        <img class="speacial-fab" loading="lazy" src="/group/messenger.svg" alt="線上預訂" />
      </div>
      <div class="vertical-fab" @click="dialNumber">
        <img class="fab" loading="lazy" src="/group/phone.svg" alt="電話" />
      </div>
      <div class="vertical-fab" @click="onDownloadClick">
        <img class="fab" loading="lazy" src="/group/download.svg" alt="下載" />
      </div>
      <div class="vertical-fab" @click="navigateToSearch">
        <img class="fab" loading="lazy" src="/group/search.svg" alt="搜尋" />
      </div>
    </div>

    <!-- 線上點餐dialog -->
    <onlineOrder />
    <!-- 道歉dialog -->
    <q-dialog v-model="sorryDialog">
      <div class="sorrySection">
        <q-btn
          flat
          dense
          round
          icon="close"
          color="white"
          class="close-dialog-button"
          :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderColor: 'black' }"
          @click="sorryDialog = false" />
        <img src="/index/sorry.png" alt="對不起各位" />
      </div>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import axios from 'axios'
import { useUniversal } from '/stores/universal'
import { useDialogStore } from '/stores/useDialogStore'
import { useAgreeCollectionStore } from '/stores/agreeCollection'
const agreeCollection = useAgreeCollectionStore()
const { onOnlineClick } = useDialogStore()
const { onMessengerClick, onForm1Click, onForm2Click, onMessengerIg, dialNumber, onDownloadClick, onMessengerFreight, onMessengerFB } = useUniversal()
const layout = ref(false)
const $q = useQuasar()

const router = useRouter()

const route = useRoute()

const isActiveDelicious = computed(() => {
  // 檢查當前路由是否屬於美味餐點相關頁面
  return ['chinaBing', 'cico', 'daohua'].includes(route.name)
})

const menuRef = ref(null)

const closeTimeout = ref(null)

const openMenu = () => {
  // 当鼠标移入时，取消之前的关闭操作
  if (closeTimeout.value) {
    clearTimeout(closeTimeout.value)
    closeTimeout.value = null
  }
  // 打开菜单逻辑（如果有必要）
  if (menuRef.value) {
    menuRef.value.show()
  }
}

const closeMenu = () => {
  // 延迟关闭，以便于鼠标可以移动到菜单上
  closeTimeout.value = setTimeout(() => {
    if (menuRef.value) {
      menuRef.value.hide()
    }
  }, 300) // 300毫秒的延迟
}

const stopCloseMenu = () => {
  // 当鼠标移回菜单或标签时，取消关闭操作
  if (closeTimeout.value) {
    clearTimeout(closeTimeout.value)
    closeTimeout.value = null
  }
}
const navigateToHome = () => {
  router.push('/')
}
const navigateToOrder = () => {
  router.push('/onlineOrder')
}
const navigateToSearch = () => {
  router.push('/search')
}

// 定義點擊事件處理函數
const onFabClick = () => {
  if (agreeCollection.hasAgreed) {
    router.push('/onlineOrder')
  } else {
    onOnlineClick()
  }
}

const isMenuActive = ref(false) // 用於追蹤menu是否被點擊
const rightDrawerOpen = ref(false) // 用於追蹤drawer是否打開

const toggleDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
  isMenuActive.value = !isMenuActive.value
}

// 監聽 rightDrawerOpen 的變化，並相應地更新 menuActivated
watch(rightDrawerOpen, newValue => {
  isMenuActive.value = newValue
})

const sorryDialog = ref(false)

onMounted(() => {
  if (!sessionStorage.getItem('visited')) {
    sorryDialog.value = false
    sessionStorage.setItem('visited', 'true')
  }
  agreeCollection.initializeAgreement()
})
</script>

<style lang="scss" scoped>
.isHeader {
  width: 100%;
  height: 50px;
  @media (min-width: 768px) {
    height: 90px;
  }
}

.active-item .q-item__section {
  color: #f50077;
}

.logoBtn {
  position: static;
  cursor: pointer;
  // margin-left: 15%;
  width: 40px;
  height: 40px;
  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
  @media (min-width: 768px) {
    padding-left: 0;
    width: 76px;
    height: 76px;
    img {
      width: 76px;
      height: 76px;
    }
  }
  @media (min-width: 1024px) {
    margin-left: 10%;
  }
}
/* btn */
.menu {
  position: absolute;
  top: 20%;
  right: 1%;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin: 10px;
  z-index: 9999;
  color: #000;
  @media (min-width: 768px) {
    margin: 20px;
  }
}
.menu span {
  margin: 0 auto;
  position: relative;
  top: 1px;
}
.menu span:before,
.menu span:after {
  position: absolute;
  content: '';
}
.menu span,
.menu span:before,
.menu span:after {
  cursor: pointer;
  width: 24px;
  height: 3px;
  background-color: #000;
  display: block;
  @media (min-width: 768px) {
    width: 40px;
    height: 4px;
  }
}
.menu span:before {
  margin-top: -10px;
  @media (min-width: 768px) {
    margin-top: -12px;
  }
}
.menu span:after {
  margin-top: 10px;
  @media (min-width: 768px) {
    margin-top: 12px;
  }
}

/* example 5 */
.example5 span {
  -webkit-transition-duration: 0s;
  transition-duration: 0s;
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
}
.example5.is-active span {
  background-color: rgba(0, 0, 0, 0);
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
}
.example5 span:before {
  -webkit-transition-property: margin, -webkit-transform;
  transition-property: margin, transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  -webkit-transition-delay: 0.2s, 0s;
  transition-delay: 0.2s, 0s;
}
.example5.is-active span:before {
  margin-top: 0;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transition-delay: 0s, 0.2s;
  transition-delay: 0s, 0.2s;
}
.example5 span:after {
  -webkit-transition-property: margin, -webkit-transform;
  transition-property: margin, transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  -webkit-transition-delay: 0.2s, 0s;
  transition-delay: 0.2s, 0s;
}
.example5.is-active span:after {
  margin-top: 0;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transition-delay: 0s, 0.2s;
  transition-delay: 0s, 0.2s;
}

.vertical-fab {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  cursor: pointer;

  .fab {
    // width: 80%;
    width: 73px;
    height: 73px;
    object-fit: contain;
    margin: 9px 0;
  }
  .speacial-fab {
    width: 78px;
    object-fit: contain;
    margin: 9px 0;
  }
}

.floating-buttons {
  position: fixed;
  top: 43%;
  right: 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2000;
  @media (min-width: 992px) {
    top: 200px;
  }
}

.q-footer {
  width: 100%;
  background: #fff;

  .footer {
    display: flex;
    flex-direction: row;
    width: 100%;
    button {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: none;
      border: none;
      // border: 1px solid #838383;
      padding: 3%;
      img {
        width: 40%;
      }
      p {
        color: #838383;
        margin: 0;
        font-size: 14px;
        font-style: normal;
        font-weight: 900;
        line-height: 160%; /* 22.4px */
      }
    }
  }

  h6 {
    margin: 0;
  }
  @media (min-width: 768px) {
    padding-top: 20%;
  }
  @media (min-width: 992px) {
    padding-top: 0%;
    // padding: 10% 10% 0 10%;
  }
  @media (min-width: 1200px) {
    // padding-top: 10%;
    // padding: 10% 10% 0 10%;
  }
}

.onlineOrder {
  min-width: 350px;
  max-width: 650px;
  // height: 100%;
  background: #fffaf3;
  display: flex;
  flex-direction: row;
  // align-items: center;
  justify-content: center;
  padding: 2% 1%;
  position: relative;
}

.close-dialog-button {
  position: absolute;
  top: 5px;
  right: 10px; /* 调整此值以控制按钮距离右侧的间距 */
  z-index: 2;
  // float: right; /* 浮动至右侧 */
}
.descriptonCard2 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  /* 下方陰影 */
  box-shadow: 10px 10px 18px 0px rgba(0, 0, 0, 0.14);

  width: 90%;
  // height: 420px;
  // margin: 1%;
  padding: 14px 28px;
  margin: 12px 0;
  @media (min-width: 1200px) {
    margin: 15px;
    // padding: 28px;
    // width: 80%;

    height: 100%;
  }
}
.descriptonCardTitle {
  h5 {
    margin-top: 0;
    color: #f50077;
    font-weight: 700;
    font-size: 1.3125rem;
    font-family: 'Noto Sans TC', sans-serif;
    margin: 0;
    a {
      color: #f50077;
      font-weight: 800;
      text-decoration: none;
    }
    @media (min-width: 768px) {
      font-size: 1.6rem;
    }
    @media (min-width: 992px) {
      font-size: 1.4rem;
    }
  }
  p {
    font-size: 14px;
    color: #212121;
    margin-bottom: 28px;
    font-family: 'Noto Sans TC', sans-serif;
    @media (min-width: 768px) {
      font-size: 1rem;
    }
    @media (min-width: 992px) {
      font-size: 14px;
    }
  }
}

.descriptionContent2 {
  p {
    font-size: 1rem;
    font-weight: 400;
    font-family: 'Noto Sans TC', sans-serif;
    a {
      color: #f50077;
      font-weight: 400;
      line-height: 160%; /* 24px */
      text-decoration: none;
    }
    @media (min-width: 768px) {
      font-size: 1.3rem;
    }
    @media (min-width: 992px) {
      font-size: 1rem;
    }
  }
  h6 {
    margin: 0;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    font-family: 'Noto Sans TC', sans-serif;
    line-height: 24px; /* 160% */
    @media (min-width: 768px) {
      font-size: 1.3rem;
    }
    @media (min-width: 992px) {
      font-size: 1.125rem;
    }
  }
  ul {
    padding-left: 1%;
    margin-top: 0;
  }
  li {
    list-style-type: none; /* 移除預設的列表樣式 */
    color: #2b2b2b;
    font-family: 'Noto Sans TC', sans-serif;
    font-weight: 400;
    font-size: 12px;
    @media (min-width: 768px) {
      font-size: 1rem;
    }
    @media (min-width: 992px) {
      font-size: 1.125rem;
    }
  }

  li::before {
    content: ''; /* 插入空白內容 */
    display: inline-block; /* 必須為內聯塊元素才能應用寬度和高度 */
    width: 5px; /* 自訂的寬度 */
    height: 5px; /* 自訂的高度 */
    margin-right: 10px; /* 在符號和文本之間添加一些空間 */
    margin-bottom: 3px; /* 在符號和文本之間添加一些空間 */
    background: #4d4d4d; /* 自訂的顏色 */
    // clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); /* 使用clip-path來創建菱形 */
    clip-path: circle(50% at 50% 50%);

    @media (min-width: 992px) {
      width: 7px; /* 自訂的寬度 */
      height: 7px; /* 自訂的高度 */
    }
  }
}
.descriptionBottom {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .bottom1,
  .bottom2 {
    p {
      margin: 0;
      font-size: 16px;
      color: #666;
      font-weight: 400;
      line-height: 160%; /* 25.6px */
      a {
        text-decoration: underline; /* 添加下划线，表示链接 */
        color: blue; /* 设置链接的颜色 */
      }
    }
  }
  .bottom1 {
    margin-bottom: 2%;
  }
}

.processTitle3Btn {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin-top: 5%;
  button {
    width: 120px;
    height: 46px;
    border: 1px solid #f50077;
    color: #f50077;
    background: transparent;
    cursor: pointer;

    font-weight: 400;
    line-height: 160%; /* 25.6px */
    font-family: 'Noto Sans TC', sans-serif;
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
}

// 道歉
.sorrySection {
  min-width: 350px;
  max-width: 700px;
  // background: #fffaf3;
  display: flex;
  flex-direction: row;
  // align-items: center;
  justify-content: center;
  padding: 1%;
  position: relative;
  img {
    width: 100%;
    object-fit: contain;
  }
}
</style>
