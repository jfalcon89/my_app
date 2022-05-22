const path = require("path");
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars');
const ejs = require("ejs");
const mysql = require("mysql");
const express = require("express");
const app = express(); //asignacion de express en app
const dotenv = require('dotenv').config()

//CONFIGURACION PARA LEER EL BODY
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

////---------CONEXION A LA BASE DE DATOS MONGODB----------////
const mongoose = require("mongoose");


const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.cnkdh.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose.connect(uri, (err) => {
    if (err) throw err
    console.log("la conexion a base de datos funciona");
});

////-----------CONEXION A LA BASE DE DATOS MYSQL---------//// 
// const conection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "123456",
//     database: "registro"
// });
// conection.connect((err) => {
//     if (err) throw err
//     console.log("la conexion a base de datos funciona");
// });

//--------------CONEXION AL SERVIDOR-----------------//
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
    console.log("servidor funcionando en el puerto", app.get("port"))
});


//----------CONFIGURACION RUTAS ESTATICA-------------//
app.use(express.static(path.join(__dirname, "public")));


//----------RUTAS WEB DE LOS HANDLERS----------------//

// route middlewares
const validacionToken = require("./routes/validacion-token");
const authRoutes = require('./routes/auth');
const indexRoutes = require("./routes/index");

app.use("/user", authRoutes);
app.use("/", indexRoutes);
app.use("/Mascotas", require("./routes/Mascotas"));
app.use("/alimentos", require("./routes/alimentos"));

// estatica 404
app.use((req, res, next) => {
    res.status(404).render("404");
});


//motor de plantilla 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));