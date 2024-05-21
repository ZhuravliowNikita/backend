import express from 'express'
import mongoose from 'mongoose'
import cors from "cors";
import { registerValidation } from './validations/auth.js'
import checkAuth from './utils/checkAuth.js'
import checkAdmin from './utils/checkAdmin.js';
import * as UserController from './controllers/UserController.js'
import * as ContactTypeController from './controllers/ContactTypeController.js'
import * as ProfileController from './controllers/ProfileController.js'
import * as ProfileSkillController from './controllers/ProfileSkillController.js'
import * as SkillController from './controllers/SkillController.js'
import * as TaskController from './controllers/TaskController.js'
import * as TaskSkillController from './controllers/TaskSkillController.js'
import * as TaskStatusController from './controllers/TaskStatusController.js'
import * as ContactController from './controllers/ContactController.js'
import * as CategoryController from './controllers/CategoryController.js'

mongoose
    .connect('mongodb+srv://admin:wwwwww@cluster0.4rtlfi8.mongodb.net/freelanceback?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB is OK'))
    .catch(() => {
        console.log('DB error', err)
    });

const app = express();

app.use(cors());
app.use(express.json());

// User routes
app.post('/auth/login', UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

// Contact type routes
app.get('/contact/contactType/:id', ContactTypeController.getContactType);
app.get('/contact/contactTypes/:page', ContactTypeController.getContactTypes);
app.post('/contact/contactType', checkAuth, ContactTypeController.createContactType);
app.delete('/contact/contactType/:id', checkAuth, ContactTypeController.deleteContactType);
app.patch('/contact/contactType/:id', checkAuth, ContactTypeController.updateContactType);

// Profile routes
app.get('/profile/:id', ProfileController.getProfile);
app.get('/profiles/:page', ProfileController.getProfiles);
app.post('/profile/', checkAuth, ProfileController.createProfile);
app.delete('/profile/:id', checkAuth, ProfileController.deleteProfile);
app.patch('/profile/:id', checkAuth, ProfileController.updateProfile);

// Profile skill routes
app.get('/profileSkill/:id', ProfileSkillController.getProfileSkill);
app.get('profileSkills/:page', ProfileSkillController.getProfileSkills);
app.post('/profileSkill/', checkAuth, ProfileSkillController.createProfileSkill);
app.delete('/profileSkill/:id', checkAuth, ProfileSkillController.deleteProfileSkill);
app.patch('/profileSkill/:id', checkAuth, ProfileSkillController.updateProfileSkill);

// Skill routes
app.get('/skill/:id', SkillController.getSkill);
app.get('/skills/:page', SkillController.getSkills);
app.post('/skill/', checkAuth, checkAdmin, checkAuth, SkillController.createSkill);
app.delete('/skill/:id', checkAuth, checkAdmin, checkAuth, SkillController.deleteSkill);
app.patch('/skill/:id', checkAuth, checkAdmin, checkAuth, SkillController.updateSkill);

// Task routes
app.get('/task/:id', TaskController.getTask);
app.get('/tasks/:page', TaskController.getTasks);
app.post('/task/', checkAuth, TaskController.createTask);
app.delete('/task/:id', checkAuth, TaskController.deleteTask);
app.patch('/task/:id', checkAuth, TaskController.updateTask);

// Task skill routes
app.get('/taskskill/:id', TaskSkillController.getTaskSkill);
app.get('/taskskills/:page', TaskSkillController.getTaskSkills);
app.post('/taskskill/', checkAuth, TaskSkillController.createTaskSkill);
app.delete('/taskskill/:id', checkAuth, TaskSkillController.deleteTaskSkill);
app.patch('/taskskill/:id', checkAuth, TaskSkillController.updateTaskSkill);

// Task status routes
app.get('/taskstatus/:id', TaskStatusController.getTaskStatus);
app.get('/taskstatuses/:page', TaskStatusController.getTaskStatuses);
app.post('/taskstatus/', checkAuth, TaskStatusController.createTaskStatus);
app.delete('/taskstatus/:id', checkAuth, TaskStatusController.deleteTaskStatus);
app.patch('/taskstatus/:id', checkAuth, TaskStatusController.updateTaskStatus);

// Contact routes
app.get('/contact/:id', ContactController.getContact);
app.get('/contacts/:page', ContactController.getContacts);
app.post('/contact/', ContactController.createContact);
app.delete('/contact/:id', ContactController.deleteContact);
app.patch('/contact/:id', ContactController.updateContact);

// Category routes
app.get('/category/:id', CategoryController.getCategory);
app.get('/categories/', CategoryController.getCategories);
app.post('/category/', checkAuth, checkAdmin, CategoryController.createCategory);
app.delete('/category/:id', checkAuth, checkAdmin, CategoryController.deleteCategory);
app.patch('/category/:id', checkAuth, checkAdmin, CategoryController.updateCategory);


app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server is OK');
});

