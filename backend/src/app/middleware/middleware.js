const jwt = require('jsonwebtoken')
const MyUtil = require('../../../utils/error')
const { createError } =   require('../../../utils/error')
const middleware = {

    verifyToken: (req,res,next) => {
        const token =  req.cookies.refreshToken;
        if(!token) {
            res.status(403).json("you not token")
        }
        jwt.verify(token,process.env.JWT_ACCESS_KEY, (err, user)=> {
            if(err) {
                res.status(401).json("Token does exist")
            }

            req.user = user;
            next()  
        }) 
    },
    verifyUser: (req,res,next)=> {
        middleware.verifyToken(req,res, () => {
            if(req.user.id === req.params.id  ||  req.user.isAdmin){
                next()
            }else {
              res.status(403).json("you do not have access")
            }
        })
    },
    verifyAdmin:  (req,res,next)=> {
        middleware.verifyToken(req,res,next, () => {
            if(req.user.isAdmin){
                next()
            }else {
                res.status(403).json("you do not have access")
            }
        })
    },
}
module.exports = middleware