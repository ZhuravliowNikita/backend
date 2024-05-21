import { validationResult } from 'express-validator'
import ContactModel from '../models/Contact.js';




export const createContact = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const Type = req.body.Type;
        const contactValue = req.body.contactValue;
        const User = req.body.User;
        
       
        const doc = new ContactModel({
            Type,
            contactValue,
            User,
        });


        const Contact = await doc.save();

        res.json({
            Contact,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't create Contact.`,
        })
    }
}

export const getContact = async (req, res) => {
    try {
        const Contact = await ContactModel.findById(req.params.id);

        if (!Contact) {
            return res.status(404).json({
                message: 'Contact not found.',
            });
        }

        res.json(Contact);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find Contact.`,
        });
    }
}

export const getContacts = async (req, res) => {
    try {
        const page = +(req.params.page);
        let itemsPerPage = 10;
        const Contacts = await ContactModel.find()
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        res.json(Contacts)
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find Contacts.`,
        });
    }
}

export const deleteContact = async (req, res) => {
    try {

        const Contact = await ContactModel.findByIdAndDelete(req.params.id)

        res.json(Contact);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't find and delete Contact.`,
        });
    }
}

export const updateContact = async (req, res) => {
    try {

        const Type = req.body.Type;
        const contactValue = req.body.contactValue;
        const User = req.body.User;

        const Contact = await ContactModel.findByIdAndUpdate(req.params.id, {
            Type,
            contactValue,
            User,
        })
        res.json(Contact);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Couldn't update Contact.`,
        });
    };
}   