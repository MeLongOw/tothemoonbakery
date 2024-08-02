import axios from "src/axios";

//ADMIN
export const apiCreateOrUpdateCategories = (data) =>
    axios({ url: "/category", method: "put", data });

export const apiToggleIsShowCategory = (id) =>
    axios({ url: "/category/" + id + "/is_show_category", method: "put" });

export const apiDeleteCategories = (data) =>
    axios({ url: "/category", method: "delete", data });

//USER
export const apiGetCategories = () =>
    axios({ url: "/category", method: "get" });
