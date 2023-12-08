//import the exifr package/module
//(that we have installed using npm istall exifr)
import exifr from 'exifr';
import mysql from 'mysql2/promise';
//Import fs (file system) - a built in module in Node.js
import fs from 'fs';

// Give me a list of all files in a folder
let images = fs.readdirSync('images');

//Connectar till databasen
const db = await mysql.createConnection({
    // CHANGE TO 127.0.0.1 IF YOU WANT TO RUN LOCAL DB
    host: '161.97.144.27',
    port: "8092",
    user: 'root',
    password: 'guessagain92',
    database: 'grupp-db'
  });

// A small function for a query
async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}

// read all file names from the Music fodler
const files = await fs.readdirSync('images');

// loop through all music files and read metadata
for (let image of images) {

  // Get the metadata for the file
  let metadata = await exifr.parse('images/' + image);

  // INSERT TO DATABASE
  let result = await query(`
    INSERT INTO images (fileName, metadata)
    VALUES(?, ?)
  `, [image, metadata]);

  // Log the result of inserting in the database
  console.log(image, result);

}

// exit/stop the script when everything is imported
// so you don't have to press Ctrl+C
process.exit();