import { validationResult } from 'express-validator'
import taskStatusModel from '../models/TaskStatus.js';




export const createTaskStatus = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const StatusName = req.body.StatusName;
       
        const doc = new taskStatusModel({
            StatusName,
        });


        const TaskStatus = await doc.save();

        res.json({
            TaskStatus
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't create Task status.`,
        })
    }
}

export const getTaskStatus = async (req, res) => {
    try {
        const TaskStatus = await taskStatusModel.findById(req.params.id);

        if (!TaskStatus) {
            return res.status(404).json({
                message: 'Task status not found',
            });
        }

        res.json(TaskStatus);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find task status.`,
        });
    }
}

export const getTaskStatuses = async (req, res) => {
    try {
        const page = +(req.params.page);
        let itemsPerPage = 10;
        const TaskStatuses = await taskStatusModel.find()
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        res.json(TaskStatuses)
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find task statuses`,
        });
    }
}

export const deleteTaskStatus = async (req, res) => {
    try {

        const TaskStatus = await taskStatusModel.findByIdAndDelete(req.params.id)

        res.json(TaskStatus);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find and delete task status.`,
        });
    }
}

export const updateTaskStatus = async (req, res) => {
    try {

        const statusName = req.body.statusName;

        const TaskStatus = await taskStatusModel.findByIdAndUpdate(req.params.id, {
            statusName,
        })
        res.json(TaskStatus);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't update task status.`,
        });
    };
}   