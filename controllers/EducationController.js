import { validationResult } from 'express-validator'
import EducationModel from '../models/Education.js';
import UserModel from '../models/User.js';



export const createEducation = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const Organisation = req.body.Organisation;
        const Profession = req.body.Profession;
        const Documents = req.body.Documents;
        const User = await UserModel.findById(req.userId).populate("Profile");
        
       
        const doc = new EducationtModel({
            Organisation,
            Profession,
            Documents,
            Profile: User.Profile,
        });


        const Education = await doc.save();

        res.json({
            Education,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't create Education.`,
        })
    }
}

export const getEducation = async (req, res) => {
    try {
        const Education = await EducationModel.findById(req.params.id);

        if (!Education) {
            return res.status(404).json({
                message: 'Education not found.',
            });
        }

        res.json(Education);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find Education.`,
        });
    }
}

export const getEducations = async (req, res) => {
    try {
        const page = +(req.params.page);
        let itemsPerPage = 10;
        const Educations = await EducationModel.find()
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        res.json(Educations)
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find Educations.`,
        });
    }
}

export const deleteEducation = async (req, res) => {
    try {

        const Education = await EducationModel.findByIdAndDelete(req.params.id)

        res.json(Education);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find and delete Education.`,
        });
    }
}

export const updateEducation = async (req, res) => {
    try {

        const Organisation = req.body.Organisation;
        const Profession = req.body.Profession;
        const Documents = req.body.Documents;
        
        const Education = await EducationModel.findByIdAndUpdate(req.params.id, {
            Organisation,
            Profession,
            Documents,
        })
        res.json(Education);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't update Education.`,
        });
    };
}   