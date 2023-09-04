var Stadium = require("../models/stadium.model");
var JWT = require("../common/_JWT");

exports.getList = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  Stadium.getAll(tokenInfo.data.id, function (data) {
    res.send({ result: data });
  });
};