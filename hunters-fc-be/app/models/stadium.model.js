const db = require("../common/connect");
const Stadium = function (stadium) {
  this.id = stadium.id;
  this.name = stadium.name;
  this.description = stadium.description;
  this.address = stadium.address;
  this.status = stadium.status;
  this.priority = stadium.priority; 
  this.isDeleted = stadium.isDeleted;
  this.createdAt = stadium.createdAt;
  this.createdBy = stadium.createdBy;
};

const tableName = "stadium";

Stadium.getAll = function (userId, result) {
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

module.exports = Stadium;
