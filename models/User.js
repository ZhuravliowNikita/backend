import mongoose from "mongoose";
import { ProfileSchema } from "./Profile.js";


const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    Admin: {
        type: Boolean,
        required: false,
        default: false,
    },
    isDeveloper: {
        type: Boolean, 
        default: false,
    },
    Profile: {
        type: ProfileSchema,
        unique: true,
    },
    avatarUrl: String,
},
    {
        timestamps: true,
    },
);


export default mongoose.model('User', UserSchema);
