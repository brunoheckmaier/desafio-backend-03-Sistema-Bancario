const pool = require('../connection/conexao')

const listarTransacoes = async (req, res) => {
    const { id } = req.usuario

    try {
        const transacoes = await pool.query('select * from transacoes where usuario_id = $1', [id])

        return res.json(transacoes.rows)
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }
}

const detalharTransacao = async (req, res) => {
    const { id } = req.params

    try {
        if (!id) {
            return res.status(404).json({ mensagem: "Transação não encontrada." })
        }

        const transacoes = await pool.query('select * from transacoes where usuario_id = $1 and id = $2', [req.usuario.id, id])

        if (transacoes.rowCount == 0) {

            return res.status(400).json({
                mensagem: 'Nao foi encontrada transacoes.'
            })
        }

        return res.json(transacoes.rows)

    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }
}

const cadastrarTransacao = async (req, res) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body
    const { id } = req.usuario

    console.log(id);
    try {

        const descricaoCategoria = await pool.query('select * from categorias where id = $1', [categoria_id])

        if (descricaoCategoria.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Categoria nao encontrada.' })
        }

        const transacao = await pool.query(
            `insert into transacoes (descricao, valor, data, categoria_id, usuario_id, tipo)
            values
            ($1, $2, $3, $4, $5, $6) RETURNING id`,
            [descricao, valor, data, categoria_id, id, tipo])

        return res.status(201).json({
            id: transacao.rows[0].id,
            descricao,
            valor,
            data,
            usuario_id: id,
            categoria_id,
            categoria_nome: descricaoCategoria.rows[0].descricao,
            tipo
        });


    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }
}

const editarTransacao = (req, res) => {

}

const removerTransacao = (req, res) => {

}

const obterExtratoTransacao = (req, res) => {

}

//const filtrarTransacaoCategoria = (req, res) => {}  EXTRA!!

module.exports = {
    listarTransacoes,
    detalharTransacao,
    cadastrarTransacao
}