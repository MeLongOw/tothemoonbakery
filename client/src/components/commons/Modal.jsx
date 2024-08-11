import { Drawer } from "@material-tailwind/react";
import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useAppStore } from "src/store/useAppStore";

const Modal = () => {
    const { isShowModal, closeModal, modalChildren } = useAppStore();
    return (
        <div className="w-full flex">
            <Drawer
                open={isShowModal}
                placement="bottom"
                className="bg-transparent"
                size={"90vh"}
            >
                <div className="w-full flex justify-center bg-transparent">
                    <div className="relative flex flex-col px-8 w-main h-[90vh] bg-card text-white border-orange-main border-t-2 border-x-2 shadow-2xl rounded-t-xl">
                        <div className="relative py-8">
                            <IoMdCloseCircleOutline
                                size={36}
                                onClick={closeModal}
                                className="cursor-pointer absolute top-8 right-4  text-orange-main"
                            />
                        </div>
                        <div className="flex-1 overflow-y-scroll flex flex-col px-2">
                            {modalChildren}
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default Modal;
