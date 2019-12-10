const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const request = require('request')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const corsOptions = {
  origin: 'http://localhost:8080'
  // change it to your own origin
}

const Oauth = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    Authorization: 'Basic '
    // encode your client_id and client_secret to base64 in this pattern client_id:client_secret
    // and add it after Basic like 'Basic ZjM4ZjAw...WY0MzE='
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
}

let token = ''
request.post(Oauth, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    token = body.access_token
  } else {
    token = error
  }
})

app.get('/api', cors(corsOptions), (request, response) => {
  return response.send(token)
})

app.listen(process.env.PORT || 8081)
