const jwt = require('jsonwebtoken');
const JWT_SECRET = 'thisisfor@tasktrack';

const fetchuser = (req, res, next) =>{

    // get user from using token
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error: "Please enter valid token"})
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        return res.status(401).send({error: "Please enter valid token"})
    }
}

module.exports = fetchuser;