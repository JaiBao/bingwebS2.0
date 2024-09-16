// stores/useDialogStore.js

const onlineDialog = ref(false)

export const useDialogStore = () => {
  function onOnlineClick() {
    onlineDialog.value = true
  }

  function closeOnlineClick() {
    onlineDialog.value = false
  }

  return { onlineDialog, onOnlineClick, closeOnlineClick }
}
