const Joi = require('joi');

const studentSchema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(), 
    parentName: Joi.string().min(2).max(30).required(), 
    email: Joi.string().email().required(), 
    phone: Joi.string().min(7).max(15).required(), 
    favoriteSong: Joi.string().min(2).max(30).required(), 
    birthday: Joi.string().min(6).max(30).required(),
    birthYear: Joi.number().integer().min(1920).max(2023).required()
})


const bookSchema = Joi.object({
    title: Joi.string().min(2).max(30).required(),
    series: Joi.string().min(2).max(30).required(), 
    level: Joi.string().min(1).max(5).required(), 
    publisher: Joi.string().min(2).max(30).required()
})

module.exports = {
    studentSchema, bookSchema 
}