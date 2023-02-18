const pool = require('../connection/conexao')

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
                mensagem: 'Este e-mail ja foi cadastrado'
            })
        }
        next()
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }
}



module.exports = {
    validaDadosUsuario,
    verificaEmailExistente
} 