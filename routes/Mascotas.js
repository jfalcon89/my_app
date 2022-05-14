const express = require("express");
const router = express.Router();

const Mascota = require("../modelo/mascota");

router.get("/", async(req, res) => {

    try {

        const arrayMascotasDB = await Mascota.find();
        console.log(arrayMascotasDB);

        res.render("mascotas", {
            arrayMascotas: arrayMascotasDB
        });

    } catch (error) {
        console.log(error)
    }


});






module.exports = router;