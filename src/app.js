const express = require('express')
const userRoutes = require('./routes/userRoutes');

const app = express()

// Configura el middleware para analizar JSON
app.use(express.json()); 
app.use(express.urlencoded({extended: false}))
// Usa las rutas definidas
app.use('/api/users', userRoutes);

app.get('/', function (req, res) {
  res.send('Hello World')
})

// Inicia el servidor
// app.listen(port, () => {
//     console.log("Conected app")
// })

module.exports = app;