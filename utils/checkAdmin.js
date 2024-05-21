import User from "../models/User.js";


export default async(req, res, next) =>{
    
    let user = await User.findById(req.userId)

    console.log(user)
    
    if(!user){
        return res.status(403).json({success:false, message:"Access denied."});
    }
    if(!user.Admin){
        return res.status(403).json({success:false, message:"Access denied."});
    }
    next();
}