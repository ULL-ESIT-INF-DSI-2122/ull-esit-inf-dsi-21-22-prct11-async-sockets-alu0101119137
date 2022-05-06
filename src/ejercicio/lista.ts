/**
 * Aplicación para el procesamiento de notas de texto
 * @module Lista
 * @author Andrea Hernández Martín
 */

import * as chalk from "chalk";
import {spawn} from "child_process";
import {existsSync, readdirSync, readFileSync, readFile, writeFile} from "fs";
import {Nota} from "./nota";

/**
 * Clase Lista
 */
export class Lista {
  /**
   * Constructor de la clase Lista
   * @param userName nombre del usurio
   */
  constructor(private userName: string) {}

  /**
   * Método que accede al nombre del usuario
   * @returns Retorna el nombre del usuario
   */
  getUserName(): string {
    return this.userName;
  }

  /**
   * Método que busca una nota según el nombre de esta
   * @param nombre Nombre de la nota a buscar
   * @returns Retorna verdadero si la encontró y falso en caso contrario
   */
  findNota(nombre: string): boolean {
    return (existsSync(`./${this.userName}/${nombre}.json`)) ? true : false;
  }

  /**
   * Método que añade una nueva nota
   * @param nuevaNota Nota nueva que se quiere añadir
   */
  addNota(nuevaNota: Nota): void {
    if (!this.findNota(nuevaNota.getTitulo())) {
      writeFile(`./${this.userName}/${nuevaNota.getTitulo()}.json`, `{\n${nuevaNota.getNota()}\n}`, (err) => {
        if (!err) {
          console.log(chalk.default.green('Se ha añadido la nota correctamente'));
        }
      });
    } else {
      console.log(chalk.default.red('Error. Ya existe una nota con ese nombre'));
    }
  }

  /**
   * Método que modifica el contenido de una nota existente
   * @param nombre Nombre de la nota que se quiere modificar
   * @param nuevoTexto El texto a modificar
   * @param nuevoColor El color de la nota que se quiere modificar
   */
  modifyNota(nombre: string, nuevoTexto: string, nuevoColor: string): void {
    if (this.findNota(nombre)) {
      writeFile(`./${this.userName}/${nombre}.json`, `{\n"Titulo": "${nombre}",\n"Cuerpo": "${nuevoTexto}",\n"Color": "${nuevoColor}"\n}`, (err) => {
        if (!err) {
          console.log(chalk.default.green('Se ha modificado la nota correctamente'));
        }
      });
    } else {
      console.log(chalk.default.red('Error. No existe ninguna nota con ese nombre'));
    }
  }

  /**
   * Método que elimina una nota
   * @param nombre Nombre de la nota que se quiere eliminar
   */
  deleteNota(nombre: string): void {
    if (this.findNota(nombre)) {
      spawn('rm', [`./${this.userName}/${nombre}.json`]);
      console.log(chalk.default.green('Se ha eliminado la nota correctamente'));
    } else {
      console.log(chalk.default.red('Error. No existe ninguna nota con ese nombre'));
    }
  }

  /**
   * Método que muestra por consola todas las notas que tiene un usuario
   * con su color correspondiente
   */
  listarTitulos(): Nota[] {
    if (existsSync(`./${this.userName}`)) {
      const lista = readdirSync(`./${this.userName}`);
      lista.forEach((nota) => {
        readFile(`./${this.userName}/${nota}`, (err, data) => {
          if (!err) {
            const dataJson = JSON.parse(data.toString());
            switch (dataJson.Color) {
              case 'Rojo':
                console.log(chalk.default.red(dataJson.Titulo));
                break;
              case 'Verde':
                console.log(chalk.default.green(dataJson.Titulo));
                break;
              case 'Azul':
                console.log(chalk.default.blue(dataJson.Titulo));
                break;
              case 'Amarillo':
                console.log(chalk.default.yellow(dataJson.Titulo));
                break;
              case 'Magenta':
                console.log(chalk.default.magenta(dataJson.Titulo));
                break;
              case 'Cian':
                console.log(chalk.default.cyan(dataJson.Titulo));
                break;
              default:
                console.log(chalk.default.red('Error. Este color no está disponible'));
                break;
            }
          }
        });
      });
      // Se añade para poder listar las notas en el cliente
      const aux: string[] = readdirSync(`./${this.userName}`);
      const notas: Nota[] = [];
      aux.forEach((nota) => {
        const directorio: string = readFileSync(`./${this.userName}/${nota}`, {encoding: 'utf-8'});
        const datosJSON = JSON.parse(directorio);
        notas.push(new Nota(datosJSON.Titulo, datosJSON.Cuerpo, datosJSON.Color));
      });
      return notas;
    } else {
      console.log(chalk.default.red('Error. No existen listas para este usuario'));
      return [];
    }
  }

  /**
   * Método que lee una nota según el nombre que se le pase
   * @param nombre Nombre de la nota que se quiere leer
   */
  leerNota(nombre: string): Nota | undefined {
    if (this.findNota(nombre)) {
      readFile(`./${this.userName}/${nombre}.json`, (err, data) => {
        if (!err) {
          const dataJson = JSON.parse(data.toString());
          switch (dataJson.Color) {
            case 'Rojo':
              console.log(chalk.default.red(`Titulo: ${dataJson.Titulo}\nCuerpo: ${dataJson.Cuerpo}`));
              break;
            case 'Verde':
              console.log(chalk.default.green(`Titulo: ${dataJson.Titulo}\nCuerpo: ${dataJson.Cuerpo}`));
              break;
            case 'Azul':
              console.log(chalk.default.blue(`Titulo: ${dataJson.Titulo}\nCuerpo: ${dataJson.Cuerpo}`));
              break;
            case 'Amarillo':
              console.log(chalk.default.yellow(`Titulo: ${dataJson.Titulo}\nCuerpo: ${dataJson.Cuerpo}`));
              break;
            case 'Magenta':
              console.log(chalk.default.magenta(`Titulo: ${dataJson.Titulo}\nCuerpo: ${dataJson.Cuerpo}`));
              break;
            case 'Cian':
              console.log(chalk.default.cyan(`Titulo: ${dataJson.Titulo}\nCuerpo: ${dataJson.Cuerpo}`));
              break;
            default:
              console.log(chalk.default.red('Error. Este color no está disponible'));
              break;
          }
        } else {
          console.log(chalk.default.red('Error. No se pudo leer la nota deseada'));
        }
      });
      // Se añade para poder leer una nota desde el cliente
      const directorio: string = readFileSync(`./${this.userName}/${nombre}.json`, {encoding: 'utf-8'});
      const datosJSON = JSON.parse(directorio);
      const nota: Nota = new Nota(datosJSON.title, datosJSON.body, datosJSON.color);
      return nota;
    } else {
      console.log(chalk.default.red('Error. No existe una nota con ese nombre'));
      return undefined;
    }
  }
}
