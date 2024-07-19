import React from "react";
import { useUserStore } from "src/store/useUserStore";
import { formatMoney } from "src/utils/helper";

const CheckoutList = ({ total, deliFee }) => {
    const { cart } = useUserStore();

    return (
        <div className="bg-card border-black shadow-xl border-2 rounded-xl p-4">
            {cart.map((item, index) => (
                <div
                    key={item.id}
                    className={`flex gap-2 ${index !== 0 && "mt-4"}`}
                >
                    <div>
                        <div className="relative bg-blue-gray-300 w-[94px] aspect-square rounded-md border-black border">
                            <div className="absolute aspect-square w-[32px] text-base text-center font-bold flex items-center justify-center bg-orange-main rounded-full right-2 translate-y-[-30%] border border-white">
                                {item.amount}
                            </div>

                            <img />
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        <div className="font-bold text-orange-main text-xl">
                            {item.product.name}
                        </div>
                        <div className="flex gap-2 italic mt-2">
                            {item.optionsCheck.map((option, index) => (
                                <div className="flex gap-2" key={option._id}>
                                    {index !== 0 && <span>/</span>}
                                    {option.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-green-400 font-semibold flex items-center">
                        {formatMoney(
                            (+item.product.price +
                                +item.optionsCheck.reduce(
                                    (acc, option) => acc + +option.price,
                                    0
                                )) *
                                +item.amount
                        )}{" "}
                        VND
                    </div>
                </div>
            ))}
            <div className="border-t border-orange-main mt-4">
                <div className="flex justify-between mt-4 items-center italic">
                    <span className="text-orange-main">Tạm tính: </span>
                    <span className="text-green-400 text-lg">
                        {formatMoney(total)} VND
                    </span>
                </div>
                <div className="flex justify-between mt-2 items-center italic">
                    <span className="text-orange-main">Phí vận chuyển: </span>
                    <span className="text-base text-yellow-main">
                        {formatMoney(deliFee)} VND
                    </span>
                </div>
                <div className="flex justify-between mt-2 items-center italic border-t pt-2 border-orange-main">
                    <span className="text-orange-main">Tổng thanh toán: </span>
                    <span className="text-xl text-green-400 font-bold">
                        {formatMoney(+total + +deliFee)} VND
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CheckoutList;
