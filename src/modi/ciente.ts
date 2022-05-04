import * as net from 'net';

/**
 * Clase Cliente
 */
export class Cliente {
  constructor(private comando: string, private options: string[]) {}

  conexion(): void {
    const client = net.connect({port: 60300});
    let msg = '';
    client.on('data', (dataJSON) => {
      msg = JSON.stringify(dataJSON);
    });
    client.on('end', () => {
      client.write(msg);
    });
  }
}

// const c = new Cliente(process.argv[2], process.argv[3], process.argv[4]);
const c = new Cliente('cat', ['-n', 'prueba.txt']);
c.conexion();
