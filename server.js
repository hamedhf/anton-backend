import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import index from './views/index.js';
import register from './views/register.js';
import userInfo from './views/user-info.js';
import imageBoxes from './views/image-boxes.js';
import knex from 'knex';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'hamed',
      password : '1012',
      database : 'anton'
    }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', index({database: db}));

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && 
       req.body.password === database.users[0].password ){
        res.json('success');
    }else{
        res.status(400).json('error logging in!');
    }
});

//register user
app.post('/register', register({database: db}));

//get a user infos
app.get('/profile/:id', userInfo({database: db}));

//detect face and update db
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