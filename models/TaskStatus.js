import mongoose from "mongoose";


const taskStatusSchema = new mongoose.Schema({
    statusName: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    },
);


export default mongoose.model('taskStatus', taskStatusSchema);
