const db = require("../common/connect");
const Player = function (player) {
  this.id = player.id;
  this.code = player.code;
  this.lastName = player.lastName;
  this.firstName = player.firstName;
  this.dateOfBirth = player.dateOfBirth;
  this.shirtNumber = player.shirtNumber;
  this.username = player.username;
  this.password = player.password;
  this.status = player.status;
  this.role = role;
  this.coin = coin;
  this.avatarUrl = avatarUrl;
  this.isDeleted = player.isDeleted;
  this.createdAt = player.createdAt;
  this.createdBy = player.createdBy;
};

const tableName = "player";

Player.getAll = function (userId, result) {
  db.query(
    `SELECT id, code, lastName, firstName, dateOfBirth, shirtNumber, username, status, role, coin, avatarUrl FROM ${tableName} WHERE isDeleted = 0`,
    function (err, data) {
      if (err) {
        result(err);
      } else {
        result(data);
      }
    }
  );
};

Player.getById = function (userId, recordId, result) {
  db.query(
    `select * from ${tableName} where id = ${recordId}`,
    function (err, data) {
      if (err || data.length == 0) {
        result(null);
      } else {
        result(data);
      }
    }
  );
};

Player.create = function (payload, result) {
  db.query(`insert into ${tableName} set ?`, payload, function (err, data) {
    if (err) {
      result(err);
    } else {
      result({ id: data.insertId, ...payload });
    }
  });
};

Player.update = function (u, result) {
  db.query(
    `update user set name = ?, image = ?, author_id = ? where id = ${u.id}`,
    [u.name, u.image, u.author_id],
    function (err, user) {
      if (err) {
        result(null);
      } else result(u);
    }
  );
};

Player.remove = function (id, result) {
  db.query(`delete from ${tableName} where id = ${id}`, function (err, data) {
    if (err) {
      result(null);
    } else result(`Xóa ${tableName} co id: " + id + " thành công`);
  });
};

Player.checkLogin = function (data, result) {
    const queryString = `SELECT id, code, lastName, firstName, dateOfBirth, shirtNumber, username, password, status, role, coin, avatarUrl FROM ${tableName} WHERE username = ? and password = ?`;
  db.query(
    queryString,
    [data.username, data.password],
    function (err, player) {
      if (err || player.length == 0) {
        console.error(err);
        result(null);
      } else result(player[0]);
    }
  );
};

module.exports = Player;
