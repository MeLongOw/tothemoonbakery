import React, { useMemo, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { IoIosEye } from "react-icons/io";
import { formatMoney } from "src/utils/helper";
import { MdModeEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAppStore } from "src/store/useAppStore";
import { DetailProduct, ProductForm } from "..";
import { apiDeleteProduct, apiToggleIsShowProduct } from "src/apis/product";
import noImage from "src/assets/img/no-image.png";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useUserStore } from "src/store/useUserStore";

const ProductCard = ({
    product,
    category,
    handleGetProductList = () => {},
}) => {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const { openModal, setModalChildren } = useAppStore();
    const { current } = useUserStore();

    const handleEdit = () => {
        openModal();
        setModalChildren(
            <ProductForm
                product={product}
                category={category}
                handleGetProductList={handleGetProductList}
            />
        );
    };

    const handleDelete = async () => {
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
            },
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                const response = await apiDeleteProduct(product._id);
                if (response.success) {
                    toast.success("Xoá sản phẩm thành công", { theme: "dark" });
                    handleGetProductList();
                }
                if (!response.success) {
                    toast.success("Đã có lỗi xảy ra", { theme: "dark" });
                    handleGetProductList();
                }
            }
        });
    };

    const handleToggleShow = async () => {
        const response = await apiToggleIsShowProduct(product._id);
        if (response.success) {
            if (response.product.isShow) {
                toast.success("Sản phẩm đã được hiển thị", { theme: "dark" });
                handleGetProductList();
            }
            if (!response.product.isShow) {
                toast.success("Sản phẩm đã được ẩn", { theme: "dark" });
                handleGetProductList();
            }
        }
        if (!response.success) {
            toast.error("Đã có lỗi xảy ra", { theme: "dark" });
        }
    };

    const handleShowDetail = () => {
        openModal();
        setModalChildren(<DetailProduct product={product} />);
    };

    useMemo(() => {
        if (!product.optionList?.length) {
            setMinPrice(+product.price);
            setMaxPrice(0);
        }
        if (product.optionList?.length) {
            const minOfOption = product.optionList
                .map((el) => Math.min(...el.subOptions.map((el) => el.price)))
                .reduce((acc, curr) => acc + parseInt(curr), 0);
            const maxOfOption = product.optionList
                .map((el) => Math.max(...el.subOptions.map((el) => el.price)))
                .reduce((acc, curr) => acc + parseInt(curr), 0);

            setMinPrice(+product.price + +minOfOption);

            setMaxPrice(+product.price + +maxOfOption);
        }
    }, [product]);

    return (
        <div
            className="group relative flex flex-col bg-card border-orange-yellow-main border-2 shadow-2xl p-2 rounded-lg hover:animate-pulsate-fwd cursor-pointer "
            onClick={handleShowDetail}
        >
            {current?.role === "admin" && (
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <div
                        className="aspect-square bg-red-500 p-2 rounded-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit();
                        }}
                    >
                        <MdModeEdit />
                    </div>
                    <div
                        className="aspect-square bg-red-500 p-2 rounded-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                    >
                        <MdDelete />
                    </div>
                    <div
                        className={`aspect-square ${
                            product.isShow ? "bg-red-500" : "bg-blue-gray-400"
                        }  p-2 rounded-full`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggleShow();
                        }}
                    >
                        <FaEye />
                    </div>
                </div>
            )}
            <div className="relative w-full aspect-square rounded-lg">
                {product?.imageUrl && (
                    <img
                        src={product.imageUrl}
                        className="rounded-md object-center object-cover w-full aspect-square border-2 border-black"
                    />
                )}
                {!product?.imageUrl && (
                    <img
                        src={noImage}
                        className="rounded-md object-center object-cover w-full aspect-square"
                    />
                )}
                <div className="absolute w-full aspect-square flex justify-center items-center top-0">
                    <div className="hidden group-hover:block rounded-full border-2 p-1 border-orange-main">
                        <IoIosEye size={32} className="text-orange-main" />
                    </div>
                </div>
            </div>
            <div className="flex-1 mt-4 flex flex-col justify-between">
                <div className="">
                    <h4 className="text-center text-orange-yellow-main capitalize text-lg font-bold">
                        {product.name}
                    </h4>
                    <div className="text-center text-green-400 font-semibold text-base mt-2">
                        {`${formatMoney(minPrice)} ${
                            maxPrice > minPrice
                                ? `- ${formatMoney(maxPrice)}`
                                : ``
                        }
                        VND`}
                    </div>
                </div>

                <div className="flex justify-center items-center gap-2 mt-4 group-hover:text-orange-main">
                    Xem chi tiết <BiDetail />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
