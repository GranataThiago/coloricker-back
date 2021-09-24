const { sign, verify } = require('jsonwebtoken');

const createToken = (user) => {
    const token = sign({ username: user.name, id: user.id }, "a24b06c20d03");

    return token;
}

const verifyToken = (req, res, next) => {
    const token = req.cookies['acces-token']

    if(!token){
        return res.status(400).json("User not authenticated")
    }

    try{
        const validToken = verify(token, "a24b06c20d03")

        if(validToken){
            req.authenticated = true;
            return next();
        }
    }catch(err){
        return res.status(400).json("error");
    }
}

module.exports = {
    createToken,
    verifyToken
}