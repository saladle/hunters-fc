var Player = require("../models/player.model");
var JWT = require("../common/_JWT");

exports.getList = function (req, res) {
  Player.getAll(function (data) {
    res.send({ result: data });
  });
};

exports.detail = function (req, res) {
  Player.getById(req.params.id, function (response) {
    res.send({ result: response });
  });
};

exports.add = function (req, res) {
  var data = req.body;
  Player.create(data, function (response) {
    res.send({ result: response });
  });
};

exports.remove = function (req, res) {
  var id = req.params.id;
  Player.remove(id, function (response) {
    res.send({ result: response });
  });
};

exports.update = function (req, res) {
  var data = req.body;
  Player.update(data, function (response) {
    res.send({ result: response });
  });
};

exports.login = function (req, res) {
  var data = req.body;
  Player.checkLogin(data, async function (response) {
    if (response) {
      const _token = await JWT.make(response);
      res.send({ data: response, token: _token, status: true });
    } else {
      res.send({ data: response, status: false });
    }
  });
};

exports.sessionInfo = async function (req, res) {
  const token = req.headers.authorization;
  const tokenInfo = await JWT.check(token);
  const response = {
    id: tokenInfo.data.id,
    name: tokenInfo.data.name,
    email: tokenInfo.data.email,
  }
  res.send({status: true, data: response});
}
