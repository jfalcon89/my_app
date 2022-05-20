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

router.get("/crear-alimentos", (req, res) => {
    res.render("crear-alimentos");
});

//CREAR ALIMENTO
router.post("/", async(req, res) => {
    const body = req.body
    try {
        await alimento.create(body)

        res.redirect("/alimentos");

    } catch (error) {
        console.log(error)
    }
});

router.get("/:id", async(req, res) => {

    const id = req.params.id

    try {
        const alimentoDB = await alimento.findOne({ _id: id });
        console.log(alimentoDB);

        res.render("detalle-alimentos", {
            alimento: alimentoDB,
            error: false
        })

    } catch (error) {
        console.log(error)
        res.render("detalle.alimentos", {
            error: true,
            mensaje: "no se encuentra el id seleccionado"
        });
    }

});

//ELIMINAR ALIMENTO
router.delete("/:id", async(req, res) => {

    const id = req.params.id

    try {

        const alimentoDB = await alimento.findByIdAndDelete({ _id: id })

        if (alimentoDB) {
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


//EDITAR ALIMENTO
router.put("/:id", async(req, res) => {

    const id = req.params.id
    const body = req.body

    try {
        const alimentoDB = await alimento.findByIdAndUpdate(id, body, { useFindAndModify: false })
        console.log(alimentoDB)

        res.json({
            estado: true,
            mensaje: "Alimento editada"
        })

    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: "Alimento fallida"
        })
    }

});



module.exports = router;