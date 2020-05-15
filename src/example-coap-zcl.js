var coap        = require('coap');
var server      = coap.createServer({ type: 'udp6' })

server.on('request', function(req, res) {
  res.end('Hello ' + req.url.split('/')[1] + '\n')
})

// the default CoAP port is 5683
server.listen(function() {
  var req = coap.request({host: '127.0.0.1', port: 5700, method: 'GET', pathname: '.well-known/core'});
  // var req = coap.request('coap://[::1]/.well-known/core');
  // var req = coap.request('coap://[::1]/Matteo');

  req.on('response', function(res) {
    res.pipe(process.stdout)
    res.on('end', function() {
      process.exit(0)
    })
  })

  req.end();
});