import knexMethod from 'knex'
const knex = knexMethod({
  client: 'pg',
  connection: {
    host: '80.211.208.41',
    port: 5432,
    user: 'eggmaster',
    password: '54fd8890',
    database: 'sda',
  }
})


export default {

  get(table, url) {
    const myUrl = url.slice(1)
    if (myUrl.indexOf('?') < 0) {
      return knex.select('*').from(table)
    }
    const splited = myUrl.split('?')
    const filterValues = splited[1].split('=')
    const obj = {}
    obj[filterValues[0]] = filterValues[1]
    return knex.select('*').from(table).where(obj)
  },
  getOne(table, id) {
    return knex.select('*').from(table).where({ id })
    // return new Promise((resolve) => {
    //   fs.readFile(__dirname + '/data/data.txt', (err, data) => {
    //     const dataObj = JSON.parse(data)
    //     resolve(dataObj[table].find(record => '' + record.id === '' + id))
    //   })
    // })
  },
  post(table, body) {
    return knex(table).insert(body)
  },
  put(table, body, id) {
    return knex(table).where({ id }).update(body)
  },
  delete(table, id) {
    return knex(table).where({ id }).del()
  }

}