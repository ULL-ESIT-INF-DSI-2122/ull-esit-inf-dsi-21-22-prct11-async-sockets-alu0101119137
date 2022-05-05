/**
 * Práctica 10. Cliente procesamiento de notas
 * @module Cliente
 * @author Andrea Hernández Martín
 */

import * as net from 'net';
import * as chalk from "chalk";

/**
 * Tipo de datos de una petición
 * @type
 */
export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  user: string;
  title?: string;
  body?: string;
  color?: string;
}

/**
 * Clase cliente
 */
export class Cliente {
  constructor(private miPeticion: RequestType) {
  }

  conexion() {
    const client = net.connect({port: 60300});
    client.write(JSON.stringify(this.miPeticion));
    client.end();

    let myResponse = '';
    client.on('data', (trozo) => {
      myResponse += trozo;
    });

    client.on('end', () => {
      const miRespuesta = JSON.parse(myResponse);
      // console.log(JSON.parse(myResponse));

      switch (miRespuesta.type) {
        case 'add':
          if (miRespuesta.success) {
            console.log(chalk.default.green('Se ha añadido la nota correctamente'));
          } else {
            console.log(chalk.default.red('Error. Ya existe una nota con ese nombre'));
          }
          break;

        case 'update':
          if (miRespuesta.success) {
            console.log(chalk.default.green('Se ha modificado la nota correctamente'));
          } else {
            console.log(chalk.default.red('Error. No existe una nota con ese nombre'));
          }
          break;

        default:
          break;
      }
      // console.log(JSON.parse(myResponse));
    });
  }
}

// const myClient = new Cliente({type: 'add'});
// myClient.conexion();
