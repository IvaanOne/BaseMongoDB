const User = require("../models/User");

const userController = {};

userController.getAll = async (req, res) => {

    try {
        const users = await User.find();

        return res.status(200).json(
            {
            success: true,
            message: 'Get all users retrieved successfully',
            data: users
            }
        );
        
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error retrieveng users: ',
                error: error.message
            }
        )
    }
};

userController.getUserById = async (req, res) => {
    return res.status(200).json
};


//Metodo delete

userController.deleteById = async(req,res) => {

    try {
        const {id} = req.params;
        await User.findByIdAndDelete(id)

        return res.status(200).json(
            {
                success: true,
                message: "User deleted",
                
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Unable to delete user, user not found",
                error: error?.message || error
            }
        )
    }
}


//Metodo update

userController.update = async (req,res) => {
    try {

        const {id} = req.params;
        const {name,email,password} = req.body

        const updateUser = {
            name,
            email,
            password
        }
       
       await User.findOneAndUpdate({_id:id},updateUser) 
        return res.status(200).json(
            {
                success: true,
                message: "User Update Succesfully",
            }
        )
        
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Unable to Update Data",
                error: error?.message || error
            }
        )
    }
};
module.exports = userController;
