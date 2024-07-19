import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const InputAmount = ({ amount = 1, setAmount = () => {} }) => {
    const handleMinus = () => {
        if (amount > 1) setAmount(amount - 1);
    };
    const handleAdd = () => {
        if (amount < 99) setAmount(amount + 1);
    };

    return (
        <div className="max-w-[120px] w-full  flex gap-2 items-center">
            <div>
                <FiMinus className="cursor-pointer" onClick={handleMinus} />
            </div>
            <div>
                <input
                    type="number"
                    className="text-lg bg-transparent border-none w-full text-center border-transparent focus:border-transparent focus:ring-0"
                    value={amount}
                    onChange={(e) => {
                        setAmount(e.target.value);
                        if (e.target.value > 99) {
                            setAmount(99);
                        }
                    }}
                />
            </div>
            <div>
                <FiPlus className="cursor-pointer" onClick={handleAdd} />
            </div>
        </div>
    );
};

export default InputAmount;
