import { validationResult } from 'express-validator'
import SkillModel from '../models/Skill.js';




export const createSkill = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const skillName = req.body.skillName;
        
       
        const doc = new SkillModel({
            skillName,
        });


        const Skill = await doc.save();

        res.json({
            Skill
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't create Skill.`,
        })
    }
}

export const getSkill = async (req, res) => {
    try {
        const Skill = await SkillModel.findById(req.params.id);

        if (!Skill) {
            return res.status(404).json({
                message: 'Skill not found',
            });
        }

        res.json(Skill);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find Skill.`,
        });
    }
}

export const getSkills = async (req, res) => {
    try {
        const page = +(req.params.page);
        let itemsPerPage = 10;
        const Skills = await SkillModel.find()
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        res.json(Skills)
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find Skills`,
        });
    }
}

export const deleteSkill = async (req, res) => {
    try {

        const Skill = await SkillModel.findByIdAndDelete(req.params.id)

        res.json(Skill);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find and delete Skill.`,
        });
    }
}

export const updateSkill = async (req, res) => {
    try {

        const skillName = req.body.skillName;

        const Skill = await SkillModel.findByIdAndUpdate(req.params.id, {
            skillName,
        })
        res.json(Skill);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't update Skill.`,
        });
    };
}   