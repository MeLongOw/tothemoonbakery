import { Drawer } from "@material-tailwind/react";
import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useAppStore } from "src/store/useAppStore";

const Modal = () => {
    const { isShowModal, closeModal, modalChildren } = useAppStore();
    return (
        <div className="w-full flex justify-center">
            <Drawer
                open={isShowModal}
                onClose={closeModal}
                placement="bottom"
                className="bg-transparent"
                size={'90vh'}
            >
                <div className="w-full flex justify-center bg-transparent">
                    <div className="relative px-8 w-main h-[90vh] bg-card text-white border-orange-main border-t-2 border-x-2 shadow-2xl rounded-t-xl">
                        <IoMdCloseCircleOutline
                            size={32}
                            onClick={closeModal}
                            className="cursor-pointer absolute top-8 right-8  text-orange-main"
                        />
                        <div className="pt-16 h-full flex flex-col">
                            {modalChildren}
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default Modal;
