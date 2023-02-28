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

const validarDescricao = (req, res, next) => {
    const { descricao } = req.body

    try {
        if (!descricao) {
            return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' })
        }

        next()
    } catch (error) {
        return res.status(400).json({
            mensagem: error.mensage
        })
    }
}

const validarValor = (req, res, next) => {
    const { valor } = req.body

    try {

        if (!valor) {
            return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' })
        }

        next()
    } catch (error) {
        return res.status(400).json({
            mensagem: error.mensage
        })
    }
}

const validarData = (req, res, next) => {
    const { data } = req.body

    try {

        if (!data) {
            return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' })
        }

        next()
    } catch (error) {
        return res.status(400).json({
            mensagem: error.mensage
        })
    }
}

const validarCategoria = async (req, res, next) => {
    const { categoria_id } = req.body

    try {
        if (!categoria_id) {
            return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' })
        }

        const categoria = await pool.query('select * from categorias where id = $1', [categoria_id])

        if (categoria.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Categora invalida.' })
        }

        next()
    } catch (error) {
        return res.status(400).json({
            mensagem: error.mensage
        })
    }
}

const validarTipo = (req, res, next) => {
    const { tipo } = req.body

    try {
        if (!tipo) {
            return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' })
        }

        if (tipo != 'entrada' && tipo != 'saida') {
            return res.status(400).json({ mensagem: "Tipo inválido. Deve ser 'entrada' ou 'saida'." })
        }

        next()
    } catch (error) {
        return res.status(400).json({
            mensagem: error.mensage
        })
    }
}

const validarSeTemTransacao = async (req, res, next) => {
    const { id } = req.params

    try {
        const query = 'select * from transacoes where id = $1'
        const verifica = [id]
        const busca = await pool.query(query, verifica)

        if (busca.rowCount == 0) {
            return res.status(400).json({
                mensagem: 'Transação não encontrada.'
            })
        }
        next()
    } catch (error) {
        return res.status(400).json({
            mensagem: error.mensage
        })
    }
}

// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado


module.exports = {
    validaDadosUsuario,
    verificaEmailExistente,
    validaEmailSenha,
    confereSeEmailEstaCerto,
    confereSeSenhaEstaCerto,
    validarData,
    validarDescricao,
    validarCategoria,
    validarTipo,
    validarValor,
    validarSeTemTransacao

} 