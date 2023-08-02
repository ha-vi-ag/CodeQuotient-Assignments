const express = require('express'); 
const session = require('express-session');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "heyhello",
    resave: false,
    saveUninitialized: true
}))

app.get('/', (req, res) => {

    if(!req.session.isLoggedIn) {
        res.redirect('/login');
        return;
    }

    res.sendFile(__dirname + '/home.html');
})


app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});


app.get('/logout', (req, res) => {
    req.session.isLoggedIn = false;
    res.redirect('/login');
}) 

app.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    let data = fs.readFileSync('./database.txt', 'utf-8');
    data = JSON.parse(data);

    for(const user of data) {
        if(user.username === username && user.password === password) {
            req.session.isLoggedIn = true;
            res.redirect('/');
            return;
        }
    }

    res.status(401).send('wrong username or password');
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
})


app.post('/signup', (req, res) => {
    
    storeIntoDatabase(req,res);
})


function storeIntoDatabase(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    let data = fs.readFileSync('./database.txt','utf-8'); 
    data = JSON.parse(data); 
    for(const user of data) {
        if (user.username === username) { 
            res.status(401).send("username already exists");
            return;
        }
        if(user.email === email) {
            res.status(401).send('this email already exists');
            return;
        }
    }

    data.push({username,email,password});
    fs.writeFileSync('./database.txt', JSON.stringify(data));
    res.redirect('/login');
}


app.listen(3000, () => {
    console.log('server is running at port 3000');
})