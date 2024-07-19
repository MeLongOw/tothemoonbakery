import React, { useEffect, useState } from "react";
import { apiGetProductById } from "src/apis/product";
import { useUserStore } from "src/store/useUserStore";
import { formatMoney } from "src/utils/helper";
import { InputAmount, ProductInCart } from "..";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "src/store/useAppStore";

const DetailCart = () => {
    const { closeModal } = useAppStore();
    const { cart, deleteFormCart, setAmountInCart } = useUserStore();
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const handleRemoveFromCart = (id) => {
        deleteFormCart(id);
    };
 
    useEffect(() => {
        setTotal(
            cart?.reduce(
                (acc, el) =>
                    acc +
                    (+el.product.price +
                        +el.optionsCheck.reduce(
                            (acc, el) => acc + +el.price,
                            0
                        )) *
                        +el.amount,
                0
            )
        );
    }, [cart]);

    const setAmount = (id) => {
        return (amount) => {
            setAmountInCart(id, amount);
        };
    };

    return (
        <div className="h-full flex flex-col">
            <div className="w-full text-center text-2xl font-bold text-orange-main capitalize italic mb-4">
                Giỏ Hàng Của Bạn
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
                <div className="flex-1 py-4 overflow-y-scroll no-scrollbar flex flex-col gap-2">
                    {cart.map((el) => (
                        <ProductInCart
                            el={el}
                            key={el?.id}
                            handleRemoveFromCart={handleRemoveFromCart}
                            setAmount={setAmount(el?.id)}
                        />
                    ))}
                    {!cart.length && (
                        <div className="flex mt-8 flex-col justify-center">
                            <div className="flex justify-center text-gray-400">
                                <HiOutlineShoppingCart size={80} />
                            </div>
                            <div className="flex justify-center text-gray-400 italic text-lg mt-4">
                                Hiện chưa có sản phẩm
                            </div>
                        </div>
                    )}
                </div>
                <div className="py-4 ">
                    <div className="text-xl font-bold text-green-400 flex justify-end gap-2 items-center pt-4 border-t border-orange-main">
                        <span className="font-normal  text-orange-yellow-main">
                            Tổng tiền:
                        </span>
                        <span className="italic">{formatMoney(total)} VND</span>
                    </div>
                    <div className="mt-4 w-full">
                        <Button
                            size="lg"
                            color="orange"
                            variant="outlined"
                            className="w-full focus:ring-0"
                            onClick={() => {
                                closeModal();
                                navigate("/checkout");
                            }}
                        >
                            Mua ngay
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailCart;
