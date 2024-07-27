const fs = require('fs')
const path = require('path')

const version = new Date().valueOf() // Version to append

// Path to the index.html file
const filePath = path.join(__dirname, 'index.html')

// Read the index.html file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    return console.error(`Error reading file: ${err.message}`)
  }

  // Regular expressions to match and remove existing version query strings
  const cssRegex = /(<link\s+[^>]*href=["'][^"']+\.css)(\?v=[^"']+)?(["'][^>]*>)/g
  const jsRegex = /(<script\s+[^>]*src=["'][^"']+\.js)(\?v=[^"']+)?(["'][^>]*><\/script>)/g

  // Remove existing version query strings and add the new version query string to CSS imports
  let updatedHtml = data.replace(cssRegex, `$1?v=${version}$3`)

  // Remove existing version query strings and add the new version query string to JS imports
  updatedHtml = updatedHtml.replace(jsRegex, `$1?v=${version}$3`)

  // Write the modified content back to the index.html file
  fs.writeFile(filePath, updatedHtml, 'utf8', (err) => {
    if (err) {
      return console.error(`Error writing file: ${err.message}`)
    }
    console.log('index.html has been updated with versioning.')
  })
})