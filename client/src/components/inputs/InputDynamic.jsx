import React, { useState } from "react";
import { Reorder } from "framer-motion";
import { Button, Input } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { IoIosRemoveCircle } from "react-icons/io";

const InputDynamic = ({
    items = [0],
    setItems,
    handleAdd,
    handleRemove,
    id,
    errors,
    validate,
}) => {
    return (
        <div>
            <Reorder.Group axis="y" values={items} onReorder={setItems}>
                {items.map((item, index) => (
                    <Reorder.Item key={item.id} value={item}>
                        <div
                            className={twMerge(
                                clsx(index !== 0 && "mt-4", "relative")
                            )}
                        >
                            <div>
                                <Input
                                    size="lg"
                                    color="orange"
                                    label={"Danh mục " + (index + 1)}
                                    placeholder=""
                                    className="!border-2 text-white font-bold text-lg ring-4 ring-transparent focus:ring-transparent"
                                    labelProps={{
                                        className:
                                            "text-orange-main peer-placeholder-shown:text-white",
                                    }}
                                    value={item.value}
                                    onChange={(e) => {
                                        setItems(
                                            items.map((el) => {
                                                if (el.id !== item.id)
                                                    return el;
                                                if (el.id === item.id)
                                                    return {
                                                        ...el,
                                                        value: e.target.value,
                                                    };
                                            })
                                        );
                                    }}
                                />
                            </div>
                            <div
                                onClick={() => handleRemove(item)}
                                className="absolute w-8 aspect-square bg-red-400 top-0 right-4 translate-y-[-50%] cursor-pointer rounded-full flex justify-center items-center"
                            >
                                <IoIosRemoveCircle size={20} />
                            </div>
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
            <div className="mt-4 flex justify-center">
                <Button color="white" onClick={handleAdd}>
                    Thêm
                </Button>
            </div>
        </div>
    );
};

export default InputDynamic;
