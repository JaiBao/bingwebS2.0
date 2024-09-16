<template>
  <!-- 線上點餐dialog -->
  <q-dialog v-model="onlineDialog">
    <div class="onlineOrder">
      <q-btn
        flat
        dense
        round
        icon="close"
        color="white"
        class="close-dialog-button"
        :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderColor: 'black' }"
        @click="closeOnlineClick" />
      <q-card class="descriptonCard2">
        <div class="descriptonCardTitle column justify-center items-center col-md-4">
          <h5 class="mgb-0">中華一餅 - 香臨食品股份有限公司​</h5>
          <h6 class="text-pink-8 mgt-0">蒐集個人資料告知事項暨個人資料提供同意書​​</h6>
        </div>
        <div class="descriptionContent2">
          <p>
            因應個人資料保護法及本公司個人資料管理規定，本公司在向您蒐集個人資料之前，依法向您告知下列事項，當您勾選「同意」，表示您已閱讀、瞭解並同意接受本同意書之所有內容：​
          </p>
          <p class="text-pink-507 containerTitle" style="text-align: left">一、蒐集目的及類別​</p>
          <p>
            為提供訂餐之各項通知服務、資料確認、寄送本公司相關活動訊息及本公司內部管理與蒐集目的之使用，而須獲取您下列個人資料類別：公司名稱、統一編號、地址、姓名、電話、手機、email或其他得以直接或間接識別您個人之資料。​
          </p>
          <p class="text-pink-507 containerTitle" style="text-align: left">二、個人資料利用之期間、地區、對象及方式 ​​</p>
          <p>您的個人資料，除涉及國際業務或活動外，僅供公司及活動協辦單位於中華民國領域，於上述蒐集目的之必要合理範圍內加以利用至前述蒐集目的消失時為止。</p>
          <p class="text-pink-507 containerTitle" style="text-align: left">三、當事人權利行使 ​ ​​</p>
          <p>依據個人資料保護法第3條規定，您可向本公司請求查詢或閱覽、製給複製本、補充或更正、停止蒐集/處理/利用或刪除您的個人資料。 ​</p>
          <p class="text-pink-507 containerTitle" style="text-align: left">四、不提供個人資料之權益影響 ​ ​ ​​</p>
          <p>如您不提供或未提供正確之個人資料，或要求停止蒐集/處理/利用/刪除個人資料、服務訊息的取消訂閱，本公司將無法為您提供蒐集目的之相關服務。​</p>
          <p class="text-pink-507 containerTitle" style="text-align: left">五、各項通知服務、相關訊息之停止寄送​ ​​</p>
          <p> 您可於上班時間 :​</p>
          <p> (09:00-12:00 / 13:00-18:00) 聯繫 : (02) 2278-2325​​</p>

          <p class="text-pink-507" style="text-align: left">個人資料同意提供：​</p>
          <p> 一、本人確已閱讀並瞭解上述告知事項，並勾選「同意」授權貴司於所列目的之必要合理範圍內，蒐集、處理及利用本人之個人資料。 ​​</p>
          <p> 二、本人瞭解此同意書符合個人資料保護法及相關法規之要求，並提供予貴公司留存及日後查證使用。</p>
        </div>
        <div class="processTitle3Btn">
          <button @click="closeOnlineClick">不同意</button>
          <button @click="agreeAndNavigate">同意</button>
        </div>
      </q-card>
    </div>
  </q-dialog>
  <addressDialog />
</template>
<script setup>
import { useDialogStore } from '/stores/useDialogStore'
import { useUniversal } from '/stores/universal'
import { useAddressDialogStore } from '/stores/useAddressDialogStore'
import { useAgreeCollectionStore } from '/stores/agreeCollection'

const { onAddressClick } = useAddressDialogStore()
const { onlineDialog, onOnlineClick, closeOnlineClick } = useDialogStore()
const { onMessengerClick, onForm1Click, onForm2Click, onMessengerIg, dialNumber, onDownloadClick, onMessengerFreight, onMessengerFB } = useUniversal()
const agreeCollection = useAgreeCollectionStore()
const router = useRouter()
const agreeAndNavigate = () => {
  agreeCollection.setAgreement(true)
  closeOnlineClick()
  router.push('/onlineOrder')
}
</script>
<style lang="scss" scoped>
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
    margin-bottom: 2%;
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
  margin-bottom: 2%;
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
    width: 45%;
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

.containerTitle {
  margin: 0;
  text-align: left;
}
</style>
