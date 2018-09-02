var express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000;


app.use(express.static('public'));
app.listen(PORT, function() {
  console.log('the server is working on port ' + PORT);
});
