const fs = require('fs');
const https = require('https') 
const writableStream = fs.createWriteStream('./output.txt');

new Promise((resolve, reject) => {
    fs.readFile('./urls.txt',"utf8", function(err,data) {
        if(err) {
            reject(err);
            return;
        }
        resolve(data.split('\n'));
    })
})
  .then((urls) => {
    const Promises = [];
    for(const url of urls) {
        const p = new Promise((resolve,reject) => {
            https.get(url, res => {
                res.on('data', chunk => {
                    writableStream.write(chunk);
                })
            })
            resolve();
        })
        Promises.push(p);
    }
    return Promise.all(Promises);
  })
  .then((arr) => {
    console.log('done');
  })
  .catch(err => {
    console.log(err);
  })

// const writableStream = fs.createWriteStream('./output.txt');

// fs.readFile('./urls.txt',"utf8", function(err, data) {
//     const urls = data.split('\n');
//     for(const url of urls) {
//         https.get(url, res => {
//             // let body = "";
//             res.on('data', chunk => {
//                 // body += chunk;
//                 writableStream.write(chunk);
//             })
//             res.on('end', () => {
//                 console.log('done');
//             });
//         });

//     }
// })
