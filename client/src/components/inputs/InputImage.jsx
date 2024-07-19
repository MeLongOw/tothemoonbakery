import clsx from "clsx";
import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { MdCancel } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";

const InputImage = ({
    maxNumber = 10,
    label = "Ảnh",
    images,
    setImages,
    maxFileSize = 2 * 1024 * 1024,
    text,
}) => {
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, { addUpdateIndex });
        setImages(imageList.map((el, id) => ({ ...el, id })));
    };

    const onSortEnd = (oldIndex, newIndex) => {
        console.log({ oldIndex, newIndex });
        setImages((images) => arrayMoveImmutable(images, oldIndex, newIndex));
    };

    return (
        <div>
            {label && (
                <label className="font-bold md:text-xl md:mt-2 text-sm mt-0">
                    {label}
                </label>
            )}
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="imageUrl"
                acceptType={["jpg", "gif", "png"]}
                maxFileSize={maxFileSize}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    errors,
                }) => (
                    // write your building UI
                    <div className="w-full flex gap-4 flex-col">
                        <div
                            className={twMerge(
                                clsx(
                                    "w-[140px] mt-4 aspect-square border-2 rounded-lg border-white flex justify-center items-center cursor-pointer p-2",
                                    isDragging && "text-blue-600"
                                )
                            )}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            <span className="text-center text-sm">
                                {text ||
                                    `Click hoặc thả ảnh vào ${"(tối đa 2Mb)"}`}
                            </span>
                        </div>
                        <div className="w-full">
                            <SortableList
                                onSortEnd={onSortEnd}
                                className="grid grid-cols-4 gap-4"
                                draggedItemClassName="bg-orange-main z-[9999]"
                            >
                                {images.map((image, index) => {
                                    return (
                                        image.imageUrl && (
                                            <SortableItem key={image?.id}>
                                                <div className="border-2 w-full aspect-square border-white flex items-center justify-center rounded-xl relative cursor-grab">
                                                    <img
                                                        src={image["imageUrl"]}
                                                        alt=""
                                                        className="w-[94%] rounded-xl aspect-square object-center object-cover"
                                                        draggable="false"
                                                    />
                                                    <div className="absolute top-0 right-2 text-white gap-4 bg-red-500 w-[30px] aspect-square rounded-full translate-y-[-50%] flex items-center justify-center hover:cursor-pointer">
                                                        <div
                                                            onClick={() =>
                                                                onImageRemove(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <MdCancel
                                                                size={20}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </SortableItem>
                                        )
                                    );
                                })}
                            </SortableList>
                            {errors?.maxFileSize && (
                                <span className="text-red-600">
                                    Kích thước ảnh quá lớn
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </ImageUploading>
        </div>
    );
};

export default InputImage;
