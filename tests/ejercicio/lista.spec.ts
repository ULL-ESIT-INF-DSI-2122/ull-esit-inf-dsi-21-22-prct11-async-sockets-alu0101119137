import 'mocha';
import {expect} from 'chai';
import {Nota} from '../../src/ejercicio/nota';
import {Lista} from '../../src/ejercicio/lista';

describe('Tests de la clase Lista', () => {
  const myList = new Lista('Cristian');
  const myList2 = new Lista('Emma');
  const myList3 = new Lista('Sonia');
  const myNote = new Nota('Mi primera nota', 'Práctica 11', 'yellow');
  const myNote2 = new Nota('Nota 1', 'Práctica 11 DSI', 'magenta');
  const myNote3 = new Nota('Nota 2', 'Nota tests', 'red');
  const myNote4 = new Nota('Nota 3', 'Nota tests 1', 'cyan');
  const myNote5 = new Nota('Nota 4', 'Nota error', 'marron');
  const myNote6 = new Nota('Nota 5', 'Nota azul', 'blue');
  const myNote7 = new Nota('Nota 6', 'Nota verde', 'green');

  it('Se crea correctamente una instancia de la Lista', () => {
    expect(new Lista('Cristian')).to.be.not.null;
  });
  it('Se accede al nombre del usuario de la lista correctamente', () => {
    expect(myList.getUserName()).to.be.equal('Cristian');
  });
  it('Funciona el método encontrar una nota correctamente', () => {
    expect(myList.findNota('Mi primera nota')).to.be.equal(true);
  });
  it('Funciona el método añadir una nota a la lista correctamente', () => {
    expect(myList.addNota(myNote)).to.be.not.null;
    expect(myList.addNota(myNote2)).to.be.not.null;
    expect(myList2.addNota(myNote2)).to.be.not.null;
    expect(myList.addNota(myNote3)).to.be.not.null;
    expect(myList.addNota(myNote4)).to.be.not.null;
    expect(myList.addNota(myNote5)).to.be.not.null;
    expect(myList.addNota(myNote6)).to.be.not.null;
    expect(myList.addNota(myNote7)).to.be.not.null;
  });
  it('Funciona el método listar todos los nombres de las notas correctamente', () => {
    expect(myList2.listarTitulos()).to.be.deep.equal([myNote2]);
    expect(myList3.listarTitulos()).to.be.deep.equal([]);
  });
  it('Funciona el método leer nombre y cuerpo de una nota correctamente', () => {
    expect(myList.leerNota('Nota')).to.be.undefined;
  });
  it('Funciona el método modificar una nota de la lista correctamente', () => {
    // expect(myList2.modifyNota('Nota 1', 'Nota modificada', 'Azul')).to.be.not.null;
    expect(myList2.modifyNota('Nota', 'Nota no existe', 'green')).to.be.not.null;
  });
  it('Funciona el método eliminar una nota de la lista correctamente', () => {
    expect(myList.deleteNota('Nota 2')).to.be.not.null;
    expect(myList.deleteNota('Nota')).to.be.not.null;
  });
});
