import React, { useEffect, useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { FaEyeSlash, FaRegSave } from "react-icons/fa";

import { InputForm } from "..";
import { useAppStore } from "src/store/useAppStore";
import { IoEyeSharp } from "react-icons/io5";
import {
    apiToggleShowDistrict,
    apiToggleShowWard,
    apiUpdateFee,
} from "src/apis/location";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { formatMoney } from "src/utils/helper";

const LocationTable = () => {
    const { districtAndWard, getLocationList } = useAppStore();
    const [selectedDistrictId, setSelectedDistrictId] = useState(
        districtAndWard[0]._id
    );
    const [edittingId, setEdittingId] = useState();
    const {
        formState: { errors, isSubmitting },
        register,
        handleSubmit,
        reset,
        setValue,
        setFocus,
    } = useForm();

    const handleToggleShowDistrict = async (id) => {
        const response = await apiToggleShowDistrict(id);

        if (response.success) {
            toast.success("Cập nhật thành công", { theme: "dark" });
            getLocationList();
        }
        if (!response.success) {
            toast.error("Đã có lỗi xảy ra", { theme: "dark" });
        }
    };
    const toggleShowWard = async (wardId) => {
        const response = await apiToggleShowWard(selectedDistrictId, wardId);
        if (response.success) {
            toast.success("Cập nhật thành công", { theme: "dark" });
            getLocationList();
        }
        if (!response.success) {
            toast.error("Đã có lỗi xảy ra", { theme: "dark" });
        }
    };

    const onSubmit = async (data) => {
        const response = await apiUpdateFee(
            selectedDistrictId,
            edittingId,
            data
        );
        if (response.success) {
            setEdittingId();
            reset();
            toast.success("Cập nhật thành công", { theme: "dark" });
            getLocationList();
        }
        if (!response.success) {
            setEdittingId();
            reset();
            toast.error("Đã có lỗi xảy ra", { theme: "dark" });
        }
    };

    useEffect(() => {
        setEdittingId();
    }, [selectedDistrictId]);
    return (
        <div className="grid grid-cols-5 h-[80vh]">
            <div className=" col-span-1 flex flex-col gap-4 overflow-y-scroll overflow-x-hidden border-r-2 border-white px-2">
                {districtAndWard.map((el) => (
                    <div
                        key={el._id}
                        className={`cursor-pointer flex justify-between items-center ${
                            selectedDistrictId === el._id && "text-orange-main"
                        } ${!el.isShow && "opacity-40"}`}
                        onClick={() => {
                            setSelectedDistrictId(el._id);
                        }}
                    >
                        <span>{el.name}</span>
                        <span>
                            {el.isShow && (
                                <div>
                                    <IoEyeSharp
                                        size={20}
                                        className="text-white hover:text-orange-main cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggleShowDistrict(el._id);
                                        }}
                                    />
                                </div>
                            )}
                            {!el.isShow && (
                                <div>
                                    <FaEyeSlash
                                        size={20}
                                        className="text-white hover:text-orange-main cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggleShowDistrict(el._id);
                                        }}
                                    />
                                </div>
                            )}
                        </span>
                    </div>
                ))}
            </div>
            <div className="h-[80vh] col-span-4  px-4 flex flex-col">
                <div className="grid grid-cols-3 text-orange-main border-b border-b-orange-main pb-4 mb-2">
                    <div className="col-span-1">Phường</div>
                    <div className="col-span-1">Phí Ship</div>
                    <div className="col-span-1">Hoạt động</div>
                </div>
                <div className="flex-1 overflow-y-scroll">
                    {districtAndWard
                        .find((el) => el._id === selectedDistrictId)
                        .wards.map((el) => (
                            <div
                                key={el._id}
                                className={`grid grid-cols-3 pb-4 ${
                                    !el.isShow && "opacity-40"
                                }`}
                            >
                                <div>{el.name}</div>
                                <div className="flex gap-2 items-center px-4">
                                    {edittingId === el._id ? (
                                        <div className="flex items-center gap-4">
                                            <form>
                                                <InputForm
                                                    id="fee"
                                                    validate={{
                                                        reuquired:
                                                            "Không được bỏ trống",
                                                        pattern: {
                                                            value: /^[1-9]\d*$/,
                                                            message:
                                                                "Số tiền không hợp lệ",
                                                        },
                                                    }}
                                                    errors={
                                                        errors?.fee?.message
                                                    }
                                                    register={register}
                                                    className="rounded-lg !border-2 !border-white focus:!border-t-2 focus:!border-orange-main focus:ring-transparent"
                                                    labelProps={{
                                                        className:
                                                            "before:content-none after:content-none",
                                                    }}
                                                />
                                            </form>
                                            <div>
                                                <FaRegSave
                                                    size={24}
                                                    className="cursor-pointer hover:text-orange-main"
                                                    onClick={handleSubmit(
                                                        onSubmit
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <span>{formatMoney(el.fee)}</span>
                                            <span>
                                                <RiEdit2Line
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        setEdittingId(el._id);
                                                        setValue("fee", el.fee);
                                                        setFocus('fee')
                                                    }}
                                                />
                                            </span>
                                        </>
                                    )}
                                </div>
                                <div>
                                    {el.isShow && (
                                        <div>
                                            <IoEyeSharp
                                                size={20}
                                                className="text-white hover:text-orange-main cursor-pointer"
                                                onClick={() => {
                                                    toggleShowWard(el._id);
                                                }}
                                            />
                                        </div>
                                    )}
                                    {!el.isShow && (
                                        <div>
                                            <FaEyeSlash
                                                size={20}
                                                className="text-white hover:text-orange-main cursor-pointer"
                                                onClick={() => {
                                                    toggleShowWard(el._id);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default LocationTable;
