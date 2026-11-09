
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017/";
const cliente = new MongoClient(uri);

async function conectar() {
  await cliente.connect();
  console.log("Conexión exitosa a MongoDB");

  return cliente.db("CCSS_Gestion_Pacientes");
}

module.exports = { conectar, cliente };
