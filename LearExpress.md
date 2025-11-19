
# Inicializacion del proyecto
    1. Inicializacion git
        git init
    2. Instalacion de dependencias npm
        npm install init -y
    3. Instalacion de express
        npm install express --save


## Inicializar la app
    crear un archivo app.js (ver app.js)


## Rutas
    ### Componentes de una ruta básica
    1. Método HTTP: El verbo HTTP para la solicitud (ej. GET, POST, PUT, DELETE).
    2. URI: La ruta de la URL, que puede ser una cadena, un patrón o una expresión regular.
    3. Manejador de ruta: Una función que recibe los objetos de solicitud (req) y respuesta (res) y que realiza la acción correspondiente (ej. enviar una respuesta, llamar a una función de controlador). 


## Escuchar los cambios de app.js
    en consola correr
    node --watch app.js

    como es repetitivo se puede configurar en package.json en la seccion "scripts"
    "dev": "node --watch app.js",

    lo ejecutamos con "npm run dev"


## Intalar dotenv
    Para que pueda reconocer las variables de entorno establecidas en .env
    npm install dotenv