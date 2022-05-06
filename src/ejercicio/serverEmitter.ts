/**
 * Clase Servidor Emitter
 * @module ServerEmitter
 * @author Andrea Hernández Martín
 */

import {EventEmitter} from 'events';

/**
 * Clase Servidor heredando de la clase EventEmmiter
 */
export class ServerEmitter extends EventEmitter {
  /**
   * Contructor de la clase que emite un evento de tipo request cuando el mensaje le llega completo
   * @param connection Socket
   */
  constructor(connection: EventEmitter) {
    super();

    let wholeData = '';
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;

      let messageLimit = wholeData.indexOf('\n');
      while (messageLimit !== -1) {
        const message = wholeData.substring(0, messageLimit);
        wholeData = wholeData.substring(messageLimit + 1);
        this.emit('request', JSON.parse(message));
        messageLimit = wholeData.indexOf('\n');
      }
    });
  }
}
