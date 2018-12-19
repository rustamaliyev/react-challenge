const http = require('http')
const url = require('url')
const fs = require('fs')

const data = require('./data')

const USERS_REGEX = /^\/users\/?$/
const USER_REGEX = /^\/users\/\d+$/

const PORT = 8080

const GET_USERS = (req, res) => {
  let users = data.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    zip: user.address.zipcode,
  }))
  let stringUsers = JSON.stringify(users)

  res.end(stringUsers)
}

const GET_USER = (req, res) => {
  let id = +(req.url.replace('/users/', ''))
  let userData = data.filter(user => user.id === id)[0]
  if (userData) {
    res.end(JSON.stringify(userData))
    return
  }

  NOT_FOUND(req, res)
}

const NOT_FOUND = (req, res) => {
  res.writeHead(404)
  res.end()
}

http.createServer(function(req, res) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (['GET', 'POST'].indexOf(req.method) > -1) {
    res.writeHead(200, headers);
   
    if (req.url.match(USERS_REGEX)) {
      return GET_USERS(req, res)
    } else if (req.url.match(USER_REGEX)) {
      return GET_USER(req, res)
    } else {
      NOT_FOUND(req, res)
    }
    return;
  }

  res.writeHead(405, headers);
  res.end(`${req.method} is not allowed for the request.`);

  

}).listen(8080, '0.0.0.0')



console.log(`Server running at ${PORT}`)
