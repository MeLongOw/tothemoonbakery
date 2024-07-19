import { Input, Option, Select } from "@material-tailwind/react";
import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const InputSelect = ({
    autoCapitalize = "on",
    label,
    id,
    containerClassName,
    type = "text",
    register = () => {},
    errors,
    validate,
    placeholder,
    setValue,
    options = [],
    disabled,
    onKeyDown = () => {},
}) => {
    return (
        <div
            className={twMerge(
                clsx("flex flex-col gap-2 w-full " + containerClassName)
            )}
        >
            <Select
                id={id}
                label={label}
                {...register(id, validate)}
                onChange={(value) => {
                    setValue(id, value, { shouldValidate: true });
                }}
                color="orange"
                className="!border-2 text-white font-bold ring-4 ring-transparent focus:ring-transparent no-scrollbar disabled:bg-inherit"
                menuProps={{
                    className: "bg-dark-main text-white",
                }}
                disabled={disabled}
            >
                {options.length &&
                    options.map((option) => (
                        <Option value={option.name} key={option.id}>
                            {option.name}
                        </Option>
                    ))}
            </Select>
            {validate && (
                <small className="text-sm text-red-600">{errors}</small>
            )}
        </div>
    );
};

export default InputSelect;
