const fs = require('fs');
const https = require('https') 

const url = "https://jsonplaceholder.typicode.com/posts";

const writableStream = fs.createWriteStream('./file.txt');


https.get(url, res => {
    let body = "";
    res.on('data', chunk => {
        body += chunk;
        writableStream.write(chunk);
    })
    res.on('end', () => {
        console.log('done');
    });

});