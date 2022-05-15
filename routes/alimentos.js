const express = require("express");
const router = express.Router();

const alimento = require("../modelo/alimento");

router.get("/", async(req, res) => {

    try {

        const arrayAlimentosDB = await alimento.find();
        console.log(arrayAlimentosDB);

        res.render("alimentos", {
            arrayAlimentos: arrayAlimentosDB
        });

    } catch (error) {
        console.log(error)
    }


});


module.exports = router;