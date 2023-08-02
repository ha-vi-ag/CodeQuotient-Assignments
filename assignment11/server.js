const express = require('express'); 
const session = require('express-session');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.set('view engine', 'ejs');

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

    res.render('home', { username: req.session.username });
})


app.get('/login', (req, res) => {
    res.render('login', {error: null}); 
});


app.get('/logout', (req, res) => {
    req.session.isLoggedIn = false;
    res.render('login', {error: null}); 
}) 

app.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    let data = fs.readFileSync('./database.txt', 'utf-8');
    data = JSON.parse(data);

    for(const user of data) {
        if(user.username === username && user.password === password) {
            req.session.isLoggedIn = true; 
            req.session.username = username;
            res.redirect('/');
            return;
        }
    }

    res.render('login', {error: "invalid username or password"});
})

app.get('/signup', (req, res) => {
    res.render('signup', { error: null});
})

app.get('/users', (req, res) => {
    if(!req.session.isLoggedIn) {
        res.redirect('/login');
        return;
    }
    const userdata = readDataBase();
    res.render('users', { userdata }); 
})

app.get('/about', (req, res) => {
    if(!req.session.isLoggedIn) {
        res.redirect('/login');
        return;
    }
    const userdata = readDataBase();
    res.render('about'); 
})



function readDataBase() {
    const data = JSON.parse(fs.readFileSync('./database.txt', 'utf-8')); 
    const res = []; 
    for(const user of data) {
        res.push({username: user.username, email: user.email});
    }
    return res;
}

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
            res.render('signup', { error: "User name already exists"});
            return;
        }
        if(user.email === email) {
            res.render('signup', { error: 'Email already exists'});
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