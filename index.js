import express from 'express'
import mongoose from 'mongoose'
import cors from "cors";
import { registerValidation } from './validations/auth.js'
import checkAuth from './utils/checkAuth.js'
import checkAdmin from './utils/checkAdmin.js';
import checkTaskAuthor from './utils/checkTaskAuthor.js';
import checkProfileAuthor from "./utils/checkProfileAuthor.js";
import * as UserController from './controllers/UserController.js'
import * as ContactTypeController from './controllers/ContactTypeController.js'
import * as ProfileController from './controllers/ProfileController.js'
import * as ProfileSkillController from './controllers/ProfileSkillController.js'
import * as SkillController from './controllers/SkillController.js'
import * as TaskController from './controllers/TaskController.js'
import * as TaskSkillController from './controllers/TaskSkillController.js'
import * as TaskDevController from './controllers/TaskDevController.js'
import * as TaskStatusController from './controllers/TaskStatusController.js'
import * as ContactController from './controllers/ContactController.js'
import * as CategoryController from './controllers/CategoryController.js'
import * as EducationController from './controllers/EducationController.js'
import * as ProjectController from './controllers/ProjectController.js'

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
app.get('/developers/:page', UserController.getDevelopers);
app.get('/auth/me', checkAuth, UserController.getMe);

// Contact type routes
app.get('/contact/contactType/:id', ContactTypeController.getContactType);
app.get('/contact/contactTypes/', ContactTypeController.getContactTypes);
app.post('/contact/contactType', checkAuth, checkAdmin, ContactTypeController.createContactType);
app.delete('/contact/contactType/:id', checkAuth, checkAdmin, ContactTypeController.deleteContactType);
app.patch('/contact/contactType/:id', checkAuth, checkAdmin, ContactTypeController.updateContactType);

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
app.get('/skillsByCategory/:category', SkillController.getSkillsByCategory);
app.post('/skill/', checkAuth, checkAdmin, SkillController.createSkill);
app.delete('/skill/:id', checkAuth, checkAdmin, SkillController.deleteSkill);
app.patch('/skill/:id', checkAuth, checkAdmin, SkillController.updateSkill);

// Task routes
app.get('/task/:id', TaskController.getTask);
app.post('/tasks/:page', TaskController.getTasks);
app.get('/taskdevrecomendation/:id', TaskController.getRecomendationDevs);
app.post('/task/', checkAuth, TaskController.createTask);
app.delete('/task/:id', checkAuth, checkTaskAuthor, TaskController.deleteTask);
app.patch('/task/:id', checkAuth, checkTaskAuthor, TaskController.updateTask);
app.patch('/taskassigndev/:id', checkAuth, checkTaskAuthor, TaskController.assignDeveloper);
app.patch('/taskestimate/:id', checkAuth, checkTaskAuthor, TaskController.estimateDeveloper);

// Task skill routes
app.get('/taskskill/:id', TaskSkillController.getTaskSkill);
app.get('/taskskills/:page', TaskSkillController.getTaskSkills);
app.post('/taskskill/', checkAuth, checkTaskAuthor, TaskSkillController.createTaskSkill);
app.delete('/taskskill/:id', checkAuth, checkTaskAuthor, TaskSkillController.deleteTaskSkill);
app.patch('/taskskill/:id', checkAuth, checkTaskAuthor, TaskSkillController.updateTaskSkill);

// Task dev routes
app.get('/taskdev/:id', TaskDevController.getTaskDev);
app.get('/taskdevs/:page', TaskDevController.getTaskDevs);
app.post('/taskdev/', checkAuth, TaskDevController.createTaskDev);
app.delete('/taskdev/:id', checkAuth, checkAdmin, TaskDevController.deleteTaskDev);
app.patch('/taskdev/:id', checkAuth, checkAdmin, TaskDevController.updateTaskDev);

// Task status routes
app.get('/taskstatus/:id', TaskStatusController.getTaskStatus);
app.get('/taskstatuses/:page', TaskStatusController.getTaskStatuses);
app.post('/taskstatus/', checkAuth, checkAdmin, TaskStatusController.createTaskStatus);
app.delete('/taskstatus/:id', checkAuth, checkAdmin, TaskStatusController.deleteTaskStatus);
app.patch('/taskstatus/:id', checkAuth, checkAdmin, TaskStatusController.updateTaskStatus);

// Contact routes
app.get('/contact/:id', ContactController.getContact);
app.post('/contacts/', ContactController.getContacts);
app.post('/contact/', checkAuth, ContactController.createContact);
app.delete('/contact/:id', checkAuth, checkProfileAuthor, ContactController.deleteContact);
app.patch('/contact/:id', checkAuth, checkProfileAuthor, ContactController.updateContact);

// Category routes
app.get('/category/:id', CategoryController.getCategory);
app.get('/categories/', CategoryController.getCategories);
app.post('/category/', checkAuth, checkAdmin, CategoryController.createCategory);
app.delete('/category/:id', checkAuth, checkAdmin, CategoryController.deleteCategory);
app.patch('/category/:id', checkAuth, checkAdmin, CategoryController.updateCategory);

// Education routes 
app.get('/education/:id', EducationController.getEducation);
app.get('/education/:page', EducationController.getEducations);
app.post('/education', checkAuth, checkProfileAuthor, EducationController.createEducation);
app.delete('/education/:id', checkAuth, checkProfileAuthor, EducationController.deleteEducation);
app.patch('/education/:id', checkAuth, checkProfileAuthor, EducationController.updateEducation);

// Project routes
app.get('/project/:id', ProjectController.getProject);
app.get('/project/:page', ProjectController.getProjects);
app.post('/project', checkAuth, checkProfileAuthor, ProjectController.createProject);
app.delete('/project/:id', checkAuth, checkProfileAuthor, ProjectController.deleteProject);
app.patch('/project/:id', checkAuth, checkProfileAuthor, ProjectController.updateProject);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server is OK');
});

