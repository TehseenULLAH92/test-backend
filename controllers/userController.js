// FileName userController.js
// Import user model
User = require('../models/userModel');
// Handle index actions
exports.index = async (req, res) => {
    try {
        const users = await User.find({});
        res.json({
            status: true,
            message: "users retrieved successfully",
            data: users
        });
    } catch (error) {
       return res.json({
            status: false,
            message: error,
        });
    }
};
// Handle create user actions
exports.new = async (req, res) => {
    try {
        var user = new User();
        user.name = req.body.name ? req.body.name : "";
        user.dob = req.body.dob;
        user.address = req.body.address;
        user.description = req.body.description;
        // save the user and check for errors
        await user.save();
        return res.json({
            status: true,
            message: 'New user created!',
            data: user
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error,
        })
    }
    
};
// Handle view single user info using id
exports.view = async (req, res) => {
    try {
        const user  = await User.findById(req.params.id);
        res.json({
            status: true,
            message: 'user details loading...',
            data: user
        });
    } catch (error) {
        return res.json({
            status: false,
            message:error
        });
    }
};
// Handle update single user info
exports.update = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.json({
                message: 'Id not found'
            });
        }
        user.name = req.body.name;
        user.dob = req.body.dob;
        user.address = req.body.address;
        user.description = req.body.description;
        // save the user and check for errors
        await user.save();
        return res.json({
            status: true,
            message: 'user info updated',
            data: user
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error
        });
    }
};
// Handle delete single user
exports.delete = async (req, res) => {
    try {
        const user = await User.deleteOne({_id: req.params.id});
        res.json({
            status: true,
            message: 'user deleted',
            user: user.deletedCount
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error
        });
    }
};
