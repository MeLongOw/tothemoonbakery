import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { RiCellphoneFill } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const TopHeader = () => {
    return (
        <div className="bg-orange-main h-[32px] flex items-center px-4 justify-between">
            <div className="flex gap-4 items-center">
                <span className="flex items-center gap-2">
                    <MdEmail size={20} /> tothemoonbakery@gmail.com
                </span>
                <span>|</span>
                <span>
                    <a
                        target="_blank"
                        href="https://www.facebook.com/tothemoon.cake"
                    >
                        <FaFacebook size={20} />
                    </a>
                </span>
                <span>|</span>
                <span>
                    <a
                        target="_blank"
                        href="https://www.instagram.com/tothemoon_bakeryhouse/"
                    >
                        <FaInstagram size={20} />
                    </a>
                </span>
                <span>|</span>
                <span className="flex items-center gap-2">
                    <RiCellphoneFill size={18} /> 0906 243 664
                </span>
            </div>
            <div className="flex items-center gap-2">
                <IoLocationSharp size={20} /> Floor 14th, Mizuki Park 6
            </div>
        </div>
    );
};

export default TopHeader;
