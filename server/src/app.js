const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const request = require('request')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const Oauth = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    Authorization: 'Basic ' // encode your client_id and client_secret to base64 in this pattern client_id:client_secret
                            // and add it after Basic like 'Basic ZjM4ZjAw...WY0MzE='
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
}

request.post(Oauth, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    var token = body.access_token
    var options = {
      url: 'https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6',
      headers: {
        Authorization: 'Bearer ' + token
      },
      json: true
    }
    request.get(options, function (error, response, body) {
      if (!error) {
        console.log(body) // it will log data in terminal, just for test
      } else {
        console.log(error)
      }
    })
  } else {
    console.log(error)
  }
})

app.listen(process.env.PORT || 8081)
