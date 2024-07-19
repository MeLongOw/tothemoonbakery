import React from "react";
import { Outlet } from "react-router-dom";
import { Element } from "react-scroll";
import { Header } from "src/components";

const PublicLayout = () => {
    return (
        <main className="w-full flex justify-center overflow-hidden">
            <Element
                className="relative w-main text-white bg-dark-main h-[100vh] overflow-y-scroll"
                id="main"
            >
                <Header />
                <div className="">
                    <Outlet />
                </div>
            </Element>
        </main>
    );
};

export default PublicLayout;
