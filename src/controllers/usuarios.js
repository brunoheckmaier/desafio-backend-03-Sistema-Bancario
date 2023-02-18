const bcrypt = require('bcrypt')
const pool = require('../connection/conexao')

const cadastroUsuario = async (req, res) => {
    try {
        let { nome, email, senha } = req.body

        let senhaCriptografada = await bcrypt.hashSync(senha, 10)

        const query = 'insert into usuarios (nome, email, senha) values ($1, $2, $3) returning id,nome,email'
        const dados = await pool.query(query, [nome, email, senhaCriptografada]);

        if (dados.rowCount == 0) {
            return res.status(400).json({
                mensagem: 'Nao foi possivel cadastrar o usuário'
            })
        }
        return res.status(201).json(dados.rows[0])

    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }
}

const loginUsuario = async (req, res) => {

}

const detalharUsuario = async (req, res) => {

}

const atualizarUsuario = async (req, res) => {

}

module.exports = {
    cadastroUsuario,
    loginUsuario,
    detalharUsuario,
    atualizarUsuario
}