// stores/useAddressDialogStore.js

const addressDialog = ref(false)

export const useAddressDialogStore = () => {
  const onAddressClick = () => {
    addressDialog.value = true
  }

  function closeAddressClick() {
    addressDialog.value = false
  }

  return { addressDialog, onAddressClick, closeAddressClick }
}
