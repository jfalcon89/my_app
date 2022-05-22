const express = require("express");
const router = express.Router();

// const validacionToken = require("./routes/validacion-token");
// const authRoutes = require('./routes/auth');


router.get('/', (req, res) => {

    res.render("index", { nombre: "datos inicio desde una variable dinamica" });
})


router.get("/contacto", (req, res) => {
    res.render("contacto", { nombre: "datos contacto desde una variable dinamica" });
    // res.end("prueba ")
});

router.get("/404", (req, res, next) => {
    res.render("404");

});

module.exports = router;