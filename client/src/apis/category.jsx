import axios from "src/axios";

//ADMIN
export const apiCreateOrUpdateCategories = (data) =>
    axios({ url: "/category", method: "put", data });

export const apiDeleteCategories = (data) =>
    axios({ url: "/category", method: "delete", data });

//USER
export const apiGetCategories = () =>
    axios({ url: "/category", method: "get" });
