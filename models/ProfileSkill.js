import mongoose from "mongoose";


const ProfileSkillSchema = new mongoose.Schema({
    Profile: {
        type: mongoose.Types.ObjectId,
        ref: "Profile",
        required: true,
        unique: true,
    },
    Skill: {
        type: mongoose.Types.ObjectId,
        ref: "Skill",
        required: true,
        unique: true,
    },
},
    {
        timestamps: true,
    },
);


export default mongoose.model('ProfileSkill', ProfileSkillSchema);
