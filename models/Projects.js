import mongoose from "mongoose";


const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    urlToProject: {
        type: String,
        required: true,
        unique: true,
    },
    Role: {
        type: String,
        required: true,
    },
    Profile: {
        type: mongoose.Types.ObjectId,
        ref: "Profile",
        required: true,
        unique: true,
    },
},
    {
        timestamps: true,
    },
);


export default mongoose.model('Project', ProjectSchema);
