const path = require("path");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars');
const ejs = require("ejs");


// CONEXION A LA BASE DE DATOS 

const mysql = require("mysql");

const conection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "registro"
});

conection.connect((err) => {
    if (err) throw err
    console.log("la conexion a base de datos funciona");
});

//------------------------------------------//

//CONEXION AL SERVIDOR 
//ASIGNANDO EL PUERTO AL SERVIDOR
//DEVOLVIENDO UN ERROR EN CASO DE ERROR EN LA CONEXION

//estoy requiriendo el servidor de express desde node_modules
const express = require("express");

// estoy asignando express a app e inicializandolo de una vez
const app = express();

// settings del puesto
app.set("port", process.env.PORT || 3000);


//estoy diciendole al servidor de express que escuche en el puerto 3000
//si se conecta bien que me devuelva un mensaje por consola 
app.listen(app.get("port"), () => {
    console.log("servidor funcionando en el puerto", app.get("port"))
});

//------------------------------------------------------------------//

// static files para css js e imagenes solamente
app.use(express.static(path.join(__dirname, "public")));

// settings
//motor de plantilla 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//TENGO PROBLEMAS EN ESTE ENGINE 
// app.engine('.hbs', exphbs({
//     defaultLayout: 'index',
//     extname: '.hbs',
//     layoutsDir: path.join(__dirname, 'views')
// }));


//middlewares



//COMENTADO TEMPORARMENTE
app.use((req, res, next) => {
    // aqui lo que estoy haciendo es que le estoy dando la url que le he pedido 
    // lueego que me de el metodo por el cual lo he pedido
    // luego con next que pueda continuar 
    // res.status(404).render("404"); // REVISAR RENDER DE PAGINA 404 QUE NO ESTA FUNCIONANDO 
    console.log(`${req.url} -${req.method}`);
    next();
});

//----------------------


//---------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// routes
app.use(routes);


















// const app = express();

// app.listen(3000, () => {
//     console.log("Servidor corriendo en el puerto", 3000);
// });

// CONFIGURACION DEL PUERTO QUE VA A ESCUCHAR LA CONEXION
// const PORT = 9001
// app.listen(PORT);
// console.log("Servidor corriendo en el puerto", PORT);

// CONFIGURACION DE LA CONEXION
// const app = express.createServer((request, Response) => {
//     if (err) throw err
//         // Response.writeHead(200, { "Content-Type": "text/plain" })
//         // Response.end("hola mundo")
//     console.log("la conexion funciona");
// });


// module.exports = db;


//------------------------------

// export default function();
// conection.end();

// conection.query(`SELECT * from datos`, (err, rows) => {
//     if (err) throw err
//     console.log("estos son los datos de la tabla datos:");
//     console.log(rows);
// });




// INSERTAR USUARIO DESDE VARIABLE
// const nombre = "pedrito";
// const email = "orlando@prueba.com";










// conection.query(consulta, (err, rows) => {
//     if (err) throw err
//     console.log(rows);
// })



// const insertarUsuario = ((req, res) => {
//     // const { title, url, description } = req.body;
//     const nuevoUsuario = {
//         id,
//         nombre,
//         correo,
//         fecha,
//     };
//     conection.query('INSERT INTO links set ?', [nuevoUsuario]);
//     console.log(rows);

//     // pool.query('INSERT INTO links set ?', [nuevoUsuario]);

//     // res.send("recibido");
// });
// let query = "INSERT INTO datos VALUES  ( vacio, nombre, correo, fecha)";

// const insertarUsuario = (vacio, fecha, nombre, correo) => {
//     let query = "INSERT INTO datos VALUES  (" + vacio + ", " + nombre + ", " + correo + ", " + fecha + ")";
// }

// insertarUsuario()


// const consulta = ("SELECT * from datos WHERE id = ?", [54]);


// INSERTAR USUARIO
// conection.query('INSERT INTO datos(id, nombre, email,fecha_reg) VALUES  (NULL,"Pedro Navaja","pedro@pruebaa","fecha")', (err, rows) => {
//     if (err) throw err
// })


// CONSULTAR USUARIO
// conection.query(`SELECT * from datos`, (err, rows) => {
//     if (err) throw err
//     console.log("estos son los datos de la tabla datos:");
//     console.log(rows);
// });