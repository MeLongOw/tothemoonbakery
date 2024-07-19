import axios from "src/axios";

//ADMIN

//USER
export const apiCreateOrder = (data) =>
    axios({ url: "/order", method: "post", data });
