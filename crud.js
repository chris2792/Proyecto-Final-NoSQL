
const { conectar, cliente } = require("./conexion");

async function iniciar() {
  try {
    const db = await conectar();
    const pacientes = db.collection("pacientes");

    // CREATE: registrar un paciente
    await pacientes.insertOne({
      _id: "PAC004",
      cedula: "100000004",
      nombre: "Laura Sanchez",
      fecha_nacimiento: new Date("1995-07-20"),
      telefono: "8888-4444"
    });
    console.log("Paciente registrado correctamente.");

    // READ: consultar pacientes
    const lista = await pacientes.find().toArray();
    console.log("Pacientes registrados:", lista);

    // UPDATE: actualizar teléfono
    await pacientes.updateOne(
      { _id: "PAC004" },
      { $set: { telefono: "8888-9999" } }
    );
    console.log("Paciente actualizado correctamente.");

    // DELETE: eliminar el paciente de prueba
    await pacientes.deleteOne({ _id: "PAC004" });
    console.log("Paciente eliminado correctamente.");

  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await cliente.close();
  }
}

iniciar();
