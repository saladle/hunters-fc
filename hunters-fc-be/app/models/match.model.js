const db = require("../common/connect");

const Match = function (match) {
  this.id = match.id;
  this.name = match.name;
  this.description = match.description;
  this.stadiumId = match.stadiumId;
  this.status = match.status;
  this.attendMemberIds = match.attendMemberIds;
  this.denyMemberIds = match.denyMemberIds;
  this.time = match.time;
  this.priority = match.priority;
  this.type = match.type;
  this.isDeleted = match.isDeleted;
  this.createdAt = match.createdAt;
  this.createdBy = match.createdBy;
};

const tableName = "fc_hunters.match";

Match.getAll = function (userId, result) {
  db.query(
    `SELECT * FROM ${tableName} WHERE isDeleted = 0`,
    function (err, data) {
      if (err) {
        result(err);
      } else {
        result(data);
      }
    }
  );
};

Match.getById = function (userId, recordId, result) {
  db.query(
    `SELECT * FROM ${tableName} WHERE id = ${recordId}`,
    function (err, data) {
      if (err || data.length == 0) {
        result(null);
      } else {
        result(data);
      }
    }
  );
};

Match.create = function (payload, result) {
  db.query(`INSERT INTO ${tableName} SET ?`, payload, function (err, data) {
    if (err) {
      result(err);
    } else {
      result({ id: data.insertId, ...payload });
    }
  });
};

Match.updateLittle = function (recordId, payload, result) {
  let query = `UPDATE ${tableName} SET`;
  const fields = Object.keys(payload);
  const fieldValues = [];
  for (let i = 0; i < fields.length; i++) {
    if (fields[i] !== "id") {
      query += ` ${fields[i]} = ?,`;
      fieldValues.push(payload[fields[i]]);
    }
  }
  query = query.slice(0, -1);
  query += ` WHERE id = ${recordId}`;
  db.query(query, fieldValues, function (err, data) {
    if (err) {
      result(err);
    } else {
      db.query(
        `SELECT * FROM ${tableName} WHERE id = ${recordId}`,
        function (err, updatedData) {
          if (err) {
            result(err);
          } else {
            result(updatedData);
          }
        }
      );
    }
  });
};

module.exports = Match;
