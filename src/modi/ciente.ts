import * as net from 'net';

/**
 * Clase Cliente
 */
export class Cliente {
  constructor(private comando: string, private options: string[]) {}

  conexion(): void {
    const client = net.connect({port: 60300});
    client.on('data', (dataJSON) => {
      const message = JSON.stringify(dataJSON);
      client.write(message);
    });
  }
}

// const c = new Cliente(process.argv[2], process.argv[3], process.argv[4]);
const c = new Cliente('cat', ['-n', 'prueba.txt']);
c.conexion();
