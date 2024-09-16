// middleware/agreeCollecton.js
import { useAgreeCollectionStore } from '/stores/agreeCollection'

export default defineNuxtRouteMiddleware((to, from) => {
  const agreeCollection = useAgreeCollectionStore()
  agreeCollection.initializeAgreement()

  if (to.path === '/onlineOrder' && agreeCollection.hasAgreed === false) {
    console.log('禁止通行')
    return navigateTo('/')
  }
})
