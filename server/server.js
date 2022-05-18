const http = require('http');
const {app} = require('./app')
const{ pool} = require('./db')

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);



async function startServer(){

    server.listen(PORT , ()=>{
        console.log("Listening on",PORT);
    });
}

startServer();

//5wINwVZr1mCuK0Jp

