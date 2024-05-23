import { validationResult } from 'express-validator'
import taskSkillModel from '../models/TaskSkill.js';




export const createTaskSkill = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const Skill = req.body.Skill;
        const Task = req.body.Task;
       
        const doc = new taskSkillModel({
            Skill,
            Task,
        });


        const TaskSkill = await doc.save();

        res.json({
            TaskSkill
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't create Task skill.`,
        })
    }
}

export const getTaskSkill = async (req, res) => {
    try {
        const TaskSkill = await taskSkillModel.findById(req.params.id);

        if (!TaskSkill) {
            return res.status(404).json({
                message: 'Task skill not found',
            });
        }

        res.json(TaskSkill);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find task skill.`,
        });
    }
}

export const getTaskSkills = async (req, res) => {
    try {
        const page = +(req.params.page);
        let itemsPerPage = 10;
        const TaskSkills = await taskSkillModel.find()
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        res.json(TaskSkills)
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find task skills`,
        });
    }
}

export const deleteTaskSkill = async (req, res) => {
    try {

        const TaskSkill = await taskSkillModel.findByIdAndDelete(req.params.id)

        res.json(TaskSkill);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find and delete task skill.`,
        });
    }
}

export const updateTaskSkill = async (req, res) => {
    try {

        const Skill = req.body.Skill;
        const Task = req.body.Task;

        const TaskSkill = await taskSkillModel.findByIdAndUpdate(req.params.id, {
            Skill,
            Task,
        })
        res.json(TaskSkill);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't update task skill.`,
        });
    };
}   