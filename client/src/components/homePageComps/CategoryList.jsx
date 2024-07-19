import React, { useEffect, useRef, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { MdModeEditOutline } from "react-icons/md";
import { useAppStore } from "src/store/useAppStore";
import { CategoryItem, CateroryForm } from "src/components";
import { Link } from "react-scroll";
import { twMerge } from "tailwind-merge";

const CategoryList = () => {
    const [activeId, setActiveId] = useState();
    const [isClickCategory, setIsClickCategory] = useState(false);
    const categoryListRef = useRef();

    const { openModal, setModalChildren, categoryList, isFetchingCategory } =
        useAppStore();

    useEffect(() => {
        setActiveId(categoryList[0]?._id);
    }, [categoryList]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (isClickCategory) setIsClickCategory(false);
        }, 400);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [isClickCategory]);

    return (
        <div className="w-full px-4 mt-8 sticky top-0 z-20 bg-transparent font-semibold ">
            <div className="relative w-full bg-card rounded-xl border-orange-yellow-main border shadow-2xl">
                <div className="px-4">
                    <ScrollContainer
                        className="flex cursor-grab gap-4 py-4"
                        ref={categoryListRef}
                    >
                        {!isFetchingCategory ? (
                            categoryList.map((el, index) => (
                                <CategoryItem
                                    key={el._id}
                                    el={el}
                                    activeId={activeId}
                                    setActiveId={setActiveId}
                                    isClickCategory={isClickCategory}
                                    setIsClickCategory={setIsClickCategory}
                                    categoryListRef={categoryListRef}
                                />
                            ))
                        ) : (
                            <div></div>
                        )}
                    </ScrollContainer>
                </div>
                <div
                    onClick={() => {
                        openModal();
                        setModalChildren(<CateroryForm />);
                    }}
                    className="absolute top-0 right-4 translate-y-[-50%] aspect-square w-[40px] cursor-pointer bg-red-400 rounded-full flex items-center justify-center"
                >
                    <MdModeEditOutline size={20} />
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
