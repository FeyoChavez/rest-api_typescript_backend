import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [path.resolve(__dirname, '../models')], // ruta absoluta correcta
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false } // si tu DB está en Render o similar
  },
  logging: false  // console.log,  para ver los CREATE TABLE
});

export default db;
