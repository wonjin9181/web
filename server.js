require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
var cookieParser = require("cookie-parser")
// const mysql = require("mysql")
const db = require("./models")
const http = require('http');
const WebSocket = require('ws');
const server = http.createServer(app);
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


require('./routes/monsters-api')(app);
require('./routes/createUser-api')(app);
require('./routes/house-api')(app);
require('./routes/login-api')(app);
require('./routes/fight-api')(app)





const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


const syncOptions = { force: false };

db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});