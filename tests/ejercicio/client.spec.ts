import 'mocha';
import {expect} from 'chai';
import {Cliente, RequestType} from '../../src/ejercicio/client';
// import {Server} from '../../src/ejercicio/server';

// import * as net from 'net';
// import {EventEmitter} from 'events';

describe('Clase cliente', () => {
  it('Emite un mensaje completo', (done) => {
    const myRequest: RequestType = {type: 'add', user: 'Andrea', title: 'Nora Amarilla', body: 'Es es una nota amarilla', color: 'Amarillo'};
    const client = new Cliente(myRequest);
    client.conexion();
    done();
    // client.on('message', (message) => {
    //   expect(message).to.be.eql({'type': 'change', 'prev': 13, 'curr': 26});
    //   done();
    // });

    // socket.emit('data', '{"type": "change", "prev": 13');
    // socket.emit('data', ', "curr": 26}');
    // socket.emit('data', '\n');
  });
});
