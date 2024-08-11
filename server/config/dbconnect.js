const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.TTM_MONGODB_URI);
        if (connection.connection.readyState === 1)
            console.log("DB connection is successful");
        else console.log("DB is connecting");
    } catch (error) {
        console.log("DB connection is failed");
        throw new Error(error);
    }
};

module.exports = dbConnect;
