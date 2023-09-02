CREATE TABLE match (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(256) NOT NULL,
  description text DEFAULT NULL,
  stadiumId int DEFAULT NULL,
  status tinyint DEFAULT 0,
  attendMemberObj json DEFAULT NULL,
  denyMemberObj JSON DEFAULT NULL,
  time timestamp NULL DEFAULT NULL,
  priority tinyint DEFAULT 0,
  isDeleted tinyint NOT NULL DEFAULT 0,
  createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  createdBy int NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 12,
AVG_ROW_LENGTH = 2048,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;