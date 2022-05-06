import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import {ClientEmitter} from '../../src/ejercicio/clientEmitter';

describe('Tests de la clase ClientEmitter', () => {
  it('Emite un evento de "message" con el mensaje completo', (done) => {
    const socket = new EventEmitter();
    const client = new ClientEmitter(socket);

    client.on('message', (message) => {
      expect(message).to.be.eql({'type': 'add', 'user': 'Andrea', 'title': 'Blue note', 'body': 'This is a blue note', 'color': 'blue'});
      done();
    });

    socket.emit('data', '{"type": "add", "user": "Andrea"');
    socket.emit('data', ', "title": "Blue note", "body": "This is a blue note"');
    socket.emit('data', ', "color": "blue"}');
    socket.emit('data', '\n');
    done();
  });

  it('Emite un evento de "end" con el mensaje completo', (done) => {
    const socket = new EventEmitter();
    const client = new ClientEmitter(socket);

    client.on('end', (message) => {
      expect(message).to.be.eql({'type': 'list', 'user': 'Andrea'});
      done();
    });

    socket.emit('data', '{"type": "list", "user": "Andrea}"');
    socket.emit('data', '\n');
    done();
  });
});
