import * as net from 'net';
const {spawn} = require('child_process');


net.createServer({allowHalfOpen: true}, (connection) => {
  console.log('A client has connected.');

  connection.write(`Connection established.\n`);

  console.log('A client has connected.');

  let wholeData = '';
  connection.on('data', (dataChunk) => {
    wholeData += dataChunk;
    const message = JSON.parse(wholeData.toString());
    const comando = spawn(message.comando, [message.options]);
  });
  // connection.write(JSON.stringify({'type': 'cat', 'file': fileName}) + '\n');


  connection.on('end', () => {
    console.log('A client has disconnected.');
  });
}).listen(60300, () => {
  console.log('Waiting for clients to connect.');
});
