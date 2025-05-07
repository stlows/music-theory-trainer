function div(className) {
  const div = document.createElement("div")
  if(className){
    div.classList.add(className)
  }
  return div
}
function a(dataT) {
  const a = document.createElement("a")
  a.href = "#"
  a.dataset.t = dataT
  return a
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

function svg(width, height) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', "svg")
  svg.setAttribute("width", width)
  svg.setAttribute("height", height)
  return svg
}

function line(x1, x2, y1, y2, color, width) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', "line")
  line.setAttribute("x1", x1)
  line.setAttribute("x2", x2)
  line.setAttribute("y1", y1)
  line.setAttribute("y2", y2)
  line.setAttribute("style", `stroke: ${color}; stroke-width: ${width}`)
  return line
}

function circle(r, cx, cy, color) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', "circle")
  line.setAttribute("r", r)
  line.setAttribute("cx", cx)
  line.setAttribute("cy", cy)
  line.setAttribute("fill", color)
  return line
}

function rect(r, x, y, color) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', "rect")
  line.setAttribute("width", r)
  line.setAttribute("height", r)
  line.setAttribute("x", x)
  line.setAttribute("y", y)
  line.setAttribute("fill", color)
  line.setAttribute("rx", 4)
  line.setAttribute("ry", 4)
  return line
}

function text(x, y, text, color) {
  const textEl = document.createElementNS('http://www.w3.org/2000/svg', "text")
  textEl.setAttribute("x", x)
  textEl.setAttribute("y", y)
  textEl.setAttribute("fill", color)
  textEl.setAttribute("text-anchor", "middle")
  textEl.setAttribute("alignment-baseline", "central")
  textEl.textContent = text
  return textEl
}

function emptyGuitarSvg(referenceFret, notes) {
  const distanceBetweenString = 15
  const distanceTop = 0
  const distanceBottom = 20
  const frets = 5
  const fretSize = 20
  const height = frets * fretSize
  const width = distanceBetweenString * 5 + distanceTop + distanceBottom
  const guitarSvg = svg(width, height)
  for (let i = 0; i < 6; i++) {
    const x = distanceBottom + i * distanceBetweenString
    guitarSvg.appendChild(line(x, x, 0, height, "white", 2))
  }
  for (let i = 1; i < frets; i++) {
    const y = i * fretSize
    guitarSvg.appendChild(line(distanceBottom, width, y, y, "white", 2))
  }
  if (referenceFret <= 3) {
    guitarSvg.appendChild(line(distanceBottom, width, 0, 0, "white", 2))
  }
  if (referenceFret > 3) {
    const text = document.createElementNS('http://www.w3.org/2000/svg', "text")
    text.setAttribute("x", 25)
    text.setAttribute("y", 15)
    text.setAttribute("fill", "white")
    text.textContent = referenceFret
    guitarSvg.appendChild(text)
  }
  notes.forEach(note => {
    if (note.isRoot) {
      guitarSvg.appendChild(circle(4, 5, 15, "blue"))
    }
  })

  return guitarSvg
}
