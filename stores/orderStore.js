// ~/store/order.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { DateTime } from 'luxon'

// 檢查當前是否在客戶端（瀏覽器環境）
function isClientSide() {
  return typeof window !== 'undefined'
}

const now = DateTime.now()

//抓取假日資料
async function fetchData() {
  let disabledDates = []

  try {
    const currentYear = now.year
    // const nextYear = currentYear + 1

    // 同時取得本年和明年的假期資料,Promise.all一個壞通通壞,Promise.allSettled分開解析
    const [responseThisYear] = await Promise.all([axios.get(`https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data/${currentYear}.json`)])
    // const [responseThisYear, responseNextYear] = await Promise.all([
    //   axios.get(`https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data/${currentYear}.json`),
    //   axios.get(`https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data/${nextYear}.json`)
    // ])

    // const combinedData = [...responseThisYear.data, ...responseNextYear.data]
    const combinedData = [...responseThisYear.data]
    // 篩選出有描述且是假日的日期，並轉換格式
    disabledDates = combinedData
      .filter(item => item.isHoliday === true && item.description)
      .map(item => {
        const year = item.date.slice(0, 4)
        const month = item.date.slice(4, 6)
        const day = item.date.slice(6, 8)
        return `${year}/${month}/${day}`
      })
    // console.log(disabledDates)
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return disabledDates
}

export const useOrderStore = defineStore('order', {
  id: 'order',
  state: () => ({
    orderDetails: null,
    selectedDate: null,
    selectedTime: null,
    orderCount: 1,
    // 在瀏覽器環境中，從localStorage中取得orders數據，否則返回空物件,

    orders: isClientSide() ? JSON.parse(localStorage.getItem('orders')) || {} : {},
    disabledDates: [], // 禁止日期
    // 每個時段的最大訂購數量
    timeSlotLimits: {},
    specificDateLimits: {}
  }),
  getters: {
    todayIsFull: state => {
      const todayFormatted = DateTime.now().toFormat('yyyy/MM/dd')

      // 檢查當天是否有特定日期的設定
      if (!state.specificDateLimits[todayFormatted]) {
        return false // 如果沒有設定，則假設當天未滿
      }

      // 算出當天已設定日期訂單總數
      let totalOrdersForToday = 0
      if (state.orders[todayFormatted]) {
        for (let time in state.orders[todayFormatted]) {
          totalOrdersForToday += state.orders[todayFormatted][time]
        }
      }

      // 當天的總上限
      const todayLimit = Object.values(state.specificDateLimits[todayFormatted]).reduce((sum, limit) => sum + limit, 0)

      // 如果當天訂單數量達到或超過當天限制，則認為是滿額
      return totalOrdersForToday >= todayLimit
    },
    totalOrdersForSelectedDate: state => {
      let total = 0
      if (state.orders[state.selectedDate]) {
        for (let time in state.orders[state.selectedDate]) {
          total += state.orders[state.selectedDate][time]
        }
      }
      return total
    },

    totalOrdersLimitForSelectedDate: state => {
      // 如果特定日期有設定時段限制，則使用該日期的設定
      if (state.specificDateLimits[state.selectedDate]) {
        return Object.values(state.specificDateLimits[state.selectedDate]).reduce((sum, limit) => sum + limit, 0)
      }
      // 沒有的話用預設
      return Object.values(state.timeSlotLimits).reduce((sum, limit) => sum + limit, 0)
    },

    // 根據所選日期計算可用的日期選項
    dateOptions: state => {
      return date => {
        const formattedDate = DateTime.fromFormat(date, 'yyyy/MM/dd').toFormat('yyyy/MM/dd')
        const today = DateTime.now().toFormat('yyyy/MM/dd')
        const twoDaysFromNow = DateTime.now().plus({ day: 1 }).toFormat('yyyy/MM/dd')
        const threeDaysFromNow = DateTime.now().plus({ days: 3 }).toFormat('yyyy/MM/dd')
        const fourDaysFromNow = DateTime.now().plus({ days: 2 }).toFormat('yyyy/MM/dd')

        const now = DateTime.now()

        // 获取今天是周几
        const dayOfWeekToday = now.weekday

        // 如果今天是周五，则使用fourDaysFromNow，否则使用twoDaysFromNow
        const comparisonDate = dayOfWeekToday === 5 ? threeDaysFromNow : dayOfWeekToday === 6 ? fourDaysFromNow : twoDaysFromNow

        // const comparisonDate = dayOfWeekToday === 1 || dayOfWeekToday === 7 ? twoDaysFromNow : dayOfWeekToday === 6 ? threeDaysFromNow : fourDaysFromNow

        // 今天以前的日期或未设定的日期，返回false
        // 如果是周五且选择的日期是周一或周二，也返回false（因为周六、日不可选）
        if (formattedDate < today || formattedDate <= comparisonDate || !state.specificDateLimits[formattedDate]) {
          return false
        }
        // 如果當前日期在disabledDates中，返回false
        // if (disabledDates.includes(date)) {
        //   //   console.log('Date is disabled:', date)
        //   return false
        // }

        // 星期六或星期日，則不可選:00
        const parsedDate = new Date(date)
        const dayOfWeek = parsedDate.getDay()
        if (dayOfWeek === 6 || dayOfWeek === 0) {
          return false
        }

        // 如果是周五，且所選日期不是至少比現在晚三天，則不可選
        // if (dayOfWeek === 5 && formattedDate <= fourDaysFromNow) {
        //   return false
        // }

        // 算出已設定日期訂單總數
        let totalOrdersForDate = 0
        if (state.orders[formattedDate]) {
          for (let time in state.orders[formattedDate]) {
            totalOrdersForDate += state.orders[formattedDate][time]
          }
        }

        // 當日總上限
        const dateLimit = Object.values(state.specificDateLimits[formattedDate]).reduce((sum, limit) => sum + limit, 0)

        // 訂單已滿false
        return totalOrdersForDate < dateLimit
      }
    },
    // 計算所選日期的總訂單數
    totalOrdersForSelectedDate: state => {
      let total = 0
      if (state.orders[state.selectedDate]) {
        for (let time in state.orders[state.selectedDate]) {
          total += state.orders[state.selectedDate][time]
        }
      }
      return total
    }
  },
  actions: {
    setOrderDetails(details) {
      this.orderDetails = details
    },
    gotoToday() {
      this.selectedDate = DateTime.now().toFormat('yyyy/MM/dd')
    },
    async fetchDisabledDates() {
      this.disabledDates = await fetchData()
    },
    resetSelectedDate() {
      this.selectedDate = null // 或者是 '', 取決於你的初始狀態
      this.selectedTime = null // 如果需要，也可以重置時間
      // 重置其他相關狀態，如果需要
    },

    // 選擇不同日期時，重置所選時間
    onDateChange() {
      this.selectedTime = null
    },
    // 選擇特定的時間
    selectTime(time) {
      this.selectedTime = time
    },
    // 根據所選的日期和時間增加訂單數量
    addOrder(orderCount) {
      // if (!this.selectedDate || !this.selectedTime) {
      //   // console.error('找不到selectedDate')
      //   return
      // }

      if (!this.orders[this.selectedDate]) {
        this.orders[this.selectedDate] = {}
      }

      // 獲取特殊及預設最大數量
      let maxOrdersForSlot
      if (this.specificDateLimits[this.selectedDate] && this.specificDateLimits[this.selectedDate][this.selectedTime]) {
        maxOrdersForSlot = this.specificDateLimits[this.selectedDate][this.selectedTime]
      } else {
        maxOrdersForSlot = this.timeSlotLimits[this.selectedTime]
      }

      // 增加訂單數量
      this.orders[this.selectedDate][this.selectedTime] = orderCount
    },

    // 獲取特定日期和時間的訂單數量
    getTimeSlotOrderCount(date, time) {
      // 檢查特定日期的時段是否設有限制
      if (this.specificDateLimits[date] && this.specificDateLimits[date][time] !== undefined) {
        return this.specificDateLimits[date][time]
      }
      // 檢查默認時段限制
      if (this.timeSlotLimits[time] !== undefined) {
        return this.timeSlotLimits[time]
      }
      // 如果沒有設置限制，返回 0
      return 0
    },
    // 將當前的訂單數據保存到localStorage中
    saveStateToLocalStorage() {
      localStorage.setItem('orders', JSON.stringify(this.orders))
    },
    // 從localStorage中恢復訂單數據
    restoreStateFromLocalStorage() {
      this.orders = JSON.parse(localStorage.getItem('orders')) || {}
    },

    // 區段數量預設
    async fetchTimeSlotLimits() {
      try {
        const config = useRuntimeConfig()
        const quantityApiUrl = config.public.quantityApiBaseUrl
        const response = await axios.get(`${quantityApiUrl}/get-timeslot`)
        this.timeSlotLimits = response.data
      } catch (error) {
        console.error('預設日期錯誤:', error)
      }
    },

    // 已設定套數日期

    async fetchSpecificDateLimits() {
      try {
        const config = useRuntimeConfig()
        const quantityApiUrl = config.public.quantityApiBaseUrl
        const response = await axios.get(`${quantityApiUrl}/get-special`)
        const specificDateLimits = {}

        // 每個月
        for (const [month, dates] of Object.entries(response.data)) {
          // 每日
          for (const [date, limits] of Object.entries(dates)) {
            // 日期格式轉換
            const formattedDate = DateTime.fromISO(date).toFormat('yyyy/MM/dd')
            specificDateLimits[formattedDate] = limits
          }
        }

        this.specificDateLimits = specificDateLimits
      } catch (error) {
        console.error('自訂日期錯誤:', error)
      }
    }
  }
})
