
const { conectar, cliente } = require("./conexion");

// Procedimiento de aplicación para registrar consultas
async function registrarConsulta(db, consulta) {
  const pacientes = db.collection("pacientes");
  const medicos = db.collection("medicos");
  const consultas = db.collection("consultas");

  // Verificar que el paciente exista
  const paciente = await pacientes.findOne({
    _id: consulta.paciente_id
  });

  if (!paciente) {
    throw new Error("El paciente no existe");
  }

  // Verificar que el medico exista
  const medico = await medicos.findOne({
    _id: consulta.medico_id
  });

  if (!medico) {
    throw new Error("El medico no existe");
  }

  // Registrar la consulta
  return await consultas.insertOne(consulta);
}

async function iniciar() {
  try {
    const db = await conectar();

    const nuevaConsulta = {
      _id: "CON005",
      paciente_id: "PAC001",
      medico_id: "MED001",
      fecha: new Date("2026-11-08"),
      diagnostico: "Consulta de control",
      tratamiento: "Seguimiento medico"
    };

    // Ejecutar el procedimiento
    const resultado = await registrarConsulta(db, nuevaConsulta);

    console.log("Consulta registrada:", resultado.insertedId);

    // Comprobar que se guardo
    const consulta = await db.collection("consultas")
      .findOne({ _id: "CON005" });

    console.log("Consulta encontrada:", consulta);

    // Eliminar el registro de prueba
    await db.collection("consultas")
      .deleteOne({ _id: "CON005" });

    console.log("Prueba finalizada correctamente.");

  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await cliente.close();
  }
}

iniciar();
