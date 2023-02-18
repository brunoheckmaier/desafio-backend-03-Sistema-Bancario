const bcrypt = require('bcrypt')
const pool = require('../connection/conexao')

const cadastroUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const senhaCriptografada = bcrypt.hash(senha, 10)

        const novoUsuario = await pool.query(
            'insert into usuarios (nome, email, senha) values ($1, $2, $3)'
            [nome, email, senhaCriptografada]
        )

        return res.status(201).json(novoUsuario.rows[0])

    } catch (error) {

        return res.status(500).json({ mensagem: error.message })

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