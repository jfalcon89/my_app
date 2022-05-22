const router = require('express').Router();
const User = require('../modelo/User');
const Joi = require("@hapi/joi");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get("/login", (req, res) => {
    res.render("login");

});


router.get("/registrar", (req, res) => {
    res.render("registrar");

});



const schemaRegistrar = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

//LOGIN DE USUARIO
router.post('/login', async(req, res) => {
    // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validarPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validarPassword) return res.status(400).json({ error: 'contraseña no válida' })

    // creacion de token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET)


    res.header('auth-token', token).json({
            error: null,
            data: { token }
        })
        // res.end("validado")

})



//REGISTRAR USUARIO
router.post('/registrar', async(req, res) => {

    //validaciones de usuarios
    const { error } = schemaRegistrar.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    const existeElEmail = await User.findOne({ email: req.body.email });
    if (existeElEmail) {
        return res.status(400).json({ error: 'Email ya registrado' })
    }

    // hash contraseña
    const saltos = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, saltos);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });
    try {
        const userDB = await user.save();
        res.json({
            error: null,
            data: userDB
        })


    } catch (error) {
        res.status(400).json({ error })
    }
})






module.exports = router;