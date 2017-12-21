var express = require('express'),
    opn = require('opn'),
    app = express(),
PORT = 3000;

app.use(express.static('public'))

app.listen(PORT, function() {
  opn('http://localhost:' + PORT);
  console.log('the server is working on port ' + PORT);
});
