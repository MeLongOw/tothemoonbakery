import { v4 as uuidv4 } from "uuid";
import BigNumber from "bignumber.js";
export const checkDateRange = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today < start) {
        return -1; // Ngày vẫn chưa đến
    } else if (today >= start && today <= end) {
        return 0; // Ngày đang trong khoảng
    } else {
        return 1; // Ngày đã đi qua
    }
};

export const formatMoney = (num) => {
    if (!Number(num)) return 0;
    return Number(Number(num).toFixed(0)).toLocaleString();
};

export const generateUUID = () => {
    const uuid = uuidv4();
    const bn = new BigNumber(uuid.replace(/-/g, ""), 16);
  
    return bn.toString(10).slice(-16);
};
