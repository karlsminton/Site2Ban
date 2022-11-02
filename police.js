let html

let path = browser.runtime.getURL('banned.html')
let req = new Request(path)

fetch(req)
  .then((res) => res.text())
  .then((text) => html = text)

console.log(path)

const url = new URL(document.URL)

browser.storage.local.get()
  .then(
    (items) => {
      console.log(items)
      if (items[url.hostname] === true) {
        document.body.style.background = 'red'
        document.body.innerHTML = html
      }
    },
    (e) => {
      console.log(`error loading ban list - ${e.message}`)
    }
  )
