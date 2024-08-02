import axios from "src/axios";

//ADMIN
export const apiToggleShowDistrict = (id) =>
    axios({ url: "/location/" + id + "/toggle_show_district", method: "put" });

export const apiToggleShowWard = (districtId, wardId) =>
    axios({
        url: "/location/" + districtId + "/toggle_show_ward/" + wardId,
        method: "put",
    });

export const apiUpdateFee = (districtId, wardId, data) =>
    axios({
        url: "/location/" + districtId + "/ward/" + wardId + "/update_fee",
        method: "put",
        data,
    });

//USER
export const apiGetLocationList = () =>
    axios({ url: "/location", method: "get" });
