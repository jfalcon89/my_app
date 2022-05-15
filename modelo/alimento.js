const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alimentoSchema = new Schema({
    nombre: String,
    marca: String,
    edad: String
})

// crear modelo
const alimento = mongoose.model("alimento", alimentoSchema);





module.exports = alimento;