// get local file urls
let path = browser.runtime.getURL('partial/banned.html')
let bg = browser.runtime.getURL('images/bg.webp')

// prep request for banned html
let req = new Request(path)

const url = new URL(document.URL)

browser.storage.local.get()
  .then(
    (items) => {
      if (items[url.hostname] === true) {
        // If the site is banned; request banned partial content and replace document content
        fetch(req)
          .then((res) => res.text())
          .then((html) => {
            document.body.style.background = `url(${bg})`
            document.body.innerHTML = html
            document.head.innerHTML = '<title>Site Banned!</title>'
          })
      }
    },
    (e) => {
      console.log(`error loading ban list - ${e.message}`)
    }
  )
