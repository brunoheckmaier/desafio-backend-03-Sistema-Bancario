require('dotenv').config({ path: './src/.env' })
const express = require('express')
const rotas = require('./routers/rotas')


const app = express()

app.use(express.json())
app.use(rotas)

const { SERVER_PORT } = process.env

app.listen(SERVER_PORT, () => {
    console.log(`Listening at ${SERVER_PORT}`);
}) 