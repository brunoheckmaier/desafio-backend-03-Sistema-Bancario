const pool = require('../connection/conexao')

const listarCategorias = async (req, res) => {

    const categorias = await pool.query('select * from categorias');

    return res.status(200).json(categorias.rows)
}

module.exports = { listarCategorias }