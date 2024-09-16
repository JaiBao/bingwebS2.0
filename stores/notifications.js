// notifications.js
import { Notify } from 'quasar'

export function showNotify(message, isSuccess) {
  Notify.create({
    color: isSuccess ? 'green-4' : 'red-4',
    textColor: 'white',
    icon: isSuccess ? 'verified' : 'error',
    position: 'center',
    message: message
  })
}
