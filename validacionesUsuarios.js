// funciones de validaciones para campos de usuario

// Validación de correo electrónico mediante Regex
function validacionEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   console.log("validacion correo", emailRegex.test(email));
  return emailRegex.test(email);
}

// Validación de nombre (mínimo 3 caracteres)
function validacionName(name) {
  //   console.log(    "validacion nombre",    typeof name === "string" && name.length >= 2,  );
  return typeof name === "string" && name.length >= 2;
}

// Validación de ID (numérico y único)
function validacionId(id, users) {
  const existe = users.some((e) => e.id === id);
  //   console.log("validacion id", typeof user.id === "number" && !existe);
  return typeof id === "number" && !existe;
}

// Función principal de validación

function validacionesUsuario(user, users) {
  const errores = [];

  if (!validacionEmail(user.email)) {
    errores.push("La cuenta de correo tiene un error");
  }

  if (!validacionName(user.name)) {
    errores.push("El nombre tiene un error");
  }

  if (!validacionId(user.id, users)) {
    errores.push("El id contiene un error");
  }

  console.log({
    isValid: errores.length === 0,
    errores: errores,
  });

  return {
    isValid: errores.length === 0,
    errores: errores,
  };
}

function buscarUsuarioID(id, users) {
  const userEncontrado = users.find((e) => e.id === id);
  if (!userEncontrado) {
    return { err: `No existe usuario con el id: ${id}` };
  }

  return userEncontrado;
}

// // // data prueba
// const users = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "johndoe@example.com",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "janesmith@example.com",
//   },
//   {
//     id: 3,
//     name: "Juan",
//     email: "juan@mail.com",
//   },
//   {
//     id: 4,
//     name: "Sebas",
//     email: "sebas@mail.com",
//   },
// ];

// // usuario prueba
// const user = {
//   id: 5,
//   name: "js",
//   email: "j@m.c",
// };

// // Pruebas
// validacionesUsuario(user, users);

// exportar el modulo para probarlo
module.exports = { validacionesUsuario, buscarUsuarioID };
