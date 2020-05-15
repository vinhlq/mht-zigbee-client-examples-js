var Socket = require('net').Socket;

var cli = new Socket();
cli.connect({
  host: '127.0.0.1',
  port: 4901,
});

cli.on('connect', function() {
  console.log('cli connected');

  socket.write('plugin network-creator-security open-network\n');
})

cli .on('data', function(data) {
  console.log(`<CLI>${data.toString()}</CLI>`);
})

var socket = new Socket();
socket.connect({
  host: '127.0.0.1',
  port: 4900,
});

socket.on('connect', function() {
  console.log('connected');

  socket.write('plugin network-creator-security open-network\r\n');
})

socket.on('data', function(data) {
  console.log(data.toString());
})