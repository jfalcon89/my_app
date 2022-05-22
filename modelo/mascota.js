const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//crear schema de mascota
const mascotaSchema = new Schema({
    nombre: String,
    raza: String,
    sexo: String
})

// crear modelo de mascota
const Mascota = mongoose.model("Mascota", mascotaSchema);





module.exports = Mascota;