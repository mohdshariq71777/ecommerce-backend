const jwt=require('jsonwebtoken')
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if (!authHeader) {
        return res.status(403).json({ message: 'Authorization header is missing' });
    }
    const token = authHeader.split(' ')[1]; 
    if (!token) {
        return res.status(403).json({ message: 'Bearer token is missing' });
    }
    console.log('token',token);
    jwt.verify(token, 'this_string_is_long', (err, user) => {
        console.log(user);
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        // req.user = user; 
        next();
    });
};
module.exports=authenticateToken;