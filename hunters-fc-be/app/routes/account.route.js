module.exports = function (router) {
    var playerController = require("../controllers/player.controller");
  
    router.post("/account/login", playerController.login);
  };
  