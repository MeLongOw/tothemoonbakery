import React, { useEffect, useMemo, useRef, useState } from "react";
import { CheckoutList, DetailCart } from "src/components";
import CheckOutForm from "src/components/checkoutPageComps/CheckoutForm";
import { useUserStore } from "src/store/useUserStore";

const Checkout = () => {
    const [total, setTotal] = useState(0);
    const [deliFee, setDeliFee] = useState(0);
    const { cart } = useUserStore();
    const checkoutRef = useRef();

    useEffect(() => {
        checkoutRef.current.scrollIntoView({ behavior: "smooth" });
    }, []);

    useMemo(() => {
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
    return (
        <div className="px-4 mt-8 h-[100vh]">
            <div
                className="col-span-2 flex justify-center border-t border-orange-main py-8"
                ref={checkoutRef}
            >
                <h3 className=" text-yellow-main text-2xl font-semibold italic">
                    Thanh toán
                </h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                    <CheckOutForm total={total} setDeliFee={setDeliFee} />
                </div>
                <div className="col-span-1">
                    <CheckoutList total={total} deliFee={deliFee} />
                </div>
            </div>
        </div>
    );
};

export default Checkout;
