const bcrypt = require('bcrypt')
const pool = require('../connection/conexao')
const jwt = require('jsonwebtoken')


const cadastroUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {

        const senhaCriptografada = await bcrypt.hash(senha, 10)

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
    // configuração do token
    try {
        let { id, nome, email } = req.usuario
        const token = jwt.sign(
            {
                id,
                nome,
                email
            },
            process.env.SENHAJWT,
            {
                expiresIn: '2h'
            }
        )
        // Estrutura a resposta com os dados do usuario e o token gerado a cima.
        // req.usuario feito no middleware validacoes em 'confereSeSenhaEstaCerto' 
        return res.status(200).json({
            usuario: req.usuario,
            token
        })

    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }
}

const detalharUsuario = async (req, res) => {
    try {
        const { iat, exp, ...informacaoDoUsuario } = req.usuario
        return res.status(200).json(informacaoDoUsuario)
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }
}

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const query = 'update usuarios set nome = $1, email = $2, senha = $3 where id = $4'
        const dados = await pool.query(query, [nome, email, senhaCriptografada, req.usuario.id]);

        return res.status(200).json()

    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }
}

module.exports = {
    cadastroUsuario,
    loginUsuario,
    detalharUsuario,
    atualizarUsuario
}