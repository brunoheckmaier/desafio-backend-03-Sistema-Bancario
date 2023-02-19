const jwt = require('jsonwebtoken')

const validarToken = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Nao autorizado' })
    }

    try {
        //Esse .split é para tirar o bearer q vem antes do Token
        const token = authorization.split(' ')[1]
        const usuario = jwt.verify(token, process.env.SENHAJWT)
        req.usuario = usuario

        next()
    } catch (error) {
        return res.status(401).json({ mensagem: error.message })
    }

}

module.exports = { validarToken }

