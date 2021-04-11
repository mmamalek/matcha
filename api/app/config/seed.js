const mysql = require('mysql');
const db = require('./db.config');
const faker = require('faker');
const Seeder = require('mysql-db-seed').Seeder;
const host = require('../../server');

//console.log(host.localhost);
var con = mysql.createConnection({
  host: db.HOST,
  user: db.USER,
  password: db.PASSWORD,
  database: db.DB,
  socketPath: db.SOCKET,
  port: db.PORT
});
/**
 * !DEFAULT ACCOUNT
 */

var sql = `INSERT INTO matcha.users 
(username, email, firstname, lastname, password, biography, gender, sexual_preferences, activated, completed)
VALUES ('null', 'NULL1', 'NULL1', 'NULL1', '$2b$10$njVtFarckb2GcA/0Y2Ic5eVR7TzUwaG9rAJ4dRnq4FWgC3cy1XXFi', 'I am just a fake account', 'bisexual', 'both', 1, 1)
;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating default user");
});

/**
 * !DEFAULT IMAGE
 */
var sql = `INSERT INTO matcha.images (url, path, user_id, uploaded)
  VALUES('/static/default.png', './uploads/default.png', 1, NOW()
);`
//VALUES('http://${host.localhost}/static/default.png', './uploads/default.png', 1, NOW()

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating default image");
});

/**
 * ?LOCATION 1
 */
var sql = `INSERT INTO matcha.location (city, state, code, longitude, latitude, user_id)
  VALUES('Pretoria', 'Gauteng', '0083', 28, -26, 1
);`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating location 1");
});

/**
 * ?LOCATION 2
 */
var sql = `INSERT INTO matcha.location (city, state, code, longitude, latitude, user_id)
  VALUES('Johannesburg', 'Gauteng', '2000', 28, -25, 1
);`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating location 2");
});

/**
 * ?LOCATION 3
 */
var sql = `INSERT INTO matcha.location (city, state, code, longitude, latitude, user_id)
  VALUES('Germiston', 'Gauteng', '1983', 28, -25, 1
);`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating location 3");
});

/**
 * ?LOCATION 4
 */
var sql = `INSERT INTO matcha.location (city, state, code, longitude, latitude, user_id)
  VALUES('Others', 'Gauteng', '2000', 28, -28, 1
);`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Creating location 4");
});

/**
 * ? UPDATE USER
 */
var sql = `UPDATE matcha.users
SET location = 1, profile_pic = 1
WHERE id = 1;
;`

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Updating default user");
});


//Close the connection!
con.end(function(err) {
    if (err) {
        return console.log('error: ' + err.message);
    }
    console.log("Connection has been Closed\n\nBEGIN SEEDING");
})
;


//Generate new Seeder instance
const seed = new Seeder(
    10,
    db.HOST,
    db.USER,
    db.PASSWORD,
    db.DB,
);

(async () => {
    await seed.seed(
        500,
        "users",
        {
            username: faker.internet.userName,
            email: faker.internet.email,
            firstname: faker.name.firstName,
            lastname: faker.name.lastName,
            password: faker.internet.password,
            biography: "I am just a fake account",
            //profile_pic: 1,
            //location: 1,//faker.random.number(min:1, max: 4),
            gender: faker.random.arrayElement(["bisexual", "male", "female"]),
            sexual_preferences: "both",
            activated: 1,
            completed: 1
        }
    )
    seed.exit();
    process.exit();
})();




// function interests(){
//     const interestsPool = ["#singing", "#bowling", "#playing", "#dancing", "#art", "#drawing", "#travelling", "#fun", "#cooking", "#eating"];
//     const maxNumberOfInterests = 10;

//     let numberOfInterests = Math.floor(Math.random() * 100000) % maxNumberOfInterests + 1;
//     let interests = [];

//     console.log(numberOfInterests);

//     while (interests.length < numberOfInterests) {
//         interestIndex = Math.floor(Math.random() * 100000) % interestsPool.length;

//         if (interests.indexOf(interestsPool[interestIndex]) == -1)
//             interests.push(interestsPool[interestIndex]);
        
//     }
    
//     return interests;
// }

// console.log(interests());
