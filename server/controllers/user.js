const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
    const { name, phone, email, password, username } = req.body;

    const isAlreadyExistUser = await User.findOne({ username });

    if (isAlreadyExistUser) {
        res.status(409).json({
            success: false,
            message: "Username is not available. Please use another username",
        });
    }

    if (!isAlreadyExistUser) {
        const user = await User.create({
            name,
            phone,
            email,
            password,
            username,
        });

        if (user) {
            res.status(200).json({
                success: true,
                message: "Register successfully",
            });
        }

        if (!user) {
            res.status(400).json({
                success: false,
                message: "Something went wrong",
            });
        }
    }
});

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Username or password is incorrect",
        });
    }
    const isMatchingPassword = bcrypt.compareSync(password, user.password);
    if (!isMatchingPassword)
        return res.status(401).json({
            success: false,
            message: "Username or password is incorrect",
        });

    const token = jwt.sign(
        { uid: user._id, role: user?.role },
        process.env.JWT_SECRET
    );

    return res.status(200).json({
        success: true,
        message: "Log in successfully",
        accessToken: token,
    });
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const { uid } = req.user;
    const user = await User.findById(uid).select("-password -accessToken");
    if (!user)
        return res.status(400).json({
            success: false,
            message: "User not found",
        });
    res.status(200).json({
        success: true,
        currentUser: user,
    });
});

module.exports = {
    register,
    login,
    getCurrentUser,
};
