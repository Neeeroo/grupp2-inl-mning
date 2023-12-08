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

  // Function to be able to run querys in MySQL
  async function query(sql, listOfValues) {
    let result = await db.execute(sql, listOfValues);
    return result[0];
  }

//Loop through the images and extract the metadata
for (let image of images) {
    //Only for files ending with .jpg
    //slice(-4) get the last 4 letters from the image name
    if(image.slice(-4) == '.jpg') {

    console.log('IMAGE: ' + image);
    let metadata = await exifr.parse('images/' + image);
    console.log(metadata);
    let result = await query(`
    INSERT INTO images (fileName, metadata)
    VALUES(?, ?)
  `, [image, metadata]);
  console.log(result);
    }
}