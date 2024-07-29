import { Button } from "@material-tailwind/react";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useUserStore } from "src/store/useUserStore";
import { formatMoney } from "src/utils/helper";
import { twMerge } from "tailwind-merge";
import { InputAmount } from "..";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useAppStore } from "src/store/useAppStore";
import noImage from "src/assets/img/no-image.png";


const DetailProduct = ({ product }) => {
  const [price, setPrice] = useState(+product.price);
  const [amount, setAmount] = useState(1);
  const [optionsCheck, setOptionsCheck] = useState(
    product.optionList.map((option) => option.subOptions[0])
  );
  const { addToCart } = useUserStore();
  const { closeModal } = useAppStore();

  const handleAddToCart = () => {
    addToCart({
      id: `${product._id}-${optionsCheck.map((el) => el._id).join("-")}`,
      product,
      amount,
      optionsCheck,
    });
    toast.success("sản phẩm đã được thêm vào giỏ hàng", { theme: "dark" });
    closeModal();
  };

  useEffect(() => {
    setPrice(
      +product.price +
        optionsCheck.reduce((accumulator, el) => +accumulator + +el.price, 0)
    );
  }, [optionsCheck]);
  return (
    <div className="flex-1 pb-8 overflow-y-scroll pt-8 no-scrollbar">
      <div className="grid grid-cols-5">
        <div className="col-span-2 w-full aspect-square bg-blue-gray-400 rounded-lg">
          {product?.imageUrl && (
            <img
              src={product.imageUrl}
              className="rounded-md object-center object-cover w-full aspect-square border-2 border-black"
            />
          )}
          {!product?.imageUrl && (
            <img
              src={noImage}
              className="rounded-md object-center object-cover w-full aspect-square"
            />
          )}
        </div>
        <div className="col-span-3 ml-4 pl-4 border-l border-orange-main text-orange-main">
          <h3 className="w-full text-center text-2xl font-semibold italic mb-4">
            {product.name}
          </h3>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1 text-lg flex items-center font-semibold">
              Giá:
            </div>
            <div className="col-span-4 text-2xl flex items-center font-semibold text-green-500">
              {formatMoney(price) + " VND"}
            </div>
          </div>
          {product?.optionList?.map((option, indexOption) => (
            <div className="grid grid-cols-5 gap-4 mt-4" key={option._id}>
              <div className="col-span-1 text-lg font-semibold flex items-center">
                {option.name}:
              </div>
              <div className="col-span-4 text-lg flex gap-3 text-white flex-wrap">
                {option.subOptions.map((subOption) => (
                  <div
                    key={subOption._id}
                    className={twMerge(
                      clsx(
                        "relative overflow-hidden border px-4 py-2 border-white rounded-md text-nowrap cursor-pointer",
                        subOption._id === optionsCheck[indexOption]._id &&
                          "border-orange-main text-orange-main"
                      )
                    )}
                    onClick={() => {
                      const copyArr = [...optionsCheck];
                      copyArr[indexOption] = subOption;
                      setOptionsCheck(copyArr);
                    }}
                  >
                    {subOption.name}
                    <div className="absolute top-0 right-0 z-10 font-bold text-card">
                      <FaCheck size={14} />
                    </div>
                    {subOption._id === optionsCheck[indexOption]._id && (
                      <div className="absolute top-0 right-0 w-0 h-0 border-[12px]  border-transparent border-t-orange-main border-r-orange-main"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="grid grid-cols-5 gap-4 mt-4">
            <div className="col-span-1 text-lg flex items-center font-semibold">
              Số Lượng:
            </div>
            <div className="col-span-4 text-2xl flex items-center font-semibold text-green-500">
              <InputAmount amount={amount} setAmount={setAmount} />
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <Button
              variant="outlined"
              color="orange"
              size="lg"
              className="focus:ring-0 mt-2 w-[320px]"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div>
          <p className="uppercase text-2xl text-orange-main font-semibold pb-4 border-b border-orange-main">
            Mô tả sản phẩm
          </p>
          <div className="mt-4 overflow-hidden">
            <div className="whitespace-pre text-clip">
              {product.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
