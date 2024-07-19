import React from "react";
import backgroundImg from "src/assets/img/background.png";
import avatarImg from "src/assets/img/avatar.png";
import rocket from "src/assets/img/rocket.png";
import { TopHeader } from "..";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div>
                <TopHeader />
                <div className="relative">
                    <div className="rounded-b-xl overflow-hidden border-b-2 border-x-2 border-orange-main">
                        <img
                            src={backgroundImg}
                            alt="background"
                            className="aspect-16/5 object-cover"
                        />
                    </div>
                    <div className="absolute z-10 bottom-0 flex justify-center w-full translate-y-[50%] items-center">
                        <img
                            src={avatarImg}
                            className="aspect-square rounded-full w-[220px] border-dark-main border-4 cursor-pointer"
                            draggable={false}
                            onClick={() => {
                                navigate("/");
                            }}
                        />
                    </div>
                    <div className="absolute bottom-0 flex w-full justify-center translate-y-[50%] items-center">
                        <div className="relative w-[196px] aspect-square bg-transparent rounded-full animate-spin-reverse">
                            <img
                                src={rocket}
                                className="absolute top-[50%] translate-y-[-50%] right-[-50px] -rotate-45 w-[40px]"
                            />
                        </div>
                    </div>
                </div>
                <div className="text-4xl font-bold italic mt-[140px] text-center ">
                    <h3 className="inline-block bg-gradient-to-r from-orange-main via-orange-yellow-main to-yellow-main text-transparent bg-clip-text">
                        To The Moon Bakery
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Header;
