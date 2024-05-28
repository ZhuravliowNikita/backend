import mongoose from "mongoose";


const TaskSkillSchema = new mongoose.Schema({
    Skill: {
        type: mongoose.Types.ObjectId,
        ref: "Skill",
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


export default mongoose.model('TaskSkill', TaskSkillSchema);
