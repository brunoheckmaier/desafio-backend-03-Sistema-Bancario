const jwt = require('jsonwebtoken')


const validarToken = (req, res, next) => {
    const { authetication } = req.headers

    if (!authetication) {
        return res.status(401).json({ mensagem: 'Nao autorizado' })
    }

    try {
        const usuario = jwt.verify(authetication, process.env.SENHA_JWT)

        req.usuario = usuario
        console.log(usuario);
        next()
    } catch (error) {
        return res.status(401).json({ mensagem: error.message })
    }

}

