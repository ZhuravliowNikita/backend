import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import UserModel from '../models/User.js'
import ProfileModel from "../models/Profile.js"



export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        

        const profileDoc = new ProfileModel({
            Birthday: Date(req.body.Birthday),
            pricePerHour: req.body.pricePerHour
        })

        const doc = new UserModel({
            Email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
            isDeveloper: req.body.Developer,
            Profile: profileDoc
        });


        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id
        }, 'secret123', {
            expiresIn: '30d',
        },);


        const { passwordHash, ...userData } = user._doc


        res.json({
            ...userData, token
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Неудалось зарегестрироваться',
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ Email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(404).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign({
            _id: user._id
        }, 'secret123', {
            expiresIn: '30d',
        },);

        const { passwordHash, ...userData } = user._doc


        res.json({
            ...userData, token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Неудалось авторизоваться',
        })
    }

}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).populate("Profile");
        

        if(!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const { passwordHash, ...userData } = user._doc


        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Неудалось зарегестрироваться',
        });
    }
}