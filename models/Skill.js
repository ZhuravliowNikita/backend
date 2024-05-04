import mongoose from "mongoose";


const SkillSchema = new mongoose.Schema({
    skillName: {
        type: String,
        required: true,
        unique: true,
    },
},
    {
        timestamps: true,
    },
);


export default mongoose.model('Skill', SkillSchema);
