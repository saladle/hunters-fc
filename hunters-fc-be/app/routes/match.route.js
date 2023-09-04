module.exports = function (router) {
    var matchController = require("../controllers/match.controller");
  
    router.get("/match", matchController.getList);

    router.get("/match/:id", matchController.getById);
      
    router.post("/match", matchController.add);
  
    // router.put("/match/:id", matchController.update);

    router.patch("/match/:id", matchController.updateLittle);
    
    // router.delete("/match/:id", matchController.remove);

    router.post("/match/vote/:id", matchController.voteMatch);
  };
  