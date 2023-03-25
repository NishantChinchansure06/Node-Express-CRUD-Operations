const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');

const vailidateJWTToken = asyncHandler(async(req, res, next)=> {
    let token;
    let authenticationHeader = req.headers.authorization || req.headers.Authorization;
    if(authenticationHeader && authenticationHeader.startsWith('Bearer')) {
        token = authenticationHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, decoded)=>{
            if(error) {
                res.status(400);
                throw new Error('User is not authorized')
            }
            console.log('user', decoded);
            req.user = decoded.user;
            next();
        })  
    }
    if(!token) {
        res.status(400);
        throw new Error('User is not authorized or missing token')
    }
})

module.exports= vailidateJWTToken;