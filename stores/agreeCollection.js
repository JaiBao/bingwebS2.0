// stores/agreeCollection.js
import { defineStore } from 'pinia'

export const useAgreeCollectionStore = defineStore('agreeCollection', {
  state: () => ({
    hasAgreed: false
  }),
  actions: {
    initializeAgreement() {
      if (process.client) {
        const storedAgreement = sessionStorage.getItem('hasAgreed')
        this.hasAgreed = storedAgreement === 'true'
      }
    },
    setAgreement(agreed) {
      this.hasAgreed = agreed
      if (process.client) {
        sessionStorage.setItem('hasAgreed', agreed.toString())
      }
    }
  }
})
