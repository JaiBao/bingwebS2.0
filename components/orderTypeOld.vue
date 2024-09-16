<template>
  <!-- 訂單說明 -->

  <div class="descriptionTitle">
    <h4>訂購方式說明</h4>
  </div>

  <!-- 傳真訂購-->
  <div class="descriptonCards row">
    <!-- LINE 訂餐 -->
    <q-card class="descriptonCard2">
      <div class="descriptonCardTitle col-md-4">
        <h5>線上預訂</h5>
        <p>Booking</p>
      </div>
      <div class="descriptionContent2 col-md-8">
        <h6>預訂須知</h6>
        <ul>
          <!--         <!-- <li>
            線上預訂
            <span class="text-pink-6">為第一階段功能開放</span>
            ，開放時段
            <span class="text-pink-6">10：00-18：00</span>
            。
          </li> -->
          -->
          <li>
            預訂服務敬請
            <span class="text-pink-6">填寫完整資料</span>
            並確認，避免資料有誤，
            <span class="text-pink-6">影響您的預訂權益</span>
            。
          </li>
          <li>
            資料填寫完成送出後，此時訂單狀態"
            <span class="text-pink-6">尚未完成</span>
            "待訂餐人員收到資料後，將盡速與您電話確認，當完成訂單內容確認後，方完成預訂作業。
          </li>
        </ul>
        <h6>預訂流程</h6>
        <p class="mg-0">
          1.選擇
          <span class="text-pink-6">餐點類型</span>
          與
          <span class="text-pink-6">訂購數量</span>
        </p>
        <p class="mg-0">
          2.選擇
          <span class="text-pink-6">外送</span>
          或
          <span class="text-pink-6">自取</span>
        </p>
        <p class="mg-0">
          3.選擇
          <span class="text-pink-6">預訂日期</span>
          與
          <span class="text-pink-6">時段</span>
        </p>
        <p class="mg-0">
          4.填寫
          <span class="text-pink-6">訂購人</span>
          與
          <span class="text-pink-6">收件人</span>
          等資料
        </p>
        <p class="mg-0">5.確認預訂資料後送出</p>
        <p class="mg-0">
          6.等候訂餐人員
          <span class="text-pink-6">致電確認訂餐內容</span>
          <!-- ，由訂餐人員
          <span class="text-pink-6">提供訂單編號</span> -->
        </p>
        <p>
          7.
          <span class="text-pink-6">完成預訂作業</span>
        </p>
      </div>
      <div class="descriptionBottom">
        <div class="bottom1">
          <p>※若您未收到訂餐人員與您確認訂單內容，請您主動聯繫我們，若有不便之處，還請見諒！</p>
        </div>
        <div class="bottom2">
          <p>
            預訂專線：
            <span class="pointer" @click="dialNumber">(02)2301-5331</span>
          </p>
        </div>
      </div>
    </q-card>
    <q-card class="descriptonCard">
      <div class="descriptonCardTitle">
        <h5><a href="/menu.pdf" target="_blank">傳真訂購</a></h5>
        <p>Fax Ordering</p>
      </div>
      <div class="descriptionContent col-md-8">
        <p>
          1.下載
          <span @click="onDownloadClick" class="pointer text-pink-8">| 訂購單 |</span>
          後，依訂購單填寫範例進行訂購單填寫後，傳真至 (02)2301-3990
        </p>
        <p>2.服務人員收到傳真後，會致電與您確認訂購內容，確認完畢後，提供訂單編號。</p>
        <p>3.若您未收到服務人員通知，敬請您來電確認(02) 2301-5331，避免影響到您的重要會議或活動場合。</p>
      </div>
    </q-card>
    <!-- 電話預訂 -->
    <q-card class="descriptonCard">
      <div class="descriptonCardTitle">
        <h5><a href="tel:(02)2301-5331" target="_blank">電話預訂</a></h5>
        <p>Phone Ordering</p>
      </div>
      <div class="descriptionContent col-md-8">
        <p>
          電話撥打預訂專線
          <span class="pointer text-pink-8" @click="dialNumber">(02)2301-5331</span>
          ，告知服務人員預訂資訊。
        </p>
        <h6>提供下列訂購資訊，服務人員收到訊息並完成確認後，則會核對訂購資訊並提供訂單編號。</h6>
        <ul>
          <li>預訂日期</li>
          <li>配送時間</li>
          <li>產品數量(盒餐或便當數量，包含潤餅口味)</li>
          <li>送達地點(完整外送地址與備註事項)</li>
          <li>聯絡資料(聯絡人與聯絡電話)</li>
          <li>發票統編</li>
        </ul>
      </div>
    </q-card>
  </div>
</template>
<script setup>
import { useUniversal } from '/stores/universal'
import { useAddressDialogStore } from '/stores/useAddressDialogStore'

const { onAddressClick } = useAddressDialogStore()

const { onMessengerClick, onForm1Click, onForm2Click, onMessengerIg, dialNumber, onDownloadClick, onMessengerFreight, onMessengerFB } = useUniversal()
const router = useRouter()
const navigateToOrder = () => {
  router.push('/onlineOrder')
}
</script>
<style lang="scss" scoped>
.descriptionTitle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-family: 'Noto Sans TC', sans-serif;
  h4 {
    font-size: 1.75rem;
    font-weight: 700;
  }
}
.descriptonCards {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 5%;
  @media (min-width: 992px) {
    flex-direction: row;
    justify-content: space-between;
  }
}
.descriptonCard {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  /* 下方陰影 */
  box-shadow: 10px 10px 18px 0px rgba(0, 0, 0, 0.14);

  width: 100%;
  // height: 420px;
  // margin: 1%;
  padding: 14px 28px;
  margin: 12px 0;
  @media (min-width: 1200px) {
    margin: 0 15px;
    // padding: 28px;
    width: 47.3333%;

    min-height: 400px;
  }
}
.descriptonCard2 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  /* 下方陰影 */
  box-shadow: 10px 10px 18px 0px rgba(0, 0, 0, 0.14);

  width: 100%;
  // height: 420px;
  // margin: 1%;
  padding: 14px 28px;
  margin: 12px 0;
  @media (min-width: 1200px) {
    margin: 15px;
    // padding: 28px;
    width: 100%;

    min-height: 400px;
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

.descriptionContent {
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
      font-size: 1rem;
    }
  }
  ul {
    padding-left: 2%;
  }
  li {
    list-style-type: none; /* 移除預設的列表樣式 */
    color: #6f6f6f;
    font-family: 'Noto Sans TC', sans-serif;
    font-weight: 400;
    font-size: 12px;
    @media (min-width: 768px) {
      font-size: 1rem;
    }
    @media (min-width: 992px) {
      font-size: 1rem;
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
</style>
