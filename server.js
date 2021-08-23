import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import index from './views/index.js';
import imageBoxes from './views/image-boxes.js';

const app = express();
app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id : '123',
            name : 'john',
            email : 'john@gmail.com',
            password : '1234',
            entries : 0,
            joined : new Date()
        },
        {
            id : '124',
            name : 'ali',
            email : 'ali@gmail.com',
            password : '1234',
            entries : 0,
            joined : new Date()
        }
    ]
};

app.get('/', index({database: database}));

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && 
       req.body.password === database.users[0].password ){
        res.json('success');
    }else{
        res.status(400).json('error logging in!');
    }
});

app.post('/register', (req, res) => {
    const { name, email, password} = req.body;
    database.users.push({
        id : '123',
        name : name,
        email : email,
        password : password,
        entries : 0,
        joined : new Date()
    })
    res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    database.users.forEach( user => {
        if(user.id === id){
            res.json(user);
        }
    });
    res.status(404).json('no such user');
});

app.put('/image', imageBoxes({}));


app.listen(3000, () => {
    console.log('server is running at port 3000');
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/