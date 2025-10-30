let notificationsWrapper = document.getElementById("notifications")
let enabledNotifications = true

function notify(message, type = "success") {
  if(!enabledNotifications){
    return
  }
  let notification = div("notification")
  notification.classList.add(type)
  notification.innerText = message
  notificationsWrapper.appendChild(notification)
  setTimeout(() => {
    notification.remove()
  }, 3000)
}