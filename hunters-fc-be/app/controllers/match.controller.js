var Match = require("../models/match.model");
var JWT = require("../common/_JWT");

exports.getList = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  Match.getAll(tokenInfo.data.id, function (data) {
    if (data) {
      data.forEach((element) => {
        element.attendMemberIds = JSON.parse(element.attendMemberIds);
        element.denyMemberIds = JSON.parse(element.denyMemberIds);
      });
    }
    res.send({ result: data });
  });
};

exports.getById = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  Match.getById(tokenInfo.data.id, req.params.id, function (data) {
    if (data) {
      data.forEach((element) => {
        element.attendMemberIds = JSON.parse(element.attendMemberIds);
        element.denyMemberIds = JSON.parse(element.denyMemberIds);
      });
    }
    res.send({ result: data });
  });
};

exports.add = async function (req, res) {
  var data = req.body;
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  data.createdBy = tokenInfo.data.id;
  data.attendMemberIds = JSON.stringify(data.attendMemberIds);
  data.denyMemberIds = JSON.stringify(data.denyMemberIds);
  // data.checkList = JSON.stringify(data.checkList);
  // if (data.startDate)
  //   data.startDate = getFormattedMySqlDateTime(data.startDate);

  // if (data.finishDate)
  //   data.finishDate = getFormattedMySqlDateTime(data.finishDate);
  Match.create(data, function (response) {
    response.attendMemberIds = JSON.parse(response.attendMemberIds);
    response.denyMemberIds = JSON.parse(response.denyMemberIds);
    res.send({ result: response });
  });
};

exports.updateLittle = function (req, res) {
  var data = req.body;
  if (data && data.attendMemberIds) {
    data.attendMemberIds = JSON.stringify(data.attendMemberIds);
  }
  if (data && data.denyMemberIds) {
    data.denyMemberIds = JSON.stringify(data.denyMemberIds);
  }
  Match.updateLittle(req.params.id, data, function (response) {
    if (response) {
      response[0].attendMemberIds = JSON.parse(response[0].attendMemberIds);
      response[0].denyMemberIds = JSON.parse(response[0].denyMemberIds);
    }
    res.send({ result: response });
  });
};

exports.voteMatch = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  let match;
  try {
    const data = await new Promise((resolve, reject) => {
      Match.getById(tokenInfo.data.id, req.params.id, function (data) {
        if (data) {
          data.forEach((element) => {
            element.attendMemberIds = JSON.parse(element.attendMemberIds);
            element.denyMemberIds = JSON.parse(element.denyMemberIds);
          });
        }
        resolve(data);
      });
    });
    match = data[0];
  } catch (error) {
    console.error(error);
  }
  var bodyData = req.body;
  if (bodyData.voteStatus == "yes") {
    if (!match.attendMemberIds.includes(tokenInfo.data.id)) {
      match.attendMemberIds.push(tokenInfo.data.id);
    }
    const deleteIndex = match.denyMemberIds.indexOf(tokenInfo.data.id, 0);
    match.denyMemberIds.splice(deleteIndex, 1);
  } else {
    if (!match.denyMemberIds.includes(tokenInfo.data.id)) {
      match.denyMemberIds.push(tokenInfo.data.id);
    }
    const deleteIndex = match.attendMemberIds.indexOf(tokenInfo.data.id, 0);
    match.attendMemberIds.splice(deleteIndex, 1);
  }
  let updatedData = {
    attendMemberIds: JSON.stringify(match.attendMemberIds),
    denyMemberIds: JSON.stringify(match.denyMemberIds),
  };
  Match.updateLittle(req.params.id, updatedData, function (response) {
    if (response) {
      response[0].attendMemberIds = JSON.parse(response[0].attendMemberIds);
      response[0].denyMemberIds = JSON.parse(response[0].denyMemberIds);
    }
    res.send({ result: response });
  });
};
