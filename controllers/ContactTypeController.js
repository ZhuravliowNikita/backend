import { validationResult } from 'express-validator'
import contactTypeModel from '../models/ContactType.js'


export const createContactType = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const Name = req.body.Name;

        const doc = new contactTypeModel({
            Name: Name,
        });


        const contactType = await doc.save();

        res.json({
            contactType
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать новый тип контакта',
        })
    }
}

export const getContactType = async (req, res) => {
    try {
        const contactType = await contactTypeModel.findById(req.params.id);

        if (!contactType) {
            return res.status(404).json({
                message: 'Контакт не найден.',
            });
        }

        res.json(contactType);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось найти контакт.',
        });
    }
}

export const getContactTypes = async (req, res) => {
    try {
        const page = +(req.params.page);
        let itemsPerPage = 10;
        const contactTypes = await contactTypeModel.find()
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

res.json(contactTypes)
    } catch (err) {
    console.log(err);
    res.status(500).json({
        message: 'Не удалось найти контакты.',
    });
}
}

export const deleteContactType = async (req, res) => {
    try {

        const contactType = await contactTypeModel.findByIdAndDelete(req.params.id)

        res.json(contactType);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Неудалось найти и удалить контакт.',
        });
    }
}

export const updateContactType = async (req, res) => {
    try {
        const ContactType = await contactTypeModel.findByIdAndUpdate(req.params.id, {
            Name: req.body.Name
        })
        res.json(ContactType);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Неудалось обновить контакт.',
        });
    };
}