<template>
  <!-- 信箱 -->
  <q-dialog v-model="emailDialog">
    <q-card style="width: 700px; max-width: 90vw" class="selectedDialog">
      <q-btn
        flat
        dense
        round
        icon="close"
        color="black"
        class="close-dialog-button"
        :style="{ backgroundColor: 'white', borderColor: 'black' }"
        @click="emailDialog = false" />

      <div class="col-md-6 col-12 q-pa-xl message">
        <h1>聯絡表單</h1>
        <h5>業務合作或其他事宜歡迎您透過聯絡表單與我們聯繫(*為必填欄位)</h5>
        <div class="row full-width">
          <q-input color="pink-6" class="col col-xs-12 q-ma-sm" v-model="form.subject" label="主旨*" :input-style="{ fontSize: '1.3rem' }"></q-input>
          <q-input color="pink-6" class="col col-xs-12 q-ma-sm" v-model="form.name" label="聯絡姓名*" :input-style="{ fontSize: '1.3rem' }"></q-input>
        </div>
        <div class="row full-width">
          <q-input color="pink-6" class="col col-xs-12 q-ma-sm" v-model="form.phone" label="聯絡電話*" :input-style="{ fontSize: '1.3rem' }"></q-input>
          <q-input color="pink-6" class="col col-xs-12 q-ma-sm" v-model="form.email" label="聯絡信箱*" :input-style="{ fontSize: '1.3rem' }"></q-input>
        </div>
        <div class="row full-width">
          <q-input color="pink-6" class="col col-xs-12 q-ma-sm" v-model="form.content" label="留言*" type="textarea" :input-style="{ fontSize: '1.3rem' }"></q-input>
        </div>
        <div class="row full-width justify-between">
          <q-input color="pink-6" class="col-7 q-ma-sm col-xs-7" v-model="form.captcha" label="驗證碼*"></q-input>
          <div class="formCaptcha col-4 col-xs-4" @click="refreshCaptcha" :key="captcha">{{ captcha }}</div>
        </div>
        <div class="row justify-end">
          <q-btn label="表單送出" @click="onSubmit"></q-btn>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup>
// import { useQuasar } from 'quasar'
import axios from 'axios'

const $q = useQuasar()

const emailDialog = ref(false)

const onMailClick = () => {
  emailDialog.value = true
}
const form = reactive({
  subject: '',
  name: '',
  phone: '',
  email: '',
  content: '',
  captcha: ''
  // gender: '1'
})
function reset() {
  form.subject = ''
  form.name = ''
  form.phone = ''
  form.email = ''
  form.content = ''
  form.captcha = ''
  // form.gender = '1'
}

const captcha = ref(generateCaptcha())

function generateCaptcha() {
  return Math.random().toString(36).substring(2, 8)
}
const refreshCaptcha = () => {
  captcha.value = generateCaptcha()
}

const onSubmit = async () => {
  if (!form.subject) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '請填寫主旨'
    })
    return
  }
  if (!form.name) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '請填寫聯絡姓名'
    })
    return
  }
  if (!form.phone) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '請填寫連絡電話'
    })
    return
  }
  if (!form.email) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '請填寫聯絡信箱'
    })
    return
  }
  if (!form.content) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '請填寫問題內容'
    })
    return
  }
  const isValid = Object.values(form).every(value => value)
  if (!isValid || form.captcha !== captcha.value) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '驗證碼錯誤'
    })
  } else {
    try {
      await sendDataToAppsScript(form)
      // 清空表單
      reset()

      // 刷新驗證碼
      refreshCaptcha()

      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'check',
        message: '郵件已成功寄出'
      })
    } catch (error) {
      $q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'error',
        message: '郵件發送失敗'
      })
    }
  }
}

const sendDataToAppsScript = async () => {
  const scriptUrl = 'https://www.dtstw.com:3000/data/bing'

  try {
    await axios.post(scriptUrl, form)

    emailDialog.value = false
    // console.log('傳送成功')
  } catch (error) {
    console.error('訊息傳送失敗:', error)
  }
}
</script>

<style lang="scss" scoped>
.selectedDialog {
  position: relative;
  background: #fffaf3;
  @media (min-width: 1500px) {
    width: 1200px;
    max-width: 50vw;
  }
}
.close-dialog-button {
  position: absolute;
  top: 5px;
  right: 10px; /* 调整此值以控制按钮距离右侧的间距 */
  z-index: 2;
  // float: right; /* 浮动至右侧 */
}

.message {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  // align-items: center;

  padding-top: 0;
  h1 {
    color: #f50077;
    font-size: 1.5rem;
    font-weight: 800;
    line-height: 1.4rem;
    padding-top: 25%;
    text-align: center;
    margin-top: 0;
  }
  h5 {
    font-weight: 400;
    white-space: pre-wrap;
    font-size: 1rem;
    line-height: 1.4rem;
    // text-align: center;
    @media (min-width: 768px) {
      text-align: center;
    }
  }
  button {
    font-size: 1.3rem;
    border: 1px solid #000;
    padding: 1% 4%;
  }
}

.formCaptcha {
  height: 60px;
  display: flex;
  flex: row;
  justify-content: center;
  align-items: center;
  background-color: #666;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}
</style>
