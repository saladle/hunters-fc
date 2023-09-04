var express = require("express");
const cors = require('cors');
var app = express();
app.use(cors());
const _AuthMiddleWare = require("./app/common/_AuthMiddleWare");

// Cấu hình body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//   Các router
require("./app/routes/account.route")(app);
app.use(_AuthMiddleWare.isAuth);
require("./app/routes/match.route")(app);
require("./app/routes/player.route")(app);
require("./app/routes/stadium.route")(app);

app.listen(3000, function () {
    console.log("Listening on port http://localhost:3000");
  });