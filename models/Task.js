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
        required: true,
    },
    Quality: {
        type: Number,
        required: true,
    },
    Communication: {
        type: Number,
        required: true,
    },
    Developer: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
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
},
    {
        timestamps: true,
    },
);


export default mongoose.model('Task', TaskSchema);
