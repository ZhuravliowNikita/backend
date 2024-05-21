import { validationResult } from 'express-validator'
import profileModel from '../models/Profile.js';



export const createProfile = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const FullName = req.body.FullName;
        const Birthday = req.body.Birthday;
        const pricePerHour = req.body.PricePerHour;

        const doc = new profileModel({
            FullName: FullName,
            Birthday: Birthday,
            pricePerHour: pricePerHour
        });


        const Profile = await doc.save();

        res.json({
            Profile
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't create profile.`,
        })
    }
}

export const getProfile = async (req, res) => {
    try {
        const Profile = await profileModel.findById(req.params.id);

        if (!Profile) {
            return res.status(404).json({
                message: 'Profile is not found.',
            });
        }

        res.json(Profile);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find profile.`,
        });
    }
}

export const getProfiles = async (req, res) => {
    try {
        const page = +(req.params.page);
        let itemsPerPage = 10;
        const Profiles = await profileModel.find()
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        res.json(Profiles)
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find profiles`,
        });
    }
}

export const deleteProfile = async (req, res) => {
    try {

        const Profile = await profileModel.findByIdAndDelete(req.params.id)

        res.json(Profile);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find and delete profile`,
        });
    }
}

export const updateProfile = async (req, res) => {
    try {

        const FullName = req.body.FullName;
        const Birthday = req.body.Birthday;
        const pricePerHour = req.body.PricePerHour;
        const Speed = req.body.Speed;
        const Quality = req.body.Quality;
        const Communication = req.body.Communication;

        const Profile = await profileModel.findByIdAndUpdate(req.params.id, {
            FullName: FullName,
            Birthday: Birthday,
            pricePerHour: pricePerHour,
            Speed: Speed,
            Quality: Quality,
            Communication: Communication,
        })
        res.json(Profile);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't update profile.`,
        });
    };
}