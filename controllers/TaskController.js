import { validationResult } from 'express-validator'
import TaskModel from '../models/Task.js'


export const createTask = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        
        
        const Title = req.body.Title;
        const Description = req.body.Description;
        const PricePerHour = req.body.PricePerHour;
        const Customer = req.body.Customer;
        

        const doc = new TaskModel({
            Title: Title,
            Description: Description,
            pricePerHour: PricePerHour,
            Customer: Customer,
        });


        const Task = await doc.save();

        res.json({
            Task
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't create new task.`,
        })
    }
}

export const getTask = async (req, res) => {
    try {
        const Task = await TaskModel.findById(req.params.id);

        if (!Task) {
            return res.status(404).json({
                message: `Task not found.`,
            });
        }

        res.json(Task);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find Task.`,
        });
    }
}

export const getTasks = async (req, res) => {
    try {
        const page = +(req.params.page);
        let itemsPerPage = 10;
        const Tasks = await TaskModel.find()
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        res.json(Tasks)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find tasks`,
        });
    }
}

export const deleteTask = async (req, res) => {
    try {

        const Task = await TaskModel.findByIdAndDelete(req.params.id)

        res.json(Task);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find and delete task.`,
        });
    }
}

export const updateTask = async (req, res) => {
    try {

        
        const Title = req.body.Title;
        const Description = req.body.Description;
        const pricePerHour = req.body.pricePerHour;
        const Customer = req.body.Customer;
        const Speed = req.body.Speed;
        const Quality = req.body.Quality;
        const Communication = req.body.Communication;
        const Developer = req.body.Developer;
        const Status = req.body.Status;

        const Task = await TaskModel.findByIdAndUpdate(req.params.id, {
            Title,
            Description,
            pricePerHour,
            Customer,
            Speed,
            Quality,
            Communication,
            Developer,
            Status,

        })
        res.json(Task);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't update task.`,
        });
    };
}