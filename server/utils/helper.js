const BigNumber = require("bignumber.js");

const { v4 } = require("uuid");

const generateUUID = () => {
    const uuid = v4();
    const bn = new BigNumber(uuid.replace(/-/g, ""), 16);

    return bn.toString(10).slice(-16);
};

const formatMoney = (num) => {
    if (!Number(num)) return 0;
    return Number(Number(num).toFixed(0)).toLocaleString();
};

module.exports = { generateUUID, formatMoney };
