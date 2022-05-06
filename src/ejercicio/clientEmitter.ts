import {EventEmitter} from 'events';

/**
 * Clase Cliente heredando de la clase EventEmmiter
 */
export class ClientEmitter extends EventEmitter {
  /**
   * Contructor de la clase que emite un evento de tipo message cuando el mensaje le llega completo
   * @param connection Socket
   */
  constructor(connection: EventEmitter) {
    super();

    let wholeData = '';
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;
    });

    connection.on('end', () => {
      this.emit('message', JSON.parse(wholeData));
    });
  }
}
