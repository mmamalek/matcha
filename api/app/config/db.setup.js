const mysql = require('mysql');
const db = require('./db.config');


var con = mysql.createConnection({
  host: db.HOST,
  user: db.USER,
  password: db.PASSWORD,
  // database: db.DB
  socketPath: db.SOCKET,
  port: db.PORT
});

/*
con.connect is code for establishing a connection and looking for an error
*/
con.connect(function(err) {
  if (err) throw err;
  console.log("MySQL Database has Connected!\n")
  /*
  con.query is code for ensuring an SQL Statement can read or write to and from a
  MySql database. In the code below, sql is a placeholder for an instruction such
  as CREATE DATABASE mydb
  */
/*=======================================================================
||                         DROP DATABASE                               ||
========================================================================*/
var sql = "DROP SCHEMA IF EXISTS `matcha`";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Deleting Database 'matcha'");
});

/*=======================================================================
||                        CREATE DATABASE                               ||
========================================================================*/
  var sql = "CREATE DATABASE IF NOT EXISTS matcha";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Creating Database 'matcha'");
  });

/*=======================================================================
||                           USE DATABASE                               ||
========================================================================*/
var sql = "USE matcha";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("SELECTING FOR USE - 'matcha'");
});

/*=======================================================================
||                           FOREIGN KEY MANAGER                        ||
========================================================================*/
var sql = "SET FOREIGN_KEY_CHECKS = 0";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("FOREIGN KEY OFF");
});

/*=======================================================================
||                        CREATE 'USER' TABLE                           ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.users (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  gender VARCHAR(10) NULL,
  biography VARCHAR(255) NULL,
  sexual_preferences VARCHAR(10) NULL,
  profile_pic int(20) NULL,
  date_of_birth TIMESTAMP NULL,
  location int(20)   NULL,
  activated INT(1) DEFAULT 0 NOT NULL,
  completed INT(1) DEFAULT 0 NOT NULL,
  online INT(1) DEFAULT 0 NOT NULL,
  registered TIMESTAMP  DEFAULT current_timestamp NOT NULL,
  modified TIMESTAMP  DEFAULT current_timestamp NOT NULL,
  activated_date TIMESTAMP NULL,
  completed_date TIMESTAMP NULL,
  last_seen TIMESTAMP NULL,
  CONSTRAINT fk_users_profile_pic FOREIGN KEY (profile_pic) REFERENCES images(id),
  CONSTRAINT fk_users_location FOREIGN KEY (location) REFERENCES location(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'users'");
});

/*=======================================================================
||                   CREATE 'INTERESTS' TABLE                           ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.interests (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  hashtag VARCHAR(30)  NOT NULL,
  user_id INT(11) NOT NULL ,
  added TIMESTAMP NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_interests_user_id FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'interests'");
});



/*=======================================================================
||                   CREATE 'IMAGES' TABLE                             ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.images (
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(255) NOT NULL,
    path VARCHAR(255) NULL,
    user_id INT(11) NOT NULL,
    uploaded TIMESTAMP NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_images_user_id FOREIGN KEY(user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'images'");
});

/*=======================================================================
||                   CREATE 'ACTIVATION CODE' TABLE                    ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.activation_code (
    code_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(255) NOT NULL,
    profile_id INT(11) NOT NULL,
    generation_time TIMESTAMP NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_activation_codes_profile_id FOREIGN KEY (profile_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'activation_code'");
});

/*=======================================================================
||                   CREATE 'PROFILE LIKES' TABLE                      ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.profile_likes (
    id INT(11)  NOT NULL PRIMARY KEY AUTO_INCREMENT,
    profile_id int(11)  NOT NULL ,
    liker_id int(11)  NOT NULL ,
    liked TIMESTAMP NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_profile_likes_profile_id FOREIGN KEY (profile_id) REFERENCES users(id),
    CONSTRAINT fk_profile_likes_liker_id FOREIGN KEY (liker_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'profile_likes'");
});

/*=======================================================================
||                   CREATE 'PROFILE VISITS' TABLE                      ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.profile_visits (
    id INT(11)  NOT NULL PRIMARY KEY AUTO_INCREMENT,
    profile_id INT(11)  NOT NULL ,
    visitor_id INT(11)  NOT NULL ,
    visited TIMESTAMP  NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_profile_visits_profile_id FOREIGN KEY (profile_id) REFERENCES users(id),
    CONSTRAINT fk_profile_visits_visitor_id FOREIGN KEY (visitor_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`
/*
-- fame_rating
-- ---
-- user_id UUID PK FK - users.id
-- fame_rating NUMERIC DEFAULT=0
*/
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'profile_visits'");
});

/*=======================================================================
||                   CREATE 'LOCATION' TABLE                           ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.location (
    id int(20)  NOT NULL PRIMARY KEY AUTO_INCREMENT,
    address1 TEXT  NULL ,
    address2 TEXT  NULL ,
    city TEXT  NULL ,
    state TEXT  NULL ,
    code TEXT  NULL ,
    longitude NUMERIC  NULL ,
    latitude NUMERIC  NULL ,
    user_id INT(11)  NOT NULL ,
    time TIMESTAMP  NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_location_user_id FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'location'");
});

/*=======================================================================
||                   CREATE 'MATCHES' TABLE                             ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.matches (
    id INT(11)  NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user1_id INT(11)  NOT NULL ,
    user2_id INT(11)  NOT NULL,
    CONSTRAINT fk_matches_user1_id FOREIGN KEY (user1_id) REFERENCES users(id),
    CONSTRAINT fk_matches_user2_id FOREIGN KEY (user2_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'matches'");
});

/*=======================================================================
||                   CREATE 'MESSAGES' TABLE                           ||
========================================================================*/
var sql = `CREATE TABLE IF NOT EXISTS matcha.messages (
    id int(11)  NOT NULL PRIMARY KEY AUTO_INCREMENT,
    sender INT(11)  NOT NULL ,
    send_group INT(11) NOT NULL ,
    message TEXT NOT NULL,
    time TIMESTAMP  NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_massages_sender FOREIGN KEY (sender) REFERENCES users(id),
    CONSTRAINT fk_messages_group FOREIGN KEY (send_group) REFERENCES matches(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating Table 'messages'");
});

/*=======================================================================
||                   CREATE 'BLOCKED' TABLE                            ||
========================================================================*/

var sql = `CREATE TABLE IF NOT EXISTS matcha.blocked (
  id INT(11)  NOT NULL PRIMARY KEY AUTO_INCREMENT,
  blocker_id INT(11)  NOT NULL ,
  blocked_id INT(11)  NOT NULL,
  CONSTRAINT fk_blocker_id_users_id FOREIGN KEY (blocker_id) REFERENCES users(id),
  CONSTRAINT fk_blocked_id_users_id FOREIGN KEY (blocked_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

con.query(sql, function (err, result) {
if (err) throw err;
console.log("Creating Table 'blocked'");
});

/*=======================================================================
||                           FOREIGN KEY MANAGER                        ||
========================================================================*/
var sql = "SET FOREIGN_KEY_CHECKS = 1";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("FOREIGN KEY ON");
});

/*=======================================================================
||                        CLOSE DATABASE                               ||
=======================================================================*/
  //Close the connection!
  con.end(function(err) {
    if (err) {
      return console.log('error: ' + err.message);
    }
    console.log("Connection has been Closed\n\nRUN npm start or node server.js");
  })
});