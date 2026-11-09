
const { conectar, cliente } = require("./conexion");

// Funcion: contar consultas por medico
async function consultasPorMedico(db) {
  return await db.collection("consultas").aggregate([
    {
      $group: {
        _id: "$medico_id",
        totalConsultas: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]).toArray();
}

async function iniciar() {
  try {
    const db = await conectar();

    // 1. CREAR UNA VISTA EN MONGODB
    const existe = await db.listCollections({
      name: "vista_consultas"
    }).hasNext();

    if (!existe) {
      await db.command({
        create: "vista_consultas",
        viewOn: "consultas",
        pipeline: [
          {
            $project: {
              _id: 1,
              paciente_id: 1,
              medico_id: 1,
              fecha: 1,
              diagnostico: 1
            }
          }
        ]
      });
      console.log("Vista creada correctamente.");
    }

    // Consultar la vista
    const vista = await db.collection("vista_consultas")
      .find().toArray();

    console.log("\nVISTA DE CONSULTAS:");
    console.log(vista);

    // 2. EJECUTAR UNA FUNCION
    const reporte = await consultasPorMedico(db);

    console.log("\nCONSULTAS POR MEDICO:");
    console.log(reporte);

    // 3. UTILIZAR UN CURSOR
    const cursor = db.collection("pacientes").find();

    console.log("\nCURSOR - LISTA DE PACIENTES:");

    for await (const paciente of cursor) {
      console.log(paciente._id, paciente.nombre);
    }

    console.log("\nPruebas finalizadas correctamente.");

  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await cliente.close();
  }
}

iniciar();
