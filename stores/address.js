import { defineStore } from 'pinia'

export const useAddressStore = defineStore({
  id: 'address',
  state: () => ({
    state: [
      { value: 1, label: '台北市' },
      { value: 2, label: '新北市' }
    ],
    pricelist: [
      { city: '台北市', disable: true },
      { city: '北投區', limit: 6000, price: 300 },
      { city: '內湖區', limit: 5000, price: 250 },
      { city: '松山區', limit: 1500, price: 75 },
      { city: '中山區', limit: 1500, price: 75 },
      { city: '大同區', limit: 2000, price: 100 },
      { city: '南港區', limit: 5000, price: 250 },
      { city: '信義區', limit: 1500, price: 75 },
      { city: '大安區', limit: 1000, price: 50 },
      { city: '中正區', limit: 1500, price: 75 },
      { city: '萬華區', limit: 2000, price: 100 },
      { city: '文山區', limit: 3000, price: 150 },
      { city: '新北市', disable: true },
      { city: '永和區', limit: 2000, price: 100 },
      { city: '中和區', limit: 3000, price: 150 },
      { city: '新店區', limit: 4000, price: 200 },
      { city: '板橋區', limit: 4000, price: 200 },
      { city: '新莊區', limit: 4000, price: 200 },
      { city: '三重區', limit: 4000, price: 200 },
      { city: '五股區', limit: 5000, price: 250 },
      { city: '蘆洲區', limit: 5000, price: 250 },
      { city: '土城區', limit: 5000, price: 250 },
      { city: '汐止區', limit: 6000, price: 300 },
      { city: '泰山區', limit: 8000, price: 400 },
      { city: '樹林區', limit: 8000, price: 400 },
      { city: '淡水區', limit: 12000, price: 600 },
      { city: '林口區', limit: 12000, price: 600 },
      { city: '鶯歌區', limit: 12000, price: 600 },
      { city: '三峽區', limit: 12000, price: 600 },
      { city: '坪林區', limit: 12000, price: 600 }
    ]
  }),
  actions: {}
})
