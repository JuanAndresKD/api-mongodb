const app = require('./app') // Conecta app
require('./db') // Conecta a la base de datos

const port = process.env.PORT || 9000;

async function init(){
    await app.listen(port);
    console.log('Server on port : ',port)
}

init()
