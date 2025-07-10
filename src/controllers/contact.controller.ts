import {Request, Response} from "express";
import * as contactService from "../services/contact.service";

export const getAllContacts = (req:Request, res:Response) => {
    try {
        const contacts = contactService.getAllContacts();
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const saveContact = (req:Request, res:Response) => {
    try {
        const newContact = req.body;
        console.log(newContact)
        const validateError = contactService.validateContact(newContact);
        if (validateError) {
            res.status(400).json({ error: validateError });
            return;
        }
        const savedContact = contactService.saveContact(newContact);
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}