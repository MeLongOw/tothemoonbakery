const User = require("../models/user");

const isAdmin = async (req, res, next) => {
    const { uid } = req.user;

    const user = await User.findById(uid);

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User is not found",
        });
    }

    if (user?.role.toLowerCase() === "admin") {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: "Forbidden to do this action",
        });
    }
};

module.exports = {
    isAdmin,
};
