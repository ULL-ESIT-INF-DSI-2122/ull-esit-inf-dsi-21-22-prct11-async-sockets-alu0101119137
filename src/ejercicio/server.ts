/**
 * Práctica 10. Servidor procesamiento de notas
 * @module Servidor
 * @author Andrea Hernández Martín
 */

import * as net from 'net';
import {Nota} from './nota';
import {Lista} from './lista';
const spawn = require('child_process').spawn;


/**
 * Tipo de datos de un respuesta
 * @type
 */
export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  notes?: Nota[];
}

/**
 * Clase Servidor
 */
export class Server {
  constructor() {
    const server = net.createServer({allowHalfOpen: true}, (connection) => {
      console.log('A client has connected.');

      let myPeticion= '';
      connection.on('data', (trozo) => {
        myPeticion += trozo;
      });

      connection.on('end', () => {
        const myRequest = JSON.parse(myPeticion);
        let myResponse: ResponseType = {type: 'add', success: false};

        switch (myRequest.type) {
          case 'add':
            const newNote = new Nota(myRequest.title, myRequest.body, myRequest.color);
            let output: string = '';
            const ls = spawn('ls');
            ls.stdout.on('data', (data: any) => output += data);
            const split = output.split(/\s+/);
            const index = split.findIndex((temp) => temp === myRequest.user);
            const aux = new Lista(myRequest.user);
            if (index === -1) {
              spawn('mkdir', [`${myRequest.user}`]);
            }
            if (!aux.findNota(newNote.getTitulo())) {
              aux.addNota(newNote);
              myResponse = {type: 'add', success: true, notes: [newNote]};
            } else {
              myResponse = {type: 'add', success: false, notes: [newNote]};
            }
            break;

          case 'update':
            const auxUp = new Lista(myRequest.user);
            if (auxUp.findNota(myRequest.title)) {
              auxUp.modifyNota(myRequest.title, myRequest.body, myRequest.color);
              myResponse = {type: 'update', success: true};
            } else {
              myResponse = {type: 'update', success: false};
            }
            break;

          case 'remove':
            const auxR = new Lista(myRequest.user);
            if (auxR.findNota(myRequest.title)) {
              auxR.deleteNota(myRequest.title);
              myResponse = {type: 'remove', success: true};
            } else {
              myResponse = {type: 'remove', success: false};
            }
            break;

          default:
            break;
        }
        connection.write(JSON.stringify(myResponse));

        connection.end();
        connection.on('close', () => {
          console.log('A client has disconnected');
        });
      });
    });
    server.listen(60300, () => {
      console.log('Waiting for clients to connect.');
    });
  }
}

const myServer = new Server();
myServer;
