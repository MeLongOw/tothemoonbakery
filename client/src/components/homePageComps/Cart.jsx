import React from "react";
import { BiDetail } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";

import { useNavigate, useLocation } from "react-router-dom";
import { useAppStore } from "src/store/useAppStore";
import { useUserStore } from "src/store/useUserStore";

import { DetailCart } from "..";

const Cart = () => {
    const { openModal, setModalChildren } = useAppStore();
    const { cart, current } = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>
            <div className="fixed z-50 right-4 bottom-4 flex flex-col gap-4">
                {current?.role === "admin" && (
                    <div
                        onClick={() => {
                            navigate("/order");
                        }}
                        className="w-[80px] bg-orange-main aspect-square rounded-full flex justify-center items-center cursor-pointer"
                    >
                        <div>
                            <BiDetail size={32} />
                        </div>
                    </div>
                )}
                {location.pathname === "/" && (
                    <div
                        onClick={() => {
                            openModal();
                            setModalChildren(<DetailCart />);
                        }}
                        className="relative w-[80px] bg-orange-main aspect-square rounded-full flex justify-center items-center cursor-pointer"
                    >
                        <div className="">
                            <IoMdCart size={32} />
                            <div className="absolute top-0 left-0 w-[28px] aspect-square bg-orange-main border-2 border-white rounded-full flex items-center justify-center font-bold">
                                {cart.length}
                            </div>
                        </div>
                    </div>
                )}
                <div
                    onClick={() => {
                        navigate("/");
                    }}
                    className="w-[80px] bg-orange-main aspect-square rounded-full flex justify-center items-center cursor-pointer"
                >
                    <div>
                        <FaHome size={32} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
