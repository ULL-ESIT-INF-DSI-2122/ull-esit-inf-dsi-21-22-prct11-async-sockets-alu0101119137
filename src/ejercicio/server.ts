/**
 * Práctica 10. Servidor procesamiento de notas
 * @module Servidor
 * @author Andrea Hernández Martín
 */

import * as net from 'net';
import {Nota} from './nota';
import {Lista} from './lista';
import {ServerEmitter} from './serverEmitter';

const spawn = require('child_process').spawn;

/**
 * Tipo de datos de un respuesta
 * @type
 */
export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  notes?: Nota[];
  list?: string[];
}

/**
 * Creación del servidor
 */
const server = net.createServer((connection) => {
  const socket = new ServerEmitter(connection);

  console.log('A client has connected.');

  /**
   * El socket recibe un evento de tipo request del cliente
   */
  socket.on('request', (myRequest) => {
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

      // case 'list':
      //   const auxL = new Lista(myRequest.user);
      //   if (existsSync(`./${myRequest.user}`)) {
      //     auxL.listarTitulos();
      //     myResponse = {type: 'list', success: true};
      //   } else {
      //     myResponse = {type: 'list', success: false};
      //   }
      //   break;
      // case 'read':
      //   const auxRe = new Lista(myRequest.user);
      //   if (auxRe.findNota(myRequest.title)) {
      //     auxRe.leerNota(myRequest.title);
      //     myResponse = {type: 'remove', success: true, notes: []};
      //   } else {
      //     myResponse = {type: 'remove', success: false};
      //   }
      //   break;
    }
    connection.write(JSON.stringify(myResponse));
    connection.end();
  });

  /**
   * Se controlan los errores del servidor
   */
  connection.on('error', (err) => {
    console.log('Error. No se ha podido establecer la conexión.');
  });

  /**
   * Se desconecta el cliente
   */
  connection.on('close', () => {
    console.log('A client has disconnected');
  });
});

/**
 * Puerto de escucha del servidor
 */
server.listen(60300, () => {
  console.log('Waiting for clients to connect.');
});
