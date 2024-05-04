import mongoose from "mongoose";


const contactTypeSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
    },
},
    
);


export default mongoose.model('contactType', contactTypeSchema);
