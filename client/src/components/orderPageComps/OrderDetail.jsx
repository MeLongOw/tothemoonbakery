import React from "react";
import { formatMoney } from "src/utils/helper";
import noImage from "src/assets/img/no-image.png";
import { Button } from "@material-tailwind/react";
import { apiUpdateStatusOrder } from "src/apis/order";
import { useAppStore } from "src/store/useAppStore";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const OrderDetail = ({ id, cart, note, status, fetch }) => {
    const { closeModal } = useAppStore();
    const handleChangeStatus = async (status) => {
        Swal.fire({
            title: "Xác nhận xoá sản phẩm?",

            showCancelButton: true,
            showConfirmButton: true,
            reverseButtons: true,
            showCloseButton: true,
            icon: "question",
            iconColor: "#f0932b",
            customClass: {
                title: "text-orange-main italic",
                popup: "bg-dark-main",
                confirmButton: "bg-orange-main w-[84px]",
                container: "z-[99999]",
            },
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                const response = await apiUpdateStatusOrder(id, { status });
                if (response.success) {
                    toast.success("Cập nhật thành công", { theme: "dark" });
                    closeModal();
                    fetch();
                }
                if (!response.success) {
                    toast.error("Cập nhật thất bại! Có lỗi xảy ra", {
                        theme: "dark",
                    });
                }
            }
        });
    };

    return (
        <div className="h-full flex flex-col">
            <h4 className="text-center font-bold uppercase text-xl mb-4 text-orange-main">
                Chi tiết đơn hàng
            </h4>
            <div className="flex justify-between items-center border-b border-orange-main gap-4">
                <div>
                    <div className="font-semibold italic uppercase text-xl text-red-400">
                        Ghi chú
                    </div>
                    <div className="italic py-2 ">
                        {note || (
                            <span className="opacity-50">
                                (Không có ghi chú)
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button
                        size="md"
                        color="white"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleChangeStatus("cancel");
                        }}
                    >
                        Huỷ đơn hàng
                    </Button>

                    {status === "pending" && (
                        <Button
                            size="md"
                            color="orange"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleChangeStatus("confirmed");
                            }}
                        >
                            Xác nhận đã thanh toán
                        </Button>
                    )}

                    {status === "confirmed" && (
                        <Button
                            size="md"
                            color="orange"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleChangeStatus("completed");
                            }}
                        >
                            Đã hoàn thành
                        </Button>
                    )}
                </div>
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
                <div className="flex-1 py-4 overflow-y-scroll px-2 flex flex-col gap-2">
                    {cart.length &&
                        cart.map((el) => (
                            <div className="grid grid-cols-8 gap-4 mt-4">
                                <div className="relative col-span-1 aspect-square rounded-lg w-full">
                                    {el?.product?.imageUrl && (
                                        <img
                                            src={el?.product?.imageUrl}
                                            className="rounded-lg w-full aspect-square object-cover object-center"
                                        />
                                    )}
                                    {!el?.product?.imageUrl && (
                                        <img
                                            src={noImage}
                                            className="rounded-lg w-full aspect-square object-cover object-center"
                                        />
                                    )}
                                </div>
                                <div className="col-span-5 flex flex-col gap-1">
                                    <div className="text-orange-main font-semibold text-lg">
                                        {el?.product.name}
                                    </div>
                                    <div className="italic flex gap-2">
                                        {el?.optionsCheck?.map(
                                            (option, index) => (
                                                <div
                                                    className="flex gap-2"
                                                    key={el.id + option._id}
                                                >
                                                    {index !== 0 && (
                                                        <div>/</div>
                                                    )}
                                                    <div>{option.name}</div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <div className="text-green-400">
                                        {`Đơn giá: ${formatMoney(
                                            +el.product.price +
                                                +el.optionsCheck.reduce(
                                                    (
                                                        accumulator,
                                                        currentValue
                                                    ) =>
                                                        accumulator +
                                                        +currentValue.price,
                                                    0
                                                )
                                        )} VND`}
                                    </div>
                                </div>

                                <div className="col-span-2 flex flex-col gap-2 items-end">
                                    <div className="text-green-400 font-bold">{`${formatMoney(
                                        +el.product.price +
                                            +el.optionsCheck.reduce(
                                                (accumulator, currentValue) =>
                                                    accumulator +
                                                    +currentValue.price,
                                                0
                                            ) *
                                                el.amount
                                    )} VND`}</div>
                                    <div>Số lượng: {el.amount}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
        // <div>
        //     <h4 className="text-center font-bold uppercase text-xl text-orange-main">
        //         Chi tiết đơn hàng
        //     </h4>
        //     <div>
        //         {cart.map((el) => (
        //             <div className="grid grid-cols-8 gap-4 mt-4">
        //                 <div className="relative col-span-1 aspect-square rounded-lg w-full">
        //                     {el?.product?.imageUrl && (
        //                         <img
        //                             src={el?.product?.imageUrl}
        //                             className="rounded-lg w-full aspect-square object-cover object-center"
        //                         />
        //                     )}
        //                     {!el?.product?.imageUrl && (
        //                         <img
        //                             src={noImage}
        //                             className="rounded-lg w-full aspect-square object-cover object-center"
        //                         />
        //                     )}
        //                 </div>
        //                 <div className="col-span-5 flex flex-col gap-1">
        //                     <div className="text-orange-main font-semibold text-lg">
        //                         {el?.product.name}
        //                     </div>
        //                     <div className="italic flex gap-2">
        //                         {el?.optionsCheck?.map((option, index) => (
        //                             <div
        //                                 className="flex gap-2"
        //                                 key={el.id + option._id}
        //                             >
        //                                 {index !== 0 && <div>/</div>}
        //                                 <div>{option.name}</div>
        //                             </div>
        //                         ))}
        //                     </div>
        //                     <div className="text-green-400">
        //                         {`Đơn giá: ${formatMoney(
        //                             +el.product.price +
        //                                 +el.optionsCheck.reduce(
        //                                     (accumulator, currentValue) =>
        //                                         accumulator +
        //                                         +currentValue.price,
        //                                     0
        //                                 )
        //                         )} VND`}
        //                     </div>
        //                 </div>
        //                 <div className="col-span-2 flex flex-col gap-2 items-end">
        //                     <div className="text-green-400 font-bold">{`${formatMoney(
        //                         +el.product.price +
        //                             +el.optionsCheck.reduce(
        //                                 (accumulator, currentValue) =>
        //                                     accumulator + +currentValue.price,
        //                                 0
        //                             ) * el.amount
        //                     )} VND`}</div>
        //                     <div>Số lượng: {el.amount}</div>
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        // </div>
    );
};

export default OrderDetail;
