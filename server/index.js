require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dbConnect = require("./config/dbconnect");
const initRoutes = require("./routes");
const moment = require("moment");

console.log(123, new Date());
app.use(
    cors({
        origin: process.env.TTM_CLIENT_URL,
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

dbConnect();

initRoutes(app);

const TTM_PORT = process.env.TTM_PORT || 7777;

app.listen(TTM_PORT, () => {
    console.log("server is running on port " + TTM_PORT);
});
