import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
    Speed: {
        type: Number,
        default: 0,
        required: true,
    },
    Quality: {
        type: Number,
        default: 0,
        required: true,
    },
    Communication: {
        type: Number,
        default: 0,
        required: true,
    },
    Developer: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: false,
    },
    Customer: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    Status: {
        type: mongoose.Types.ObjectId,
        ref: "taskStatus",
        required: true,
    },
    Category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
    },
},
    {
        timestamps: true,
    },
);


export default mongoose.model('Task', TaskSchema);
