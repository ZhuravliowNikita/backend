import mongoose from "mongoose";


const TaskSkillSchema = new mongoose.Schema({
    Skill: {
        type: mongoose.Types.ObjectId,
        ref: "Skill",
        required: true,
        unique: true,
    },
    Status: {
        type: mongoose.Types.ObjectId,
        ref: "Task",
        required: true,
        unique: true,
    },
},
    {
        timestamps: true,
    },
);


export default mongoose.model('TaskSkill', TaskSkillSchema);
