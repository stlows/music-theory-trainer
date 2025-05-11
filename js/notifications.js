let notificationsWrapper = document.getElementById("notifications")
function notify(message, type = "success") {
  let notification = div("notification")
  notification.classList.add(type)
  notification.innerText = message
  notificationsWrapper.appendChild(notification)
  setTimeout(() => {
    notification.remove()
  }, 3000)
}