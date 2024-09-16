<template>
  <!-- section1 -->
  <!-- <div class="groupBanner">
    <div class="bannerTop">
      <img loading="lazy" class="s1Img" src="/group/bangdong.png" alt="便當" />
      <img loading="lazy" class="s1Txt" src="/group/bangdongText.png" />
    </div>
    <div class="bannerBottom">
      <img loading="lazy" class="s1Txt" src="/group/boxText.png" />
      <img loading="lazy" class="s1Img" src="/group/box.png" alt="盒餐" />
    </div>
  </div> -->
  <!-- section2 -->
  <div class="groupSection2">
    <div class="groupType">
      <div class="groupTitle2">
        <h5 class="groupText">企業團體 一致推薦</h5>
        <h5>潤餅便當.午茶盒餐</h5>
      </div>
      <div class="groupP">
        <p>
          中華一餅獨特、方便與創新的潤餅便當與會議盒餐服務，無論是三五同事揪團訂購或是公司企業、部門餐會，又或是會議場合、記者會、家庭日、野餐日等等，都是您訂購的最佳選擇！
        </p>
      </div>
    </div>
    <!-- 圖區 -->
    <div class="groupImgs">
      <div class="groupImgTop">
        <!-- 1 -->
        <div class="groupImg">
          <div class="backgroundOverlay">
            <p class="text">企業團餐</p>
          </div>
          <img loading="lazy" src="/group/circle1.png" alt="圓形1" />
        </div>
        <!-- 2 -->
        <div class="groupImg">
          <div class="backgroundOverlay">
            <p class="text">團訂午餐</p>
          </div>
          <img loading="lazy" src="/group/circle2.png" alt="圓形2" />
        </div>
        <!-- 3 -->
        <div class="groupImg">
          <div class="backgroundOverlay">
            <p class="text">同事揪團</p>
          </div>
          <img loading="lazy" src="/group/circle3.png" alt="圓形3" />
        </div>
        <!-- 4 -->
        <div class="groupImg">
          <div class="backgroundOverlay">
            <p class="text">會議盒餐</p>
          </div>
          <img loading="lazy" src="/group/circle4.png" alt="圓形4" />
        </div>
      </div>
      <!-- 下方 -->
      <div class="groupImgTop">
        <!-- 1 -->
        <div class="groupImg">
          <div class="backgroundOverlay">
            <p class="text">活動點心</p>
          </div>
          <img loading="lazy" src="/group/circle5.png" alt="圓形5" />
        </div>
        <!-- 2 -->
        <div class="groupImg">
          <div class="backgroundOverlay">
            <p class="text">記者會</p>
          </div>
          <img loading="lazy" src="/group/circle6.png" alt="圓形6" />
        </div>
        <!-- 3 -->
        <div class="groupImg">
          <div class="backgroundOverlay">
            <p class="text">家庭日</p>
          </div>
          <img loading="lazy" src="/group/circle7.png" alt="圓形7" />
        </div>
        <!-- 4 -->
        <div class="groupImg">
          <div class="backgroundOverlay">
            <p class="text">野餐日</p>
          </div>
          <img loading="lazy" src="/group/circle8.png" alt="圓形8" />
        </div>
      </div>
    </div>
  </div>
  <!-- section3 -->
  <div class="groupProcess" id="booking">
    <q-tabs align="center" id="groupTabs" v-model="activeTab" active-color="pink-6" mobile-arrows>
      <span class="spanText">團訂流程</span>
      <span class="spanLine">
        <div class="verticalLine"></div>
      </span>
      <div class="tabContent">
        <q-tab :ripple="{ color: 'white' }" name="process1" @click="scrollTo('process1')" :class="{ active: activeTab === 'process1' }">套餐類型</q-tab>
        <q-tab :ripple="{ color: 'white' }" name="process2" @click="scrollTo('process2')" :class="{ active: activeTab === 'process2' }">潤餅便當</q-tab>
        <q-tab :ripple="{ color: 'white' }" name="process7" @click="scrollTo('process7')" :class="{ active: activeTab === 'process7' }">米香油飯盒</q-tab>
        <q-tab :ripple="{ color: 'white' }" name="process3" @click="scrollTo('process3')" :class="{ active: activeTab === 'process3' }">午茶盒餐</q-tab>
        <q-tab :ripple="{ color: 'white' }" name="process4" @click="scrollTo('process4')" :class="{ active: activeTab === 'process4' }">潤餅口味</q-tab>
        <q-tab :ripple="{ color: 'white' }" name="process5" @click="scrollTo('process5')" :class="{ active: activeTab === 'process5' }">選擇飲品</q-tab>
        <q-tab :ripple="{ color: 'white' }" name="process6" @click="scrollTo('process6')" :class="{ active: activeTab === 'process6' }">資訊與付款</q-tab>
      </div>
    </q-tabs>
    <!-- 內容區 -->
    <div class="processTitle3">
      <h2>預訂須知</h2>
      <div class="processTitleContents">
        <div class="processTitle3Content">
          <h6>| 餐點每日新鮮手作 |</h6>
          <p>為避免您預訂時遇到當日時段訂單滿單狀況，當您已有確認預訂日期，</p>
          <p>
            您可
            <span>先來電保留預訂的送餐時段</span>
            ， 以免影響到您重要的會議 / 活動場合
          </p>
          <p>
            預訂專線：
            <a @click="dialNumber">(02)2301-5331</a>
          </p>
        </div>
        <div class="processTitle3Content">
          <h6>| 訂購方式 |</h6>
          <p>1、下載訂購單，依範例填寫後回傳</p>
          <p>傳真號碼：(02)2301-3990</p>
          <p>
            2、致電
            <a @click="dialNumber">(02)2301-5331</a>
            確認訂單
          </p>
          <!-- <p class="m-25px-0 w-100"><span>已開放113年3月、113年4月預訂</span></p>
          <div class="processTitle3Btn">
            <button @click="onForm1Click">3月預訂</button>
            <button @click="onForm2Click">4月預訂</button>
          </div> -->
        </div>
        <div class="processTitle3Content">
          <h6>| 運費說明 |</h6>
          <p>
            大台北地區外送服務，您可以依區域查詢
            <span>運費</span>
            或
            <span>免運金額</span>
            。
          </p>
          <div class="row w-100 p-0-5" id="selectSection">
            <q-select
              ref="placeSelectRef"
              class="col-12"
              outlined
              color="pink-6"
              option-disable="disable"
              option-label="city"
              bg-color="white"
              v-model="model"
              :options="address.pricelist"
              id="placeSelect">
              <template v-slot:prepend>
                <q-icon name="place" color="pink-6" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="resetAndClose" class="cursor-pointer xs" />
              </template>
            </q-select>

            <div class="regional">
              <div class="freight">
                <div class="a1">運費</div>
                <div class="a2 text-pink-8">{{ model.price }}</div>
                <div class="a3">元</div>
              </div>
              <div class="noFreight">
                <div class="a1">免運金額</div>
                <div class="a2 text-pink-8">{{ model.limit }}</div>
                <div class="a3">元</div>
              </div>
            </div>
          </div>
          <div class="allArea">
            <a @click="onAddressClick">查看完整外送服務地區</a>
          </div>
        </div>
      </div>
    </div>
    <div class="processTitle">
      <h2>預訂幸福味 團訂流程</h2>
    </div>
    <addressDialog />
    <!-- process1 -->
    <div class="process1" id="process1">
      <div class="groupTitle">
        <p>STEP1</p>
        <h5 class="groupText">套餐類型</h5>
      </div>
      <div class="process1Content">
        <div class="preocess1Img">
          <img loading="lazy" src="/group/Rectangle105.png" alt="潤餅便當" />
          <h4>潤餅便當</h4>
        </div>
        <div class="preocess1Img">
          <img loading="lazy" src="/group/Rectangle112.png" alt="米香油飯盒" />
          <h4>米香油飯盒</h4>
        </div>
        <div class="preocess1Img">
          <img loading="lazy" src="/group/Rectangle106.png" alt="午茶盒餐" />
          <h4>午茶盒餐</h4>
        </div>
      </div>
      <div class="process1Text">
        <div class="process1Txt">
          <!-- <h6 style="font-weight: 700">潤餅便當 / 午茶盒餐</h6> -->
          <p>
            餐點內容都有主食「3吋潤餅」，想要
            <span>吃飽足些</span>
            建議選
            <span>潤餅便當、米香油飯盒</span>
            ，想要
            <span>吃精緻輕巧</span>
            建議選擇
            <span>午茶盒餐</span>
            。
          </p>
          <p>可依需求選擇不同餐點內容，並確認訂購總數。</p>
        </div>
      </div>
      <button @click="scrollToTarget('bandong')">查看完整菜單</button>
    </div>
    <!-- process2 -->
    <div class="process2" id="process2">
      <div class="groupTitle">
        <h5 class="groupText">潤餅便當</h5>
      </div>
      <div class="process2Content">
        <div class="preocess2Img">
          <img loading="lazy" src="/group/Rectangle107.png" alt="雙主餐便當" />
        </div>
        <div class="process2Text">
          <div class="process2Txt">
            <p>
              除了
              <span class="ops">招牌/素食潤餅便當</span>
              ，您還可以選擇
              <span class="ops">雙主餐便當</span>
              。
            </p>
            <p>
              <span>● 招牌潤餅便當</span>
              <span>● 素食潤餅便當</span>
              <span>● 雙主餐便當</span>
            </p>
          </div>
        </div>
      </div>

      <button @click="scrollToTarget('bandong')">查看完整便當系列</button>
    </div>
    <!-- process7 -->
    <div class="process7" id="process7">
      <div class="groupTitle">
        <h5 class="groupText">米香油飯盒</h5>
      </div>
      <div class="process7Content">
        <div class="preocess7Img">
          <img loading="lazy" src="/group/Rectangle112.png" alt="米香油飯盒" />
        </div>
        <div class="process7Text">
          <div class="process7Txt">
            <p>
              特製麻油米香油飯，搭配上不同主餐選擇，是同樣富有飽足的特色飯盒。
              <!-- <span class="ops">米香油飯盒</span>
              提供
              <span class="ops">雙份量油飯</span>
              ，您也可以選擇
              <span class="ops">主餐米香油飯盒</span>
              。 -->
            </p>

            <p>
              <span class="ops2">● 香滷控肉油飯盒</span>
              <span class="ops2">● 香炸雞翅油飯盒</span>
            </p>
            <p>
              <span class="ops2">● 香辣滷牛油飯盒</span>
              <span class="ops2">● 香滷雞腿油飯盒</span>
            </p>
          </div>
        </div>
      </div>

      <button @click="scrollToTargetCico()">查看完整油飯盒系列</button>
    </div>
    <!-- process3 -->
    <div class="process3" id="process3">
      <div class="groupTitle">
        <h5 class="groupText">午茶盒餐</h5>
      </div>
      <div class="process3Content">
        <div class="preocess3Img">
          <img loading="lazy" src="/group/Rectangle108.png" alt="午茶盒餐" />
        </div>
        <div class="process3Text">
          <div class="process3Txt">
            <p>
              午茶盒餐有
              <span class="ops">4 種選擇</span>
              ，可依不同需求進行訂購：
            </p>
            <p class="p">
              <span class="ops2">● 會議盒餐&nbsp;&nbsp;</span>
              <span class="ops2">● 貴賓盒餐&nbsp;&nbsp;</span>
              <span class="lt-md">● 首席盒餐&nbsp;&nbsp;</span>
              <span class="lt-md">● 分享餐&nbsp;&nbsp;</span>
            </p>
            <p class="gt-sm p">
              <span class="ops2">● 首席盒餐&nbsp;&nbsp;</span>
              <span class="ops2">● 分享餐 &nbsp;&nbsp;</span>
            </p>
          </div>
        </div>
      </div>
      <button @click="scrollToTarget('box')">查看完整盒餐系列</button>
    </div>
    <!-- process4 -->
    <div class="process4" id="process4">
      <div class="groupTitle">
        <p>STEP2</p>
        <h5 class="groupText">潤餅口味</h5>
      </div>
      <div class="process4Content">
        <div class="preocess4Img">
          <img loading="lazy" src="/group/Rectangle109.png" alt="潤餅" />
        </div>
        <div class="process4Text">
          <div class="process4Txt">
            <h6 style="font-weight: 700">選擇潤餅口味與數量</h6>
            <p>
              無論是
              <span class="ops">潤餅便當</span>
              或
              <span class="ops">午茶盒餐</span>
              ，我們提供了
              <span class="ops">6 款經典口味</span>
              讓您可依喜好選擇！
            </p>
            <p><span class="ops3">* 素食潤餅便當固定搭配薯泥香素鬆潤餅</span></p>
            <p class="p">
              <span class="ops2">● 薯泥香素鬆</span>
              <span class="ops2">● 蒜味鄉村魚</span>
              <span class="ops2">● 蜂蜜芥末雞</span>
            </p>
            <p class="p">
              <span class="ops2">● 千島香酥蝦</span>
              <span class="ops2">● 凱薩烤培根</span>
              <span class="ops2">● 媽手老滷肉 (預訂供應)</span>
            </p>
          </div>
        </div>
      </div>

      <button @click="scrollToTarget('solo')">查看完整潤餅口味</button>
    </div>
    <!-- process5 -->
    <div class="process5" id="process5">
      <div class="groupTitle">
        <p>STEP3</p>
        <h5 class="groupText">選擇飲品</h5>
      </div>
      <div class="process5Content">
        <div class="preocess5Img">
          <img loading="lazy" src="/group/Rectangle110.png" alt="午茶盒餐" />
        </div>
        <div class="process5Text">
          <div class="process5Txt">
            <h6 style="font-weight: 700">選擇飲品口味與數量</h6>
            <p>
              飲品可依口味選擇， 我們提供了
              <span class="ops">6 款不同飲品</span>
              ！
            </p>
            <p class="p">
              <span class="ops2">● 微甜豆漿</span>
              <span class="ops2">● 無糖豆漿</span>
              <span class="ops2">● 古早紅茶</span>
            </p>
            <p class="p">
              <span class="ops2">● 古早奶茶</span>
              <span class="ops2">● 濃湯/甜湯(依季節供應)</span>
              <!-- <span class="ops2">● 甜湯 (依季節供應)</span> -->
            </p>
            <p style="font-weight: 400; color: #bebebe">* 潤餅便當 加購湯飲品 +$15</p>
          </div>
        </div>
      </div>
      <!-- <button @click="scrollToTarget('bandong')">查看完整飲品</button> -->
    </div>
    <!-- process6 -->
    <div class="process6" id="process6">
      <div class="groupTitle">
        <p>STEP4</p>
        <h5 class="groupText">資訊與付款</h5>
      </div>
      <div class="process6Text">
        <div class="process6Txt">
          <h6 style="font-weight: 700">確認外送資訊與付款</h6>
          <p>
            提供
            <span>完整配送日期、時間與收件人資訊</span>
            。
          </p>
          <p>特殊收件請註明備註，例如：管理室通知；例如需備推車等。</p>
          <p>
            外送人員將依指定日期與時間送達指定地點，請
            <span>清點數量</span>
            並於
            <span>確認單會簽後完成付款</span>
            。
          </p>
        </div>
      </div>
      <!-- <button @click="scrollToTarget('bandong')">查看完整菜單</button> -->
    </div>
  </div>
  <!-- 說明區 -->
  <div class="orderDescription">
    <orderType />
  </div>
  <lastSectionNone />
</template>

<script lang="ts" setup>
import { useAddressStore } from '/stores/address'
import { useUniversal } from '/stores/universal'
import { useAddressDialogStore } from '/stores/useAddressDialogStore'

const { onAddressClick } = useAddressDialogStore()

const { onMessengerClick, onForm1Click, onForm2Click, onMessengerIg, dialNumber, onDownloadClick, onMessengerFB } = useUniversal()
const address = useAddressStore()

useHead({
  title: '中華一餅 | 團訂流程',
  meta: [
    // Description Meta Tag
    {
      name: 'description',
      content: '中華一餅潤餅怎麼訂？簡單七步驟，跟著指引說明，就能輕鬆完訂。先選類型再選內容，再選口味，最後選擇送達日期與時間，中華一餅將依您的訂購日期完成送達！'
    },
    // Open Graph
    {
      property: 'og:title',
      content: '中華一餅團訂流程'
    },
    {
      property: 'og:description',
      content: '中華一餅潤餅怎麼訂？簡單七步驟，跟著指引說明，就能輕鬆完訂。先選類型再選內容，再選口味，最後選擇送達日期與時間，中華一餅將依您的訂購日期完成送達！'
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
      content: 'https://www.chinabing.net/group'
    },
    {
      property: 'og:type',
      content: 'website'
    }
    // ...
  ]
})

const activeTab = ref<string>('process1')
let isScrolling: boolean = false
const $router = useRouter()
const $route = useRoute()

const scrollToTarget = (targetId: string) => {
  $router.push(`/chinaBing#${targetId}`)
}
const scrollToTargetCico = () => {
  $router.push('/cico')
}

const model = ref<any>('選擇地區')
const placeSelectRef = ref<any>(null)

const resetAndClose = () => {
  model.value = '選擇地區' // 还原 model
  placeSelectRef.value.hidePopup() // 关闭 q-select 对话框
}
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

const scrollTo = async (id: string) => {
  activeTab.value = id
  isScrolling = true
  const element = document.getElementById(id)

  if (element) {
    // 檢查 element 是否為 null
    const navbarHeight = getNavbarHeight()
    const y = element.getBoundingClientRect().top + window.scrollY - navbarHeight
    window.scrollTo({ top: y, behavior: 'smooth' })
  } else {
    console.error(`Element with id ${id} not found`)
  }

  // 监听滚动结束
  const onScrollEnd = () => {
    isScrolling = false
    window.removeEventListener('scroll', onScrollEnd)
  }
  window.addEventListener('scroll', onScrollEnd, { once: true })
}

const getNavbarHeight = () => {
  const screenWidth = window.innerWidth
  if (screenWidth < 768) {
    return 160
  } else if (screenWidth >= 768 && screenWidth < 1024) {
    return 200
  } else {
    return 200
  }
}

let scrollTimeout: ReturnType<typeof setTimeout>

const handleScroll = () => {
  if (!isScrolling) {
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      const anchorElements = ['#process1', '#process2', '#process7', '#process3', '#process4', '#process5', '#process6']
        .map(id => document.querySelector(id))
        .filter(el => el)
      for (let i = anchorElements.length - 1; i >= 0; i--) {
        const anchor = anchorElements[i]
        if (anchor) {
          const rect = anchor.getBoundingClientRect()
          if (rect.top < window.innerHeight / 3) {
            if (activeTab.value !== anchor.id) {
              activeTab.value = anchor.id
            }
            break
          }
        }
      }
    }, 50)
  }
  isScrolling = false
}

onMounted(async () => {
  await nextTick()
  adjustScroll()
  window.addEventListener('resize', getNavbarHeight) // you can call it directly if there's no other logic inside
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
@import '/assets/group';
</style>
