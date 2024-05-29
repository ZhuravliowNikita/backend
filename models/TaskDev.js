import mongoose from "mongoose";


const TaskDevSchema = new mongoose.Schema({
    Dev: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    Task: {
        type: mongoose.Types.ObjectId,
        ref: "Task",
        required: true,

    },
},
    {
        timestamps: true,
    },
);


export default mongoose.model('TaskDev', TaskDevSchema);
