const express = require('express') 
const app = express();
const fs = require('fs'); 
const multer = require('multer'); 
// const upload = multer({ dest: 'uploads/'});

app.use(express.json());   // middleware
app.use(express.urlencoded({ extended: true})); 

app.use(express.static('uploads'));
// app.use();

const storage = multer.diskStorage({
    destination: 'uploads/', // Set the destination folder for uploaded files
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Set the file name (use Date.now() to make it unique)
    }
  });
  
  const upload = multer({ storage });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


app.get('/script.js', (req,res) => {
    res.sendFile(__dirname + '/script.js');
})


app.get('/style.css', (req,res) => {
    res.sendFile(__dirname + '/style.css');
})



app.get('/load-data', (req, res) => {
    const data = readDataFromDatabase();
    res.status(200).send(data.toString());
})


app.post('/delete', (req,res) => {
    deleteDataFromDataBase(req.body.id, res);
})


app.post('/check', (req,res) => {
    markDataFromDataBase(req.body.id, res);
})


app.post('/task-list', upload.single('file'), (req,res) => { 

    const data = {
        ...JSON.parse(req.body.data),
        fileName: req.file.filename
    }
    appendDataIntoDatabase(data, res);
})


function markDataFromDataBase(id, res) {
    let data = JSON.parse(readDataFromDatabase());
    for(let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            data[i].isChecked = data[i].isChecked ? false : true;
            break;
        }
    }

    fs.writeFile('./database', JSON.stringify(data), function(err) {
        if(err) {
            res.status(500).send("Error");
            return;
        }
        res.status(200).send("success");
    })
}


function deleteDataFromDataBase(id, res) {
    let data = JSON.parse(readDataFromDatabase());
    let index = -1;
    for(let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            index = i; 
            break;
        }
    }

    if(index !== -1) {
        fs.unlinkSync(__dirname + '/uploads/' + data[index].fileName);
        data.splice(index,1);
    }
        

    fs.writeFile('./database', JSON.stringify(data), function(err) {
        if(err) {
            res.status(500).send("Error");
            return;
        }
        res.status(200).send("success");
    })

}


function readDataFromDatabase() {
    const data = fs.readFileSync('./database');
    return data;
}


function appendDataIntoDatabase(task, res) {
    let data  = readDataFromDatabase();
    if(data.length === 0)
        data = "[]";
    try {
        data = JSON.parse(data);
        data.push(task);
        fs.writeFile('./database', JSON.stringify(data), function(err) {
            if(err) {
                res.status(500).send("Error");
                return;
            }
            res.status(200).send("success");
        })
    }
    catch (err) {
        res.status(500).send("error");
        return;
    }
}


app.listen(3000, () => {
    console.log('server is running at port 3000');
})