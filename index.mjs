import express from 'express';
import crypto from 'crypto';
import fs from 'fs';
//import {key, iv} from './config.mjs';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

// config for heroku
const key = process.env.ENV_KEY
const iv = process.env.ENV_IV

function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypt = cipher.update(text, 'utf-8', 'hex');
    encrypt += cipher.final('hex');
    return encrypt;
}

app.post('/login', async(req, res) => {
    //get data from form, body, or url
    const user = req.query.username;
    const pass = req.query.password;
    try {
        const data = await fs.promises.readFile('./static/login.txt', 'utf-8');
        const lines = data.split('\n');
            
        // search if credentials exist
        let valid = false;
        for (const line of lines) {
            if (line == encrypt(user + pass)) {
                valid = true;
                break;
            }
        }
        if (valid) {
            console.log('credentials valid');
            res.status(201).send('valid');
        } else {
            console.log('credentials invalid');
            res.status(201).send('invalid');
        }

    } catch (err) {
        // handle error with openning file
        console.log(`Error openning file: ${err}`);
        res.status(500).send('Server side error, please retry');
    }
});

app.post('/signup', async(req, res) => {
    const user = req.query.username;
    const pass = req.query.password;

    //check for duplicate
    let exist = false;
    try {
        const data = await fs.promises.readFile('./static/login.txt', 'utf-8');
        const lines = data.split('\n');
        // search if credentials exist
        for (const line of lines) {
            if (line == encrypt(user + pass)) {
                res.status(201).send('credentials already exist');
                exist = true;
                break;
            }
        }
    } catch (err) {
        // handle error with openning file
        console.log(`Error openning file: ${err}`);
        res.status(500).send('Server side error, please retry');
    }

    //if credentials dont already exist, write to end of file
    if (!exist) {
        try {
            await fs.promises.appendFile('./static/login.txt', encrypt(user + pass) + '\n');
            console.log('new credentials added');
            res.status(201).send('success');
        } catch (err) {
            console.log(`Error with adding credetials to file: ${err}`);
            res.status(500).send('fail');
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});