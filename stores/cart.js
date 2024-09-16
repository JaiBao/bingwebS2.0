import { defineStore } from 'pinia'
import { toRaw } from 'vue'

export const useCartStore = defineStore('cart', {
  state: () => ({
    orders: [],
    nextOrderId: 1,
    selectedAddress: { label: '', value: '' }, // 存储选定的地址
    selectedCity: { label: '', value: '' }, // 存储选定的城市
    selectedPickupMethod: ''
  }),
  getters: {
    // 計算總數量
    totalItems: state => {
      return state.orders.reduce((total, order) => {
        if (order.id === 1597) {
          // 分享餐的产品ID
          // 分享餐的处理方式
          const shareMealQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0)
          return total + Math.floor(shareMealQuantity / 6) // 每6个主餐算作1套
        } else if (order.id === 1062) {
          // 其他特定商品的处理方式
          const allItemsQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0)
          return total + allItemsQuantity
        } else {
          // 普通商品的处理方式
          const mainDishQuantity = order.items.reduce((sum, item) => sum + (item.isMainDish ? item.quantity : 0), 0)
          return total + mainDishQuantity
        }
      }, 0)
    }
  },

  actions: {
    //新增
    addOrder(id, title, items, dialogInfo, mainDishQuantity, main_category_code, comment) {
      const uniqueOrderId = this.nextOrderId++

      const order = {
        uniqueId: uniqueOrderId,
        id,
        title,
        items,
        dialog: dialogInfo, // dialog存
        mainDishQuantity,
        main_category_code,
        comment
      }
      this.orders.push(order)
      this.saveOrders()
      console.log('Added order:', order)
      console.log('Next Order ID:', this.nextOrderId)
      console.log('Orders array:', toRaw(this.orders))
    },
    // 设置选定的縣市
    setSelectedAddress(address) {
      this.selectedAddress = address
    },
    // 设置选定的地区
    setSelectedCity(city) {
      this.selectedCity = city
    },
    removeOrder(uniqueOrderId) {
      // 刪除
      this.orders = this.orders.filter(order => order.uniqueId !== uniqueOrderId)

      // +1
      this.orders.forEach((order, index) => {
        order.uniqueId = index + 1
      })

      // 重算
      this.nextOrderId = this.orders.length + 1
      this.saveOrders()
    },
    initializeStore() {
      if (typeof window !== 'undefined') {
        const storedOrders = sessionStorage.getItem('cartOrders')
        if (storedOrders) {
          this.orders = JSON.parse(storedOrders)

          // 找到最大 uniqueOrderId
          const maxUniqueOrderId = this.orders.reduce((maxId, order) => {
            return order.uniqueId > maxId ? order.uniqueId : maxId
          }, 0)

          // 将 nextOrderId 设置为最大 uniqueOrderId + 1
          this.nextOrderId = maxUniqueOrderId + 1
        }
      }
    },
    saveOrders() {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('cartOrders', JSON.stringify(toRaw(this.orders)))
      }
    },
    // 重置
    resetStore() {
      // 重置状态
      this.orders = []
      this.nextOrderId = 1
      this.clearAddressAndCity()

      // 清除 sessionStorage 中的数据
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('cartOrders')
      }

      console.log('緩存商店已清除')
    },
    setPickupMethod(method) {
      this.selectedPickupMethod = method
    },
    clearAddressAndCity() {
      // 正确的清空地址和城市的方法
      this.selectedAddress = { label: '', value: '' }
      this.selectedCity = { label: '', value: '' }
    },
    restoreStateFromLocalStorage() {
      const storedOrders = JSON.parse(localStorage.getItem('orders')) || []
      this.orders = storedOrders

      // 找到最大 uniqueOrderId
      const maxUniqueOrderId = this.orders.reduce((maxId, order) => {
        return order.uniqueId > maxId ? order.uniqueId : maxId
      }, 0)

      // 将 nextOrderId 设置为最大 uniqueOrderId + 1
      this.nextOrderId = maxUniqueOrderId + 1
      console.log('Restored orders:', this.orders)
      console.log('Next Order ID set to:', this.nextOrderId)
    }
  }
})
