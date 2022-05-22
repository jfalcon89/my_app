const jwt = require('jsonwebtoken')

// middleware que valida token (rutas protegidas)
const validacionToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verificacion = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verificacion
        next() // continuamos
    } catch (error) {
        res.status(400).json({ error: 'token no es válido' })
    }
}

module.exports = validacionToken;