/**
 * Práctica 10. Cliente procesamiento de notas
 * @module Cliente
 * @author Andrea Hernández Martín
 */

import * as net from 'net';
import { argv } from 'yargs';

/**
 * Tipo de datos de una petición
 * @type
 */
export type RequestType = {
  // Buscar como pasarle un type en vez de string
  // type: 'add' | 'update' | 'remove' | 'read' | 'list';
  type: string;
  title?: string;
  body?: string;
  color?: string;
}

/**
 * Clase cliente
 */
export class Cliente {
  constructor() {

  }

  conexion() {
    const client = net.connect({port: 60300});
    const myRequest: RequestType = {
      type: process.argv[2],
      title: process.argv[3],
      body: process.argv[4],
      color: process.argv[5],
    };

    client.write(JSON.stringify(myRequest));
    client.end();
    // let myPeticion= '';
    // client.on('data', (trozo) => {
    //   myPeticion += trozo;
    // });

    // console.log(JSON.parse(myPeticion.toString()));
  }
}

const myClient = new Cliente();
myClient.conexion();
