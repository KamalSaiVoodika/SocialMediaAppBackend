const User = require("../models/user");
const jwt = require("jsonwebtoken");

//Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}


// Register a new User

exports.registerUser = async (req, res) => {

    console.log("BODY:", req.body);

    const { username, email, password } = req.body || {};

    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({ username, email, password });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Login a User
exports.loginUser = async (req, res) => {

     console.log("BODY:", req.body);

    const { email, password } = req.body;

    try {
        const userExist = await User.findOne({ email });

        if (userExist && (await userExist.matchPassword(password))) {

            return res.status(200).json({
                _id: userExist._id,
                username: userExist.username,
                email: userExist.email,
                token: generateToken(userExist._id)
            });
        } else {
          
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}