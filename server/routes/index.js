const userRouter = require("./user");
const categoryRouter = require("./category");
const productRouter = require("./product");
const orderRouter = require("./order");
const locationRouter = require("./location");
const { notFound, errorHandler } = require("../middlewares/errHandler");

const initRoutes = (app) => {
    app.use("/api/user", userRouter);
    app.use("/api/category", categoryRouter);
    app.use("/api/product", productRouter);
    app.use("/api/order", orderRouter);
    app.use("/api/location", locationRouter);


    app.use(notFound);
    app.use(errorHandler);
};

module.exports = initRoutes;
