# Sistema de Gestión de Pacientes de la CCSS
II Avance
Estudiante: Christopher Granados Mora
Proyecto académico del curso Bases de Datos NoSQL de la Universidad Fidélitas.

## Descripción

Sistema básico de gestión de pacientes desarrollado utilizando MongoDB y Node.js. Permite administrar información ficticia de pacientes, médicos, consultas y exámenes médicos.

## Tecnologías utilizadas

- MongoDB
- MongoDB Compass
- Node.js
- JavaScript

## Colecciones

- pacientes
- medicos
- consultas
- examenes

## Funcionalidades

- Conexión entre Node.js y MongoDB.
- Operaciones CRUD para las cuatro colecciones.
- Vista de consultas médicas.
- Función para contar consultas por médico.
- Lectura de pacientes mediante un cursor.
- Procedimiento de aplicación para registrar consultas y verificar las referencias.

## Instalación y ejecución

1. Tener Node.js y MongoDB instalados.
2. Iniciar el servidor local de MongoDB.
3. Crear la base de datos `CCSS_Gestion_Pacientes` y sus cuatro colecciones.
4. Agregar registros ficticios de prueba.
5. Ejecutar `npm install` en la carpeta del proyecto.
6. Ejecutar los archivos mediante los siguientes comandos:

```bash
node app.js
node crud.js
node crud_restantes.js
node reportes.js
node procedimientos.js
```
