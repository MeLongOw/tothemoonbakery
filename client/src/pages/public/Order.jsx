import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import Datepicker from "react-tailwindcss-datepicker";
import { apiGetOrders } from "src/apis/order";
import { OrderDetail } from "src/components";
import { useAppStore } from "src/store/useAppStore";
import { formatMoney } from "src/utils/helper";

const Order = () => {
    const [status, setStatus] = useState("pending");
    const [orders, setOrders] = useState([]);
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });
    const { openModal, setModalChildren } = useAppStore();

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleGetOrders = async () => {
        const formattedDate = {
            startDate: moment(date.startDate).format("YYYY-MM-DD"),
            endDate: moment(date.endDate).add(1, "day").format("YYYY-MM-DD"),
        };

        const response = await apiGetOrders({ status, date: formattedDate });
        if (response.success) {
            setOrders(response.orders);
        }
    };

    const handleViewDetail = ({ cart, note, id }) => {
        openModal();
        setModalChildren(
            <OrderDetail
                id={id}
                cart={cart}
                note={note}
                status={status}
                fetch={handleGetOrders}
            />
        );
    };

    useEffect(() => {
        handleGetOrders();
    }, [status, date]);
    return (
        <div className="p-4 border-2 border-orange-main mt-8 mx-4 rounded-xl">
            <div className="">
                <h3 className="text-center text-orange-main italic text-2xl font-bold">
                    Quản lý đơn hàng
                </h3>
            </div>
            <div className="flex justify-evenly mt-8 font-bold text-lg border-b-2 border-orange-main pb-4 uppercase">
                <div
                    className={`cursor-pointer ${
                        status === "pending" && "text-orange-main"
                    }`}
                    onClick={() => {
                        setStatus("pending");
                    }}
                >
                    Chờ thanh toán
                </div>
                <div
                    className={`cursor-pointer ${
                        status === "confirmed" && "text-orange-main"
                    }`}
                    onClick={() => {
                        setStatus("confirmed");
                    }}
                >
                    Đã thanh toán
                </div>
                <div
                    className={`cursor-pointer ${
                        status === "completed" && "text-orange-main"
                    }`}
                    onClick={() => {
                        setStatus("completed");
                    }}
                >
                    Đã hoàn thành
                </div>
                <div
                    className={`cursor-pointer ${
                        status === "cancel" && "text-orange-main"
                    }`}
                    onClick={() => {
                        setStatus("cancel");
                    }}
                >
                    Đã huỷ
                </div>
            </div>
            <div className="mt-4">
                <Datepicker
                    value={date}
                    onChange={handleDateChange}
                    primaryColor="orange"
                    showShortcuts={true}
                    showFooter={true}
                    inputClassName=" bg-dark-main border-2 border-white text-white font-semibold rounded-lg w-[280px] text-center"
                    displayFormat={"DD/MM/YYYY"}
                    separator="-"
                    readOnly={true}
                    toggleClassName="hidden"
                />
            </div>
            <div>
                <div className="grid grid-cols-12 mt-4 border-2 border-orange-main p-4 rounded-t-lg text-green-400">
                    <div className="col-span-2 text-center font-bold px-3">
                        ID
                    </div>
                    <div className="col-span-2 text-center font-bold px-3">
                        Họ và tên
                    </div>
                    <div className="col-span-2 text-center font-bold px-3">
                        SĐT
                    </div>
                    <div className="col-span-3 text-center font-bold px-3">
                        Địa chỉ
                    </div>
                    <div className="col-span-2 text-center font-bold px-3">
                        Tổng tiền
                    </div>
                    <div className="col-span-1 text-center font-bold px-3">
                        Chi tiết
                    </div>
                </div>
                <div>
                    {orders.map((el) => (
                        <div
                            className="grid grid-cols-12 border-2 border-t-0 border-orange-main p-4 "
                            key={el._id}
                        >
                            <div className="col-span-2 text-center text-sm font-bold px-3">
                                {el.orderId}
                            </div>
                            <div className="col-span-2 text-center text-sm font-bold px-3">
                                {el.name}
                            </div>
                            <div className="col-span-2 text-center text-sm font-bold px-3">
                                {el.phone}
                            </div>
                            <div className="col-span-3 text-center text-sm font-bold px-3">
                                {el.address}
                            </div>
                            <div className="col-span-2 text-center text-sm font-bold px-3 text-green-600">
                                {formatMoney(
                                    el.cart.reduce(
                                        (accumulator, currentValue) => {
                                            const productPrice =
                                                +currentValue.product.price +
                                                +currentValue.optionsCheck.reduce(
                                                    (
                                                        accumulator,
                                                        currentValue
                                                    ) =>
                                                        accumulator +
                                                        +currentValue.price,
                                                    0
                                                );
                                            return accumulator + productPrice;
                                        },
                                        0
                                    )
                                )}
                            </div>
                            <div className="col-span-1 text-center flex justify-center items-center text-sm font-bold px-3">
                                <BiDetail
                                    size={20}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleViewDetail({
                                            id: el._id,
                                            cart: el.cart,
                                            note: el.note,
                                        });
                                    }}
                                    className="cursor-pointer hover:text-orange-main"
                                />
                            </div>
                        </div>
                    ))}
                    {!orders.length && (
                        <div className="flex justify-center border-2 border-t-0 border-orange-main p-4 ">
                            Hiện không có đơn hàng
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-12 border-2 border-t-0 border-orange-main p-4 rounded-b-lg ">
                    <div className="col-span-2 text-center text-sm font-bold px-3"></div>
                    <div className="col-span-2 text-center text-sm font-bold px-3"></div>
                    <div className="col-span-2 text-center text-sm font-bold px-3"></div>
                    <div className="col-span-3 text-end text-sm font-bold px-3">
                        Tổng thu
                    </div>
                    <div className="col-span-2 text-center text-sm font-bold px-3 text-green-600">
                        {formatMoney(
                            orders.reduce(
                                (accumulator, currentValue) =>
                                    accumulator +
                                    +currentValue.cart.reduce(
                                        (accumulator, currentValue) => {
                                            const productPrice =
                                                +currentValue.product.price +
                                                +currentValue.optionsCheck.reduce(
                                                    (
                                                        accumulator,
                                                        currentValue
                                                    ) =>
                                                        accumulator +
                                                        +currentValue.price,
                                                    0
                                                );
                                            return accumulator + productPrice;
                                        },
                                        0
                                    ),
                                0
                            )
                        )}
                    </div>
                    <div className="col-span-1 text-center text-sm font-bold px-3"></div>
                </div>
            </div>
        </div>
    );
};

export default Order;
