import mongoose from "mongoose";


const ContactsSchema = new mongoose.Schema({
    Type: {
        type: mongoose.Types.ObjectId,
        ref: "contactType",
        required: true,
    },
    contactValue: {
        type: String,
        required: true,
    },
    User: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
    
);


export default mongoose.model('Contacts', ContactsSchema);
