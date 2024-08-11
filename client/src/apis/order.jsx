import axios from "src/axios";

//ADMIN
export const apiGetOrders = (params) =>
    axios({ url: "/order", method: "get", params });

export const apiUpdateStatusOrder = (id, data) =>
    axios({ url: `/order/${id}/status`, method: "put", data });

//USER
export const apiCreateOrder = (data) =>
    axios({ url: "/order", method: "post", data });
