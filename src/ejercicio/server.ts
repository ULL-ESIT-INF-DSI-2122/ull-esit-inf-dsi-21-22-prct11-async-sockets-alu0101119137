/**
 * Práctica 10. Servidor procesamiento de notas
 * @module Servidor
 * @author Andrea Hernández Martín
 */

import * as net from 'net';
import {Nota} from './nota';

/**
 * Tipo de datos de un respuesta
 * @type
 */
export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  notes?: Nota[];
}

export class Server {
  constructor() {
    const server = net.createServer({allowHalfOpen: true}, (connection) => {
      let myPeticion= '';
      connection.on('data', (trozo) => {
        myPeticion += trozo;
      });

      connection.on('end', () => {
        console.log(myPeticion);
      });
    });
    server.listen(60300);
  }
}

const myServer = new Server();
myServer;
