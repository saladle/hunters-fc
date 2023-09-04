module.exports = function (router) {
    var stadiumController = require("../controllers/stadium.controller");
  
    router.get("/stadium", stadiumController.getList);

    // router.get("/match/today", matchController.getListToday);
  
    // router.get("/match/:id", matchController.getById);
  
    // router.post("/match", matchController.add);
  
    // router.put("/match/:id", matchController.update);

    // router.patch("/match/:id", matchController.updateLittle);
  
    // router.delete("/match/:id", matchController.remove);
  };
  