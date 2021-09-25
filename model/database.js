const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
    surName: {
        type: String,
        required: [true, 'please enter your sur name']
    },
    firstName: {
        type: String,
        required: [true, 'please enter your last name']
    },
    lastName: {
        type: String,
        required: [true, 'please enter your last name']
    },
    regNumber: {
        type: String,
        required: [true, 'registration number'],
        unique: true,
        lowercase: true
    },
    state: {
        type: String,
        required: [true, 'please enter your state']
    },
    nationality: {
        type: String,
        required: [true, 'please enter your nationality']
    },
    gender: {
        type: String,
        required: [true, 'please select your gender']
    },
    level: {
        type: String,
        required: [true, 'your level is required']
    },
    birthDate: {
        type: String,
        required: [true, 'please enter your birth day']
    },
    department: {
        type: String,
        required: [true, 'please select department']
    },
    duration:{
        type: String,
        required: [true, 'enter your duration']
    },
    year: {
        type: Number,
        required : [true, 'enter your year']
    },

    password:{
        type: String,
        minlength: [6,'password must be 6 character']
    }   

})

const Student = mongoose.model('Student', studentsSchema)

module.exports = Student;