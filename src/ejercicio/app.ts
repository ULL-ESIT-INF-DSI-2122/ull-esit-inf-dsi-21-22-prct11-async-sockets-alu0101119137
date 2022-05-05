/**
 * Aplicación para el procesamiento de notas de texto
 * @module App
 * @author Andrea Hernández Martín
 */

import * as yargs from 'yargs';
import {Lista} from './lista';
import {Cliente} from './client';

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
      const myClient = new Cliente({type: 'add', user: argv.user, title: argv.title, body: argv.body, color: argv.color});
      myClient.conexion();
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
      const myClient = new Cliente({type: 'update', user: argv.user, title: argv.title, body: argv.body, color: argv.color});
      myClient.conexion();
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
      const myClient = new Cliente({type: 'remove', user: argv.user, title: argv.title});
      myClient.conexion();
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
