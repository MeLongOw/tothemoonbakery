import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
    apiCreateOrUpdateCategories,
    apiDeleteCategories,
    apiGetCategories,
} from "src/apis/category";
import { useAppStore } from "src/store/useAppStore";
import { v4 as uuidv4 } from "uuid";

import { InputDynamic } from "..";

const CategoryForm = () => {
    const [isfetching, setIsfetching] = useState(false);
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
        const categories = categoryList
            .map((el, index) => {
                const { value, dbId } = el;
                return { name: value, order: index, id: dbId };
            })
            .filter((el) => {
                return el.name;
            });

        const responseCreateAndUpdate = await apiCreateOrUpdateCategories({
            categories,
        });
        const responseDelete = await apiDeleteCategories({
            categories: deleteList,
        });
        if (responseCreateAndUpdate.success && responseDelete.success) {
            toast.success("Cập nhật thành công", { theme: "dark" });
            closeModal();
        } else {
            toast.error("Đã có lỗi xảy ra", { theme: "dark" });
        }
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
                    <Button size="lg" color="orange" onClick={onSubmit}>
                        Lưu
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;
