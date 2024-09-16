<template>
  <div class="calendar">
    <div class="title">
      <button href="" @click.prevent="prevMonth"><q-icon name="arrow_back_ios" size="2rem" /></button>
      <div class="titleTxt">
        <!-- 月份和年份的顯示 -->
        <h6 class="pink small" id="calendar-year">{{ my_year }}</h6>
        <h6 class="pink" id="calendar-title">{{ month_name[my_month] }}</h6>
      </div>

      <button href="" @click.prevent="nextMonth"><q-icon name="arrow_forward_ios" size="2rem" /></button>
    </div>
    <div class="body">
      <div class="lightgrey body-list">
        <ul>
          <!-- 星期幾-->
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
        </ul>
      </div>
      <div class="darkgrey body-list">
        <ul id="days">
          <!--  v-for 生成日期 -->
          <li v-for="(day, index) in calendarDays" :key="index" :class="getDayClass(day)">
            {{ day }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const month_name = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

const my_date = new Date()
const my_year = ref(my_date.getFullYear())
const my_month = ref(my_date.getMonth())
const my_day = my_date.getDate()

const calendarDays = ref([])
const calendarTitle = ref('')
const calendarYear = ref('')

onMounted(() => {
  refreshDate()
})

// 計算每月的第一天是星期幾
function dayStart(month, year) {
  const tmpDate = new Date(year, month, 1)
  return tmpDate.getDay()
}

// 判斷某年是否為閏年
function daysMonth(month, year) {
  const tmp = year % 4
  if (tmp === 0) {
    return month_olympic[month]
  } else {
    return month_normal[month]
  }
}

// 獲取日期的 CSS 類別
function getDayClass(day) {
  if (
    (day < my_day && my_year.value === my_date.getFullYear() && my_month.value === my_date.getMonth()) ||
    my_year.value < my_date.getFullYear() ||
    (my_year.value === my_date.getFullYear() && my_month.value < my_date.getMonth())
  ) {
    return 'lightgrey'
  } else if (day === my_day && my_year.value === my_date.getFullYear() && my_month.value === my_date.getMonth()) {
    return 'pink pinkbox'
  } else {
    return 'darkgrey'
  }
}

// 刷新日期顯示
function refreshDate() {
  const str = []
  const totalDay = daysMonth(my_month.value, my_year.value)
  const firstDay = dayStart(my_month.value, my_year.value)
  for (let i = 1; i < firstDay; i++) {
    str.push('')
  }
  for (let i = 1; i <= totalDay; i++) {
    str.push(i)
  }
  calendarDays.value = str
  calendarTitle.value = month_name[my_month.value]
  calendarYear.value = my_year.value
}

// 切換到上一個月
function prevMonth() {
  my_month.value--
  if (my_month.value < 0) {
    my_year.value--
    my_month.value = 11
  }
  refreshDate()
}

// 切換到下一個月
function nextMonth() {
  my_month.value++
  if (my_month.value > 11) {
    my_year.value++
    my_month.value = 0
  }
  refreshDate()
}
</script>

<style lang="scss" scoped>
.calendar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  //   align-items: center;
  max-width: 1450px;
  //   height: 350px;
  background: #fff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  margin: 30%;
}

.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  button {
    background: transparent;
    border: none;
  }
}
.titleTxt {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80%;
  h6 {
    margin: 1% 1%;
  }
}
.body {
  display: flex;
  flex-direction: column;
}
.body-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.body-list ul {
  width: 100%;
  font-family: arial;
  font-weight: bold;
  font-size: 14px;
  padding: 0;
}
.body-list ul li {
  width: 14.28%;
  height: 36px;
  line-height: 36px;
  list-style-type: none;
  display: block;
  box-sizing: border-box;
  float: left;
  text-align: center;
}
.lightgrey {
  color: #a8a8a8; /*浅灰色*/
}
.darkgrey {
  color: #565656; /*深灰色*/
}
.pink {
  color: #f50077;
}
.pinkbox {
  border: 1px solid #f50077;
  background: #e9f8df; /*背景*/
}
</style>
