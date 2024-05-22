import mongoose from "mongoose";



export const ProfileSchema = new mongoose.Schema({
    Birthday: {
        type: Date,
        required: true,
    },
    pricePerHour: {
        type: Number,
        default: null,
    },
    Speed: {
        type: Number,
        default: 0,
        required: true,
        
    },
    Quality: {
        type: Number,
        default: 0,
        required: true,
        
    },
    Communication: {
        type: Number,
        default: 0,
        required: true,
        
    },
},
    {
        timestamps: true,
    },
);


export default mongoose.model('Profile', ProfileSchema);
