import { Button, Option, Select } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { IoIosRemoveCircle } from "react-icons/io";
import { InputForm, InputImage, InputSelect, TextAreaForm } from "..";
import { useAppStore } from "src/store/useAppStore";
import { apiCreateProduct, apiUpdateProduct } from "src/apis/product";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ProductForm = ({
    product,
    category,
    handleGetProductList = () => {},
}) => {
    //   const [images, setImages] = useState([]);
    const {
        formState: { errors, isSubmitting },
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
        reset,
    } = useForm({
        defaultValues: {
            category: category._id,
            name: "",
            price: "",
            description: "",
            optionList: [
                { name: "", subOptions: [{ id: uuidv4(), name: "" }] },
            ],
        },
    });

    const { fields, append, remove, update } = useFieldArray({
        name: "optionList",
        control,
        rules: {
            required: "phải có ít nhất 1 lựa chọn",
        },
    });
    const { categoryList, closeModal } = useAppStore();

    const onSubmit = async (data) => {
        Swal.fire({
            title: "Xác nhận lưu?",
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
                const { category, ...copyData } = data;
                if (product?._id) {
                    const payload = {
                        ...copyData,
                        categoryId: category,
                    };
                    const response = await apiUpdateProduct(
                        payload,
                        product._id
                    );
                    if (response.success) {
                        toast.success("Cập nhật sản phẩm thành công", {
                            theme: "dark",
                        });
                        handleGetProductList();
                        reset();
                        // setImages([]);
                        closeModal();
                    }
                    if (!response.success) {
                        toast.error(
                            "Cập nhật sản phẩm thất bại. Có lỗi xảy ra",
                            {
                                theme: "dark",
                            }
                        );
                    }
                }
                if (!product?._id) {
                    const payload = { ...copyData, categoryId: category };
                    const response = await apiCreateProduct(payload);
                    if (response.success) {
                        toast.success("Cập nhật sản phẩm thành công", {
                            theme: "dark",
                        });
                        closeModal();
                        handleGetProductList();
                        reset();
                        setImages([]);
                    }
                    if (!response.success) {
                        toast.error(
                            "Cập nhật sản phẩm thất bại. Có lỗi xảy ra",
                            {
                                theme: "dark",
                            }
                        );
                    }
                }
            }
        });
    };

    useEffect(() => {
        if (product) {
            const { name, description, category, price, optionList, imageUrl } =
                product;
            reset({
                name,
                description,
                categoryId: category,
                price,
                optionList,
                imageUrl,
            });
        }
    }, [product, reset]);

    return (
        <div className="h-full flex flex-col">
            <div className="w-full text-center text-2xl font-bold text-orange-main capitalize italic">
                Cập nhật sản phẩm
            </div>
            <form className="flex flex-col flex-1 overflow-hidden">
                <div className="flex-1 py-4 overflow-y-scroll scroll-smooth flex flex-col gap-4">
                    <div>
                        {/* <InputImage images={images} setImages={setImages} /> */}
                        {/* <Select
                            color="orange"
                            className="!border-2 text-white font-bold ring-4 ring-transparent focus:ring-transparent text-sm"
                            labelProps={{
                                className:
                                    "text-orange-main peer-placeholder-shown:text-white",
                            }}
                            label="Danh mục"
                            menuProps={{
                                className: "bg-dark-main text-white",
                            }}
                            value={selectedCategory}
                            onChange={(category) => {
                                setSelectedCategory(category._id);
                            }}
                        >
                            {categoryList.map((category) => (
                                <Option key={category._id} value={category._id}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select> */}
                        <InputSelect
                            defaultValue={category._id}
                            id="category"
                            label={"Danh mục"}
                            register={register}
                            validate={{
                                required: "Không được bỏ trống",
                            }}
                            setValue={setValue}
                            errors={errors?.category?.message}
                            options={categoryList}
                        />
                    </div>
                    <InputForm
                        label={"Ảnh sản phẩm"}
                        register={register}
                        id="imageUrl"
                    />
                    <InputForm
                        label={"Tên sản phẩm"}
                        errors={errors?.name?.message}
                        register={register}
                        id="name"
                        validate={{ required: "không được bỏ trống" }}
                    />
                    <InputForm
                        label={"Giá"}
                        errors={errors?.price?.message}
                        register={register}
                        id="price"
                        validate={{
                            required: "không được bỏ trống",
                            pattern: {
                                value: /^[1-9]\d*$/,
                                message: "Số tiền không hợp lệ",
                            },
                        }}
                    />
                    <TextAreaForm
                        label={"Mô tả"}
                        errors={errors?.description?.message}
                        register={register}
                        id="description"
                        validate={{ required: "không được bỏ trống" }}
                    />
                    <div>
                        <div className="flex flex-col gap-4">
                            {fields.map((field, indexOption) => (
                                <div
                                    key={field.id}
                                    className="relative flex gap-2"
                                >
                                    <div className="relative">
                                        <InputForm
                                            label={`Lựa chọn ${
                                                indexOption + 1
                                            }`}
                                            register={register}
                                            id={`optionList.${indexOption}.name`}
                                            validate={{
                                                required: "Không được bỏ trống",
                                            }}
                                            errors={
                                                errors?.optionList?.[
                                                    indexOption
                                                ]?.name?.message
                                            }
                                        />
                                        <div
                                            onClick={() => {
                                                if (
                                                    getValues("optionList")
                                                        .length > 1
                                                )
                                                    remove(indexOption);
                                            }}
                                            className="absolute w-8 aspect-square bg-red-400 top-0 right-4 translate-y-[-50%] cursor-pointer rounded-full flex justify-center items-center"
                                        >
                                            <IoIosRemoveCircle size={20} />
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col gap-3">
                                        {field?.subOptions?.map(
                                            (subOption, indexSubOption) => (
                                                <div
                                                    key={`${subOption.id}_${subOption._id}_${field.id}`}
                                                    className="relative"
                                                >
                                                    <div className="flex">
                                                        <InputForm
                                                            label={`Lựa chọn con ${
                                                                indexSubOption +
                                                                1
                                                            }`}
                                                            register={register}
                                                            id={`optionList.${indexOption}.subOptions.${indexSubOption}.name`}
                                                            validate={{
                                                                required:
                                                                    "Không được bỏ trống",
                                                            }}
                                                            errors={
                                                                errors
                                                                    ?.optionList?.[
                                                                    indexOption
                                                                ]?.subOptions?.[
                                                                    indexSubOption
                                                                ]?.name?.message
                                                            }
                                                        />
                                                        <span>-</span>
                                                        <InputForm
                                                            label="Giá"
                                                            register={register}
                                                            id={`optionList.${indexOption}.subOptions.${indexSubOption}.price`}
                                                            validate={{
                                                                required:
                                                                    "Không được bỏ trống",
                                                                pattern: {
                                                                    value: /^\d+$/,
                                                                    message:
                                                                        "Số tiền không hợp lệ",
                                                                },
                                                            }}
                                                            errors={
                                                                errors
                                                                    ?.optionList?.[
                                                                    indexOption
                                                                ]?.subOptions?.[
                                                                    indexSubOption
                                                                ]?.price
                                                                    ?.message
                                                            }
                                                        />
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            update(
                                                                indexOption,
                                                                {
                                                                    name: getValues(
                                                                        `optionList.${indexOption}.name`
                                                                    ),
                                                                    subOptions:
                                                                        [
                                                                            ...getValues(
                                                                                `optionList.${indexOption}.subOptions`
                                                                            ).filter(
                                                                                (
                                                                                    el,
                                                                                    index
                                                                                ) =>
                                                                                    index !==
                                                                                    indexSubOption
                                                                            ),
                                                                        ],
                                                                }
                                                            );
                                                        }}
                                                        className="absolute w-6 aspect-square bg-red-400 top-0 right-4 translate-y-[-50%] cursor-pointer rounded-full flex justify-center items-center"
                                                    >
                                                        <IoIosRemoveCircle
                                                            size={16}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        )}
                                        {/* <p>
                                            {
                                                errors?.optionList?.[
                                                    indexOption
                                                ]?.subOptions?.[indexSubOption]
                                                    ?.message
                                            }
                                        </p> */}

                                        <div className="flex justify-center">
                                            <Button
                                                size="md"
                                                color="white"
                                                onClick={() => {
                                                    update(indexOption, {
                                                        name: getValues(
                                                            `optionList.${indexOption}.name`
                                                        ),
                                                        subOptions: [
                                                            ...getValues(
                                                                `optionList.${indexOption}.subOptions`
                                                            ),
                                                            {
                                                                name: "",
                                                                id: uuidv4(),
                                                            },
                                                        ],
                                                    });
                                                }}
                                            >
                                                thêm
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-red-600">
                            {errors?.optionList?.["root"]?.message}
                        </p>
                        <div className="flex mt-4">
                            <Button
                                size="md"
                                color="white"
                                onClick={() => {
                                    append({
                                        name: "",
                                        subOptions: [
                                            { name: "", id: uuidv4() },
                                        ],
                                    });
                                }}
                            >
                                thêm
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end py-4 border-t border-orange-main">
                    <Button
                        size="lg"
                        color="orange"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Xác nhận
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
