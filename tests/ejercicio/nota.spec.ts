import 'mocha';
import {expect} from 'chai';
import {Nota} from '../../src/ejercicio/nota';

describe('Tests de la clase Nota', () => {
  const myNote = new Nota('Hola mundo', 'Practica 9 DSI', 'magenta');
  const myNote1 = new Nota('Hola mundo', 'Practica 9 DSI', 'red');
  const myNote2 = new Nota('Hola mundo', 'Practica 9 DSI', 'blue');
  const myNote3 = new Nota('Hola mundo', 'Practica 9 DSI', 'green');
  const myNote4 = new Nota('Hola mundo', 'Practica 9 DSI', 'yellow');
  const myNote5 = new Nota('Hola mundo', 'Practica 9 DSI', 'cyan');
  const myNoteErr = new Nota('Hola mundo', 'Practica 9 DSI', 'brown');

  it('Se crea una clase Nota correctamente', () => {
    expect(new Nota('Mangeta note', 'Practica 11 DSI', 'magenta')).to.be.not.null;
    expect(new Nota('Red note', 'Practica 11 DSI', 'red')).to.be.instanceOf(Nota);
  });
  it('Se accede al título de la nota correctamente', () => {
    expect(myNote.getTitulo()).to.be.equal('Hola mundo');
  });
  it('Se accede al cuerpo de la nota correctamente', () => {
    expect(myNote.getCuerpo()).to.be.equal('Practica 9 DSI');
  });
  it('Se accede al color de la nota correctamente', () => {
    expect(myNote.getColor()).to.be.equal('magenta');
  });
  it('Se accede a la información completa de la nota correctamente', () => {
    expect(myNote.getNota()).to.be.equal('"Titulo": "Hola mundo",\n"Cuerpo": "Practica 9 DSI",\n"Color": "magenta"');
  });
  it('Se imprime por consola la nota correctamente', () => {
    expect(myNote.print()).to.be.not.null;
    expect(myNote1.print()).to.be.not.null;
    expect(myNote2.print()).to.be.not.null;
    expect(myNote3.print()).to.be.not.null;
    expect(myNote4.print()).to.be.not.null;
    expect(myNote5.print()).to.be.not.null;
    expect(myNoteErr.print()).to.be.not.null;
  });
});
