import React, { useState } from "react";
import { Carousel } from "@material-tailwind/react";

const Slider = () => {
    const [imageList, setImageList] = useState([
        {
            id: 1,
            src: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
        },
        {
            id: 2,
            src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
        },
        {
            id: 3,
            src: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
        },
    ]);
    return (
        <div className="w-full mt-8 px-4">
            <div className="w-full bg-card rounded-xl border-black border-2 shadow-2xl">
                <div className="p-4">
                    <Carousel
                        transition={{ duration: 1.5, type: "tween" }}
                        autoplay={true}
                        loop={true}
                        className="rounded-xl"
                    >
                        {imageList.length ? (
                            imageList.map((el) => (
                                <img
                                    src={el.src}
                                    key={el.id}
                                    alt={el.id}
                                    className="w-full aspect-16/5 object-cover object-center"
                                />
                            ))
                        ) : (
                            <div className="w-full aspect-16/5 bg-blue-gray-400 text-3xl font-bold flex justify-center items-center">
                                NO IMAGE
                            </div>
                        )}
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default Slider;
