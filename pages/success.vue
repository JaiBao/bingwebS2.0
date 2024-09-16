<!-- /success.vue -->
<template>
  <!-- 流線 -->
  <div class="processTitle">
    <h1>線上預訂</h1>
    <div class="process">
      <p>Step1</p>
      <q-icon name="more_horiz" />
      <p>Step2</p>
      <q-icon name="more_horiz" />
      <p style="'color: #f50077; border-bottom: 2px solid #f50077;" class="text-pink-8">Step3</p>
    </div>
  </div>
  <div class="successArea">
    <h6>預訂資訊與單號</h6>
    <q-card v-if="orderCode" class="successCard">
      <div class="successCardLeft">
        <div class="title">
          <h5>訂單編號:{{ orderCode }}</h5>
          <div class="content">
            <p class="lt-md tx-center">訂單資料提交成功！</p>
            <p class="lt-md t">
              <span>我們會盡速與您電話聯繫並進行訂單確認，方完成訂單預訂作業。</span>
            </p>
            <p class="lt-md">
              <span>※ 過程中，您有任何問題或需要協助之處，都歡迎您致電客服專線 02-23015331 與我們聯繫。</span>
            </p>
          </div>
        </div>
        <div class="content">
          <p>
            訂單日期:
            <span>{{ selectedDate }}</span>
          </p>
          <p>
            訂餐時段:
            <span>{{ selectedTime }}</span>
          </p>
          <p>
            訂購數量:
            <span>{{ orderCount }}套</span>
          </p>
          <p>
            餐點費用:
            <span>NT${{ totalPrice }}</span>
          </p>
          <p>
            運費:
            <span>NT${{ deliveryFee }}</span>
          </p>
          <p>
            總金額:
            <span>NT${{ finalPrice }}</span>
          </p>
          <p>
            訂購人姓名:
            <span>{{ name }}</span>
          </p>
          <p>
            訂購人手機:
            <span>{{ tel }}</span>
          </p>
          <p>
            訂購人地址:
            <span>{{ address }}</span>
          </p>
        </div>
      </div>
      <div class="successCardRight">
        <div class="content">
          <p class="gt-sm">
            訂單資料提交成功！
            <br />
            <span>我們會盡速與您電話聯繫並進行訂單確認，方完成訂單預訂作業。</span>
          </p>
          <!-- <p class="gt-sm">
            收到您的資料後，
            <span>我們會盡速回電確認訂餐資訊</span>
            ，
            <span>確認完畢訂單才為成立</span>
            。
          </p> -->
          <p class="gt-sm">
            ※過程中，您有任何問題或需要協助之處，都歡迎您致電客服專線
            <span>02-23015331</span>
            與我們聯繫。
          </p>
          <br class="gt-sm" />
          <br class="gt-sm" />
          <p>
            <span>付款作業</span>
            等其他問題，歡迎查看
            <span @click="navigateToFAQ" class="pointer isLink">常見問題</span>
          </p>
          <ul>
            <!-- <li>
              查詢訂單：
              <span>需取得訂單編號</span>
              才能
              <span>查詢訂單狀態</span>
              。
            </li> -->
          </ul>
          <div class="column justify-center" id="successBtn">
            <q-btn outline color="pink-8" to="/search">可隨時查詢訂單狀態</q-btn>
          </div>
          <div class="text">
            <p>聯絡電話：(02)2301-5331</p>
          </div>
        </div>
        <div class="bingman">
          <div class="text">
            <!-- <p>外送傳真：(02)2301-3990</p> -->
          </div>
          <img class="gt-sm" src="/online/bingman2.png" alt="服務員" />
        </div>
      </div>
    </q-card>
    <q-card v-else class="successCard">
      <div class="successCardLeft">
        <div class="title">
          <h5 class="text-pink-8">訂單不存在</h5>
        </div>
        <div class="content">
          <p>訂單日期:</p>
          <p>訂餐時段:</p>
          <p>訂購數量:</p>
          <p>訂購人姓名:</p>
          <p>訂購人手機:</p>
          <p>訂購人地址:</p>
        </div>
      </div>
      <div class="successCardRight">
        <div class="content">
          <p>
            <span>請注意</span>
            ！
            <span>目前頁面無訂單資訊</span>
            ！
          </p>
          <p>請依下述狀況進行排除</p>
          <ul>
            <!-- <li>
              若是剛剛已獲得訂單編號，
              <span>下載的傳真訂單內</span>
              已有幫您輸入資訊，
              <span>請繼續完成訂餐程序即可</span>
              。
            </li> -->
            <li>
              若是剛剛完成預訂，但未獲得訂單編號，
              <span>請耐心等待店家聯繫</span>

              。
            </li>
            <li>
              若是未完成預訂請您返回
              <span>點餐頁面</span>
              ，重新點餐
            </li>
          </ul>
          <div class="row justify-center" id="successBtn">
            <q-btn outline color="pink-8" class="w-100" to="/onlineOrder">返回預訂頁面</q-btn>
          </div>
        </div>
        <div class="bingman">
          <div class="text">
            <p>門市專線：(02)2301-5331</p>
            <p>外送傳真：(02)2301-3990</p>
          </div>
          <img class="gt-sm" src="/online/bingman2.png" alt="服務員" />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { PDFDocument } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { useOrderDetailStore } from '/stores/orderDetail'
import { useUniversal } from '~/stores/universal'

const { onMessengerClick, onForm1Click, onForm2Click, onMessengerIg, dialNumber, onDownloadClick } = useUniversal()
// const paymentForm = ref('')

// const fetchPaymentForm = async () => {
//   try {
//     const response = await fetch('http://localhost:8080/create-ecpay-order', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         amount: 1000,
//         tradeDesc: '測試商品描述',
//         itemNames: ['商品1', '商品2']
//       })
//     })

//     const data = await response.json()
//     paymentForm.value = data.html
//     console.log(paymentForm.value)
//   } catch (error) {
//     console.error('Error fetching payment form:', error)
//   }
// }

const orderDetail = useOrderDetailStore()
const orderCode = orderDetail.orderCode
const name = orderDetail.name
const tel = orderDetail.tel
const address = orderDetail.address
const selectedDate = orderDetail.selectedDate
const selectedTime = orderDetail.selectedTime
const orderCount = orderDetail.orderCount
const totalPrice = orderDetail.totalPrice
const deliveryFee = orderDetail.deliveryFee
const finalPrice = orderDetail.finalPrice
// console.log('PDF的:', orderDetail.orderCount)

const pdfUrl = ref('')
const router = useRouter()
const navigateToFAQ = () => {
  router.push('/faq')
}

function openPdfInNewTab() {
  if (pdfUrl.value) {
    window.open(pdfUrl.value, '_blank')
  }
}
async function editPdf() {
  try {
    // 從 public 目錄加載現有的 PDF 文件
    const existingPdfBytes = await fetch('/menu.pdf').then(res => res.arrayBuffer())

    // 加載 PDF 文件
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    pdfDoc.registerFontkit(fontkit)
    // 從 public 目錄加載自定義字體
    const fontBytes = await fetch('/NotoSansTC.ttf').then(res => res.arrayBuffer())
    const customFont = await pdfDoc.embedFont(fontBytes)
    // 編輯 PDF 文件
    const page = pdfDoc.getPage(1) // 獲取第一頁
    const page2 = pdfDoc.getPage(2) // 獲取第一頁
    page.drawText(`訂單編號:${orderCode}`, {
      x: 400,
      y: 800,
      size: 12,
      font: customFont
    })
    page.drawText(`預訂:${orderCount}份`, {
      x: 400,
      y: 780,
      size: 12,
      font: customFont
    })
    page.drawText(`${name}`, {
      x: 80,
      y: 725,
      size: 12,
      font: customFont
    })
    page.drawText(`${selectedDate}`, {
      x: 87,
      y: 750,
      size: 12,
      font: customFont
    })
    page.drawText(`${selectedTime}`, {
      x: 450,
      y: 750,
      size: 12,
      font: customFont
    })
    page.drawText(`${tel}`, {
      x: 450,
      y: 725,
      size: 12,
      font: customFont
    })
    page.drawText(`${address}`, {
      x: 80,
      y: 680,
      size: 12,
      font: customFont
    })

    //第三頁
    page2.drawText(`訂單編號:${orderCode}`, {
      x: 400,
      y: 800,
      size: 12,
      font: customFont
    })
    page2.drawText(`預訂:${orderCount}份`, {
      x: 400,
      y: 780,
      size: 12,
      font: customFont
    })
    page2.drawText(`${name}`, {
      x: 80,
      y: 725,
      size: 12,
      font: customFont
    })
    page2.drawText(`${selectedDate}`, {
      x: 87,
      y: 750,
      size: 12,
      font: customFont
    })
    page2.drawText(`${selectedTime}`, {
      x: 450,
      y: 750,
      size: 12,
      font: customFont
    })
    page2.drawText(`${tel}`, {
      x: 450,
      y: 725,
      size: 12,
      font: customFont
    })
    page2.drawText(`${address}`, {
      x: 80,
      y: 680,
      size: 12,
      font: customFont
    })
    // 序列化 PDF 文件
    const pdfBytes = await pdfDoc.save()
    // 將編輯後的 PDF 轉換為 Blob，然後創建一個 URL
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    pdfUrl.value = URL.createObjectURL(blob)
  } catch (error) {
    console.error('Error editing PDF:', error)
  }
}
onMounted(async () => {
  editPdf()
})
</script>
<style lang="scss" scoped>
.processTitle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 1rem;
    color: #f50077;
    font-weight: 700;
    line-height: 1rem;
  }
  .process {
    display: flex;
    flex-direction: row;
    align-items: center;
    p {
      margin: 0;
      font-size: 0.875rem;
    }
    .q-icon {
      font-size: 1rem;
      margin: 0 10px;
    }
  }
  @media (min-width: 992px) {
    h1 {
      font-size: 1.3125rem;
    }
    .process {
      p {
        font-size: 1.125rem;
      }
      .q-icon {
        margin: 0 50px;
        font-size: 2rem;
      }
    }
  }
}

.successArea {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0% 4% 2% 4%;
  h6 {
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: #f50077;
    margin: 2% 0;
  }
  @media (min-width: 1024px) {
    padding: 0% 16% 2% 16%;
    h6 {
      font-size: 2.375rem;
    }
  }
}
.successCard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #fff;
  padding: 5%;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    padding: 0%;
    flex-direction: row;
    align-items: flex-start;
  }
}
.successCardLeft {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: #fffaf3;
  margin: 2%;
  padding: 0% 5% 5% 5%;
  width: 100%;
  .title {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // text-align: center;
    h5 {
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin-bottom: 0;
      span {
        font-size: 16px;
      }
    }
    p {
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: 160%; /* 19.2px */
      width: 100%;
      span {
        color: #f50077;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    p {
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: 160%; /* 19.2px */
      span {
        color: #f50077;
      }
    }
  }
  @media (min-width: 1024px) {
    margin: 2%;
    width: 48%;
    .title {
      // align-items: center;
      align-items: flex-start;
      justify-content: flex-start;
      text-align: left;
      h5 {
        font-size: 2rem;
        margin-bottom: 5%;
        span {
          font-size: 21px;
        }
      }
      p {
        font-size: 1.125rem;
      }
    }
    .content {
      p {
        font-size: 1.125rem;
      }
    }
  }
}
.successCardRight {
  display: flex;
  flex-direction: column;
  padding: 2% 5%;
  width: 100%;
  margin-top: 2%;
  p {
    margin: 0;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 180%; /* 25.2px */
    color: #2b2b2b;
    span {
      color: #f50077;
    }
  }
  li {
    margin: 0;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 180%; /* 25.2px */
    color: #2b2b2b;
    span {
      color: #f50077;
    }
  }
  #successBtn {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    .q-btn {
      width: 100%;
      font-size: 1.125rem;
    }
  }
  @media (min-width: 1024px) {
    padding: 2%;
    width: 48%;
    justify-content: space-between;

    p {
      font-size: 1.125rem;
    }
    li {
      font-size: 1.125rem;
    }
    #successBtn {
      width: 70%;
      // .q-btn {
      //   font-size: 1.1125rem;
      // }
      margin: 5% 0;
    }
    .bingman {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: -20%;
      .text {
        margin-bottom: 4%;
        p {
          color: #2b2b2b;
          font-size: 0.875rem;
          font-style: normal;
          font-weight: 400;
          line-height: 160%; /* 22.4px */
        }
      }
      img {
        width: 38%;
        object-fit: contain;
        // margin-top: -10%;
      }
    }
  }
}
</style>
