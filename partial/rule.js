let id

const key = 'policed'

// Get current window id and assign to variable
browser.windows.getCurrent({populate: true}).then((window) => {
  id = window.id
  console.log(`window id is ${id}`)
})

// If police site set to true - add url to ban list in storage
document.addEventListener('submit', (e) => {
  e.preventDefault()

  browser.tabs.query({windowId: id, active: true})
    .then((tabs) => {
      let url = new URL(tabs[0].url)
      let hostname = url.hostname

      let data = new FormData(e.target);

      // if 'policed' is true - add site to ban list
      if (data.get(key) === '1') {
        console.log('key is true')
        let storageObject = {}
        storageObject[hostname] = true;
        browser.storage.local.set(storageObject)
          .then(
            (item) => {
              console.log('successfully set storage')
              refreshTableData()
            },
            (e) => {
              console.log('something went wrong ' + e.message)
            }
          )
      } else {
        browser.storage.local.remove(hostname)
      }
    })
})

// Load data into table
window.addEventListener('load', (e) => {
  console.log('arright lah')
  refreshTableData()
})

function refreshTableData() {
  const table = document.querySelector('#sites > tbody')
  table.innerHTML = ''
  browser.storage.local.get()
    .then(
      (items) => {
        console.log(items)

        for (const key in items) {
          let row = table.insertRow(0)
          let cell = row.insertCell(0)
          cell.innerHTML = key
        }
      },
      (e) => {
        console.log(`Something went tits up: ${e.message}`)
      }
    )
}
