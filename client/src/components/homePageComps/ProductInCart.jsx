import React, { useEffect, useState } from "react";
import { formatMoney } from "src/utils/helper";
import { InputAmount } from "..";
import noImage from "src/assets/img/no-image.png";

const ProductInCart = ({
  el,
  handleRemoveFromCart = () => {},
  setAmount = () => {},
}) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(
      +el?.product.price +
        el?.optionsCheck.reduce((acc, option) => acc + +option.price, 0)
    );
  }, []);
  return (
    <div className="grid grid-cols-8 gap-4 mt-4">
      <div className="relative col-span-1 aspect-square rounded-lg w-full">
        {el?.product?.imageUrl && (
          <img
            src={el?.product?.imageUrl}
            className="rounded-lg w-full aspect-square object-cover object-center"
          />
        )}
        {!el?.product?.imageUrl && (
          <img
            src={noImage}
            className="rounded-lg w-full aspect-square object-cover object-center"
          />
        )}
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFromCart(el?.id);
          }}
          className="absolute top-0 right-2 translate-y-[-50%] cursor-pointer aspect-square bg-red-400 p-1 rounded-full text-xs"
        >
          xoá
        </div>
      </div>
      <div className="col-span-5 flex flex-col gap-1">
        <div className="text-orange-main font-semibold text-lg">
          {el?.product.name}
        </div>
        <div className="italic flex gap-2">
          {el?.optionsCheck?.map((option, index) => (
            <div className="flex gap-2" key={el.id + option._id}>
              {index !== 0 && <div>/</div>}
              <div>{option.name}</div>
            </div>
          ))}
        </div>
        <div className="text-green-400">
          {`Đơn giá: ${formatMoney(price)} VND`}
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-2 items-end">
        <div className="text-green-400 font-bold">{`${formatMoney(
          +price * +el?.amount
        )} VND`}</div>
        <div>
          <InputAmount amount={el?.amount} setAmount={setAmount} />
        </div>
      </div>
    </div>
  );
};

export default ProductInCart;
