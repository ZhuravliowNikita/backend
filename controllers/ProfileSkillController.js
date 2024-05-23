import { validationResult } from 'express-validator'
import ProfileSkillModel from '../models/ProfileSkill.js';
import UserModel from '../models/User.js'
import ProfileModel from "../models/Profile.js"



export const createProfileSkill = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const user = await UserModel.findById(req.userId).populate("Profile");

        const Profile = user.Profile;
        const Skill = req.body.Skill;
        
       
        const doc = new ProfileSkillModel({
            Profile,
            Skill,
        });


        const ProfileSkill = await doc.save();

        res.json({
            Skill,
            Profile,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't create ProfileSkill.`,
        })
    }
}

export const getProfileSkill = async (req, res) => {
    try {
        const ProfileSkill = await ProfileSkillModel.findById(req.params.id);

        if (!ProfileSkill) {
            return res.status(404).json({
                message: 'ProfileSkill not found',
            });
        }

        res.json(ProfileSkill);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find ProfileSkill.`,
        });
    }
}

export const getProfileSkills = async (req, res) => {
    try {
        const page = +(req.params.page);
        let itemsPerPage = 10;
        const ProfileSkills = await ProfileSkillModel.find()
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        res.json(ProfileSkills)
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find ProfileSkills`,
        });
    }
}

export const deleteProfileSkill = async (req, res) => {
    try {

        const ProfileSkill = await ProfileSkillModel.findByIdAndDelete(req.params.id)

        res.json(ProfileSkill);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find and delete ProfileSkill.`,
        });
    }
}

export const updateProfileSkill = async (req, res) => {
    try {

        const Skill = req.body.Skill;
        const Profile = req.body.Profile;

        const ProfileSkill = await SkillModel.findByIdAndUpdate(req.params.id, {
            Skill,
            Profile,
        })
        res.json(ProfileSkill);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't update ProfileSkill.`,
        });
    };
}   