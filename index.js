import express from 'express'
import bodyParser from 'body-parser'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))
import cors from 'cors'

import dbFs from './dbFs.js'
import db from './db.js'

// import knexMethod from 'knex'
// const knex = knexMethod({
//   client: 'pg',
//   connection: {
//     host: '80.211.208.41',
//     port: 5432,
//     user: 'eggmaster',
//     password: '54fd8890',
//     database: 'sda',
//   }
// })
// knex.select('*').from('weather').where({city: 'Brno'})
//   .then((data) => {
//     console.log(data)
//   })

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// const content = 'jiná data'
// fs.writeFileSync(__dirname + '/data/data.txt', content)

// URL bude server/tabulka - vypsat všechny údaje z tabulky
// URL bude tabulka?
// key=value&key1=value2
// key:gte:value (větší nebo rovno) (lte, lt, gt)
// :limit=30 - vybere jen prvních 30 záznamů
// :limit=30:offset=10 - vybere 30 záznamů a vynechá prvních 10

app.get('/:table', (req, res) => {
  db.get(req.params.table, req.url).then(data => {
    res.json(data)
  })
})

// URL bude server/tabulka/id

app.get('/:table/:id', (req, res) => {
  db.getOne(req.params.table, req.params.id).then(data => {
    res.json(data)
  })
  // const data = fs.readFile(__dirname + '/data/data.txt', (err, data) => {
  //   const dataObj = JSON.parse(data)
  //   res.json(dataObj[req.params.table].find(record => '' + record.id === '' + req.params.id))
  // })
})

app.post('/:table', (req, res) => {
  db.post(req.params.table, req.body).then(data => {
    res.json(data)
  })
})

app.put('/:table/:id', (req, res) => {
 db.put(req.params.table, req.body, req.params.id).then(data => {
  res.json(data)
 })
})

app.delete('/:table/:id', (req, res) => {
  db.delete(req.params.table, req.params.id).then(data => {
    res.json(data)
  })
})

const server = app.listen(8800, () => {
  console.log('server is running on port 8800')
})