const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const request = require('request')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const corsOptions = {
  origin: 'http://localhost:8081'
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

app.get('/api', cors(corsOptions), (req, res) => {
  request.post(Oauth, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      return res.send(body.access_token)
    } else {
      return res.send(error)
    }
  })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname +'/public/'))
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

app.listen(process.env.PORT || 8081)
