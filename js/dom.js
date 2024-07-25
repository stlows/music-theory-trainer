function div(className) {
  const div = document.createElement("div")
  div.classList.add(className)
  return div
}
function span(text) {
  const span = document.createElement("span")
  span.innerText = text
  return span
}
function h4(text) {
  const h4 = document.createElement("h4")
  h4.innerText = text
  return h4
}
function h5(text) {
  const h5 = document.createElement("h5")
  h5.innerText = text
  return h5
}
function hr() {
  const hr = document.createElement("hr")
  hr.classList.add("mb-small")
  return hr
}
function p(text, className = "") {
  const p = document.createElement("p")
  p.innerText = text
  if (className) {
    p.classList.add(className)
  }
  return p
}

function table(className) {
  const table = document.createElement("table")
  table.classList.add(className)
  return table
}

function tr(className = "") {
  const tr = document.createElement("tr")
  if (className) {
    tr.classList.add(className)
  }
  return tr
}

function td(text) {
  const td = document.createElement("td")
  td.innerText = text
  return td
}

function caption(text) {
  const caption = document.createElement("caption")
  caption.innerText = text
  return caption
}

function button(text) {
  const button = document.createElement("button")
  button.innerText = text
  return button
}

function details() {
  const detailsEl = document.createElement("details")
  const summary = document.createElement("summary")
  detailsEl.appendChild(summary)
  return { detailsEl, summary }
}
