
const { conectar, cliente } = require("./conexion");

async function iniciar() {
  try {
    const db = await conectar();

    const total = await db
      .collection("pacientes")
      .countDocuments();

    console.log("Pacientes registrados:", total);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await cliente.close();
  }
}

iniciar();
