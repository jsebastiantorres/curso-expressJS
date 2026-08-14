// Configuracion para que lea las variables de entorno de .env
require("dotenv").config();

// validaciones para usuario
const {
  validacionesUsuario,
  buscarUsuarioID,
} = require("./validacionesUsuarios");

// Importar expres
const express = require("express");

// Trabajar con archivos
const fs = require("fs");
// Manejo de rutas
const path = require("path");
// Archivo listo para usar
const usuariosFile = path.join(__dirname, "usuarios.json");

// Incorporar body parser
const bodyParser = require("body-parser");
const { log } = require("console");

const app = express();

// Middleware para parsear la informacion que viene del cliente
// implementando body parser
app.use(bodyParser.json());
// bodyparser para formularios
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));

// Puerto a utilizar por defecto el 3000
// const PORT = 3000;
// process.env.PORT se utiliza para acceder al número de puerto de una aplicación web,
// obteniéndolo de las variables de entorno del sistema operativo o de un archivo .env
// Se debe crear el archivo env con la info del puerto
const PORT = process.env.PORT;
console.log(PORT);

// Constuir la ruta por defecto la raiz ('/')
app.get("/", (req, res) => {
  // Respuesta
  res.send(`
        <h1>Curso Express.js</h1> 
        <p>Esto es una aplicación node.js con express.js V5</p> 
        <p>Corre en el puerto: ${PORT}</p>
        <p>Hola</p>
                
    `);
});

// Ejemplo FORM
app.post("/form", (req, res) => {
  const name = req.body.nombre || "Name no especificado";
  const mail = req.body.mail || "Mail no especificado";

  res.json({
    mesagge: "datos recibidos",
    data: { name, mail },
  });
});

// Ejemplo con validaciones
app.post("/data", (req, res) => {
  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
    res.status(400).json({
      error: "No hay información en data",
    });
  }

  res.status(200).json({
    mesagge: "Procesando la data",
    data,
  });
});

// GET /users Obteniendo los usuarios desde el archivo
app.get("/users", (req, res) => {
  console.log("get normal");

  //leer el contenido del archivo con fs.
  fs.readFile(usuariosFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "error en la lectura del archivo" });
      console.log("ocurrio un error en la lectura del archivo");
    } else {
      const users = JSON.parse(data);
      res.json(users);
      console.log(users);
    }
  });
});

// GET / Obtener usuario por ID
app.get("/users/:id", (req, res) => {
  const idBuscado = Number(req.params.id);
  console.log("id buscado", idBuscado);

  fs.readFile(usuariosFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ mesagge: "error al optener los datos" });
    }
    const users = JSON.parse(data);

    const idEncontrado = buscarUsuarioID(idBuscado, users);

    console.log("el usuario con el ID es:", idEncontrado);
    return res.status(200).json({idEncontrado});
  });
});

// POST /users Crear usuario
app.post("/users", (req, res) => {
  // captura los datos del form
  const nuevoUsuario = req.body;

  // verificacion inicial de los datos
  if (
    !nuevoUsuario ||
    nuevoUsuario.length === 0 ||
    nuevoUsuario === undefined
  ) {
    return res
      .status(500)
      .json({ error: "Faltan información en el formulario" });
  }

  // Si no hay errores en los datos capturados -> leer el archivo donde se almacena la data
  fs.readFile(usuariosFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ err: "Error al obtener la data" });
    } else {
      // Retornar la data en formato JSON
      const users = JSON.parse(data);

      const usuarioCreado = {
        id: Number(nuevoUsuario.id),
        name: nuevoUsuario.name,
        email: nuevoUsuario.email,
      };

      // Gestionar un contador de ID para que no se repita el ID en ningun registro
      // let contadorId = users.length + 1;

      // Ejecutar VALIDACIONES del modulo de validacionesUsuarios
      const isNuevoUsuarioValido = validacionesUsuario(usuarioCreado, users);

      if (isNuevoUsuarioValido.isValid) {
        // agregar usuario al array de usuarios obtenido de la data
        users.push(usuarioCreado);
      } else {
        return res.status(500).json({ errores: isNuevoUsuarioValido.errores });
      }
      // Construir el usuario nuevo

      // convertir el array a string para poderlo reescribir en el archivo .json
      const usuariosActualizados = "\n" + JSON.stringify(users, null, 2);
      // reescribir el archivo con el array actualizado
      fs.writeFileSync(usuariosFile, usuariosActualizados, "utf-8");

      // retornar la respuesta de exito con el nuevo usuario
      return res.status(201).json({
        mesagge: "usuario agregado",
        usuarioCreado,
      });
    }
  });
});

// Escuchar la app
app.listen(PORT, () => {
  console.log(`Corriendo en el servidor: http://localhost:${PORT}`);
});
