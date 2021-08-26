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
      connectionString : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', index({database}));

//sign in user
app.post('/signin', signIn({database}));

//register user
app.post('/register', register({database}));

//get a user infos
app.get('/profile/:id', userInfo({database}));

//detect face and update db
app.put('/image', (req, res) => { imageBoxes(req, res, database, process.env.API_KEY) });


app.listen(process.env.PORT, () => {
    console.log(`server is running at port ${process.env.PORT}`);
});