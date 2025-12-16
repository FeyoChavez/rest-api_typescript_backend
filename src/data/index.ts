import {exit} from 'node:process'
import db from '../config/db'

// Elimina los datos de la bd al ejecutar npm test
const clearDB = async () => {
    try {
        await db.sync({force: true}) // elimina datos de la bd
        console.log('Datos eliminados correctamente')
        exit(0) 

    } catch (error) {
        console.log(error)
        exit(1) // finaliza con errores
    }
}

if(process.argv[2] === '--clear') {
    clearDB()
}
