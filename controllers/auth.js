const bcrypt = require('bcrypt');
const db = require('./../database/db')
const jwt=require('jsonwebtoken');

//api controller functions start here
const signup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const mobile = req.body.mobile;
    let message = '';
    bcrypt.hash(password, 10).then((hashedPassword) => {
        db.query(`INSERT INTO users (email, password, user_id, mobile)
                VALUES ('${email}', '${hashedPassword}', substring(md5(random()::text), 1, 15), ${mobile});`).then((result) => {
            res.status(201).json({
                message: 'User Created Successfully'
            })
        }).catch((error) => {
            if (error?.constraint === "users_email_key" && error?.routine === "_bt_check_unique") {
                message = 'The user email is already taken! Please enter a different one.'
                res.status(409).json({
                    message: message
                })
            }
        }).finally(() => {

        })
    })
}
const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(`Select * from users where email='${email}'`).then(async (result) => {
        const user = result?.rows[0];
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (user) {
            console.log(user);
            // Create a token
            const token = jwt.sign({ user_id: user.user_id }, 'this_string_is_long', {
                expiresIn: '1h', // Token expires in 1 hour
            });
            res.json({
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }).catch(error => {
        console.log(error);
    })
}
//api controller functions end here

module.exports={signup,login}