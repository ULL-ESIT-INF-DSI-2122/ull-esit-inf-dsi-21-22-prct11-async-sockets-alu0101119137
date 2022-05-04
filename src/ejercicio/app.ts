/**
 * Aplicación para el procesamiento de notas de texto
 * @module App
 * @author Andrea Hernández Martín
 */

import * as yargs from 'yargs';
import {Nota} from './nota';
import {Lista} from './lista';
const spawn = require('child_process').spawn;

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
    if (typeof argv.user === 'string') {
      if (typeof argv.title === 'string') {
        if (typeof argv.body === 'string') {
          if (typeof argv.color === 'string') {
            const newNote = new Nota(argv.title, argv.body, argv.color);
            let output: string = '';
            const ls = spawn('ls');
            ls.stdout.on('data', (data: any) => output += data);
            const split = output.split(/\s+/);
            const index = split.findIndex((temp) => temp === argv.user);
            const aux = new Lista(argv.user);
            if (index === -1) {
              spawn('mkdir', [`${argv.user}`]);
            }
            aux.addNota(newNote);
          }
        }
      }
    }
  },
});

/**
 * Comando para modificar una nota
 */
yargs.command({
  command: 'mod',
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
    if (typeof argv.user === 'string') {
      if (typeof argv.title === 'string') {
        if (typeof argv.body === 'string') {
          if (typeof argv.color === 'string') {
            const aux = new Lista(argv.user);
            aux.modifyNota(argv.title, argv.body, argv.color);
          }
        }
      }
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
    if (typeof argv.user === 'string') {
      if (typeof argv.title === 'string') {
        const aux = new Lista(argv.user);
        aux.deleteNota(argv.title);
      }
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
      const aux = new Lista(argv.user);
      aux.listarTitulos();
    }
  },
});

/**
 * Comando para leer una nota según el nombre
 */
yargs.command({
  command: 'read',
  describe: 'Listar todas las notas del usuario',
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
    if (typeof argv.user === 'string') {
      if (typeof argv.title === 'string') {
        const aux = new Lista(argv.user);
        aux.leerNota(argv.title);
      }
    }
  },
});

yargs.parse();
