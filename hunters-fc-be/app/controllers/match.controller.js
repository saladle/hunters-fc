var Match = require("../models/match.model");
var JWT = require("../common/_JWT");

exports.getList = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  Match.getAll(tokenInfo.data.id, function (data) {
    if (data) {
      data.forEach((element) => {
        element.attendMemberObj = JSON.parse(element.attendMemberObj);
        element.denyMemberObj = JSON.parse(element.denyMemberObj);
      });
    }
    res.send({ result: data });
  });
};
