const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const {authorization} = req.headers;
        
        if(!authorization) {
              return res.status(401).json(
                {
                    success: false,
                    message: 'Token invalid'
                }
              );
        }
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

       if(!decoded) {
            return res.status(401).json(
                {
                   success: false,
                   message: "Token invalid 2" 
                }
            )
       }

       req.user_id = decoded.user_id;
       req.user_role = decoded.user_role;

       next();
    } catch (error) {
        return res.status(500).json(
            {
               success: false,
               message: "Invalid token" 
            }
        )
    }

};

module.exports = verifyToken;