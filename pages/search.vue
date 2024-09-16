<template>
  <q-page style="background: #f5f5f5">
    <div class="column items-center search">
      <h5 class="text-pink-8">訂單查詢系統</h5>
      <div class="searchPersons" id="searchPersons" style="margin-bottom: 2%">
        <div class="searchInputs">
          <q-input class="searchPerson" color="pink-8" :class="{ haveTxt: personalName !== '' }" outlined v-model="personalName" label="預訂人姓名" />
          <q-input class="searchPerson" color="pink-8" :class="{ haveTxt: mobile !== '' }" outlined v-model="mobile" label="預訂人手機" />
          <q-input class="searchPerson" color="pink-8" :class="{ haveTxt: code !== '' }" outlined v-model="code" label="預訂單編號" />
        </div>
        <div class="searchBtns">
          <div class="searchNote">填寫其中 2 項即可查詢訂單</div>
          <q-btn id="searchBtn" class="searchBtn" color="pink-8" outline @click="searchOrders">查詢預訂訂單</q-btn>
        </div>
      </div>

      <!-- 訂單表格 -->
      <q-table
        :grid="isMobile"
        :card-class="isMobile ? 'bg-orange text-grey-8' : ''"
        class="searchTable"
        :rows="orders"
        :columns="columns"
        v-model:pagination="pagination"
        row-key="code"
        hide-pagination
        no-data-label="請輸入姓名、手機、訂單編號 其中兩項查詢訂單">
        <!-- Grid 插槽 -->
        <template v-slot:item="props">
          <div class="q-pa-sm col-xs-12 col-sm-6">
            <q-card class="gridCard items-center q-pa-sm">
              <q-list dense>
                <!-- grid訂單號碼 -->
                <q-item>
                  <q-item-section>
                    <q-item-label>訂單號碼</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="fz-0875r isLink pointer" @click="handleOrderClick(props.row)">
                      {{ props.row.code }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <!-- grid訂購日期 -->
                <q-item>
                  <q-item-section>
                    <q-item-label>訂購日期</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="fz-0875r">{{ props.row.delivery_date }}</q-item-label>
                  </q-item-section>
                </q-item>
                <!-- grid訂餐時段 -->
                <q-item>
                  <q-item-section>
                    <q-item-label>訂餐時段</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="fz-0875r">{{ props.row.delivery_time_range }}</q-item-label>
                  </q-item-section>
                </q-item>
                <!-- grid訂購人姓名 
              <q-item>
                <q-item-section>
                  <q-item-label>訂購人姓名</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption class="fz-0875r">{{ props.row.personal_name }}</q-item-label>
                </q-item-section>
              </q-item>-->
                <!-- grid訂購人手機
              <q-item>
                <q-item-section>
                  <q-item-label>訂購人手機</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption class="fz-0875r">{{ props.row.mobile }}</q-item-label>
                </q-item-section>
              </q-item> -->
                <!-- grid送達地址
              <q-item>
                <q-item-section>
                  <q-item-label>送達地址</q-item-label>
                  <q-item-label caption class="fz-0875r">{{ formatAddress2(props.row) }}</q-item-label>
                </q-item-section>
              </q-item> -->
                <!-- grid訂單狀態 -->
                <q-item>
                  <q-item-section>
                    <q-item-label>訂單狀態</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="fz-0875r">{{ getStatusText(props.row.status_code) }}</q-item-label>
                  </q-item-section>
                </q-item>
                <!-- grid出餐狀態 -->
                <!-- <q-item>
                  <q-item-section>
                    <q-item-label>出餐狀態</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="fz-0875r">{{ getShippingStatusText(props.row.shipping_status) }}</q-item-label>
                  </q-item-section>
                </q-item> -->
                <!-- 外送員資訊 -->
                <q-item>
                  <q-item-section>
                    <q-item-label>外送員資訊</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption class="fz-0875r"><div v-html="formatDeliveryInfo(props.row)" class="fz-0875r" style="text-align: right"></div></q-item-label>
                  </q-item-section>
                </q-item>
                <!-- 下載按鈕 -->
                <!-- <q-item>
                <q-item-section>
                  <q-item-label>下載PDF</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn color="pink-8" outline @click="downloadPdf(props.row)">下載</q-btn>
                </q-item-section>
              </q-item> -->
                <!-- 取消訂單 -->
                <q-item>
                  <q-btn style="width: 100%" outline color="negative" icon="cancel" @click="cancelOrder(props.row.code)" v-if="props.row.status_code === 'Pending'">
                    取消訂單
                  </q-btn>
                  <q-btn style="width: 100%; background: white; color: #666" flat @click="dialNumber" v-else>
                    如有其他需求請致電門市人員
                    <br />
                    門市專線：(02) 2301-5331
                  </q-btn>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template>

        <!-- 電腦表格 -->
        <template v-slot:body="props">
          <q-tr :props="props" class="my-custom-row">
            <q-td :props="props" v-for="col in props.cols" :key="col.name" :style="col.name === 'cancelOrder' ? 'max-width: 59px' : ''">
              <!-- 取消訂單按钮 -->
              <div v-if="col.name === 'cancelOrder'">
                <q-btn outlined class="tableCancelBtn" icon="delete" @click="cancelOrder(props.row.code)" v-if="props.row.status_code === 'Pending'">取消</q-btn>
                <q-btn outlined color="primary" icon="phone" class="tableCallBtn" @click="dialNumber" v-else>致電</q-btn>
              </div>
              <!-- 外送信息 -->
              <div v-else-if="col.name === 'deliveryInfo'">
                <div v-html="formatDeliveryInfo(props.row)"></div>
              </div>
              <!-- 訂單編號 -->
              <div v-else-if="col.name === 'code'">
                <div @click="handleOrderClick(props.row)" class="isLink pointer">
                  {{ props.row.code }}
                </div>
              </div>
              <!-- 訂單狀態 -->
              <div v-else-if="col.name === 'status_id'">
                {{ getStatusText(props.row.status_code) }}
              </div>
              <!-- 出餐狀態 -->
              <!-- <div v-else-if="col.name === 'shipping_status'">
                {{ getShippingStatusText(props.row.shipping_status) }}
              </div> -->
              <!-- 默認 -->
              <div v-else>
                {{ props.row[col.field] }}
              </div>
            </q-td>
          </q-tr>
        </template>
        <!-- 電腦表格td分別設定 -->
        <!-- <template v-slot:body-cell-code="props">
          <q-td :props="props">
            <div @click="fetchOrderDetails(props.row.orderID, props.row.personal_name, props.row.mobile, formatAddress2(props.row))" class="isLink pointer">
              {{ props.row.code }}
            </div>
          </q-td>
        </template>

    
        <template v-slot:body-cell-address="props">
          <q-td :props="props">
            <div v-html="formatAddress(props.row)"></div>
          </q-td>
        </template>
        <template v-slot:body-cell-deliveryInfo="props">
          <q-td :props="props">
            <div v-html="formatDeliveryInfo(props.row)"></div>
          </q-td>
        </template> -->
        <!-- <template v-slot:body-cell-download="props">
        <q-td :props="props" id="loadBtn">
          <q-btn color="pink-8" outline @click="downloadPdf(props.row)">下載</q-btn>
        </q-td>
      </template> -->
        <!-- <template v-slot:body-cell-cancelOrder="props">
          <q-td :props="props" style="max-width: 59px">
            <q-btn outlined class="tableCancelBtn" icon="delete" @click="cancelOrder(props.row.code)" v-if="props.row.status_code === 'Pending'">取消</q-btn>
            <q-btn outlined color="primary" icon="phone" class="tableCallBtn" @click="dialNumber" v-else>致電</q-btn>
          </q-td>
        </template> -->

        <template v-slot:no-data="{ message }">
          <div class="full-width row flex-center text-pink-8 q-gutter-sm">
            <q-icon size="2em" name="content_paste_search" />
            <span>{{ message }}</span>
          </div>
        </template>
      </q-table>
      <div class="row justify-center q-mt-md">
        <q-pagination v-model="pagination.page" color="pink-8" :max="pagesNumber" size="sm" />
      </div>

      <div class="notesText">
        <p>※ 預訂單查詢系統說明：</p>
        <ul>
          <li>點擊訂單編號可查看訂單內容</li>
          <li>
            本系統查詢
            <span class="text-pink-8">僅供查詢訂單狀況，不提供修改/異動</span>
            。
          </li>
          <li>
            若需要異動訂餐數量，建議您可以
            <span class="text-pink-8">取消訂單後重新進行預訂作業</span>
            。
          </li>
          <li>
            若 訂單狀態是“
            <span class="text-pink-8">已確認</span>
            ”則表示此筆訂單，已進行
            <span class="text-pink-8">電話確認完畢，故無法進行取消</span>
            。
          </li>
          <li>
            若確認預訂單
            <span class="text-pink-8">有任何問題，請電洽訂餐人員</span>
            為您處理。聯絡電話
            <span class="text-pink-8">(02)2301-5331</span>
            。
          </li>
        </ul>
      </div>
    </div>
  </q-page>
  <!-- 錯誤訊息 Dialog -->
  <q-dialog v-model="dialogVisible">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ errorMessage }}</div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn flat label="確認" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- 取消訂單重複確認dialog -->
  <q-dialog v-model="confirmCancelDialogVisible">
    <q-card>
      <q-card-section>
        <div class="text-h6">確認取消</div>
        <div>訂單編號{{ orderToCancel }}號</div>
        <div>您是否確定要取消此訂單？此操作不能撤銷。</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="取消" color="primary" @click="confirmCancelDialogVisible = false" />
        <q-btn flat label="確認取消" color="negative" @click="confirmCancelOrder" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- 預覽 -->

  <q-dialog v-model="orderDetailsDialogVisible" position="top">
    <q-card class="cartCard" style="min-width: 40vw">
      <div class="title">我的預訂餐點</div>
      <div class="cardContainer2">
        <q-card class="orderContainer" v-for="(order, index) in structuredMeals" :key="index">
          <!-- 分組 -->
          <div class="orderTitle">{{ index + 1 }} . {{ order.main_meal.name }}</div>
          <!-- 組成 -->
          <div class="items">
            <!-- 顯示主餐和副主餐的組合 -->
            <div class="item">
              <span v-html="order.side_meals.mealCombo"></span>
            </div>
            <!-- 分隔線 -->
            <div class="vertical-line"></div>
            <div class="drink column items-center">
              <template v-for="item in order.side_meals.beverages" :key="item.id" class="item">
                <span>{{ item.value }} x {{ item.quantity }}</span>
              </template>
            </div>

            <!-- 分隔線 -->
            <div class="vertical-line"></div>
            <div class="all">共{{ order.main_meal.quantity }}套</div>
          </div>
        </q-card>
      </div>

      <q-card-actions>
        <div class="personData">
          <div class="money">
            <p>訂購人姓名: {{ selectedOrder.personalName }}</p>
            <p>訂購人手機: {{ selectedOrder.mobile }}</p>
          </div>

          <p v-if="selectedOrder.paymentCompany">公司名稱: {{ selectedOrder.paymentCompany }}</p>
          <p v-if="selectedOrder.paymentTin">統一編號: {{ selectedOrder.paymentTin }}</p>

          <p>送達地址: {{ selectedOrder.address }}</p>
          <div class="money">
            <p>運費: {{ selectedOrder.shippingFee }} 元</p>
            <p>餐費: {{ selectedOrder.subTotal }} 元</p>
            <p>總金額: {{ selectedOrder.paymentTotal }}元</p>
          </div>
        </div>
        <q-btn class="priviewCloseBtn" utlined label="關閉" @click="orderDetailsDialogVisible = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <lastSectionGrey />
</template>

<script setup>
import axios from 'axios'
import { useOrderAddress } from '/stores/orderAddress'
import { PDFDocument } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { useUniversal } from '/stores/universal'

const { onMessengerClick, onForm1Click, onForm2Click, onMessengerIg, dialNumber, onDownloadClick, onMessengerFreight, onMessengerFB } = useUniversal()

const { addressoptions, citiesByAddress } = useOrderAddress()
const router = useRouter()
const personalName = ref('')
const mobile = ref('')
const code = ref('')
const orders = ref([])
const dialogVisible = ref(false)
const errorMessage = ref('')
const config = useRuntimeConfig()
const quantityApiUrl = config.public.quantityApiBaseUrl
const orderDetailsDialogVisible = ref(false)
const orderDetails = ref(null)
const selectedOrder = ref({})

const handleOrderClick = row => {
  // console.log('handleOrderClick row:', row)
  const orderTotals = row.order_totals
  // console.log('orderTotals:', orderTotals)

  const shippingFee = orderTotals.find(total => total.code === 'shipping_fee')?.value
  const subTotal = orderTotals.find(total => total.code === 'sub_total')?.value

  // console.log('shippingFee:', shippingFee)
  // console.log('subTotal:', subTotal)

  fetchOrderDetails(row.orderID, row.personal_name, row.mobile, formatAddress2(row), row.paymentTotal, shippingFee, subTotal, row.paymentCompany, row.paymentTin)
}
const fetchOrderDetails = async (orderID, personalName, mobile, address, paymentTotal, shippingFee, subTotal, paymentCompany, paymentTin) => {
  try {
    const response = await axios.get(`${quantityApiUrl}/order/${orderID}`)
    orderDetails.value = response.data

    selectedOrder.value = {
      orderID: orderID,
      personalName: personalName,
      mobile: mobile,
      address: address,
      paymentTotal: paymentTotal,
      shippingFee: shippingFee,
      subTotal: subTotal,
      paymentCompany: paymentCompany,
      paymentTin: paymentTin
    }

    orderDetailsDialogVisible.value = true
  } catch (error) {
    console.error('取得餐點失敗:', error)
  }
}

//名稱替換
const mealNameMap = {
  薯泥潤餅3吋: '薯泥香素鬆潤餅',
  炸蝦潤餅3吋: '千島香酥蝦潤餅',
  芥雞潤餅3吋: '蜂蜜芥末雞潤餅',
  酥魚潤餅3吋: '蒜味鄉村魚潤餅',
  培根潤餅3吋: '凱薩烤培根潤餅',
  滷肉潤餅3吋: '媽手老滷肉潤餅',
  全素潤餅3吋: '全素薯泥香素鬆潤餅',
  蛋素潤餅3吋: '蛋素薯泥香素鬆潤餅',
  主廚潤餅3吋: '潤餅捲2入',
  薯泥潤餅: '薯泥香素鬆潤餅',
  炸蝦潤餅: '千島香酥蝦潤餅',
  芥雞潤餅: '蜂蜜芥末雞潤餅',
  酥魚潤餅: '蒜味鄉村魚潤餅',
  培根潤餅: '凱薩烤培根潤餅',
  滷肉潤餅: '媽手老滷肉潤餅',
  全素潤餅: '全素薯泥香素鬆潤餅',
  蛋素潤餅: '蛋素薯泥香素鬆潤餅',
  微豆: '微甜豆漿',
  無豆: '無糖豆漿',
  紅茶: '古早味紅茶',
  奶茶: '古早味奶茶',
  季節甜品: '季節甜品',
  濃湯: '季節濃湯',
  招牌便當: '招牌潤餅便當',
  素食便當: '素食潤餅便當',
  雞胸便當: '雙主餐潤餅便當 - 清蒸嫩雞胸',
  雞腿便當: '雙主餐潤餅便當 - 傳香滷雞腿',
  滷牛便當: '雙主餐潤餅便當 - 家常厚滷牛',
  鮭魚便當: '雙主餐潤餅便當 - 法式烤鮭魚',
  牛肉丸便當: '雙主餐潤餅便當 - 法式紅酒牛肉丸',
  滷牛油飯盒: '香辣滷牛油飯盒',
  雞翅油飯盒: '香炸雞翅油飯盒',
  控肉油飯盒: '香滷控肉油飯盒',
  雞腿油飯盒: '香滷雞腿油飯盒'
}
const structuredMeals = computed(() => {
  return orderDetails.value.map(order => {
    // 初始化新的配餐類別
    const categories = { mealCombo: [], beverages: [] }

    // 處理主餐和副主餐，組合成字符串
    order.side_meals.forEach(meal => {
      const mealName = mealNameMap[meal.value] || meal.value
      if (meal.name === '主餐' || meal.name === '6吋潤餅') {
        categories.mealCombo.push(`${mealName} x ${meal.quantity}`)
        // 檢查是否是極品油飯，並添加加贈豆花
        if (mealName === '極品油飯') {
          categories.mealCombo.push(`<span class="text-red">加贈豆花 x ${meal.quantity}</span>`)
        }
      } else if (meal.name === '飲料') {
        categories.beverages.push({ value: mealName, quantity: meal.quantity, id: meal.id })
      }
    })

    // 把 mealCombo 转换为字符串，用换行符分隔
    categories.mealCombo = categories.mealCombo.join('<br/>')

    // 處理 main_meal 的名稱替換
    const mainMealName = mealNameMap[order.main_meal.name] || order.main_meal.name

    // 返回此組的完整結構
    return {
      main_meal: {
        name: mainMealName,
        quantity: order.main_meal.quantity
      },
      side_meals: categories
    }
  })
})

const statusMap = {
  Pending: '未確認',
  Confirmed: '已確認',
  CCP: '已確待配',
  Void: '作廢'
}
const shippingStatusMap = {
  0: '',
  2: '',
  3: '餐點運送中'
}

const navigateToFAQ = () => {
  router.push('/faq')
}

const formatDate = dateStr => {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}/${month}/${day}`
}

const cleanInput = input => {
  // 首先使用 trim() 移除前后空白字符，然后使用 replace() 移除所有连字符
  return input.trim().replace(/-/g, '')
}

const searchOrders = async () => {
  // 使用 cleanInput 函数清理输入值
  const criteria = [cleanInput(personalName.value), cleanInput(mobile.value), cleanInput(code.value)].filter(Boolean)
  if (criteria.length < 2) {
    errorMessage.value = '請至少提供兩個查詢條件'
    dialogVisible.value = true

    return
  }

  try {
    const response = await axios.get(`${quantityApiUrl}/order`, {
      params: {
        code: cleanInput(code.value),
        personal_name: cleanInput(personalName.value),
        mobile: cleanInput(mobile.value)
      }
    })
    // 格式化每個訂單的日期
    orders.value = response.data
      .map(order => ({
        ...order,
        delivery_date: formatDate(order.delivery_date)
      }))
      .reverse()

    orders.value = await Promise.all(
      response.data.map(async order => {
        try {
          const deliveryResponse = await axios.get(`${quantityApiUrl}/delivery/${order.code}`)
          const deliveryInfo = deliveryResponse.data || {}
          return { ...order, deliveryInfo, delivery_date: formatDate(order.delivery_date) }
        } catch (error) {
          console.error('獲取外送員資訊失敗:', error)
          return { ...order, delivery_date: formatDate(order.delivery_date) } // 外送員資訊獲取失敗時
        }
      })
    )
  } catch (error) {
    console.error('查詢失敗:', error)
    errorMessage.value = '查無此資料,請確認輸入資料是否正確'
    dialogVisible.value = true
  }
}

const formatDeliveryInfo = row => {
  if (!row.deliveryInfo) {
    return ''
  }
  return `姓名: ${row.deliveryInfo.name}<br>電話: ${row.deliveryInfo.phone}<br>車種: ${row.deliveryInfo.cartype}`
}

const formatAddress = order => {
  const state = addressoptions.find(item => item.id === order.shipping_state_id)?.name || ''
  const city = citiesByAddress[order.shipping_state_id]?.find(item => item.city_id === order.shipping_city_id)?.name || ''
  return `${state}${city}<br>${order.shipping_road}${order.shipping_address1}`
}
const formatAddress2 = order => {
  const state = addressoptions.find(item => item.id === order.shipping_state_id)?.name || ''
  const city = citiesByAddress[order.shipping_state_id]?.find(item => item.city_id === order.shipping_city_id)?.name || ''
  return `${state}${city}${order.shipping_road}${order.shipping_address1}`
}

const getStatusText = statusCode => {
  return statusMap[statusCode] || '未知狀態'
}
const getShippingStatusText = shippingStatus => {
  return shippingStatusMap[shippingStatus] || ''
}

// 取消訂單

const confirmCancelDialogVisible = ref(false)
const orderToCancel = ref('')

const cancelOrder = orderCode => {
  // 存储即将取消的订单代码，并显示确认对话框
  orderToCancel.value = orderCode
  confirmCancelDialogVisible.value = true
}

const confirmCancelOrder = async () => {
  try {
    const response = await axios.put(`${quantityApiUrl}/order/${orderToCancel.value}/void`)
    if (response.status === 200) {
      searchOrders()
      confirmCancelDialogVisible.value = false
      // 这里可以添加通知，比如使用 Quasar 的 Notify 插件
    }
  } catch (error) {
    console.error('訂單取消失敗:', error)
    errorMessage.value = '訂單取消失敗，請與店家聯繫'
    dialogVisible.value = true
  }
}

const columns = [
  { name: 'code', align: 'center', label: '訂單號碼', field: 'code', sortable: true },
  { name: 'delivery_date', align: 'center', label: '訂購日期', field: 'delivery_date', sortable: true },
  { name: 'delivery_time_range', align: 'center', label: '訂餐時段', field: 'delivery_time_range', sortable: true },
  // { name: 'personal_name', align: 'center', label: '訂購人姓名', field: 'personal_name', sortable: false },
  // { name: 'mobile', align: 'center', label: '訂購人手機', field: 'mobile', sortable: false },
  // {
  //   name: 'address',
  //   align: 'center',
  //   label: '送達地址',
  //   field: row => formatAddress(row),
  //   sortable: false
  // },
  {
    name: 'status_id',
    align: 'center',
    label: '訂單狀態',
    field: row => getStatusText(row.status_code),
    sortable: true
  },
  // {
  //   name: 'shipping_status',
  //   align: 'center',
  //   label: '出餐狀態',
  //   field: row => getShippingStatusText(row.shipping_status),
  //   sortable: true
  // },
  {
    name: 'deliveryInfo',
    align: 'center',
    label: '外送員資訊',
    field: row => formatDeliveryInfo(row),
    sortable: false
  },
  // {
  //   name: 'download',
  //   align: 'center',
  //   label: '下載 PDF',
  //   field: 'download',
  //   sortable: false,
  //   format: (val, row) => '下載'
  // },
  {
    name: 'cancelOrder',
    align: 'center',
    // label: '操作',
    field: 'cancel',
    sortable: false,
    format: (val, row) => '取消訂單'
  }
]

async function generatePdf(row) {
  try {
    // 從 public 目錄加載現有的 PDF 文件
    const existingPdfBytes = await fetch('/menu.pdf').then(res => res.arrayBuffer())

    // 加載 PDF 文件
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    pdfDoc.registerFontkit(fontkit)
    // 從 public 目錄加載自定義字體
    const fontBytes = await fetch('/NotoSansTC.ttf').then(res => res.arrayBuffer())
    const customFont = await pdfDoc.embedFont(fontBytes)

    // 獲取 PDF 的第一頁
    const page = pdfDoc.getPage(1)
    const page2 = pdfDoc.getPage(2) // 獲取第一頁

    // 添加文本到 PDF
    page.drawText(`訂單編號: ${row.code}`, { x: 400, y: 800, size: 12, font: customFont })
    page.drawText(` ${row.delivery_date}`, { x: 87, y: 750, size: 12, font: customFont })
    page.drawText(`${row.delivery_time_range}`, { x: 450, y: 750, size: 12, font: customFont })
    page.drawText(`${row.personal_name}`, { x: 80, y: 725, size: 12, font: customFont })
    page.drawText(` ${row.mobile}`, { x: 450, y: 725, size: 12, font: customFont })
    page.drawText(`${formatAddress(row)}`, { x: 80, y: 680, size: 12, font: customFont })
    // 添加文本到 PDF
    page2.drawText(`訂單編號: ${row.code}`, { x: 400, y: 800, size: 12, font: customFont })
    page2.drawText(` ${row.delivery_date}`, { x: 87, y: 750, size: 12, font: customFont })
    page2.drawText(`${row.delivery_time_range}`, { x: 450, y: 750, size: 12, font: customFont })
    page2.drawText(`${row.personal_name}`, { x: 80, y: 725, size: 12, font: customFont })
    page2.drawText(` ${row.mobile}`, { x: 450, y: 725, size: 12, font: customFont })
    page2.drawText(`${formatAddress(row)}`, { x: 80, y: 680, size: 12, font: customFont })

    // 序列化 PDF 文件
    const pdfBytes = await pdfDoc.save()

    return new Blob([pdfBytes], { type: 'application/pdf' })
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}

const downloadPdf = async row => {
  try {
    const blob = await generatePdf(row)
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank') // 在新視窗中打開 PDF
  } catch (error) {
    console.error('Error creating PDF:', error)
  }
}

const isMobile = ref(false)

const checkWidth = () => {
  isMobile.value = window.innerWidth < 1024
}
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 3
})

const pagesNumber = computed(() => {
  return Math.ceil(orders.value.length / pagination.value.rowsPerPage)
})

onMounted(() => {
  checkWidth()
  window.addEventListener('resize', checkWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkWidth)
})
</script>
<style lang="scss" scoped>
@import 'assets/search.scss';
</style>
