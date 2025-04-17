import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    des: {
        type:String,
        required: true
    },
    isComplelet : {
        type:Boolean,
        default: false
    },
    user: {
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const taskModel = mongoose.model('task', taskSchema)