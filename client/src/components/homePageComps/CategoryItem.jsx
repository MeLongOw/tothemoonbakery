import React, { useRef } from "react";
import { Link } from "react-scroll";

import { twMerge } from "tailwind-merge";

const CategoryItem = ({
    el,
    activeId,
    setActiveId,
    setIsClickCategory,
    isClickCategory,
    categoryListRef,
}) => {
    const categoryRef = useRef();

    return (
        <div ref={categoryRef}>
            <Link
                key={el._id}
                to={el._id}
                containerId="main"
                spy={true}
                smooth={true}
                duration={400}
                offset={-240}
                onSetActive={(id) => {
                    if (!isClickCategory) {
                        setActiveId(id);
                        categoryListRef.current?.container?.current?.scrollTo({
                            left: categoryRef.current?.offsetLeft -144,
                            behavior: "smooth",
                        });
                    }
                }}
                onClick={() => {
                    setActiveId(el._id);
                    setIsClickCategory(true);
                    categoryListRef.current?.container?.current?.scrollTo({
                        left: categoryRef.current?.offsetLeft - 144,
                        behavior: "smooth",
                    });
                }}
            >
                <div
                    className={`group flex-1 flex justify-center text-center capitalize px-4 hover:text-orange-yellow-main text-sm cursor-pointer py-4 ${
                        activeId === el._id && "text-orange-main"
                    }`}
                >
                    <div
                        className={twMerge(
                            ` border-b-2 border-b-transparent group-hover:border-orange-yellow-main whitespace-nowrap`,
                            activeId === el._id && "border-orange-main"
                        )}
                    >
                        {el.name}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CategoryItem;
