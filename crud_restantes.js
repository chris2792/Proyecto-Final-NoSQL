
const { conectar, cliente } = require("./conexion");

async function iniciar() {
  try {
    const db = await conectar();

    const medicos = db.collection("medicos");
    const consultas = db.collection("consultas");
    const examenes = db.collection("examenes");

    // ===== CRUD MEDICOS =====

    await medicos.insertOne({
      _id: "MED003",
      nombre: "Andres Solano",
      especialidad: "Pediatria"
    });
    console.log("CREATE Medico: correcto");

    const medico = await medicos.findOne({ _id: "MED003" });
    console.log("READ Medico:", medico);

    await medicos.updateOne(
      { _id: "MED003" },
      { $set: { especialidad: "Medicina General" } }
    );
    console.log("UPDATE Medico: correcto");

    // ===== CRUD CONSULTAS =====

    await consultas.insertOne({
      _id: "CON004",
      paciente_id: "PAC001",
      medico_id: "MED003",
      fecha: new Date("2026-11-08"),
      diagnostico: "Dolor de cabeza",
      tratamiento: "Reposo"
    });
    console.log("CREATE Consulta: correcto");

    const consulta = await consultas.findOne({ _id: "CON004" });
    console.log("READ Consulta:", consulta);

    await consultas.updateOne(
      { _id: "CON004" },
      { $set: { tratamiento: "Reposo e hidratacion" } }
    );
    console.log("UPDATE Consulta: correcto");

    // ===== CRUD EXAMENES =====

    await examenes.insertOne({
      _id: "EXA004",
      consulta_id: "CON004",
      tipo: "Hemograma",
      resultado: "Pendiente",
      fecha: new Date("2026-11-08")
    });
    console.log("CREATE Examen: correcto");

    const examen = await examenes.findOne({ _id: "EXA004" });
    console.log("READ Examen:", examen);

    await examenes.updateOne(
      { _id: "EXA004" },
      { $set: { resultado: "Normal" } }
    );
    console.log("UPDATE Examen: correcto");

    // ===== ELIMINAR DATOS DE PRUEBA =====

    await examenes.deleteOne({ _id: "EXA004" });
    console.log("DELETE Examen: correcto");

    await consultas.deleteOne({ _id: "CON004" });
    console.log("DELETE Consulta: correcto");

    await medicos.deleteOne({ _id: "MED003" });
    console.log("DELETE Medico: correcto");

    console.log("Todas las pruebas CRUD finalizaron.");

  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await cliente.close();
  }
}

iniciar();
