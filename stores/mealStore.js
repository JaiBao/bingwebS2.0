import { defineStore } from 'pinia'

export const useMealStore = defineStore('meal', {
  state: () => ({
    selectedMeal: false
  }),
  actions: {
    toggleSelectedMeal() {
      this.selectedMeal = !this.selectedMeal
    },
    openSelectedMeal() {
      this.selectedMeal = true
    }
  }
})
