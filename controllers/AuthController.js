const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authController = {};


authController.register = async (req,res)=>{
    try{
        const {user,email,password} = req.body;

        // validar campos
        if(!user || !email || !password) {
            return res.status(400).son({
                success: false,
                message: "Email, name, password are required"
            });
        };
        // codificando el password con bcrypt
        const salt = await bcrypt.genSalt(saltRounds);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            user,
            email,
            password: encryptedPassword
        }
        await User.create(newUser);
        return res.status(200).json(
            {
                success: true,
                message: 'Create user succesfully'
            }
        )
    }catch(error){
        return res.status(500).json(
            {
                success: false,
                message: 'Error creating user',
                error: error?.message || error
            }
        )
    }
};

authController.login = (req, res) => {
    try {
        const {email, password} = req.body;
        // validaciones antes de entrar en bbddd
        if(!email || !password){
            return res.status(400).json(
                {
                    success: false,
                    message: 'Bad Credentials'
                }
            );
        };

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json(
                {
                    success: false,
                    message: 'Bad Credentials'
                }
            );
        };

        const isValidPassword = bcrypt.compareSync(password, user.password);

        if(!isValidPassword) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Bad Credentials'
                }
            );
        };
        const token = jwt.sign({user_id : user._id, user_role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json(
            {
                success: true,
                message: 'User Logged',
                token: token
            }
        );
        
    } catch (error) {
        return res.status(500).json(
            {
                success: true,
                message: 'User Login failed'
            }
        );
        
    }
};


authController.profile = (req, res) => {
    try {
        const userId = req.user_id;

        const user = await User.findOne({_id: userId}).select(["-password", "-__v"]);

       return res.status(200).json({
        success: true,
        message: "User profile",
        data: user
       });
    } catch (error) {
        return res.status(500).json(
            {
                succes: false,
                message: "User profile failed"
            }
        )     
    }
}

module.exports = authController;