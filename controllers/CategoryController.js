import { validationResult } from 'express-validator'
import CategoryModel from '../models/Category.js'


export const createCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const Name = req.body.Name;

        const doc = new CategoryModel({
            Name: Name,
        });


        const Category = await doc.save();

        res.json({
            Category
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать категорию.',
        })
    }
}

export const getCategory = async (req, res) => {
    try {
        const Category = await CategoryModel.findById(req.params.id);

        if (!Category) {
            return res.status(404).json({
                message: 'Категория не найдена.',
            });
        }

        res.json(Category);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось найти категорию.',
        });
    }
}

export const getCategories = async (req, res) => {
    try {
        const page = +(req.params.page);
        let itemsPerPage = 10;
        const Category = await CategoryModel.find();

res.json(Category)
    } catch (err) {
    console.log(err);
    res.status(500).json({
        message: 'Не удалось найти категории.',
    });
}
}

export const deleteCategory = async (req, res) => {
    try {

        const Category = await CategoryModel.findByIdAndDelete(req.params.id)

        res.json(Category);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось найти и удалить категорию.',
        });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const Category = await CategoryModel.findByIdAndUpdate(req.params.id, {
            Name: req.body.Name
        })
        res.json(Category);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Неудалось обновить категорию.',
        });
    };
}