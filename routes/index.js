const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { nombre: "datos inicio desde una variable dinamica" });
    // res.end("prueba ")
});

router.get("/contacto", (req, res) => {
    res.render("contacto", { nombre: "datos contacto desde una variable dinamica" });
    // res.end("prueba ")
});

router.get("/404", (req, res, next) => {
    res.render("404", { nombre: "datos 404 desde una variable dinamica" });

});

module.exports = router;