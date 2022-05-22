const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const Mascota = require("../modelo/mascota");

// CONSULTANDO TODAS LAS MASCOTAS
router.get("/", async(req, res) => {

    try {

        const arrayMascotasDB = await Mascota.find();
        console.log(arrayMascotasDB);

        res.render("Mascotas", {
            arrayMascotas: arrayMascotasDB
        });

    } catch (error) {
        console.log(error)
    }

});

// VISTA PARA CREAR MASCOTA 
router.get("/crear", (req, res) => {
    res.render("crear");
});


//CREAR MASCOTA
router.post("/", async(req, res) => {
    const body = req.body
    try {
        await Mascota.create(body)

        res.redirect("/Mascotas");

    } catch (error) {
        console.log(error)
    }
});

// MOSTRAR SOLO UNA MASCOTA EN LA VISTA DETALLE USANDO SU ID  
router.get("/:id", async(req, res) => {

    const id = req.params.id

    try {
        const mascotaDB = await Mascota.findOne({ _id: id });
        console.log(mascotaDB);

        res.render("detalle", {
            mascota: mascotaDB,
            error: false
        })


    } catch (error) {
        console.log(error)
        res.render("detalle", {
            error: true,
            mensaje: "no se encuentra el id seleccionado"
        });
    }

});

//ELIMINAR MASCOTA
router.delete("/:id", async(req, res) => {

    const id = req.params.id

    try {

        const mascotaDB = await Mascota.findByIdAndDelete({ _id: id })

        if (mascotaDB) {
            res.json({
                estado: true,
                mensaje: "eliminado"
            })
        } else {
            res.json({
                estado: false,
                mensaje: "fallo eliminar"
            })
        }
    } catch (error) {
        console.log(error)
    }

});

//EDITAR MASCOTA
router.put("/:id", async(req, res) => {

    const id = req.params.id
    const body = req.body

    try {
        const mascotaDB = await Mascota.findByIdAndUpdate(id, body, { useFindAndModify: false })
        console.log(mascotaDB)

        res.json({
            estado: true,
            mensaje: "Mascota editada"
        })

    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: "Mascota fallida"
        })
    }

});






module.exports = router;