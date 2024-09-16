<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
if (process.client) {
  window.addEventListener('beforeunload', () => {
    useAgreeCollectionStore().clearAgreement()
  })
}
// useHead({
//   title,
//   titleTemplate: '%s - 首頁'
// })
</script>
