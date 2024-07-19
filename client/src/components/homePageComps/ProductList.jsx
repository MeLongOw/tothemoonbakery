import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

import { Element } from "react-scroll";
import { useAppStore } from "src/store/useAppStore";
import { ProductCard, ProductForm } from "..";
import { apiGetProducts } from "src/apis/product";

const ProductList = ({ category }) => {
    const [productList, setProductList] = useState([]);

    const { openModal, setModalChildren } = useAppStore();

    const handleOpenAddProduct = (category) => {
        openModal();
        setModalChildren(
            <ProductForm
                category={category}
                handleGetProductList={handleGetProductList}
            />
        );
    };

    const handleGetProductList = async () => {
        const response = await apiGetProducts(category);
        if (response.success) {
            setProductList(response.productList);
        }
    };

    useEffect(() => {
        handleGetProductList();
    }, []);

    return (
        <Element className="px-4" name={category._id}>
            <div className="border-b border-yellow-main pb-8">
                <h3 className="mt-8 px-4 text-3xl font-bold text-yellow-main uppercase italic flex gap-4 items-center">
                    <span> {category.name}</span>
                    <span>
                        <IoMdAddCircleOutline
                            className="cursor-pointer"
                            onClick={() => handleOpenAddProduct(category)}
                        />
                    </span>
                </h3>
                <div className="grid grid-cols-4 gap-4 mt-4">
                    {productList.map((el) => (
                        <ProductCard
                            product={el}
                            category={category}
                            key={el._id}
                            handleGetProductList={handleGetProductList}
                        />
                    ))}
                </div>
            </div>
        </Element>
    );
};

export default ProductList;
