require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dbConnect = require("./config/dbconnect");
const initRoutes = require("./routes");

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

dbConnect();

initRoutes(app);

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
});
