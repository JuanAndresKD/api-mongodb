const express = require('express')
require('./db')

const app = express()
const port = process.env.PORT || 9000;


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, () => {
    console.log("Conected app")
})