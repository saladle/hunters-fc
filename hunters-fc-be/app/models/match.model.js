const db = require("../common/connect");

const Match = function (match) {
    this.id = match.id;
    this.name = match.name;
    this.description = match.description;
    this.stadiumId = match.stadiumId;
    this.status = match.status;
    this.attendMemberObj = match.attendMemberObj;
    this.denyMemberObj = match.denyMemberObj;
    this.time = match.time;
    this.priority = match.priority;
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

module.exports = Match;

