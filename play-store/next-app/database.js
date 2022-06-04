// const sqlite3 = require("sqlite3").verbose();
// const fs = require('fs');

// const db = new sqlite3.Database("./storage.db", sqlite3.OPEN_READWRITE, (err) => {
//   if (err)
//     console.error(err.message);

//   console.log("Connection successfull");
// });

// const dataSql = fs.readFileSync('./migrations/clean.sql').toString();
// console.log(dataSql);

// const dataArr = dataSql.toString().split(";");
// console.log(dataArr);


// db.serialize(() => {
//   // db.run runs your SQL query against the DB
//   db.run("PRAGMA foreign_keys=OFF;");
//   db.run("BEGIN TRANSACTION;");
//   // Loop through the `dataArr` and db.run each query
//   dataArr.forEach(query => {
//     if (query) {
//       // Add the delimiter back to each query before you run them
//       // In my case the it was `);`
//       query += ";";
//       db.run(query, err => {
//         if (err) throw err;
//       });
//     }
//   });
//   db.run("COMMIT;");
//   db.run("SELECT * FROM roles;", (res, err) => {
//     console.log("result = ", res);
//     console.log("error = ", err);
//   });
// });

const sqlite = require('sqlite');
const sqlite3 = require("sqlite3");


async function setup() {
  const db = await sqlite.open({ filename: './storage.db', driver: sqlite3.Database });
  await db.migrate({ force: 'last' });

  const people = await db.all('SELECT * FROM person');
  console.log('ALL PEOPLE', JSON.stringify(people, null, 2));

  const vehicles = await db.all('SELECT * FROM vehicle');
  console.log('ALL VEHICLES', JSON.stringify(vehicles, null, 2));
}

setup();