const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const isHaveToken = req.headers?.authorization?.startsWith("Bearer");
    if (!isHaveToken) {
        res.status(401);
        throw new Error("credentials is not provided");
    }
    const rawToken = req.headers?.authorization?.split(" ")[1];
    jwt.verify(rawToken, process.env.TTM_JWT_SECRET, (err, decode) => {
        if (err) {
            res.status(401);
            throw new Error("credentials invalid");
        }
        req.user = decode;
        next();
    });
};

module.exports = {
    verifyToken,
};
