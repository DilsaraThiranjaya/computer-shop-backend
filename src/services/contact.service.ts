import {contactList} from "../db/db";
import {Contact} from "../model/contact.model";

export const getAllContacts = async () => {
    return contactList;
}

export const saveContact = (contact: Contact) => {
    contactList.push(contact);
    return contact;
}

export const validateContact = (contact: Contact) => {
    if (!contact.name || !contact.phone || !contact.email || !contact.subject || !contact.message) {
        return 'All fields are required!';
    }
    return null;
}