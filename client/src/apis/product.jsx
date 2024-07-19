import axios from "src/axios";

//ADMIN
export const apiCreateProduct = (data) =>
    axios({ url: "/product", method: "post", data });

export const apiUpdateProduct = (data, id) =>
    axios({ url: "/product/" + id, method: "put", data });

export const apiToggleIsShowProduct = (id) =>
    axios({ url: "/product/" + id + "/is_show", method: "put" });

export const apiDeleteProduct = (id) =>
    axios({ url: "/product/" + id, method: "delete" });

//USER
export const apiGetProducts = (params) =>
    axios({ url: "/product", method: "get", params });
    
export const apiGetProductById = (id) =>
    axios({ url: "/product/" + id, method: "get" });
