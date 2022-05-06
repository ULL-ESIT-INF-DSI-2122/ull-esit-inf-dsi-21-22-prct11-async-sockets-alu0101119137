/**
 * Práctica 10. Cliente procesamiento de notas
 * @module Cliente
 * @author Andrea Hernández Martín
 */

import * as net from 'net';
import * as chalk from "chalk";
import {ClientEmitter} from './clientEmitter';
import * as yargs from 'yargs';


/**
 * Tipo de datos de una petición
 * @type
 */
export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  user: string;
  title?: string;
  body?: string;
  color?: string;
}

let miPeticion: RequestType = {type: 'list', user: ''};

/**
 * Comando add para añadir una nota
 */
yargs.command({
  command: 'add',
  describe: 'Añadir una nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Cuerpo de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      miPeticion = {type: 'add', user: argv.user, title: argv.title, body: argv.body, color: argv.color};
    }
  },
});

/**
 * Comando para modificar una nota
 */
yargs.command({
  command: 'update',
  describe: 'Modificar una nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Cuerpo de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      miPeticion = {type: 'update', user: argv.user, title: argv.title, body: argv.body, color: argv.color};
    }
  },
});

/**
 * Comando para eliminar una nota
 */
yargs.command({
  command: 'remove',
  describe: 'Eliminar una nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Nombre de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      miPeticion = {type: 'remove', user: argv.user, title: argv.title};
    }
  },
});

/**
 * Comando para listar todas las notas de un usuario
 */
yargs.command({
  command: 'list',
  describe: 'Listar todas las notas del usuario',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      miPeticion = {type: 'list', user: argv.user};
    }
  },
});

/**
 * Comando para leer una nota según el nombre
 */
yargs.command({
  command: 'read',
  describe: 'Lee la nota de un usuario',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Nombre de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      miPeticion = {type: 'read', user: argv.user, title: argv.title};
    }
  },
});

/**
 * Procesa los argumentos pasados por línea de comandos
 */
yargs.parse();

/**
 * Se crea un cliente en el puerto 60300
 */
const client = net.connect({port: 60300});

/**
 * Se crea un socket de la clase Client emiter conectado al puerto 60300
 */
const socket = new ClientEmitter(client);

/**
 * Se envía al servidor la petición
 */
client.write(JSON.stringify(miPeticion) + `\n`);

/**
 * Error en caso de que el cliente no pueda realizar la conexion
 */
client.on('error', (err) => {
  console.log(chalk.default.red('Error. No se pudo realizar la conexión con el servidor.'));
});

/**
 * El socket recibe un evento de tipo request (realizado en la clase ServerEmitter)
 */
socket.on('message', (miRespuesta) => {
  switch (miRespuesta.type) {
    case 'add':
      if (miRespuesta.success) {
        console.log(chalk.default.green('Se ha añadido la nota correctamente'));
      } else {
        console.log(chalk.default.red('Error. Ya existe una nota con ese nombre'));
      }
      break;

    case 'update':
      if (miRespuesta.success) {
        console.log(chalk.default.green('Se ha modificado la nota correctamente'));
      } else {
        console.log(chalk.default.red('Error. No existe una nota con ese nombre'));
      }
      break;
    case 'remove':
      if (miRespuesta.success) {
        console.log(chalk.default.green('Se ha eliminado la nota correctamente'));
      } else {
        console.log(chalk.default.red('Error. No existe una nota con ese nombre'));
      }
      break;
    case 'list':
      if (miRespuesta.success) {
        console.log(chalk.default.green('Lista de notas:'));
        miRespuesta.notes.forEach((element: any) => {
          console.log(chalk.default.keyword(element.color)(element.titulo));
        });
      } else {
        console.log(chalk.default.red('Error. No existen notas que mostrar para el usuario'));
      }
      break;
    case 'read':
      if (miRespuesta.success) {
        console.log(chalk.default.green('Nota:'));
        console.log(chalk.default.keyword(miRespuesta.nota.color)(`Titulo: ${miRespuesta.nota.titulo},\nCuerpo: ${miRespuesta.nota.cuerpo}`));
      } else {
        console.log(chalk.default.red('Error. No existen notas que mostrar para el usuario'));
      }
      break;
    default:
      break;
  }
});
