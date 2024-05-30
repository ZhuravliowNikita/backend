import { validationResult } from 'express-validator'
import TaskModel from '../models/Task.js'
import taskDevModel from '../models/TaskDev.js';
import taskStatusModel from '../models/TaskStatus.js';
import CategoryModel from '../models/Category.js'
import taskSkillModel from '../models/TaskSkill.js';
import ProfileModel from '../models/Profile.js'
import UserModel from '../models/User.js'

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
        const Task = await TaskModel.findById(req.params.id).populate("Customer").populate("Category").populate("Developer").populate("Status").populate({ path: "Devs", populate: { path: "Dev" } }).populate({ path: "Skills", populate: { path: "Skill" } });

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

export const getRecomendationDevs = async (req, res) => {
    try {
        const data = {}
        
        const k = Math.round(Tasks.length / 2);
        
        const Task = await TaskModel.findById(req.params.id);
        const taskTime = (Task.Deadline - Task.updatedAt) / 1000 / 60 / 60 / 24

        const Tasks = await TaskModel.find({ Status: "664f2896a5015f2646c74c21", Category: Task.Category})
        .populate('Status')
        .populate('Developer')
        .populate('Category')
        ;
        
        Tasks.forEach(task => {
            data[task._id] = {
                Developer: task.Developer,
                price: task.pricePerHour,
                Deadline: task.Deadline,
                updatedAt: task.updatedAt,
                rate: (task.Quality + task.Speed + task.Communication) / 3,
                time: (task.Deadline - task.updatedAt) / 1000 / 60 / 60 / 24,
            }
        })

        let temp = Object.values(data).map(task => {
            task.distance = Math.abs(task.price - Task.pricePerHour) + Math.abs(task.time - taskTime)
            return task
        })
        temp.sort(function (a, b) {
            return a.distance - b.distance;
        });
        temp = temp.slice(0, k);
        let newData = {}
        temp.forEach(task => {
            if (newData[task.Developer._id]) {
                newData[task.Developer._id] = {
                    rate: newData[task.Developer._id].rate + task.rate,
                    i: 1 + newData[task.Developer._id].i
                }
            }
            else {
                newData[task.Developer._id] = {
                    rate: task.rate,
                    i: 1,
                }
            }
        })
        
        for (const [key, value] of Object.entries(newData)) {
            newData[key]["averageRate"] =  newData[key].rate / newData[key].i 
            newData[key]["_id"] =  key
          }
        newData = Object.values(newData).sort(function (a, b) {
            return b.averageRate - a.averageRate;
        });
        
        const devRecs = [];

        for (let i = 0; i< newData.length; i++){
            const Dev = await UserModel.findById(newData[i]._id);
            devRecs.push(Dev)
        }
        

        res.json(devRecs)
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
            .populate({ path: "Devs", populate: { path: "Dev" } })
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


        const existCheck = await taskDevModel.find({ Task: Task, Dev: Developer })
        if (!existCheck) {
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
            .populate({ path: "Devs", populate: { path: "Dev" } })
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

export const estimateDeveloper = async (req, res) => {
    try {

        const Speed = req.body.Speed;
        const Quality = req.body.Quality;
        const Communication = req.body.Communication;
        let Task = await TaskModel.findById(req.params.id)


        Task = await TaskModel.findByIdAndUpdate(req.params.id, {
            Speed,
            Quality,
            Communication,
            Status: "664f2896a5015f2646c74c21",
        })


        Task = await TaskModel.findById(req.params.id)
            .populate("Category")
            .populate("Developer")
            .populate("Customer")
            .populate("Status")
            .populate({ path: "Devs", populate: { path: "Dev" } })
            .populate({ path: "Skills", populate: { path: "Skill" } })
            ;

        if (!Task) {
            return res.status(404).json({
                message: `Task not found.`,
            });
        }


        const finishedTasks = await TaskModel.find({ Developer: Task.Developer, Status: "664f2896a5015f2646c74c21" });
        const GloablSpeed = finishedTasks.reduce((accumulator, task) => {
            return (+accumulator + task.Speed);
        }, 0) / finishedTasks.length
        const GloablQuality = finishedTasks.reduce((accumulator, task) => {
            return (+accumulator + task.Quality);
        }, 0) / finishedTasks.length
        const GloablCommunication = finishedTasks.reduce((accumulator, task) => {
            return (+accumulator + task.Communication);
        }, 0) / finishedTasks.length



        const Dev = await UserModel.findById(Task.Developer._id).populate("Profile")
        Dev.Profile.Speed = GloablSpeed;
        Dev.Profile.Quality = GloablQuality;
        Dev.Profile.Communication = GloablCommunication;
        await Dev.save()

        console.log(Dev);

        return res.json(Task);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't update task.`,
        });
    };
}