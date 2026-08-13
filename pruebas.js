// Prueba de primer consulta
const alias = [
  { id_user: 1, alias: "jsta" },
  { id_user: 2, alias: "js" },
];

async function buscarAlias(id) {
  const aliasEncontrado = alias.find((e) => e.id_user === id);
  if (aliasEncontrado === undefined) {
    console.log("Es undefined");
  }
  console.log(aliasEncontrado);
  return aliasEncontrado;
}

app.get("/alias/obtener/:id", async (req, res) => {
  const idBuscado = parseInt(req.params.id);
  console.log(idBuscado);

  const resultado = await buscarAlias(idBuscado);

  if (!resultado || !resultado.length === 0 || resultado === undefined) {
    res.status(400).json({ error: "Alias no encontrado" });
  } else {
    res.status(200).json({
      mesagge: "Se econtró el alias",
      resultado,
    });
  }
});
