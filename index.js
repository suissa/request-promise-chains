let request = require('request')
let rp = require('request-promise')

const user = 'suissa'
let url1 = {
  uri: 'https://api.github.com/users/' + user,
  headers: {
    'User-Agent': 'Suissa-Chain-of-Requests'
  },
  json: true
}
let url2 = {
  headers: {
    'User-Agent': 'Suissa-Chain-of-Requests'
  },
  json: true
}
let url3 = {
  headers: {
    'User-Agent': 'Suissa-Chain-of-Requests'
  },
  json: true
}

// request(url1, (err, response) => {
//   if (err)return console.log('err', err)
//   return console.log('SUCESSO request')
// })

console.log('antes da req')
rp(url1)
  .then((response) => {
    console.log('1) Dados do usuário '+ response.name +': ', response)
    url2.uri = response.organizations_url
    return rp(url2)
  })
  .then((response) => {
    console.log('2) Listagem das suas organizações: ')
    response.forEach((org, i) => {
      console.log('- ' + org.login)
      if (org.login.toLowerCase() === 'webschool-io')
        url3.uri = org.repos_url
    })
    return rp(url3)
  })
  .then((response) => {
    console.log('3) Listagem dos repos da org: ', response[0].owner.login)
    console.log(response)
  })
  .catch(err => console.log)