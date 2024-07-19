import { Drawer } from "@material-tailwind/react";
import React, { useState } from "react";
import { IoMdCart } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useAppStore } from "src/store/useAppStore";
import { useUserStore } from "src/store/useUserStore";
import { DetailCart } from "..";

const Cart = () => {
    const { openModal, setModalChildren } = useAppStore();
    const { cart } = useUserStore();

    return (
        <div>
            <div
                onClick={() => {
                    openModal();
                    setModalChildren(<DetailCart />);
                }}
                className="fixed z-50 w-[80px] bg-orange-main aspect-square right-4 bottom-4 rounded-full flex justify-center items-center cursor-pointer"
            >
                <IoMdCart size={32} />
                <div className="absolute top-0 left-0 w-[28px] aspect-square bg-orange-main border-2 border-white rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                </div>
            </div>
        </div>
    );
};

export default Cart;
