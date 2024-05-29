
import UserModel from "../models/User.js"

export default async (req, res, next) => {

    try {
        const checkProfile = await ProfileModel.findById(req.userId).populate("Profile")
        if ("" + checkProfile.Profile._id !== req.params.id) {
            return res.status(403).json({
                message: `Access denied.`,
            });
        }

        next();
    } catch (e) {
        return res.status(403).json({
            message: 'Access denied.',
        });
    }

};