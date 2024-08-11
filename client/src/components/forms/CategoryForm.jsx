import { Button, Input, Spinner } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
    apiCreateOrUpdateCategories,
    apiDeleteCategories,
    apiGetCategories,
} from "src/apis/category";
import { useAppStore } from "src/store/useAppStore";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

import { InputDynamic } from "..";

const CategoryForm = () => {
    const [isfetching, setIsfetching] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [deleteList, setDeleteList] = useState([]);
    const { closeModal } = useAppStore();

    const handleAdd = () => {
        setCategoryList((prev) => [
            ...prev,
            { value: "", id: uuidv4(), dbId: "" },
        ]);
    };

    const handleRemove = (item) => {
        setCategoryList(() => [
            ...categoryList.filter((el) => el.id !== item.id),
        ]);
        setDeleteList((prev) => [...prev, item.dbId]);
    };

    const onSubmit = async () => {
        Swal.fire({
            title: "Xác nhận lưu thay đổi?",
            showCancelButton: true,
            showConfirmButton: true,
            reverseButtons: true,
            showCloseButton: true,
            html: "<div class='text-white italic text-base'></div>",
            icon: "question",
            iconColor: "#f0932b",
            customClass: {
                title: "text-orange-main italic",
                popup: "bg-dark-main",
                confirmButton: "bg-orange-main w-[84px]",

                container: "z-[9999]",
            },
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                setIsSubmitting(true);
                const categories = categoryList
                    .map((el, index) => {
                        const { value, dbId } = el;
                        return { name: value, order: index, id: dbId };
                    })
                    .filter((el) => {
                        return el.name;
                    });

                const responseCreateAndUpdate =
                    await apiCreateOrUpdateCategories({
                        categories,
                    });
                const responseDelete = await apiDeleteCategories({
                    categories: deleteList,
                });
                if (responseCreateAndUpdate.success && responseDelete.success) {
                    setIsSubmitting(false);
                    toast.success("Cập nhật thành công", { theme: "dark" });
                    closeModal();
                } else {
                    toast.error("Đã có lỗi xảy ra", { theme: "dark" });
                    setIsSubmitting(false);
                }
            }
        });
    };

    const handleGetCategories = async () => {
        setIsfetching(true);
        const response = await apiGetCategories();
        if (response.success) {
            setIsfetching(false);
            const formattedCategories = response.categories.map((el) => {
                const { name, _id } = el;
                return { value: name, dbId: _id, id: uuidv4() };
            });
            setCategoryList(formattedCategories);
        }
    };
    useEffect(() => {
        handleGetCategories();
    }, []);

    return (
        <div className="h-full flex flex-col">
            <div className="w-full text-center text-2xl font-bold text-orange-main capitalize italic">
                Chỉnh sửa danh mục
            </div>
            <form className="flex flex-col flex-1 overflow-hidden">
                <div className="flex-1 py-4 overflow-y-scroll scroll-smooth">
                    <InputDynamic
                        items={categoryList}
                        setItems={setCategoryList}
                        handleAdd={handleAdd}
                        handleRemove={handleRemove}
                    />
                </div>
                <div className="w-full flex justify-end py-4 border-t border-orange-main">
                    <Button
                        size="lg"
                        color="orange"
                        onClick={onSubmit}
                        className="flex gap-2"
                    >
                        Lưu {isSubmitting && <Spinner className="h-4 w-4" />}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;
