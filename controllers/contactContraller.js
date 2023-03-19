const asyncHandler = require('express-async-handler')
const Contact = require('../model/contactModel')

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.find({user_id: req.user.id});
    res.status(200).json(contact)
})

const GetContactById = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact){
        res.status(404);
        throw new Error("Contact Not Found")
    }
    res.status(200).json(contact)
})

const PostContact = asyncHandler(async(req, res) => {
    const {name, email, phone} = req.body
    if (!name || !email || !phone){
        res.status(400)
        throw new Error('All Fields Are Required')
    }
    const contact = await Contact.create({
        name, email, phone, user_id: req.user.id
    })
    res.status(200).json(contact)
})

const PutContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact){
        res.status(404);
        throw new Error("Contact Not Found")
    }

    const updateContect = await Contact.findByIdAndUpdate(req.params.id,
        req.body, 
        {new: true}
        )

    res.status(200).json(updateContect)
})

const DeleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact){
        res.status(404);
        throw new Error("Contact Not Found")
    }
    const deleteContact = await Contact.findByIdAndDelete(req.params.id)
    // await contact.remove();
    res.status(200).json(contact)
})

module.exports = {getContact, PostContact, GetContactById, PutContact, DeleteContact}