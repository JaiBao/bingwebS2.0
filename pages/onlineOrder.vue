<template>
  <!-- 對話框組件 -->
  <q-dialog v-model="cartDialogStore.isCartDialogOpen" class="cartMobile" position="right">
    <div class="cartMobile">
      <!-- 新增的關閉按鈕 -->
      <q-btn
        flat
        dense
        round
        icon="close"
        color="white"
        class="close-dialog-button"
        @click="handleButtonClose"
        :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderColor: 'black' }" />
      <cart />
    </div>
  </q-dialog>
  <!-- 餐點購物車區域 -->
  <div class="mealCart" v-if="!mealStore.selectedMeal">
    <div class="meal">
      <meal />
    </div>
    <div class="cart">
      <cart />
    </div>
    <!-- 手機購物車 -->
    <q-btn v-if="cartQuantity > 0" @click="cartDialogStore.openDialog" class="cartBtn lt-md">
      <q-icon name="shopping_cart"></q-icon>
      <span class="cart-quantity">{{ cartQuantity }}</span>
    </q-btn>
  </div>
  <!-- 日期、姓名區域 -->

  <div class="orderArea" v-if="mealStore.selectedMeal">
    <!-- 流線 -->
    <div class="processTitle">
      <h1>線上預訂</h1>
      <div class="process">
        <p :style="!selectedTime ? 'color: #f50077; border-bottom: 2px solid #f50077;' : ''">Step1</p>
        <q-icon name="more_horiz" :class="{ 'text-pink-8': !selectedTime }" />
        <p :style="selectedDate && !orderIsFullForSelectedDate && selectedTime ? 'color: #f50077; border-bottom: 2px solid #f50077;' : ''">Step2</p>
        <q-icon name="more_horiz" :class="{ 'text-pink-8': selectedDate && !orderIsFullForSelectedDate && selectedTime }" />
        <p>Step3</p>
      </div>
    </div>
    <div class="dateTime" v-if="!selectedTime">
      <div class="title">
        <h2>選擇時間與日期</h2>
        <!-- <div class="titleTxt">
          <p class="xs">
            請務必了解
            <span class="text-pink-8">"線上預訂"</span>
            的流程
          </p>
          <ul class="xs">
            <li>我將在每日的00:00開放下周的可訂餐日</li>
            <li>潤餅手工現做，限量供應，以下開放的時間</li>
          </ul>
        </div> -->
        <div class="example">
          <!-- <h6>接單量狀態:</h6> -->
          <!-- <div class="exampleBtn">
            <p>本時段開放預訂</p>
            <q-btn outline class="text-pink-8 w-100 fz-1125r">09:00-10:00</q-btn>
          </div>
          <div class="exampleBtn">
            <p>本時段已滿單，無法預訂</p>
            <q-btn outline class="text-grey-7 w-100 fz-1125r">09:00-10:00</q-btn>
          </div>
          <div class="exampleBtn">
            <p>本時段即將滿單</p>
            <q-btn outline class="text-orange-8 w-100 fz-1125r">09:00-10:00</q-btn>
          </div> -->
        </div>
        <!-- <div class="pinkLine"></div> -->
      </div>
      <div :class="{ timeAndDate: true, nodate: !selectedDate }">
        <!-- 步驟一 -->
        <div :class="{ step1: true, noDateStep1: !selectedDate }">
          <!-- Quasar日期選擇器 -->
          <q-date
            v-model="order.selectedDate"
            :options="order.dateOptions"
            @click="order.onDateChange"
            class="orderDate"
            :title="dateTitle"
            subtitle="中華一餅"
            :locale="locale"
            :navigation-min-year-month="currentYearMonth"
            color="pink-6">
            <template v-slot>
              <!-- <div class="look">
              <button
                @click="goToToday"
                :disabled="order.todayIsFull"
                :style="order.todayIsFull ? { color: 'grey', cursor: 'not-allowed' } : { color: 'white', cursor: 'pointer' }">
                {{ order.todayIsFull ? '今日已訂滿' : '我想訂購今日' }}
              </button> -->
              <!-- <div v-if="selectedDate" :disabled="orderIsFullForSelectedDate" :style="orderIsFullForSelectedDate ? { color: 'grey' } : { color: 'pink-6' }">
              {{ orderIsFullForSelectedDate ? '所選日期已訂滿' : `尚可訂購` }}
              <span v-if="!orderIsFullForSelectedDate" style="color: red">{{ remainingOrders }}</span>
              <span v-if="!orderIsFullForSelectedDate">套</span>
            </div> -->
              <!-- </div> -->
            </template>
          </q-date>
          <div class="step2Btn" id="step2Btn" v-if="!selectedDate">
            <div class="step2Btns">
              <q-btn outline color="pink-8 fz-1125r" @click="mealStore.toggleSelectedMeal">上一步</q-btn>
              <q-btn outline color="pink-8 fz-1125r" @click="nextStep">下一步</q-btn>
            </div>
            <p>
              ※本系統提供30天內的預訂，最快可預訂為2日後。
              <br />
              (當日與隔日不提供線上預訂，若有臨時需求可洽詢訂餐專線確認)
            </p>
            <p>餐點供應時間：</p>
            <ul>
              <li>
                周一至周五
                <span class="text-pink-6">10:00-18:00</span>
              </li>
              <li>
                周末假日或特定時段請致電
                <span class="text-pink-6 pointer" @click="dialNumber">訂餐專線</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 步驟二 -->
        <div v-if="selectedDate && !orderIsFullForSelectedDate && !selectedTime" class="step2">
          <!-- 時段選擇按鈕 -->
          <div class="timeSlot" id="timeSlot">
            <div v-for="slot in timeSlots" :key="slot" class="timeSlotItem">
              <q-btn
                :outline="tempSelectedTime !== slot"
                :color="isTimeSlotFull(selectedDate, slot) ? 'grey' : remainingOrdersForTimeSlot[slot] < 30 ? 'orange-14' : 'pink-6'"
                @click="selectTimeTemp(slot)"
                :disable="isTimeSlotFull(selectedDate, slot)">
                {{ slot }}
              </q-btn>
            </div>
          </div>
          <div class="pinkLine"></div>
          <div class="step2Btn" id="step2Btn">
            <div class="step2Btns">
              <q-btn outline color="pink-8 fz-1125r" @click="mealStore.toggleSelectedMeal">上一步</q-btn>
              <q-btn outline color="pink-8 fz-1125r" @click="nextStep">下一步</q-btn>
            </div>
            <p>
              ※ 本預訂系統
              <span class="text-pink-6">僅供一個工作日前預訂</span>
            </p>
            <p>餐點供應時間：</p>
            <ul>
              <li>
                周一至周五
                <span class="text-pink-6">10:00 - 18:00</span>
              </li>
              <li>
                周末假日或特定時段請致電
                <span class="text-pink-6 pointer" @click="dialNumber">訂餐專線</span>
                或
                <span class="text-pink-6">傳真預訂作業</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 步驟三 -->
    <div class="step3" v-if="selectedTime">
      <h5>填寫聯絡資料</h5>

      <!-- 訂單區 -->

      <div class="mealOptions">
        <q-card class="bg-white personCard">
          <div class="cardLeft">
            <div class="row w-100">
              <div class="person w-48 w-md-24">
                <p>訂單日期</p>
                <q-input class="personForms" color="pink-8 " v-model="personForm.date" outlined :class="{ haveTxt: personForm.date !== '' }" readonly />
              </div>
              <div class="person w-48 w-md-24">
                <p>訂單時間</p>
                <q-input color="pink-8" class="personForms" v-model="personForm.time" outlined :class="{ haveTxt: personForm.time !== '' }" readonly />
              </div>
              <div class="person w-48 w-md-24">
                <p>訂餐數量</p>
                <q-input
                  disable
                  outlined
                  color="pink-8"
                  class="personForms"
                  v-model="cartStore.totalItems"
                  @input="checkOrderCount"
                  :class="{ haveTxt: orderCount !== 0 }" />
                <!--     :label="'最高上限' + getTimeSlotOrderCount(selectedDate, selectedTime) + ' 套'" -->
              </div>
              <div class="person w-48 w-md-24">
                <p>取貨方式</p>
                <q-select
                  color="pink-8"
                  class="personForms"
                  v-model="personForm.pick"
                  outlined
                  label="取貨方式"
                  :options="picks"
                  :class="{ haveTxt: personForm.pick !== '' }" />
              </div>
            </div>
            <div class="row justify-start w-100">
              <div class="person w-96 w-md-48">
                <p>公司名稱</p>
                <q-input color="pink-8" class="personForms" v-model="personForm.company" outlined label="公司名稱" :class="{ haveTxt: personForm.company !== '' }" />
              </div>
              <div class="person w-96 w-md-30">
                <p>統一編號</p>
                <q-input
                  color="pink-8"
                  class="col-6 personForms"
                  label="統一編號"
                  v-model="personForm.compilation"
                  outlined
                  :disable="personForm.is_payment_tin"
                  :class="{ haveTxt: personForm.compilation !== '' }" />
              </div>
              <div class="person w-96 w-md-18 row justify-end">
                <q-checkbox
                  v-model="personForm.is_payment_tin"
                  class="radio"
                  size="lg"
                  color="pink-8"
                  checked-icon="radio_button_checked"
                  unchecked-icon="radio_button_unchecked">
                  不需統編
                </q-checkbox>
              </div>
            </div>
            <div class="row justify-start w-100">
              <div class="person w-96 w-md-36">
                <p>
                  訂購人姓名
                  <span class="isMust">必填</span>
                </p>
                <q-input color="pink-8" class="personForms" v-model="personForm.name" outlined label="訂購人姓名" :class="{ haveTxt: personForm.name !== '' }" />
                <span class="hint">★尚未支援英文名</span>
              </div>
              <div class="person w-96 w-md-12 justify-center">
                <q-option-group :options="optionsGender" type="radio" v-model="personForm.gender2" dense class="optionGroup radio" />
              </div>
              <div class="person w-96 w-md-18">
                <p>
                  訂購人手機
                  <span class="isMust">必填</span>
                </p>
                <q-input label="手機號碼" color="pink-8" class="col-6 personForms" v-model="personForm.tel" outlined :class="{ haveTxt: personForm.tel !== '' }" />
                <span class="hint">★範例:09xxxxxxxx</span>
              </div>
              <div class="person w-96 w-md-30">
                <p>市話/公司電話</p>
                <div class="row">
                  <q-input label="區碼" color="pink-8" class="personForms prefix" v-model="personForm.prefix" outlined :class="{ haveTxt: personForm.prefix !== '' }" />
                  <q-input
                    label="市話"
                    color="pink-8"
                    class="col-4 personForms hometel"
                    v-model="personForm.hometel"
                    outlined
                    :class="{ haveTxt: personForm.hometel !== '' }" />
                  <q-input
                    label="分機"
                    color="pink-8"
                    class="col-3 personForms hometel2"
                    v-model="personForm.hometel2"
                    outlined
                    :class="{ haveTxt: personForm.hometel2 !== '' }" />
                </div>
              </div>
            </div>

            <div class="row items-end" id="orderAddress" v-if="!isPickup">
              <div class="person w-48 w-md-24">
                <p>
                  送達地址
                  <span class="isMust">必填</span>
                </p>
                <q-select
                  color="pink-8"
                  class="col-3 personForms"
                  type="text"
                  outlined
                  v-model="personForm.address"
                  label="縣市"
                  :options="addressOptions"
                  :class="{ haveAddress: personForm.address !== '' }" />
              </div>
              <div class="person w-48 w-md-24">
                <q-select
                  class="col-3 personForms"
                  outlined
                  v-model="personForm.city"
                  label="地區"
                  :options="cityOptions"
                  :class="{ haveCity: personForm.city !== '' }" />
              </div>
              <!-- 路名 -->
              <div class="person w-96 w-md-48">
                <q-input
                  class="col-4 personForms"
                  @compositionstart="onCompositionStart"
                  @compositionend="onCompositionEnd"
                  outlined
                  v-model="personForm.road"
                  label="路段"
                  @input="onInput"
                  :class="{ haveTxt: personForm.road !== '' }">
                  <template v-slot:append>
                    <q-icon name="arrow_drop_down" class="cursor-pointer" :class="{ 'text-pink-8': personForm.road !== '' }" @click="toggleDropdown" />
                  </template>
                  <q-menu v-model="dropdownOpen" fit no-focus>
                    <q-list>
                      <q-item v-for="option in filteredRoadOptions" :key="option.label" clickable @click="selectOption(option)">
                        <q-item-section>{{ option.label }}</q-item-section>
                      </q-item>
                      <q-item v-if="filteredRoadOptions.length === 0">
                        <q-item-section class="text-h6 text-center">無此路段</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-input>
              </div>
              <div class="person w-96">
                <q-input class="col-2 personForms" outlined v-model="personForm.address1" type="text" l :class="{ haveTxt: personForm.address1 !== '' }" />
                <span class="hint">★ 範例：311 巷 43 弄 26 號</span>
              </div>
            </div>
            <div class="row justify-start w-100">
              <div class="person w-96 w-md-36">
                <q-checkbox label="同訂購人資料" v-model="personForm.sameOrderCustomer" class="q-mr-md lt-md" />
                <p>
                  收件人姓名
                  <span class="isMust">必填</span>
                </p>
                <q-input
                  color="pink-8"
                  class="personForms"
                  v-model="personForm.recipient"
                  outlined
                  label="收件人姓名"
                  :class="{ haveTxt: personForm.recipient !== '' }" />
                <q-checkbox label="同訂購人資料" v-model="personForm.sameOrderCustomer" class="q-mr-md gt-sm" />
              </div>
              <div class="person w-96 w-md-12 justify-center">
                <q-option-group :options="optionsGender" type="radio" v-model="personForm.gender3" dense class="optionGroup2 radio" />
              </div>
              <div class="person w-96 w-md-48">
                <p>
                  收件人手機
                  <span class="isMust">必填</span>
                </p>
                <q-input
                  color="pink-8"
                  class="col-6 personForms"
                  label="手機號碼"
                  v-model="personForm.recipientTel"
                  outlined
                  :class="{ haveTxt: personForm.recipientTel !== '' }" />
              </div>
            </div>
            <div class="row w-100">
              <p>特殊指示</p>
              <q-input class="w-100 custom-bg-color ta-lh-13" v-model="personForm.comment" filled type="textarea" label="新增備註"></q-input>
              <span class="hint">★ 您的備註需求，將由服務人員與您電話討論後確認</span>
            </div>
          </div>
          <!-- <div class="cardRight">
            <h6>再次溫馨提醒您：</h6>
            <ul>
              <li>
                請務必了解 “
                <span class="isLink text-primary pointer" @click="onFabClick">線上預訂</span>
                ” 流程
              </li>
              <li>
                大台北地區免運金額/點擊
                <a @click="onAddressClick" class="text-primary pointer isLink">運費金額一覽表</a>
                查詢
              </li>
              <li>
                <span class="text-pink-8">5 個以下</span>
                盒餐可透過電話預訂門市自取。
              </li>
              <li>
                <span class="text-pink-8">200個以上</span>
                盒餐請您透過
                <span class="text-pink-8">預訂專線</span>
                ，由專人為您服務。
              </li>
            </ul>
            <div class="cardRightImg">
              <img src="/online/sell.png" alt="外送" class="gt-sm" style="" />
            </div>
          </div> -->
          <!-- 新增訂購按鈕 -->
          <div class="btn row w-100 justify-around" id="personCardBtn">
            <q-btn class="w-96 w-md-24 m-2 fz-1125r" @click="order.onDateChange()" color="pink-8" outline>上一步</q-btn>
            <q-btn color="pink-8 fz-1125r" outline class="w-96 w-md-24 m-2" v-if="canAddOrder" @click="onOrderClick">下一步</q-btn>

            <q-btn class="w-96 w-md-24 m-2 fz-1125r" v-else disable color="grey">超過可訂購數量，請重新選擇</q-btn>
            <!-- <div>該時段尚可訂購 {{ getTimeSlotOrderCount(selectedDate, selectedTime) }} 套。</div> -->
          </div>
        </q-card>
      </div>
    </div>
  </div>
  <q-dialog v-model="orderCheck">
    <q-card class="checkCard">
      <div class="dialogTxt">
        <q-btn
          flat
          dense
          round
          icon="close"
          color="white"
          class="close-dialog-button"
          :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderColor: 'black' }"
          @click="orderCheck = false" />
        <div class="title">
          <p>請確認聯絡資料</p>
        </div>
        <div class="content">
          <p>
            預訂日期:
            <span>{{ selectedDate }}</span>
          </p>
          <p>
            預訂時段:
            <span>{{ selectedTime }}</span>
          </p>

          <p>
            訂購人姓名:
            <span>{{ personForm.name }}</span>
          </p>
          <p>
            訂購人電話:
            <span>{{ personForm.tel }}</span>
          </p>
          <p v-if="personForm.company">
            公司名稱:
            <span>{{ personForm.company }}</span>
          </p>
          <p v-if="personForm.compilation">
            統一編號:
            <span>{{ personForm.compilation }}</span>
          </p>
          <p>
            收件人姓名:
            <span>{{ personForm.recipient }}</span>
          </p>
          <p>
            收件人電話:
            <span>{{ personForm.recipientTel }}</span>
          </p>
          <p>
            取貨方式:
            <span>{{ personForm.pick.label }}</span>
          </p>

          <p v-if="!isPickup">
            送達地址:
            <span>{{ address }}</span>
          </p>

          <p>
            訂餐數量:
            <span>{{ orderCount }}套</span>
          </p>

          <p>
            餐點金額:
            <span>NT $ {{ totalPrice }}</span>
          </p>
          <p>
            運費金額:
            <span class="text-red" v-if="showDeliveryNotice && !isPickup">*此區域需由服務人員確認後，告知正確地運費金額</span>
            <span v-else>NT $ {{ deliveryFee }}</span>
          </p>

          <p>
            總金額:
            <span>NT $ {{ finalPrice }}</span>
          </p>
          <p>
            備註:
            <span>{{ personForm.comment }}</span>
          </p>
        </div>
        <div class="dialogbtn">
          <q-btn outline color="pink-8" class="lookCartBtn fz-1125r" @click="handleButtonClick">查看餐點明細</q-btn>
        </div>
        <div class="row justify-around w-100" id="dialogBtn">
          <q-btn outline class="col-4 fz-1125r" color="pink-8" @click="addOrder" :disabled="isSubmitting" :label="isSubmitting ? '傳送中...' : '送出'" />
          <q-btn class="col-4 fz-1125r" @click="orderCheck = false" outline color="pink-8">取消</q-btn>
          <!-- <q-btn color="red" to="/testOrder">返回訂購區</q-btn> -->
        </div>
      </div>
    </q-card>
    <!-- <q-card class="checkCard" v-if="!agree">
      <h4 class="pink-8">中華一餅 - 香臨食品股份有限公司​</h4>
      <h5 class="pink-8">蒐集個人資料告知事項暨個人資料提供同意書​</h5>
      <p>
        因應個人資料保護法及本公司個人資料管理規定，本公司在向您蒐集個人資料之前，依法向您告知下列事項，當您勾選「同意」，表示您已閱讀、瞭解並同意接受本同意書之所有內容：
      </p>
      <h6>​一、蒐集目的及類別</h6>
      <p>
        為提供訂餐之各項通知服務、資料確認、寄送本公司相關活動訊息及本公司內部管理與蒐集目的之使用，而須獲取您下列個人資料類別：公司名稱、統一編號、地址、姓名、電話、手機、email或其他得以直接或間接識別您個人之資料。
      </p>
      <h6>​二、個人資料利用之期間、地區、對象及方式</h6>
      <p>您的個人資料，除涉及國際業務或活動外，僅供公司及活動協辦單位於中華民國領域，於上述蒐集目的之必要合理範圍內加以利用至前述蒐集目的消失時為止。</p>
      <h6>​三、當事人權利行使</h6>
      <p>依據個人資料保護法第3條規定，您可向本公司請求查詢或閱覽、製給複製本、補充或更正、停止蒐集/處理/利用或刪除您的個人資料。</p>
      <h6>四、不提供個人資料之權益影響</h6>
      <p>如您不提供或未提供正確之個人資料，或要求停止蒐集/處理/利用/刪除個人資料、服務訊息的取消訂閱，本公司將無法為您提供蒐集目的之相關服務。</p>
      <h6>​五、各項通知服務、相關訊息之停止寄送</h6>
      <p>您可於上班時間 :</p>
      <p>(09:00-12:00 / 13:00-18:00) 聯繫 : (02) 2278-2325​​</p>
      <h6>個人資料同意提供：</h6>
      <h6>​一、本人確已閱讀並瞭解上述告知事項，並勾選「同意」授權貴會於所列目的之必要合理範圍內，蒐集、處理及利用本人之個人資料。</h6>
      <h6>​二、本人瞭解此同意書符合個人資料保護法及相關法規之要求，並提供予貴公司留存及日後查證使用</h6>
    </q-card> -->
  </q-dialog>

  <!-- 線上點餐dialog -->
  <onlineOrder />
  <lastSectionGrey />
</template>

<script setup>
import { useOrderStore } from '/stores/orderStore'
import { useOrderDetailStore } from '/stores/orderDetail'
import { useOrderAddress } from '/stores/orderAddress'
import { DateTime } from 'luxon'
import axios from 'axios'
import { useUniversal } from '/stores/universal'
import { useDialogStore } from '/stores/useDialogStore'
import { useAddressDialogStore } from '/stores/useAddressDialogStore'
import { useCartStore } from '/stores/cart'
import { useMealStore } from '/stores/mealStore'
import { showNotify } from '/stores/notifications.js'
import { useCartDialogStore } from '/stores/cartDialogStore'
import { useAgreeCollectionStore } from '/stores/agreeCollection'
const agreeCollection = useAgreeCollectionStore()
useHead({
  title: '中華一餅 | 手作輕食 潤餅盒餐外送第一品牌',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }
    // ...
  ]
})

const isSubmitting = ref(false) // 控制按鈕的禁用狀態和文字

const cartDialogStore = useCartDialogStore()

const mealStore = useMealStore()
const cartStore = useCartStore()
onBeforeMount(() => {
  cartStore.initializeStore()
})
const isCartDialogOpen = ref(false)

function toggleCartDialog() {
  isCartDialogOpen.value = !isCartDialogOpen.value
}

function handleButtonClick() {
  cartDialogStore.openDialog()
  cartDialogStore.openNoBtn()
}

function handleButtonClose() {
  cartDialogStore.closeDialog()
  cartDialogStore.closeNoBtn()
}

const cartQuantity = computed(() => cartStore.nextOrderId - 1)

const { onAddressClick } = useAddressDialogStore()

const { onOnlineClick } = useDialogStore()

const { onMessengerClick, onForm1Click, onForm2Click, onMessengerIg, dialNumber, onDownloadClick, onMessengerFreight, onMessengerFB } = useUniversal()
const orderCheck = ref(false)

// 手機號碼規則
const validatePhoneNumber = number => {
  const phoneRegex = /^09\d{8}$/
  return phoneRegex.test(number)
}
// 姓名中文
const validateChineseName = name => {
  const chineseRegex = /^[\u4e00-\u9fa5]+$/
  return chineseRegex.test(name)
}
// 統編驗證
const validateTaiwanBusinessNumber = number => {
  // 檢查字元是否符合規則
  const regex = /^[0-9]{8}$/

  // 統一編號 邏輯乘數
  const logicMultipliers = [1, 2, 1, 2, 1, 2, 4, 1]

  // 計算陣列總和
  const sum = numbers => {
    const initialValue = 0
    const sumWithInitial = numbers.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), initialValue)
    return sumWithInitial
  }

  if (number.length !== 8 || !regex.test(number)) {
    return false
  }

  let logicProductArr = []
  let logicProduct = 0
  // 通一編號倒數第二位為7時，乘積之和最後第二位數取0或1均可，其中之一和能被5整除，則符合統編邏輯
  if (number[6] == '7') {
    for (let i = 0; i < number.length; i++) {
      if (i != 6) {
        logicProductArr.push(parseInt(number[i]) * logicMultipliers[i])
      }
    }
  } else {
    for (let i = 0; i < number.length; i++) {
      logicProductArr.push(parseInt(number[i]) * logicMultipliers[i])
    }
  }

  for (const item of logicProductArr) {
    logicProduct += sum(item.toString().split(''))
  }

  if (number[6] === '7' && (logicProduct % 5 === 0 || (logicProduct + 1) % 5 === 0)) {
    return true
  } else if (logicProduct % 5 === 0) {
    return true
  }

  return false
}

// const validateTaiwanBusinessNumber = number => {
//   const regex = /^\d{8}$/
//   if (!regex.test(number)) {
//     return false // 確保格式為8位數字
//   }

//   const weights = [1, 2, 1, 2, 1, 2, 4, 1] // 每位數字的權重
//   const nums = number.split('').map(num => parseInt(num, 10))
//   let sum = 0

//   nums.forEach((num, index) => {
//     let product = num * weights[index]
//     if (product >= 10) {
//       product = Math.floor(product / 10) + (product % 10) // 如產品大於等於10則將十位數和個位數相加
//     }
//     sum += product
//   })

//   return sum % 10 === 0 || (nums[6] === 7 && sum % 10 === 9) // 總和應該是10的倍數，或者第七位數字為7且總和模10為9
// }

const onOrderClick = () => {
  if (!personForm.name) {
    showNotify('請填寫姓名', false)
    return
  }
  if (!personForm.recipient) {
    showNotify('請填寫收件人', false)
    return
  }
  if (!personForm.pick) {
    showNotify('請選擇取貨方式', false)
    return
  }
  if (!personForm.is_payment_tin && personForm.compilation === '') {
    showNotify('若不需要統編請勾選', false)
    return
  }
  if (!personForm.is_payment_tin && !validateTaiwanBusinessNumber(personForm.compilation)) {
    showNotify('統一編號錯誤', false)
    return
  }
  if (!validateChineseName(personForm.name)) {
    showNotify('訂購人僅可輸入中文姓名', false)
    return
  }
  if (!validateChineseName(personForm.recipient)) {
    showNotify('收件人僅可輸入中文姓名', false)
    return
  }
  if (!validatePhoneNumber(personForm.tel)) {
    showNotify('請填寫有效的訂購人手機號碼', false)
    return
  }
  if (!validatePhoneNumber(personForm.recipientTel)) {
    showNotify('請填寫有效的收件人手機號碼', false)
    return
  }
  if (!isPickup.value && (!personForm.address || !personForm.city || !personForm.road || !personForm.address1)) {
    showNotify('住址未填寫完全', false)
    return
  }
  if (!orderCount.value || orderCount.value <= 0) {
    showNotify('請輸入有效的點餐數量', false)
    return
  }

  orderCheck.value = true
}

const $q = useQuasar()
const config = useRuntimeConfig()
const quantityApiUrl = config.public.quantityApiBaseUrl
const router = useRouter()
const posApiUrl = config.public.posApiBaseUrl
const bingApiUrl = config.public.bingApiBaseUrl
// 初始化Pinia訂單商店
const order = useOrderStore()
const orderDetail = useOrderDetailStore()
const orderAddress = useOrderAddress()
const goToToday = () => {
  order.gotoToday()
}

// 訂單數
const orders = computed(() => cartStore.orders)

const orderCode = ref('') // 用來儲存從 API 獲得的訂單編號

//定義基本資料
const personForm = reactive({
  date: order.selectedDate,
  time: '',
  name: '',
  pick: null,
  company: '',
  compilation: '',
  tel: '',
  address: cartStore.selectedAddress,
  city: cartStore.selectedCity,
  road: '',
  address1: '',
  noCompilation: '',
  comment: '',
  recipientTel: '',
  recipient: '',
  sameOrderCustomer: false,
  is_payment_tin: false,
  gender2: '',
  gender3: '',
  prefix: '',
  hometel: '',
  hometel2: ''
})
//同訂購人
watch(
  () => personForm.sameOrderCustomer,
  newValue => {
    if (newValue) {
      personForm.recipient = personForm.name
      personForm.recipientTel = personForm.tel
      personForm.gender3 = personForm.gender2
    }
  }
)
// console.log(cartStore.selectedPickupMethod)

const picks = reactive([
  { label: '外送', value: 'shipping_delivery' },
  { label: '自取', value: 'shipping_pickup' }
])

const optionsGender = [
  { label: '先生', value: 17, color: 'pink-8' },
  { label: '小姐', value: 18, color: 'pink-8' }
]

//  personForm.is_payment_tin 的变化
watch(
  () => personForm.is_payment_tin,
  newVal => {
    if (newVal) {
      // 如果选中“不需統編”，清空并禁用“統一編號”输入框
      personForm.compilation = ''
    }
  }
)

// 判斷
const isPickup = computed(() => personForm.pick.value === 'shipping_pickup')

// 使用watch来确保当cartStore.selectedPickupMethod变化时，更新personForm.pick
watch(
  () => cartStore.selectedPickupMethod,
  newValue => {
    const pick = picks.find(pick => pick.value === newValue)
    personForm.pick = pick || null
  },
  { immediate: true }
)

const personFormReset = () => {
  personForm.name = ''
  personForm.tel = ''
  personForm.address = ''
  personForm.city = ''
  personForm.road = ''
  personForm.address1 = ''
  personForm.pick = ''
  personForm.company = ''
  personForm.compilation = ''
  personForm.compilation = ''
  personForm.noCompilation = ''
  personForm.comment = ''
  personForm.recipientTel = ''
  personForm.recipient = ''
  personForm.sameOrderCustomer = false
  personForm.is_payment_tin = false
  personForm.prefix = ''
  personForm.hometel = ''
  personForm.hometel2 = ''
  personForm.gender2 = ''
  personForm.gender3 = ''
}
//地址組合字串
const address = computed(() => {
  if (personForm.address && personForm.city) {
    return `${personForm.address.label} ${personForm.city.label} ${personForm.road} ${personForm.address1}`
  }
  return ''
})

// 监听cartStore中的selectedAddress和selectedCity的变化
watch(
  () => cartStore.selectedAddress,
  newAddress => {
    personForm.address = newAddress
    orderAddress.updateCityOptions(newAddress.value)
  },
  { deep: true }
)

watch(
  () => cartStore.selectedCity,
  newCity => {
    personForm.city = newCity
  },
  { deep: true }
)

// 有變化更新cartStore
watch(
  () => personForm.address,
  newAddress => {
    cartStore.setSelectedAddress(newAddress)
  }
)

watch(
  () => personForm.city,
  newCity => {
    cartStore.setSelectedCity(newCity)
  }
)

// 縣市選項
const addressOptions = orderAddress.addressoptions.map(option => ({ label: option.name, value: option.id }))
// 區域選項
const cityOptions = computed(() => {
  return orderAddress.cityOptions.map(option => ({ label: option.name, value: option.city_id }))
})
//路名選項
const stringOptions = ref([])

const dropdownOpen = ref(false)

watch(
  () => personForm.city,
  async (newCity, oldCity) => {
    if (!newCity || newCity === '') {
      return
    }

    if (newCity !== oldCity) {
      personForm.road = ''
      try {
        const response = await axios.get(`${quantityApiUrl}/get-road?city_id=${newCity.value}`)
        stringOptions.value = response.data.map(road => ({ label: road.name }))
      } catch (error) {
        console.error('連結路名資料庫發生問題:', error)
      }
    }
  }
)

const filteredRoadOptions = computed(() => {
  const needle = personForm.road.toLowerCase()
  return stringOptions.value.filter(option => option.label.toLowerCase().includes(needle))
})

function onInput(value) {
  dropdownOpen.value = true
}
const ignoreWatch = ref(false)
function selectOption(option) {
  ignoreWatch.value = true
  personForm.road = option.label
  dropdownOpen.value = false
}

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}
const isComposing = ref(false)

watch(
  () => personForm.road,
  () => {
    if (!isComposing.value && !ignoreWatch.value) {
      dropdownOpen.value = true
    }
  }
)

function onCompositionStart() {
  isComposing.value = true
}

function onCompositionEnd() {
  isComposing.value = false
  dropdownOpen.value = true
}
//該年月份
const dateTitle = computed(() => {
  return selectedDate.value ? `訂購日期: ${selectedDate.value}` : '訂購日期'
})
const now = DateTime.now()
const currentYearMonth = now.toFormat('yyyy/MM')
const locale = ref({
  months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  daysShort: ['日', '一', '二', '三', '四', '五', '六']
})

// 計算所選的日期、時間和該日期的總訂單數
const selectedDate = computed(() => order.selectedDate)
const selectedTime = computed(() => order.selectedTime)

watch(selectedDate, newDate => {
  personForm.date = newDate // 更新 personForm 中的日期
})

watch(selectedTime, newTime => {
  personForm.time = newTime // 更新 personForm 中的時間
})

// 當日總套數計算剩餘
const remainingOrders = computed(() => {
  return order.totalOrdersLimitForSelectedDate
})

// 定義時段選項
const timeSlots = ['10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00']

// 根據所選日期和時段獲取訂單數量
function getTimeSlotOrderCount(date, slot) {
  return order.getTimeSlotOrderCount(date, slot)
}
const orderIsFullForSelectedDate = computed(() => {
  return 0 >= order.totalOrdersLimitForSelectedDate
})

const tempSelectedTime = ref(null)

function selectTimeTemp(slot) {
  tempSelectedTime.value = slot
}

function nextStep() {
  if (tempSelectedTime.value) {
    order.selectTime(tempSelectedTime.value)
    tempSelectedTime.value = null // 重置臨時選擇的時段
    // 進行下一步的邏輯...
  }
}

// 選擇特定時段
function selectTime(slot) {
  order.selectTime(slot)
  orderCount.value = 1
  // console.log('選擇時間:', slot)
}

// 初始化訂購數量為1
const orderCount = computed(() => cartStore.totalItems)
//時段訂購數量
const remainingOrdersForTimeSlot = computed(() => {
  const remainingOrders = {}
  if (selectedDate.value && order.specificDateLimits[selectedDate.value]) {
    for (const slot of timeSlots) {
      const totalLimit = order.getTimeSlotOrderCount(selectedDate.value, slot)
      const booked = order.orders[selectedDate.value]?.[slot] || 0
      remainingOrders[slot] = totalLimit - booked
    }
  }
  return remainingOrders
})

//計算商品總額
const totalPrice = computed(() => {
  let total = 0
  cartStore.orders.forEach(order => {
    if (order.id === 1597) {
      // 分享餐價格計算
      const shareMealQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0)
      total += Math.floor(shareMealQuantity / 6) * order.dialog.price
    } else {
      // 其他商品價格計算
      order.items.forEach(item => {
        if (item.isMainDish) {
          total += item.quantity * order.dialog.price
        } else {
          // 检查订单ID是否为1062，并为该订单的每个项目计算价格
          if (order.id === 1062 || order.id === 1713 || order.id === 1714) {
            // 对于特定商品，根据每个项目的价格计算
            total += item.quantity * item.price
          } else {
            // 对于非特定商品，使用默认的附加价格计算
            const addonPrice = order.dialog.addonPrice || 0
            total += item.quantity * addonPrice
          }
        }
      })
    }
  })
  return total
})

const deliveryFee = ref(0)
const showDeliveryNotice = ref(false)

// 監聽城市選擇的變化
watch(
  [() => totalPrice.value, () => personForm.city],
  ([newTotalPrice, newCity]) => {
    if (!newCity || newCity === '') {
      deliveryFee.value = 0 // 沒有選擇城市時運費為0
      showDeliveryNotice.value = false // 不顯示提示信息
      return
    }
    const selectedCityOption = orderAddress.cityOptions.find(option => option.city_id === newCity.value)
    if (selectedCityOption) {
      if ('limit' in selectedCityOption && 'price' in selectedCityOption) {
        // 根據城市選項和最新的totalPrice值更新運費
        if (newTotalPrice >= selectedCityOption.limit) {
          deliveryFee.value = 0 // 訂單總額超過免運費門檻
        } else {
          deliveryFee.value = selectedCityOption.price // 應用城市的運費
        }
        showDeliveryNotice.value = false // 不顯示提示信息
      } else {
        // 沒有定義運費和免運條件的城市
        deliveryFee.value = 0 // 運費設為0
        showDeliveryNotice.value = true // 顯示提示信息
      }
    } else {
      // 如果沒找到選擇的城市選項
      deliveryFee.value = 0 // 運費設為0
      showDeliveryNotice.value = true // 不顯示提示信息
    }
  },
  { immediate: true }
)

// 計算最終總金額
const finalPrice = computed(() => {
  // 如果顯示“此區域不在外送範圍”的提示信息，則finalPrice僅為totalPrice的值
  if (showDeliveryNotice.value) {
    return totalPrice.value
  }
  // 否則，finalPrice為totalPrice加上deliveryFee
  return totalPrice.value + deliveryFee.value
})

//處理pos訂單提交
const submitOrder = async () => {
  const memberResponse = await axios.get(`${quantityApiUrl}/get-member?tel=${personForm.tel}`)
  const memberId = memberResponse.data.id

  const formData = new FormData()

  const today = DateTime.now().toFormat('yyyy-MM-dd')
  //  yyyy/mm/dd 轉 yyyy-mm-dd
  const formattedDate = selectedDate.value.replace(/\//g, '-')

  if (personForm.pick.label === '自取') {
    personForm.address.value = 0
    personForm.city.value = 0
    personForm.address1 = '自取'
    deliveryFee.value = 0
  }
  const timeRangeWithoutColons = selectedTime.value.replace(/:/g, '')
  // 添加基本的訂單信息
  formData.append('order_id', '') // 訂單編號
  formData.append('delivery_date_ymd', formattedDate) // 送達日
  formData.append('delivery_time_range', timeRangeWithoutColons) // 送達時間範圍
  formData.append('personal_name', personForm.name) // 訂購人姓名
  formData.append('shipping_method', personForm.pick.value) // 取貨方式
  formData.append('payment_company', personForm.company || '') // 訂購公司
  formData.append('shipping_company', personForm.company || '') // 送達公司
  formData.append('payment_tin', personForm.compilation || '') // 統一編號
  formData.append('comment', personForm.comment || '') // 訂單備註
  formData.append('is_payment_tin', personForm.compilation === '' ? 0 : 1) // 是否需要統編
  formData.append('mobile', personForm.tel) // 訂購人電話
  formData.append('telephone_prefix', personForm.prefix) // 區碼
  formData.append('telephone', personForm.hometel + '#' + personForm.hometel2) // 訂購人電話
  formData.append('salutation_id', personForm.gender2) // 訂購人稱謂 (即性別，先生 / 小姐)
  formData.append('shipping_salutation_id', personForm.gender3) // 收件人稱謂 (即性別，先生 / 小姐)

  formData.append('shipping_phone', personForm.recipientTel) //  收件人電話
  formData.append('shipping_personal_name', personForm.recipient) //  收件人
  formData.append('location_id', 2)
  formData.append('source', '預購')
  formData.append('order_date', today)
  formData.append('payment_method', 'cash')
  formData.append('status_name', '未確認')
  formData.append('status_code', 'Pending')
  formData.append('payment_unpaid', finalPrice.value)
  formData.append('payment_paid', 0)
  formData.append('payment_total', finalPrice.value)
  formData.append('order_totals[sub_total][title]', '商品合計')
  formData.append('order_totals[sub_total][value]', totalPrice.value)
  formData.append('order_totals[discount][title]', '優惠折扣')
  formData.append('order_totals[discount][value]', 0)
  formData.append('order_totals[shipping_fee][title]', '運費')
  formData.append('order_totals[shipping_fee][value]', deliveryFee.value)
  formData.append('order_totals[total][title]', '總計')
  formData.append('order_totals[total][value]', finalPrice.value)

  formData.append('shipping_state_id', personForm.address.value) //  縣市代號
  formData.append('shipping_city_id', personForm.city.value) //  鄉鎮市區代號
  formData.append('shipping_road', personForm.road) //  送達地址
  formData.append('shipping_address1', personForm.address1.replace(/\s+/g, '')) //  門牌號碼
  // 是否獲得會員 ID
  if (memberId !== '') {
    formData.append('customer_id', memberId) // 會員 ID
  }

  function getSideDishesByProductId(productId) {
    // ID對應
    const sideDishesOptions = {
      1001: {
        product_option_id: 3, // 配菜product_option_id
        dishes: [
          { id: 18, name: '香菇油飯' },
          { id: 14, name: '鹽水煮蛋' },
          { id: 13, name: '梅汁番茄' },
          { id: 15, name: '時蔬' },
          { id: 1670, name: '香滷豆干' },
          { id: 1876, name: '酥炸菇菇' }
        ],
        subMain: null
      },
      1670: {
        product_option_id: 193, // 配菜product_option_id
        dishes: [
          { id: 1917, name: '香菇油飯' },
          { id: 1918, name: '鹽水煮蛋' },
          { id: 1919, name: '梅汁番茄' },
          { id: 1920, name: '時蔬' },
          { id: 1922, name: '香滷豆干' },
          { id: 1925, name: '酥炸菇菇' }
        ],
        subMain: null
      },
      1658: {
        product_option_id: 187, // 配菜product_option_id
        dishes: [
          { id: 1856, name: '烤地瓜' },
          { id: 1858, name: '鹽水煮蛋' },
          { id: 1857, name: '梅汁番茄' },
          { id: 1859, name: '時蔬' },
          { id: 1861, name: '香滷豆干' },
          { id: 1860, name: '酥炸菇菇' }
        ],
        subMain: null
      },
      1659: {
        product_option_id: 190, // 配菜product_option_id
        dishes: [
          { id: 2387, name: '香菇油飯' },
          { id: 2388, name: '香菇油飯' },
          { id: 1874, name: '酥炸菇菇' },
          { id: 1875, name: '香滷豆干' },
          { id: 2229, name: '紐澳良雞翅' },
          { id: 2230, name: '滷蛋' },
          { id: 2231, name: '筍絲' },
          { id: 2232, name: '酸菜' },
          { id: 2408, name: '贈品豆花' }
        ],
        subMain: null
      },
      1696: {
        product_option_id: 240, // 配菜product_option_id
        dishes: [
          { id: 2385, name: '香菇油飯' },
          { id: 2386, name: '香菇油飯' },
          { id: 2240, name: '酥炸菇菇' },
          { id: 2241, name: '香滷豆干' },
          { id: 2242, name: '滷蛋' },
          { id: 2243, name: '筍絲' },
          { id: 2244, name: '酸菜' },
          { id: 2407, name: '贈品豆花' }
        ],
        subMain: {
          product_option_id: 241, // 副主餐的option_id
          dish: { id: 2245, name: '控肉' }
        }
      },
      1685: {
        product_option_id: 226, // 配菜product_option_id
        dishes: [
          { id: 2137, name: '烤地瓜' },
          { id: 2139, name: '鹽水煮蛋' },
          { id: 2138, name: '梅汁番茄' },
          { id: 2140, name: '時蔬' },
          { id: 2142, name: '香滷豆干' },
          { id: 2141, name: '酥炸菇菇' }
        ],
        subMain: null
      },
      1002: {
        product_option_id: 7, //配菜product_option_id
        dishes: [
          { id: 666, name: '香菇油飯' },
          { id: 34, name: '鹽水煮蛋' },
          { id: 33, name: '梅汁番茄' },
          { id: 35, name: '時蔬' },
          { id: 1671, name: '香滷豆干' },
          { id: 1877, name: '酥炸菇菇' }
        ],
        subMain: {
          product_option_id: 9, // 副主餐的option_id
          dish: { id: 41, name: '清蒸嫰雞胸' }
        }
      },
      1671: {
        product_option_id: 196, //配菜product_option_id
        dishes: [
          { id: 1938, name: '香菇油飯' },
          { id: 1939, name: '鹽水煮蛋' },
          { id: 1940, name: '梅汁番茄' },
          { id: 1941, name: '時蔬' },
          { id: 1944, name: '香滷豆干' },
          { id: 1945, name: '酥炸菇菇' }
        ],
        subMain: {
          product_option_id: 197, // 副主餐的option_id
          dish: { id: 1946, name: '清蒸嫰雞胸' }
        }
      },
      1003: {
        product_option_id: 12, //配菜product_option_id
        dishes: [
          { id: 59, name: '香菇油飯' },
          { id: 55, name: '鹽水煮蛋' },
          { id: 54, name: '梅汁番茄' },
          { id: 56, name: '時蔬' },
          { id: 1672, name: '香滷豆干' },
          { id: 1878, name: '酥炸菇菇' }
        ],
        subMain: {
          product_option_id: 14, // 副主餐的option_id
          dish: { id: 62, name: '滷雞腿' }
        }
      },
      1674: {
        product_option_id: 204, //配菜product_option_id
        dishes: [
          { id: 1984, name: '香菇油飯' },
          { id: 1985, name: '鹽水煮蛋' },
          { id: 1986, name: '梅汁番茄' },
          { id: 1987, name: '時蔬' },
          { id: 1990, name: '香滷豆干' },
          { id: 1991, name: '酥炸菇菇' }
        ],
        subMain: {
          product_option_id: 205, // 副主餐的option_id
          dish: { id: 1992, name: '滷雞腿' }
        }
      },
      1004: {
        product_option_id: 19, //配菜product_option_id
        dishes: [
          { id: 80, name: '香菇油飯' },
          { id: 76, name: '鹽水煮蛋' },
          { id: 75, name: '梅汁番茄' },
          { id: 77, name: '時蔬' },
          { id: 1673, name: '香滷豆干' },
          { id: 1879, name: '酥炸菇菇' }
        ],
        subMain: {
          product_option_id: 17, // 副主餐的option_id
          dish: { id: 83, name: '滷牛腱' }
        }
      },
      1673: {
        product_option_id: 200, //配菜product_option_id
        dishes: [
          { id: 1963, name: '香菇油飯' },
          { id: 1964, name: '鹽水煮蛋' },
          { id: 1965, name: '梅汁番茄' },
          { id: 1966, name: '時蔬' },
          { id: 1969, name: '香滷豆干' },
          { id: 1970, name: '酥炸菇菇' }
        ],
        subMain: {
          product_option_id: 201, // 副主餐的option_id
          dish: { id: 1971, name: '滷牛腱' }
        }
      },
      1080: {
        product_option_id: 138, //配菜product_option_id
        dishes: [
          { id: 801, name: '香菇油飯' },
          { id: 802, name: '鹽水煮蛋' },
          { id: 803, name: '梅汁番茄' },
          { id: 804, name: '時蔬' },
          { id: 1676, name: '香滷豆干' },
          { id: 1885, name: '酥炸菇菇' }
        ],
        subMain: {
          product_option_id: 139, // 副主餐的option_id
          dish: { id: 806, name: '鮭魚' }
        }
      },
      1675: {
        product_option_id: 208, //配菜product_option_id
        dishes: [
          { id: 2006, name: '香菇油飯' },
          { id: 2007, name: '鹽水煮蛋' },
          { id: 2008, name: '梅汁番茄' },
          { id: 2009, name: '時蔬' },
          { id: 2012, name: '香滷豆干' },
          { id: 2013, name: '酥炸菇菇' }
        ],
        subMain: {
          product_option_id: 209, // 副主餐的option_id
          dish: { id: 2014, name: '鮭魚' }
        }
      },
      1657: {
        product_option_id: 180, //配菜product_option_id
        dishes: [
          { id: 1817, name: '香菇油飯' },
          { id: 1818, name: '鹽水煮蛋' },
          { id: 1819, name: '梅汁番茄' },
          { id: 1820, name: '時蔬' },
          { id: 1892, name: '香滷豆干' },
          { id: 1893, name: '酥炸菇菇' }
        ],
        subMain: {
          product_option_id: 182, // 副主餐的option_id
          dish: { id: 1824, name: '紅酒牛肉丸' }
        }
      },
      1676: {
        product_option_id: 212, //配菜product_option_id
        dishes: [
          { id: 2028, name: '香菇油飯' },
          { id: 2029, name: '鹽水煮蛋' },
          { id: 2030, name: '梅汁番茄' },
          { id: 2031, name: '時蔬' },
          { id: 2032, name: '香滷豆干' },
          { id: 2033, name: '酥炸菇菇' }
        ],
        subMain: {
          product_option_id: 213, // 副主餐的option_id
          dish: { id: 2036, name: '紅酒牛肉丸' }
        }
      },
      1006: {
        product_option_id: 26, //配菜product_option_id
        dishes: [{ id: 114, name: '炸地瓜' }],
        subMain: null
      },
      1678: {
        product_option_id: 223, //配菜product_option_id
        dishes: [{ id: 2119, name: '炸地瓜' }],
        subMain: null
      },
      1007: {
        product_option_id: 30, //配菜product_option_id
        dishes: [
          { id: 132, name: '炸地瓜' },
          { id: 133, name: '手作蛋塔' }
        ],
        subMain: null
      },
      1679: {
        product_option_id: 219, //配菜product_option_id
        dishes: [
          { id: 2097, name: '炸地瓜' },
          { id: 2098, name: '手作蛋塔' }
        ],
        subMain: null
      },
      1008: {
        product_option_id: 34, //配菜product_option_id
        dishes: [
          { id: 150, name: '炸地瓜' },
          { id: 151, name: '手作蛋塔' },
          { id: 153, name: '紐澳良雞翅' }
        ],
        subMain: null
      },
      1680: {
        product_option_id: 222, //配菜product_option_id
        dishes: [
          { id: 2105, name: '炸地瓜' },
          { id: 2106, name: '手作蛋塔' },
          { id: 2090, name: '紐澳良雞翅' }
        ],
        subMain: null
      },
      1651: {
        product_option_id: 151, //配菜product_option_id
        dishes: [
          { id: 1679, name: '香菇油飯' },
          { id: 1680, name: '香菇油飯' },
          { id: 1681, name: '梅汁番茄' },
          { id: 1682, name: '鹽水煮蛋' },
          { id: 1683, name: '時蔬' },
          { id: 1684, name: '酥炸菇菇' },
          { id: 1685, name: '香滷豆干' }
        ],
        subMain: null
      },
      1652: {
        product_option_id: 153, //配菜product_option_id
        dishes: [
          { id: 1693, name: '香菇油飯' },
          { id: 1694, name: '香菇油飯' },
          { id: 1695, name: '梅汁番茄' },
          { id: 1696, name: '鹽水煮蛋' },
          { id: 1697, name: '時蔬' },
          { id: 1698, name: '酥炸菇菇' },
          { id: 1699, name: '香滷豆干' }
        ],
        subMain: {
          product_option_id: 154, // 副主餐的option_id
          dish: { id: 1700, name: '清蒸嫰雞胸' }
        }
      },
      1653: {
        product_option_id: 155, //配菜product_option_id
        dishes: [
          { id: 1701, name: '香菇油飯' },
          { id: 1702, name: '香菇油飯' },
          { id: 1706, name: '酥炸菇菇' },
          { id: 1707, name: '香滷豆干' },
          { id: 2216, name: '滷蛋' },
          { id: 2218, name: '筍絲' },
          { id: 2219, name: '酸菜' },
          { id: 2411, name: '贈品豆花' }
        ],
        subMain: {
          product_option_id: 156, // 副主餐的option_id
          dish: { id: 1708, name: '滷雞腿' }
        }
      },
      1654: {
        product_option_id: 157, //配菜product_option_id
        dishes: [
          { id: 1709, name: '香菇油飯' },
          { id: 1710, name: '香菇油飯' },
          { id: 1714, name: '酥炸菇菇' },
          { id: 1715, name: '香滷豆干' },
          { id: 2220, name: '滷蛋' },
          { id: 2222, name: '筍絲' },
          { id: 2223, name: '酸菜' },
          { id: 2409, name: '贈品豆花' }
        ],
        subMain: {
          product_option_id: 158, // 副主餐的option_id
          dish: { id: 1716, name: '滷牛腱' }
        }
      },
      1655: {
        product_option_id: 159, //配菜product_option_id
        dishes: [
          { id: 1717, name: '香菇油飯' },
          { id: 1718, name: '香菇油飯' },
          { id: 1719, name: '梅汁番茄' },
          { id: 1720, name: '鹽水煮蛋' },
          { id: 1721, name: '時蔬' },
          { id: 1722, name: '酥炸菇菇' },
          { id: 1723, name: '香滷豆干' }
        ],
        subMain: {
          product_option_id: 160, // 副主餐的option_id
          dish: { id: 1724, name: '鮭魚' }
        }
      },
      1656: {
        product_option_id: 161, //配菜product_option_id
        dishes: [
          { id: 1725, name: '香菇油飯' },
          { id: 1726, name: '香菇油飯' },
          { id: 1727, name: '梅汁番茄' },
          { id: 1728, name: '鹽水煮蛋' },
          { id: 1729, name: '時蔬' },
          { id: 1730, name: '酥炸菇菇' },
          { id: 1731, name: '香滷豆干' }
        ],
        subMain: {
          product_option_id: 162, // 副主餐的option_id
          dish: { id: 1732, name: '紅酒牛肉丸' }
        }
      },
      1066: {
        product_option_id: 116, //配菜product_option_id
        dishes: [
          { id: 594, name: '鹽水煮蛋' },
          { id: 593, name: '梅汁番茄' },
          { id: 669, name: '時蔬' },
          { id: 598, name: '烤地瓜' },
          { id: 1674, name: '香滷豆干' },
          { id: 1884, name: '酥炸菇菇' }
        ],
        subMain: {
          product_option_id: 114, // 副主餐的option_id
          dish: { id: 586, name: '素肉排' }
        }
      },
      1686: {
        product_option_id: 230, //配菜product_option_id
        dishes: [
          { id: 2160, name: '鹽水煮蛋' },
          { id: 2161, name: '梅汁番茄' },
          { id: 2162, name: '時蔬' },
          { id: 2163, name: '烤地瓜' },
          { id: 2165, name: '香滷豆干' },
          { id: 2166, name: '酥炸菇菇' }
        ],
        subMain: {
          product_option_id: 229, // 副主餐的option_id
          dish: { id: 2159, name: '素肉排' }
        }
      },
      1067: {
        product_option_id: 119, //配菜product_option_id
        dishes: [
          { id: 618, name: '鹽水煮蛋' },
          { id: 617, name: '梅汁番茄' },
          { id: 671, name: '時蔬' },
          { id: 1883, name: '時蔬' },
          { id: 624, name: '烤地瓜' },
          { id: 1675, name: '香滷豆干' },
          { id: 1882, name: '酥炸菇菇' }
        ],
        subMain: {
          product_option_id: 121, // 副主餐的option_id
          dish: { id: 629, name: '素肉排' }
        }
      },
      1687: {
        product_option_id: 234, //配菜product_option_id
        dishes: [
          { id: 2183, name: '鹽水煮蛋' },
          { id: 2184, name: '梅汁番茄' },
          { id: 2185, name: '時蔬' },
          { id: 2186, name: '時蔬' },
          { id: 2187, name: '烤地瓜' },
          { id: 2190, name: '香滷豆干' },
          { id: 2189, name: '酥炸菇菇' }
        ],
        subMain: {
          product_option_id: 235, // 副主餐的option_id
          dish: { id: 2191, name: '素肉排' }
        }
      }
    }

    return sideDishesOptions[productId] || { product_option_id: null, dishes: [], subMain: null }
  }

  cartStore.orders.forEach(order => {
    const baseKey = `order_products[${order.uniqueId}]`
    const addonPrice = order.dialog.addonPrice

    let optionsTotal = 0 //初始化

    // 所有項目
    order.items.forEach(item => {
      if (!item.isMainDish) {
        // 其他商品另外
        if (order.id === 1062 || order.id === 1713 || order.id === 1714) {
          optionsTotal += item.quantity * item.price
        } else {
          // 其他訂單統一
          optionsTotal += item.quantity * addonPrice
        }
      }
    })

    const mainDishTotal = order.dialog.price * order.mainDishQuantity // 主菜價格
    const finalTotal = mainDishTotal + optionsTotal // 訂單價格
    const mainDishOptionValueId = order.items.find(item => item.isMainDish)?.product_option_value_id
    formData.append(`${baseKey}[main_category_code]`, order.dialog.main_category_code)
    formData.append(`${baseKey}[product_id]`, order.id)
    formData.append(`${baseKey}[name]`, order.title)
    formData.append(`${baseKey}[quantity]`, order.mainDishQuantity)
    formData.append(`${baseKey}[price]`, order.dialog.price)
    formData.append(`${baseKey}[total]`, order.dialog.price * order.mainDishQuantity)
    formData.append(`${baseKey}[final_total]`, finalTotal)
    formData.append(`${baseKey}[options_total]`, optionsTotal)
    // formData.append(`${baseKey}[comment]`, order.comment)

    const optionsMap = {} // 類型選項索引
    order.items.forEach(item => {
      // 確定選項類型（主餐或飲料）
      const optionType = item.isMainDish ? 'mainDish' : 'drink'
      if (!optionsMap[optionType]) {
        optionsMap[optionType] = {
          index: Object.keys(optionsMap).length + 1, // 為每種類型的選項分配一個唯一索引
          valuesCounter: 0 // 記錄該類型選項的值的數量
        }
      }

      const { index, valuesCounter } = optionsMap[optionType]
      const optionBaseKey = `${baseKey}[product_options][${index}]`

      if (valuesCounter === 0) {
        // 如果是該類型選項的第一個值，設置選項的基本信息
        formData.append(`${optionBaseKey}[product_option_id]`, item.product_option_id)
        formData.append(`${optionBaseKey}[type]`, 'options_with_qty')
        formData.append(`${optionBaseKey}[name]`, item.groupName)
      }

      // 為選項添加值
      const valueIndex = valuesCounter + 1
      formData.append(`${optionBaseKey}[product_option_values][${valueIndex}][product_option_value_id]`, item.product_option_value_id)
      formData.append(`${optionBaseKey}[product_option_values][${valueIndex}][value]`, item.name)
      formData.append(`${optionBaseKey}[product_option_values][${valueIndex}][quantity]`, item.quantity)

      // 如果需要，為飲料添加parent_povid
      if (!item.isMainDish && ['1006', '1007', '1008'].includes(order.id.toString())) {
        formData.append(`${optionBaseKey}[product_option_values][${valueIndex}][parent_povid]`, mainDishOptionValueId)
      }

      optionsMap[optionType].valuesCounter++ // 更新該類型選項的值的數量計數器
    })

    const { product_option_id, dishes, subMain } = getSideDishesByProductId(order.id)

    if (dishes && dishes.length > 0) {
      const sideDishesIndex = Object.keys(optionsMap).length + 1
      optionsMap['sideDishes'] = { index: sideDishesIndex, valuesCounter: dishes.length } // 加入配菜類型
      const sideDishesKey = `${baseKey}[product_options][${sideDishesIndex}]`
      formData.append(`${sideDishesKey}[product_option_id]`, product_option_id)
      formData.append(`${sideDishesKey}[type]`, 'options_with_qty')
      formData.append(`${sideDishesKey}[name]`, '配菜')

      dishes.forEach((sideDish, index) => {
        const optionValueKey = `${sideDishesKey}[product_option_values][${index + 1}]`
        formData.append(`${optionValueKey}[product_option_value_id]`, sideDish.id)
        formData.append(`${optionValueKey}[value]`, sideDish.name)
        formData.append(`${optionValueKey}[quantity]`, order.mainDishQuantity) // 假设配菜的数量与主菜数量相同
      })
    }

    // 如果存在副主餐，添加副主餐信息
    if (subMain) {
      const subMainIndex = Object.keys(optionsMap).length + 1
      optionsMap['subMain'] = { index: subMainIndex, valuesCounter: 1 } //副主餐加入
      const subMainKey = `${baseKey}[product_options][${subMainIndex}]`
      formData.append(`${subMainKey}[product_option_id]`, subMain.product_option_id)
      formData.append(`${subMainKey}[type]`, 'options_with_qty')
      formData.append(`${subMainKey}[name]`, '副主餐')
      formData.append(`${subMainKey}[product_option_values][1][product_option_value_id]`, subMain.dish.id)
      formData.append(`${subMainKey}[product_option_values][1][value]`, subMain.dish.name)
      formData.append(`${subMainKey}[product_option_values][1][quantity]`, order.mainDishQuantity) // 副主餐等同主餐數量
    }
  })

  // 發送訂單到API
  try {
    const response = await axios.post(`${quantityApiUrl}/order/creat`, formData)

    orderCode.value = response.data.code
    if (!response.data.success) {
      showNotify('加入訂單發生問題請與店家聯繫 ', false)
      return false
    } else {
      // showNotify('已成功加入訂單訂單編號：' + orderCode.value, true)
      showNotify('已成功加入訂單', true)

      return true
    }
  } catch (error) {
    console.error(error)
    showNotify('加入訂單發生問題: ' + error.message, false)
    isSubmitting.value = false
    return false
  }
}

//處理後台數量控管減少
const updateOrderLimits = async () => {
  const formattedDate = selectedDate.value.replace(/\//g, '-')
  try {
    const response = await axios.get(`${quantityApiUrl}/get-special?date=${formattedDate}`)
    const dateLimits = response.data[formattedDate]
    const remainingOrdersForSlot = dateLimits[selectedTime.value]

    if (remainingOrdersForSlot >= orderCount.value) {
      await axios.put(`${quantityApiUrl}/add-order`, {
        [formattedDate]: {
          [selectedTime.value]: remainingOrdersForSlot - orderCount.value
        }
      })

      return true
    } else {
      order.onDateChange()
      // 更新前端數據
      order.addOrder(orderCount.value)
      await order.fetchSpecificDateLimits() // 刷新特定日期限制數據
      order.saveStateToLocalStorage()
      showNotify('所選時段剩餘數量不足，請重新選擇 ', false)

      return false
    }
  } catch (error) {
    console.error(error)
    showNotify('數量管制未正確紀載: ' + error.message, false)

    return false
  }
}

// 數量修正
const restoreOrderCount = async () => {
  const formattedDate = selectedDate.value.replace(/\//g, '-')
  try {
    const response = await axios.get(`${quantityApiUrl}/get-special?date=${formattedDate}`)
    const dateLimits = response.data[formattedDate]
    const remainingOrdersForSlot = dateLimits[selectedTime.value]
    await axios.put(`${quantityApiUrl}/add-order`, {
      [formattedDate]: {
        [selectedTime.value]: Number(remainingOrdersForSlot) + Number(orderCount.value)
      }
    })
  } catch (error) {
    console.error('數量修正發生錯誤:', error)
    showNotify('數量修正發生錯誤: ' + error.message, false)
  }
}
//加入控單表
// const pushOrders = async () => {
//   try {
//     // console.log(orderCode.value)
//     const formattedDate = order.selectedDate.replace(/\//g, '-')
//     const response = await axios.post(`${bingApiUrl}/time/create`, {
//       date: formattedDate,
//       time: order.selectedTime,
//       amount: orderCount.value,
//       order_id: orderCode.value,
//       road: personForm.road
//     })

//     return true
//   } catch (error) {
//     console.error('控單表加入發生錯誤:', error)
//     showNotify('數量管制未正確紀載: ' + error.message, false)

//     return false
//   }
// }

// 增加新訂單
const addOrder = async () => {
  isSubmitting.value = true
  try {
    const isOrderLimitsUpdated = await updateOrderLimits()
    if (!orders.value.length > 0) {
      showNotify('餐點數量不可為0 ', false)
      console.log(orders.value.length)
      return
    }
    if (!isOrderLimitsUpdated) {
      return
    }
    const isOrderSubmitted = await submitOrder()
    if (!isOrderSubmitted) {
      await restoreOrderCount()
      return
    }
    //加入控單表
    // const isOrder = await pushOrders()
    // if (!isOrder) {
    //   await restoreOrderCount()
    //   return
    // }

    // 跳轉到訂單確認頁面，並傳遞訂單編號

    orderDetail.setOrderDetails(
      orderCode.value,
      personForm.name,
      personForm.tel,
      `${personForm.address.label} ${personForm.city.label} ${personForm.road}${personForm.address1}`,
      order.selectedDate,
      order.selectedTime,
      orderCount.value,
      totalPrice.value,
      deliveryFee.value,
      finalPrice.value
    )
    // 導航到成功頁面，不帶任何查詢參數
    router.push({ name: 'success' })
    // 清空 表
    personFormReset()
    order.resetSelectedDate()
    cartStore.resetStore()
    mealStore.toggleSelectedMeal()
  } catch (error) {
    console.error('加入訂單時發生錯誤:', error)
    isSubmitting.value = false
  }
  isSubmitting.value = false
  // 更新前端數據
  order.addOrder(orderCount.value)
  await order.fetchSpecificDateLimits() // 刷新特定日期限制數據
  order.saveStateToLocalStorage()
}

//確認數量不小於1
function checkOrderCount(value) {
  const intValue = parseInt(value)
  if (!isNaN(intValue)) {
    const maxOrdersForSlot = getTimeSlotOrderCount(selectedDate.value, selectedTime.value)
    if (intValue > maxOrdersForSlot) {
      alert('超過可訂購數量，請重新選擇')
      orderCount.value = maxOrdersForSlot
    }
  } else {
    orderCount.value = 1
  }
}

function selectOrderCount(n) {
  orderCount.value = n
}

const orderOptions = computed(() => {
  // 獲取當前時段的最大訂單數量
  const maxOrdersForSlot = getTimeSlotOrderCount(selectedDate.value, selectedTime.value)

  // 如果時段已滿，不生成選項
  if (maxOrdersForSlot === 0) {
    return []
  }

  // 根據剩餘數量生成選項
  return Array.from({ length: maxOrdersForSlot }, (_, i) => i + 1)
})
//兩個月新增按鈕
const createTwoMonthsOrders = async () => {
  try {
    await axios.post(`${quantityApiUrl}/auto-add`)
    await order.fetchSpecificDateLimits() // 新增後刷新
    // console.log('成功新增兩個月的訂單限制')
  } catch (error) {
    console.error('新增訂單限制失敗:', error)
  }
}

// 計算是否可以新增訂單
const canAddOrder = computed(() => {
  if (selectedDate.value && selectedTime.value) {
    // 檢查是否有特定日期的時段限制
    const limitForSlot = getTimeSlotOrderCount(selectedDate.value, selectedTime.value)

    return limitForSlot > 0 && limitForSlot >= orderCount.value
  }
  return false
})
// 判斷特定時段是否已滿或不可用
function isTimeSlotFull(date, slot) {
  const limitForSlot = getTimeSlotOrderCount(date, slot)

  return limitForSlot === 0
}
//toggle
const schedulerActive = ref(false)
const loading = ref(false)

async function fetchSchedulerStatus() {
  try {
    loading.value = true
    const response = await axios.get(`${quantityApiUrl}/scheduler-status`)
    schedulerActive.value = response.data.schedulerActive
  } catch (error) {
    console.error('Error fetching scheduler status:', error)
  } finally {
    loading.value = false
  }
}

async function toggleScheduler(newValue) {
  try {
    loading.value = true
    if (newValue) {
      createTwoMonthsOrders()
      await axios.post(`${quantityApiUrl}/start-scheduler`)
    } else {
      await axios.post(`${quantityApiUrl}/stop-scheduler`)
    }
    await fetchSchedulerStatus()
  } catch (error) {
    console.error('定期更新啟動發生錯誤:', error)
  } finally {
    loading.value = false
  }
}
// 當組件掛載時，從localStorage中恢復訂單數據
onMounted(async () => {
  await fetchSchedulerStatus()
  await order.fetchTimeSlotLimits()
  await order.fetchSpecificDateLimits()

  order.restoreStateFromLocalStorage()
  order.fetchDisabledDates()

  //須同意
  // if (!agreeCollection.hasAgreed) {
  //   await router.push('/')
  //   onOnlineClick()
  // }
})

// 組件卸載前，將訂單數據保存到localStorage
onBeforeUnmount(() => {
  order.saveStateToLocalStorage()
})
// onUnmounted(() => {
//   agreeCollection.setAgreement(false)
// })
</script>

<style lang="scss" scoped>
@import '/assets/onlineOrder';
</style>
