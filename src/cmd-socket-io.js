var io = require('socket.io-client');
var readline = require('./utils/readline');
var socket = io.connect("http://localhost:9020");
var tagPrint = require('./utils/tagprint');

var Reset = tagPrint.Reset;
var FgGreen = tagPrint.FgGreen;
var FgRed = tagPrint.FgRed;
tagPrint = tagPrint.print;

socket.on('connect', function() {
  // console.log('Connected to SocketIO');
  // Flux.actions.getGatewayState();
  // socket.emit('action', {type:"requestgatewaystate"});
  // Flux.actions.getWebserverState();
  // socket.emit('servermessage', {type:"getwebserverinfo"});
  // Flux.actions.getOtaFiles();
})

socket.on('devices', function(message) {
  if(message.devices.length > 0) {
    message.devices.forEach(function(m) {
      tagPrint(m, `devices-${m.nodeId}`, FgGreen);
    });
  }
  else {
    tagPrint('', `devices`, FgGreen);
  }
});

socket.on('rules', function(message) {
  if(message.relays.length > 0) {
    message.relays.forEach(function(r) {
      tagPrint(r, `relays`, FgGreen);
    });
  }
  else {
    tagPrint('', `relays`, FgGreen);
  }
});

socket.on('devicejoined', function(newNode) {  
  tagPrint(newNode, `devicejoined`, FgGreen);
});

socket.on('deviceleft', function(leftNode) {
  tagPrint(leftNode, `deviceleft`, FgGreen);
});

socket.on('deviceupdate', function(updatedNode) {
  tagPrint(updatedNode, `deviceupdate`, FgGreen);
});

socket.on('otaevents', function(otaEvent) {
  tagPrint(otaEvent, `otaevents`, FgGreen);
});

socket.on('serversettings', function(data) {
  tagPrint(data, `serversettings`, FgGreen);
});

socket.on('gatewaysettings', function(data) {
  tagPrint(data, `gatewaysettings`, FgGreen);
});

socket.on('otaavailablefiles', function(ota) {
  tagPrint(ota, `otaavailablefiles`, FgGreen);
});

socket.on('serverlog', function(log) {
  tagPrint(log, `serverlog`, FgGreen);
});

socket.on('gatewaylog', function(log) {
  tagPrint(log, `gatewaylog`, FgGreen);
});

socket.on('traffictestlog', function(log) {
  tagPrint(log, `traffictestlog`, FgGreen);
});

socket.on('traffictestresults', function(payload) {
  tagPrint(payload, `traffictestresults`, FgGreen);
});

socket.on('heartbeat', function(data) {
  tagPrint(data, `heartbeat`, FgGreen);
});

socket.on('networkSecurityLevel', function(data) {
  tagPrint(data, `networkSecurityLevel`, FgGreen);
});

socket.on('serverlogstream', function(log) {
  tagPrint(log, `serverlogstream`, FgGreen);
});

socket.on('gatewaylogstream', function(stream) {
  tagPrint(stream, `gatewaylogstream`, FgGreen);
});

socket.on('installcodecollection', function(data) {
  tagPrint(data, `installcodecollection`, FgGreen);
});

// socket.on('connect', function() {
//   console.info(data);
// });


socket.on('executed', function(executed) {
  tagPrint(executed, `executed`, FgGreen);
});

socket.on('connect_error', function() {
  tagPrint('', `connect_error`, FgRed);
});

socket.on('connect_timeout', function() {
  tagPrint('', `connect_timeout`, FgRed);
});

socket.on('reconnect_attempt', function() {
  tagPrint('', `reconnect_attempt`, FgRed);
});

socket.on('reconnect_failed', function() {
  tagPrint('', `reconnect_failed`, FgRed);
});

var question =
`Enter number:
1: requestgatewaystate
2: permitjoinZB3OpenNetworkOnly
3: getwebserverinfo
e: exit
`;
async function userInputNumber() {
  const number = await readline(question);
  return number;
}

(async () => {
  try {

    for(let exit=false;!exit;) {
      const number = await userInputNumber();

      // console.info(`Value: ${number}`);
      switch(number) {
        case '1':
          socket.emit('action', {type:"requestgatewaystate"});
          break;
        case '2':
          socket.emit('action', {type:"permitjoinZB3OpenNetworkOnly", delayMs: 255});
          break;
        case '3':
          socket.emit('servermessage', {type:"getwebserverinfo"});
          break;
        case '4':
          socket.emit('action', {type:"addrelay", inDeviceInfo: inDeviceInfo, outDeviceInfo: outDeviceInfo});
          break;
        case 'x':
          // socket.emit('action', {type:"permitjoinZB3", deviceEui: deviceEui, installCode: installCode, delayMs: delayMs});
          break;
        case 'e':
          socket.close();
          exit = true;
          break;
      }
    }
  } catch (e) {
      throw e
  }
})();