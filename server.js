import express from 'express';
import cors from 'cors';
import index from './views/index.js';
import signIn from './views/sign-in.js';
import register from './views/register.js';
import userInfo from './views/user-info.js';
import imageBoxes from './views/image-boxes.js';
import knex from 'knex';

const database = knex({
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

app.get('/', index({database}));

app.post('/signin', signIn({database}));

//register user
app.post('/register', register({database}));

//get a user infos
app.get('/profile/:id', userInfo({database}));

//detect face and update db
app.put('/image', imageBoxes({database}));


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