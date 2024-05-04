import mongoose from "mongoose";



export const ProfileSchema = new mongoose.Schema({
    Birthday: {
        type: Date,
        
    },
    pricePerHour: {
        type: Number,
        
    },
    Speed: {
        type: Number,
        
    },
    Quality: {
        type: Number,
        
    },
    Communication: {
        type: Number,
        
    },
},
    {
        timestamps: true,
    },
);


export default mongoose.model('Profile', ProfileSchema);
