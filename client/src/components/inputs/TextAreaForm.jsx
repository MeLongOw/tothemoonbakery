import { Input, Textarea } from "@material-tailwind/react";
import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const InputForm = ({
    autoCapitalize = "on",
    label,
    id,
    containerClassName,
    type = "text",
    register = () => {},
    errors,
    validate,
    placeholder,
    onKeyDown = () => {},
}) => {
    return (
        <div
            className={twMerge(
                clsx("flex flex-col gap-2 w-full " + containerClassName)
            )}
        >
            <Textarea
                size="lg"
                autoCapitalize={autoCapitalize}
                type={type}
                id={id}
                color="orange"
                className="!border-2 text-white font-bold text-lg ring-4 ring-transparent focus:ring-transparent no-scrollbar"
                {...register(id, validate)}
                placeholder={placeholder}
                onKeyDown={onKeyDown}
                label={label}
                resize={true}
            />
            {validate && (
                <small className="text-sm text-red-600">{errors}</small>
            )}
        </div>
    );
};

export default InputForm;
