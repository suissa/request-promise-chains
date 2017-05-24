let request = require('request')
let rp = require('request-promise')

let options = {
  uri: '',
  headers: {
    'User-Agent': 'Suissa-Chain-of-Requests'
  },
  json: true
}
let url1 = options
let url2 = options
let url3 = options

const user = 'suissa'
url1.uri = 'https://api.github.com/users/' + user

const cb1 = (response) => {
  console.log('1) Dados do usuário '+ response.name +': ', response)
  url2.uri = response.organizations_url
  return rp(url2)
}
const cb2 = (response) => {
  console.log('2) Listagem das suas organizações: ')
  response.forEach((org, i) => {
    console.log('- ' + org.login)
    if (org.login.toLowerCase() === 'webschool-io')
      url3.uri = org.repos_url
  })
  return rp(url3)
}

const cb3 = (response) => {
  console.log('3) Quantidade dos repos da org (por page): ', response[0].owner.login)
  console.log(response.length)
}

rp(url1)
  .then(cb1)
  .then(cb2)
  .then(cb3)
  .catch(console.log)

// FIM
