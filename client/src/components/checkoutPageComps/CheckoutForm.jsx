import {
    Button,
    Input,
    Option,
    Select,
    Spinner,
    Step,
    Stepper,
    Alert,
} from "@material-tailwind/react";
import { MdPersonOutline } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputForm, InputSelect, LocationTable, TextAreaForm } from "..";
import { IoCardOutline } from "react-icons/io5";
// import { districtAndWard } from "src/utils/location";
import { apiCreateOrder } from "src/apis/order";
import { toast } from "react-toastify";
import { useUserStore } from "src/store/useUserStore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { useAppStore } from "src/store/useAppStore";

const CheckOutForm = ({ total, setDeliFee }) => {
    const { districtAndWard } = useAppStore();
    const navigate = useNavigate();
    const [districtList, setDistrictList] = useState([]);
    const [isDisableSelectWard, setIsDisableSelectWard] = useState(true);
    const [wardList, setWardList] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);
    const [orderId, setOrderId] = useState();

    const { cart, checkCart, clearCart } = useUserStore();
    const { openModal, setModalChildren } = useAppStore();

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();

    const onSubmit = async (data) => {
        const { name, phone, email, address, note } = data;
        const response = await apiCreateOrder({
            name,
            phone,
            email,
            address,
            note,
            cart,
        });

        if (response.success) {
            setOrderId(response.order.orderId);
            handleNext();
        }
        if (!response.success) {
            toast.error("Đã có lỗi xảy ra", { theme: "dark" });
        }
    };

    const handleEditLocation = () => {
        openModal();
        setModalChildren(<LocationTable />);
    };

    useEffect(() => {
        setWardList(
            districtAndWard.find((el) => el.id.toString() === watch("district"))
                ?.wards
        );
        if (watch("district")) {
            setIsDisableSelectWard(false);
        }
        if (!watch("district")) {
            setIsDisableSelectWard(true);
        }
    }, [watch("district")]);

    useEffect(() => {
        if (watch("ward")) {
            setDeliFee(wardList.find((ward) => ward.id === watch("ward")).fee);
        }
    }, [watch("ward")]);

    useEffect(() => {
        checkCart();
        setDistrictList(
            districtAndWard
                .map((el) => {
                    const { wards, ...rest } = el;
                    return rest;
                })
                .sort((a, b) => a.id - b.id)
        );
    }, []);
    return (
        <div className="bg-card border-black shadow-xl border-2 rounded-xl p-4">
            <div>
                <div className="px-20 mb-8">
                    <Stepper
                        activeStep={activeStep}
                        isLastStep={(value) => setIsLastStep(value)}
                        isFirstStep={(value) => setIsFirstStep(value)}
                        lineClassName="bg-white"
                        activeLineClassName="bg-gradient-to-r from-orange-main via-orange-yellow-main to-yellow-main"
                    >
                        <Step
                            // onClick={() => setActiveStep(0)}
                            className="text-black bg-white"
                            activeClassName=" bg-gradient-to-r from-orange-main via-orange-yellow-main to-yellow-main"
                            completedClassName="bg-gradient-to-r from-orange-main via-orange-yellow-main to-yellow-main"
                        >
                            <MdPersonOutline size={28} />
                        </Step>
                        <Step
                            // onClick={() => setActiveStep(1)}
                            className="text-black bg-white"
                            activeClassName="bg-gradient-to-r from-orange-main via-orange-yellow-main to-yellow-main"
                            completedClassName="bg-gradient-to-r from-orange-main via-orange-yellow-main to-yellow-main"
                        >
                            <IoCardOutline size={24} />
                        </Step>
                    </Stepper>
                </div>
                {activeStep === 0 && (
                    <div>
                        <div className="uppercase font-semibold text-orange-main">
                            Thông tin đơn hàng
                        </div>
                        <div className="mt-4 flex flex-col gap-4">
                            <InputForm
                                id="name"
                                label={"Họ và tên"}
                                validate={{
                                    required: "Không được bỏ trống",
                                }}
                                register={register}
                                errors={errors?.name?.message}
                            />
                            <InputForm
                                id="phone"
                                label={"Số điện thoại"}
                                validate={{
                                    required: "Không được bỏ trống",
                                    pattern: {
                                        value: /(0[3|5|7|8|9])+([0-9]{8})\b/,
                                        message: "Số điện thoại không hợp lệ",
                                    },
                                }}
                                register={register}
                                errors={errors?.phone?.message}
                            />
                            <InputForm
                                id="email"
                                label={"Email"}
                                validate={{
                                    required: "Không được bỏ trống",
                                    pattern: {
                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Email không hợp lệ",
                                    },
                                }}
                                register={register}
                                errors={errors?.email?.message}
                            />
                            <InputForm
                                id="address"
                                label={"Địa chỉ"}
                                validate={{
                                    required: "Không được bỏ trống",
                                }}
                                register={register}
                                errors={errors?.address?.message}
                            />

                            <div className="flex gap-2 relative">
                                <InputSelect
                                    id="district"
                                    label={"Quận/Huyện"}
                                    register={register}
                                    validate={{
                                        required: "Không được bỏ trống",
                                    }}
                                    setValue={setValue}
                                    errors={errors?.district?.message}
                                    options={districtList}
                                />
                                <InputSelect
                                    id="ward"
                                    label={"Phường/Xã"}
                                    register={register}
                                    validate={{
                                        required: "Không được bỏ trống",
                                    }}
                                    setValue={setValue}
                                    errors={errors?.ward?.message}
                                    options={wardList}
                                    disabled={isDisableSelectWard}
                                />
                                <div
                                    className="p-2 aspect-square bg-red-400 absolute right-6 cursor-pointer translate-y-[-50%] rounded-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditLocation();
                                    }}
                                >
                                    <MdEdit size={20} />
                                </div>
                            </div>

                            <TextAreaForm
                                id="note"
                                label={"Ghi chú (tối đa 500 ký tự)"}
                                validate={{
                                    maxLength: {
                                        value: 500,
                                        message:
                                            "Không được vượt quá 500 ký tự",
                                    },
                                }}
                                register={register}
                                errors={errors?.note?.message}
                            />
                            <div className="flex justify-end">
                                <Button
                                    color="orange"
                                    // disabled={true}
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <Spinner />
                                    ) : (
                                        " Xác nhận để nhận QR thanh toán"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                {activeStep === 1 && (
                    <div>
                        <div className="uppercase font-semibold text-orange-main">
                            Thanh toán đơn hàng
                        </div>
                        <div className="mt-4 italic">
                            <p className="text-justify">
                                Vui lòng quét QR bên dưới đây để thực hiện thanh
                                toán. Sau khi thực hiện thanh toán, quý khách
                                vui lòng bấm xác nhận và chờ đợi trong ít phút
                                để shop tiến hành kiểm tra và phản hồi lại quý
                                khách thông qua mail hoặc số điện thoại trong
                                thời gian sớm nhất. Xin chân thành cảm ơn quý
                                khách!
                            </p>
                        </div>
                        <div className="mt-4 flex flex-col gap-4">
                            <div className="flex items-center justify-center">
                                <div className="p-4 border border-orange-main rounded-lg">
                                    <img
                                        src={`https://img.vietqr.io/image/546034-0906243664-compact.png?amount=${total}&addInfo=${orderId}`}
                                        alt="qrcode"
                                        className="w-[270px] rounded-lg "
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <Button
                                    color="orange"
                                    // disabled={true}
                                    onClick={() => {
                                        Swal.fire({
                                            title: "Xác nhận đã thanh toán",
                                            showCancelButton: true,
                                            showConfirmButton: true,
                                            reverseButtons: true,
                                            showCloseButton: true,
                                            html: "<div class='text-white italic text-base'>Sau khi nhấn xác nhận giỏ hàng của quý khách sẽ được làm mới! Hãy chắc chắn đã thực hiện thanh toán</div>",
                                            icon: "question",
                                            iconColor: "#f0932b",
                                            customClass: {
                                                title: "text-orange-main italic",
                                                popup: "bg-dark-main",
                                                confirmButton:
                                                    "bg-orange-main w-[84px]",
                                            },
                                        }).then(({ isConfirmed }) => {
                                            if (isConfirmed) {
                                                navigate("/");
                                                clearCart();
                                            }
                                        });
                                    }}
                                >
                                    Xác nhận đã thanh toán
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckOutForm;
