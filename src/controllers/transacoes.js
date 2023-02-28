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

const atualizarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body
    const { id } = req.params
    const usuario_id = req.usuario.id

    try {

        const transacao = await pool.query('select * from transacoes where usuario_id = $1 and id = $2', [usuario_id, id])

        if (transacao.rowCount == 0) {
            return res.status(404).json({ mensagem: 'Transacao nao encontrada.' })
        }

        await pool.query("UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 WHERE usuario_id = $6 and id = $7", [descricao, valor, data, categoria_id, tipo, usuario_id, id])

        return res.status(204).json()
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }

}

const removerTransacao = async (req, res) => {
    const { id } = req.params

    try {
        const query = 'delete from transacoes where id = $1'
        const verifica = [id]
        const busca = await pool.query(query, verifica)

        return res.status(204).json()

    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }
}

const obterExtratoTransacao = async (req, res) => {
    const usuario_id = req.usuario.id

    try {
        const valorSaida = await pool.query("select sum(valor) as totalSaida from transacoes where usuario_id = $1 AND tipo = 'saida'", [usuario_id])

        const valorEntrada = await pool.query("select sum(valor) as totalEntrada from transacoes where usuario_id = $1 AND tipo = 'entrada'", [usuario_id])

        if (valorSaida.rows[0].totalsaida === null) {
            valorSaida.rows[0].totalsaida = 0
        }

        if (valorEntrada.rows[0].totalentrada === null) {
            valorEntrada.rows[0].totalentrada = 0
        }

        console.log(valorEntrada.rows[0].totalentrada);
        return res.status(200).json({
            entrada: valorEntrada.rows[0].totalentrada,
            saida: valorSaida.rows[0].totalsaida
        })

    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }

}


//const filtrarTransacaoCategoria = (req, res) => {}  EXTRA!!

module.exports = {
    listarTransacoes,
    detalharTransacao,
    cadastrarTransacao,
    atualizarTransacao,
    removerTransacao,
    obterExtratoTransacao
}