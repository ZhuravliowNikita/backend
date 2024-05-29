
import TaskModel from "../models/Task.js"

export default async (req, res, next) => {

    try {
        const checkTask = await TaskModel.findById(req.params.id).populate("Customer")
        if ("" + checkTask.Customer._id !== req.userId) {
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