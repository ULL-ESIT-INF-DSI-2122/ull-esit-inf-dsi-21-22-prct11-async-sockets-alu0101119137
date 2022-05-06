import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import {ServerEmitter} from '../../src/ejercicio/serverEmitter';

describe('Tests de la clase ServerEmitter', () => {
  it('Emite un evento de "request" con el mensaje completo', (done) => {
    const socket = new EventEmitter();
    const server = new ServerEmitter(socket);

    server.on('request', (message) => {
      expect(message).to.be.eql({'type': 'read', 'user': 'Andrea', 'title': 'Magenta note'});
      done();
    });

    socket.emit('data', '{"type": "read", "user": "Andrea"');
    socket.emit('data', ', "title": "Magenta note"}');
    socket.emit('data', '\n');
  });
});
