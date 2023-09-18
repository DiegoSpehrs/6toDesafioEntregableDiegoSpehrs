import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name:{
        type: 'string',
        required: true
    },
    last_name:{
        type: 'string',
        required: true
    },
    username:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true
    },
    isAdmin:{
        type: 'boolean',
        default: false
    }
})

export const usersModel = mongoose.model('users', usersSchema);