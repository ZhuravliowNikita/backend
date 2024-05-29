import mongoose from "mongoose";


const EducationSchema = new mongoose.Schema({
    Organisation: {
        type: String,
        required: true,
    },
    Profession: {
        type: String,
        required: true,
    },
    Documents: {
        type: [String],
        required: true,
        unique: true,
    },
    Profile: {
        type: mongoose.Types.ObjectId,
        ref: "Profile",
        required: true,
    },
},
    {
        timestamps: true,
    },
);


export default mongoose.model('Education', EducationSchema);
