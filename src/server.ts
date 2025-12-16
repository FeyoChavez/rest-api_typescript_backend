import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';

export async function connectDB() {
  try {
    await db.authenticate();
    //console.log(colors.green('Conexión exitosa con la base de datos'));

    // IMPORTANT: espera a que termine la sincronización
    await db.sync({ alter: true });
    //console.log(colors.blue('Tablas sincronizadas correctamente'));

  } catch (error) {
    console.log(colors.red.bold('Error al conectar a la base de datos'));
    //console.error(error);
  }
}

connectDB();

// Instancia de express
const server = express();

// Leer datos de formularios
server.use(express.json())

// Usa tu router
server.use('/api/products', router);

server.get('/api', (req, res) => {
  res.json({msg: 'Desde API'})
})

export default server;
