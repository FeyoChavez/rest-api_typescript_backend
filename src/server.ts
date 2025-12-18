import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions} from './config/swagger';
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'

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

// Permitir conexiones
const corsOptions : CorsOptions = {
    origin : function(origin, callback) {
        if(origin === process.env.FRONTEND_URL){
          callback(null, true) // si no hay error, permitir
        } else {
          callback(new Error('Error de CORS'))
        }
    }
}

server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

// Usa tu router
server.use('/api/products', router);

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server;
