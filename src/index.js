require('dotenv').config({ path: './src/.env' })
const express = require('express')
const pool = require('./connection/conexao')
const rotas = require('./routers/rotas')
const app = express()

app.use(express.json())
app.use(rotas)

const { SERVER_PORT } = process.env

pool.connect((err, client, release) => {

    if (err) {
        return console.log('Erro de conexao com o DB ', err.stack);
    }
    console.log('Conectado ao DB.');
    app.listen(SERVER_PORT, () => {
        console.log(`Listening at ${SERVER_PORT}`);
    })

})