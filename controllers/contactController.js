const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@des Get all contacts
//@routes GET /api/contacts
//@access Private
const getConatct = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({creater_id: req.user.id});
  res.status(200).json(contacts);
});

//@des Get single contact
//@routes GET /api/contacts/:id
//@access Private
const getConatctByID = asyncHandler(async (req, res) => {
  const conatct = await Contact.findById(req.params.id);
  if (!conatct) {
    res.status(404);
    throw new Error("Conatct not found!");
  }
  res.status(200).json(conatct);
});

//@des Create new contact
//@routes POST /api/contacts
//@access Private
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body, req.user.id);
  const { name, email, phone_number } = req.body;
  if (!name || !email || !phone_number) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const contact = await Contact.create({
    name,
    email,
    phone_number,
    creater_id: req.user.id,
  });

  res.status(201).json(contact);
});

//@des Updates contact
//@routes PUT /api/contacts/:id
//@access Private
const updateContact = asyncHandler(async (req, res) => {
  const conatct = await Contact.findById(req.params.id);
  if (!conatct) {
    res.status(404);
    throw new Error("Conatct not found!");
  }

  if(conatct.creater_id.toString() !== req.user.id) {
    req.status(403);
    throw new Error('User dont have permisson to update')
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateContact);
});

//@des Delete  contact
//@routes DELETE /api/contacts/:id
//@access Private
const deleteConatct = asyncHandler(async (req, res) => {
  const conatct = await Contact.findById(req.params.id);
  if (!conatct) {
    res.status(404);
    throw new Error("Conatct not found!");
  }

  if(conatct.creater_id.toString() !== req.user.id) {
    req.status(403);
    throw new Error('User dont have permisson to update')
  }
  await Contact.deleteOne({_id: req.params.id});
  //await Contact.findByIdAndRemove(req.params.id);
  res.status(200).json(conatct);
});

module.exports = {
  getConatct,
  getConatctByID,
  createContact,
  updateContact,
  deleteConatct,
};
