const PORT = 3001;
const express = require('express');
const bcrypt = require('bcrypt')
const cors = require('cors')
const app = express();
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const palette = require('./controllers/palette')
require('dotenv').config();

const db = knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    port : 5432,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
    }
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json(db.users)
})

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) } )

app.get('/palette/:id', (req, res) => { palette.getPalettes(req, res, db) })

app.post('/palette', (req, res) => { palette.addPalette(req, res, db) })

app.post('/imageurl', (req, res) => { palette.handleApi(req, res) })

app.listen(PORT, () => {
    console.log('Server running on PORT', PORT)
});

