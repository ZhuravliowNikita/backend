import express from 'express'
import mongoose from 'mongoose'
import { registerValidation } from './validations/auth.js'
import checkAuth from './utils/checkAuth.js'
import * as UserControler from './controllers/UserControler.js'
import * as ContactTypeControler from './controllers/ContactTypeControler.js'


mongoose
    .connect('mongodb+srv://admin:wwwwww@cluster0.4rtlfi8.mongodb.net/freelanceback?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB is OK'))
    .catch(() => {
        console.log('DB error', err)
    });


const app = express();

app.use(express.json());

app.post('/auth/login', UserControler.login);
app.post('/auth/register', registerValidation, UserControler.register);
app.get('/auth/me', checkAuth, UserControler.getMe);
app.get('/contact/contactType/:id', ContactTypeControler.getContactType);
app.post('/contact/contactType', ContactTypeControler.createContactType);
app.delete('/contact/contactType/:id', ContactTypeControler.deleteContactType);
app.patch('/contact/contactType/:id', ContactTypeControler.updateContactType);
app.get('/contact/contactTypes/:page', ContactTypeControler.getContactTypes);


app.listen(4444, (err) => {
    if (err) 
    {
        return console.log(err)
    }

    console.log('Server is OK');
});

