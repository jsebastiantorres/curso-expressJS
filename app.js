// Configuracion para que lea las variables de entorno de .env
require('dotenv').config();

// Importar expres
const express = require('express');
const app = express();

// Puerto a utilizar por defecto el 3000
// const PORT = 3000;

// process.env.PORT se utiliza para acceder al número de puerto de una aplicación web, 
// obteniéndolo de las variables de entorno del sistema operativo o de un archivo .env
// Se debe crear el archivo env con la info del puerto
const PORT = process.env.PORT || 3000;
console.log(PORT);



// Constuir la ruta por defecto la raiz ('/')
app.get('/', (req, res) => {
    // Respuesta
    res.send(`
     <h1>Curso Express.js</h1> 
     <p>Esto es una aplicación node.js con express.js V5</p> 
     <p>Corre en el puerto ${PORT}</p>
    `);
});


// Escuchar la app 
app.listen(PORT, () => {
<<<<<<< HEAD
    console.log(`Servidor: http://localhost:${PORT}`);
});
=======
    console.log('Nuestra aplicacion esta funcionando!');
    console.log('Nuestra aplicacion esta funcionando!');
});
>>>>>>> 9b918784a16666cd949c37bf795d8be29dab41c2
