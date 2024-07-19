import React from "react";
import { CategoryList, Slider, Cart, ProductList } from "src/components";
import { useAppStore } from "src/store/useAppStore";

const Home = () => {
    const { categoryList } = useAppStore();
    return (
        <div>
            <Slider />
            <CategoryList />
            <div className="mb-4">
                {categoryList.map((category, index) => (
                    <ProductList category={category} key={category._id} />
                ))}
            </div>
            <Cart />
        </div>
    );
};

export default Home;
