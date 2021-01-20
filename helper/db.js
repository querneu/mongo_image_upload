const mongoose = require('mongoose');


module.exports = () => {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

    mongoose.connection.on('open',()=>{
        console.log("Mongodb conectado!");
    });

    mongoose.connection.on('error', (error)=>{
        console.log(`Erro ao estabelecer conexão: ${error}`);
    })

    mongoose.Promise = global.Promise;
}