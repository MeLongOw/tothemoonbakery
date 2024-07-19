import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import path from "src/utils/path";
import {
    Cart,
    Checkout,
    Home,
    Login,
    PublicLayout,
    Register,
} from "./pages/public";

import { Modal } from "./components";
import { useUserStore } from "./store/useUserStore";
import { useAppStore } from "./store/useAppStore";

const App = () => {
    const { cart, getCurrent, checkCart } = useUserStore();
    const {
        categoryList = [],
        getCategoryList,
        setIsFetchingCategory,
    } = useAppStore();

    useEffect(() => {
        getCurrent();
        getCategoryList();
        checkCart(cart);
    }, []);

    useEffect(() => {
        setIsFetchingCategory(true);

        if (categoryList?.length) {
            setIsFetchingCategory(false);
        }
    }, [categoryList]);

    return (
        <div className="font-montserrat">
            <Routes>
                <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
                    <Route path={path.HOME} element={<Home />}></Route>
                    <Route path={path.CART} element={<Cart />}></Route>
                    <Route path={path.LOGIN} element={<Login />}></Route>
                    <Route path={path.REGISTER} element={<Register />}></Route>
                    <Route path={path.CHECKOUT} element={<Checkout />}></Route>
                </Route>
            </Routes>
            <Modal />
        </div>
    );
};

export default App;
