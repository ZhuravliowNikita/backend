import { validationResult } from 'express-validator'
import ProjectModel from '../models/Projects.js';
import UserModel from '../models/User.js';



export const createProject = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const projectName = req.body.projectName;
        const Description = req.body.Description;
        const urlToProject = req.body.urlToProject;
        const Role = req.body.Role;
        const User = await UserModel.findById(req.userId).populate("Profile");
        
       
        const doc = new ProjectModel({
            projectName,
            Description,
            urlToProject,
            Role,
            Profile: User.Profile,
        });


        const Project = await doc.save();

        res.json({
            Project,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't create Project.`,
        })
    }
}

export const getProject = async (req, res) => {
    try {
        const Project = await ProjectModel.findById(req.params.id);

        if (!Project) {
            return res.status(404).json({
                message: 'Project not found.',
            });
        }

        res.json(Project);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find Project.`,
        });
    }
}

export const getProjects = async (req, res) => {
    try {
        const page = +(req.params.page);
        let itemsPerPage = 10;
        const Projects = await ProjectModel.find()
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        res.json(Projects)
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find Projects.`,
        });
    }
}

export const deleteProject = async (req, res) => {
    try {

        const Project = await ProjectModel.findByIdAndDelete(req.params.id)

        res.json(Project);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find and delete Education.`,
        });
    }
}

export const updateProject = async (req, res) => {
    try {

        const projectName = req.body.projectName;
        const Description = req.body.Description;
        const urlToProject = req.body.urlToProject;
        const Role = req.body.Role;
        
        const Education = await EducationModel.findByIdAndUpdate(req.params.id, {
            projectName,
            Description,
            urlToProject,
            Role,
        })
        res.json(Project);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't update Project.`,
        });
    };
}   