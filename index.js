// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/:date?", function (req, res) {
  const _date = req.params.date;
  let date = new Date();
  if(_date){
    date = isNaN(Number(_date)) ? 
                                  new Date(_date)
                                : new Date(Number(_date)) 
  }
  const unix = date.getTime();
  const utc = date.toUTCString();
  const ret = date == "Invalid Date" 
                        ? {error: "Invalid Date"} 
                        : { unix, utc };
  return res.json(ret);
});


// listen for requests :)
process.env.PORT = 3000
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
