import { validationResult } from 'express-validator'
import taskDevModel from '../models/TaskDev.js';
import TaskModel from '../models/Task.js'
import UserModel from '../models/User.js'


export const createTaskDev = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const Dev = await UserModel.findById(req.userId);

        if(!Dev.isDeveloper){
            return res.status(403).json({
                message: `You'r not developer ;)`,
            })
        }

        const Task = await TaskModel.findById(req.body.Task).populate("Customer").populate("Status");
        
        if(""+Task.Status._id !== "664f2871a5015f2646c74c1b"){
            return res.status(403).json({
                message: `Application isn't open`,
            })
        }

        const existCheck = await taskDevModel.findOne({Dev, Task});
        console.log(existCheck)
        if(existCheck){
            return res.status(403).json({
                message: `Application has already applied`,
            })
        }

       
        const doc = new taskDevModel({
            Dev,
            Task,
        });


        const TaskDev = await doc.save();

        res.json({
            TaskDev
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't create Task Dev.`,
        })
    }
}

export const getTaskDev = async (req, res) => {
    try {
        const TaskDev = await taskDevModel.findById(req.params.id);

        if (!TaskDev) {
            return res.status(404).json({
                message: 'Task Dev not found',
            });
        }

        res.json(TaskDev);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find task skill.`,
        });
    }
}

export const getTaskDevs = async (req, res) => {
    try {
        const page = +(req.params.page);
        let itemsPerPage = 10;
        const TaskDevs = await taskDevModel.find()
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        res.json(TaskDevs)
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find task Devs`,
        });
    }
}

export const deleteTaskDev = async (req, res) => {
    try {

        const TaskDev = await taskDevModel.findByIdAndDelete(req.params.id)

        res.json(TaskDev);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find and delete task Dev.`,
        });
    }
}

export const updateTaskDev = async (req, res) => {
    try {

        const Dev = req.body.Dev;
        const Task = req.body.Task;

        const TaskDev = await taskDevModel.findByIdAndUpdate(req.params.id, {
            Dev,
            Task,
        })
        res.json(TaskDev);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't update task skill.`,
        });
    };
}   