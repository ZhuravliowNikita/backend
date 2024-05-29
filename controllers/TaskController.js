import { validationResult } from 'express-validator'
import TaskModel from '../models/Task.js'
import taskDevModel from '../models/TaskDev.js';
import taskStatusModel from '../models/TaskStatus.js';
import CategoryModel from '../models/Category.js'
import taskSkillModel from '../models/TaskSkill.js';

export const createTask = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }



        const Title = req.body.Title;
        const Deadline = req.body.Deadline;
        const Description = req.body.Description;
        const PricePerHour = req.body.PricePerHour;
        const Customer = req.userId;
        const Category = await CategoryModel.findById(req.body.Category);

        const openStatus = await taskStatusModel.findById("664f2871a5015f2646c74c1b")

        const doc = new TaskModel({
            Title: Title,
            Description: Description,
            pricePerHour: PricePerHour,
            Customer: Customer,
            Status: openStatus,
            Category,
            Deadline
        });

        let Task = await doc.save();
        if (req.body.Skills) {
            await taskSkillModel.deleteMany({ Task: Task })
            req.body.Skills.forEach(async (skill) => {
                const doc = new taskSkillModel({
                    Skill: skill,
                    Task,
                });
                await doc.save();
            })

        }
        Task = await TaskModel.findById(Task._id)
            .populate("Category")
            .populate("Customer")
            .populate("Status")
            .populate({ path: "Skills", populate: { path: "Skill" } })
            ;

        if (!Task) {
            return res.status(404).json({
                message: `Task not found.`,
            });
        }

        return res.json(Task);
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
        const Task = await TaskModel.findById(req.params.id).populate("Customer").populate("Category").populate("Developer").populate("Status").populate({path: "Devs", populate: {path: "Dev"}}).populate({ path: "Skills", populate: { path: "Skill" } });

        console.log(Task)
        
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
        let itemsPerPage = 10 * page;
        let Tasks
        if (req.body.Category) {
            Tasks = await TaskModel.find({ Category: req.body.Category })
                .limit(itemsPerPage)
                .populate('Status')
                .populate('Customer')
                .populate('Developer')
                .populate('Category')
                .populate({ path: "Skills", populate: { path: "Skill" } })
                ;
        }
        else {

            Tasks = await TaskModel.find()
                .limit(itemsPerPage)
                .populate('Status')
                .populate('Customer')
                .populate('Developer')
                .populate('Category')
                .populate({ path: "Skills", populate: { path: "Skill" } })
                ;
        }


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
        const pricePerHour = req.body.PricePerHour;
        const Deadline = req.body.Deadline;
        const Speed = req.body.Speed;
        const Quality = req.body.Quality;
        const Communication = req.body.Communication;
        const Developer = req.body.Developer;
        const Status = req.body.Status;
        const Category = await CategoryModel.findById(req.body.Category);

        if (req.body.Skills) {
            await taskSkillModel.deleteMany({ Task: req.params.id })
            
            req.body.Skills.forEach(async (skill) => {
                const doc = new taskSkillModel({
                    Skill: skill,
                    Task: req.params.id,
                });
                await doc.save();
            })

        }

        let Task = await TaskModel.findByIdAndUpdate(req.params.id, {
            Title,
            Description,
            pricePerHour,
            Speed,
            Quality,
            Communication,
            Developer,
            Status,
            Category,
            Deadline

        })

        
        Task = await TaskModel.findById(req.params.id)
            .populate("Category")
            .populate("Customer")
            .populate("Developer")
            .populate("Status")
            .populate({path: "Devs", populate: {path: "Dev"}})
            .populate({ path: "Skills", populate: { path: "Skill" } })
            ;

        if (!Task) {
            return res.status(404).json({
                message: `Task not found.`,
            });
        }

        return res.json(Task);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't update task.`,
        });
    };
}

export const assignDeveloper = async (req, res) => {
    try {
        console.log(req.body)
        const Developer = req.body.Developer;
        let Task = await TaskModel.findById(req.params.id)


        const existCheck = await taskDevModel.find({Task: Task, Dev: Developer})
        if(!existCheck){
            return res.status(400).json({
                message: `Developer hasn't apply yet`,
            })
        }
        
        Task = await TaskModel.findByIdAndUpdate(req.params.id, {
            Developer,
            Status: "664f288ea5015f2646c74c1e",
        })


        Task = await TaskModel.findById(req.params.id)
            .populate("Category")
            .populate("Developer")
            .populate("Customer")
            .populate("Status")
            .populate({path: "Devs", populate: {path: "Dev"}})
            .populate({ path: "Skills", populate: { path: "Skill" } })
            ;

        if (!Task) {
            return res.status(404).json({
                message: `Task not found.`,
            });
        }

        return res.json(Task);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't update task.`,
        });
    };
}