import fs from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
  get (table, url) {
    return new Promise((resolve) => {
      fs.readFile(__dirname + '/data/data.txt', (err, data) => {
        const dataObj = JSON.parse(data)
        console.log(dataObj)
        console.log(table, url)
        const myUrl = url.slice(1)
        if (myUrl.indexOf('?') < 0) {
          console.log(dataObj[table])
          resolve(dataObj[table])
          return
        }
        const splited = myUrl.split('?')
        const filterValues = splited[1].split('=')
        const result = dataObj[splited[0]].filter(record => record[filterValues[0]] === filterValues[1])
        resolve(result)
      })
    })
  },
  getOne (table, id) {
    return new Promise((resolve) => {
      fs.readFile(__dirname + '/data/data.txt', (err, data) => {
        const dataObj = JSON.parse(data)
        resolve(dataObj[table].find(record => '' + record.id === '' + id))
      })
    })
  },
  post (table, body) {
    return new Promise((resolve) => {
      fs.readFile(__dirname + '/data/data.txt', (err, data) => {
        const dataObj = JSON.parse(data)
        const ids = dataObj[table].map(record => record.id)
        const newId = Math.max(...ids) + 1
        dataObj[table].push(Object.assign({ id: newId }, body))
        fs.writeFileSync(__dirname + '/data/data.txt', JSON.stringify(dataObj))
        resolve(newId)
      })
    })
  },
  put (table, body, id) {
    return new Promise((resolve) => {
      fs.readFile(__dirname + '/data/data.txt', (err, data) => {
        const dataObj = JSON.parse(data)
        let recordToEdit = dataObj[table].find(record => '' + record.id === '' + id)
        recordToEdit = Object.assign(recordToEdit, body)
        fs.writeFileSync(__dirname + '/data/data.txt', JSON.stringify(dataObj))
        resolve("OK")
      })
    })
  },
  delete (table, id) {
    return new Promise((resolve) => {
      fs.readFile(__dirname + '/data/data.txt', (err, data) => {
        const dataObj = JSON.parse(data)
        const index = dataObj[table].findIndex(record => '' + record.id === '' + id)
        dataObj[table].splice(index, 1)
        fs.writeFileSync(__dirname + '/data/data.txt', JSON.stringify(dataObj))
        resolve("OK")
      })
    })
  }
}