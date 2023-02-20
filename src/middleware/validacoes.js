const pool = require('../connection/conexao')
const bcrypt = require('bcrypt')

const validaDadosUsuario = (req, res, next) => {
    let { nome, email, senha } = req.body

    try {
        if (!nome) {
            return res.status(400).json({
                mensagem: 'Informe o nome'
            })
        }
        if (!email) {
            return res.status(400).json({
                mensagem: 'Informe o email'
            })
        }
        if (!senha) {
            return res.status(400).json({
                mensagem: 'Informe o senha'
            })
        }
        next()
    } catch (error) {
        return res.status(400).json({
            mensagem: error.mensage
        })
    }
}
const verificaEmailExistente = async (req, res, next) => {
    let { email } = req.body
    try {
        const query = 'select * from usuarios where email = $1'
        const verifica = [email]
        const busca = await pool.query(query, verifica)

        if (busca.rowCount > 0) {
            return res.status(400).json({
                mensagem: 'Já existe usuário cadastrado com o e-mail informado.'
            })
        }
        next()
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }
}
const validaEmailSenha = (req, res, next) => {
    let { email, senha } = req.body

    try {
        if (!email) {
            return res.status(400).json({
                mensagem: 'Informe o email'
            })
        }
        if (!senha) {
            return res.status(400).json({
                mensagem: 'Informe o senha'
            })
        }
        next()
    } catch (error) {
        return res.status(400).json({
            mensagem: error.mensage
        })
    }
}
const confereSeEmailEstaCerto = async (req, res, next) => {
    let { email } = req.body
    try {
        const query = 'select * from usuarios where email = $1'
        const verifica = [email]
        const busca = await pool.query(query, verifica)

        if (busca.rowCount == 0) {
            return res.status(400).json({
                mensagem: 'E-mail ou senha invalido'
            })
        }
        next()
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }
}
const confereSeSenhaEstaCerto = async (req, res, next) => {
    const { email, senha } = req.body

    try {
        const query = 'select * from usuarios where email = $1'
        const busca = await pool.query(query, [email])
        const usuario = busca.rows[0]
        const conferindoSenha = await bcrypt.compare(senha, usuario.senha)

        if (!conferindoSenha) {
            return res.status(400).json({
                mensagem: 'E-mail ou senha invalido'
            })
        }

        // Como ja buscamos os dados do usuario na query a cima, 
        // Ja monta o req com os dados do usuario. para utilizar posteriormente
        let { senha: senhaNula, ...dadosDoUsuarioLogado } = usuario
        req.usuario = dadosDoUsuarioLogado

        next()
    } catch (error) {
        return res.status(400).json({
            mensagem: error.mensage
        })
    }

}
module.exports = {
    validaDadosUsuario,
    verificaEmailExistente,
    validaEmailSenha,
    confereSeEmailEstaCerto,
    confereSeSenhaEstaCerto
} 