// stores/cartDialogStore.js
import { defineStore } from 'pinia'

export const useCartDialogStore = defineStore('dialog', {
  state: () => ({
    isCartDialogOpen: false,
    noBtn: false
  }),
  actions: {
    toggleDialog() {
      this.isCartDialogOpen = !this.isCartDialogOpen
    },
    openDialog() {
      this.isCartDialogOpen = true
    },
    closeDialog() {
      this.isCartDialogOpen = false
    },
    openNoBtn() {
      this.noBtn = true
    },
    closeNoBtn() {
      this.noBtn = false
    }
  }
})
