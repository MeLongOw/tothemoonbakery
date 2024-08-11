import React from "react";
import { IoMdCart } from "react-icons/io";
import { useUserStore } from "src/store/useUserStore";
import { formatMoney } from "src/utils/helper";
import noImage from "src/assets/img/no-image.png";

const Cart = () => {
    const { cart } = useUserStore();
    console.log(cart);
    return (
        <div className="h-[100vh] bg-white text-black p-4 font-roboto">
            <div className="border-2 border-blue-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-2xl uppercase text-center mt-4">
                    Chi tiết đơn hàng
                </h3>
                <div className="mt-4 font-semibold">
                    {cart.map((el) => (
                        <div className="mt-4 flex gap-4">
                            <div className="w-[120px] aspect-square rounded-lg ">
                                {el?.product?.imageUrl && (
                                    <img
                                        src={el?.product?.imageUrl}
                                        className=" rounded-lg aspect-square object-cover object-center"
                                    />
                                )}
                                {!el?.product?.imageUrl && (
                                    <img
                                        src={noImage}
                                        className="rounded-lg w-full aspect-square object-cover object-center"
                                    />
                                )}
                            </div>
                            <div className="flex flex-1 justify-between">
                              <div className="inline-block">
                                  <div className="text-orange-main font-semibold text-lg">
                                      {el?.product.name}
                                  </div>
                                  <div className="italic flex gap-2">
                                      {el?.optionsCheck?.map((option, index) => (
                                          <div
                                              className="flex gap-2"
                                              key={el.id + option._id}
                                          >
                                              {index !== 0 && <div>/</div>}
                                              <div>{option.name}</div>
                                          </div>
                                      ))}
                                  </div>
                                  <div className="text-green-400">
                                      {`Đơn giá: ${formatMoney(
                                          +el.product.price +
                                              +el.optionsCheck.reduce(
                                                  (accumulator, currentValue) =>
                                                      accumulator +
                                                      +currentValue.price,
                                                  0
                                              )
                                      )} VND`}
                                  </div>
                              </div>
                              <div className="inline-block">
                                  <div className="text-green-400 font-bold">{`${formatMoney(
                                      +el.product.price +
                                          +el.optionsCheck.reduce(
                                              (accumulator, currentValue) =>
                                                  accumulator +
                                                  +currentValue.price,
                                              0
                                          ) *
                                              el.amount
                                  )} VND`}</div>
                                  <div>Số lượng: {el.amount}</div>
                              </div>
                            </div>
                        </div>
                    ))}

                    <div className="text-xl font-bold text-green-400 gap-2 text-end pt-4 border-t-2 border-blue-gray-700 mt-4">
                        <span className="font-bold text-orange-yellow-main mr-2">
                            Tổng tiền:
                        </span>
                        <span className="italic">
                            {formatMoney(
                                cart?.reduce(
                                    (acc, el) =>
                                        acc +
                                        (+el.product.price +
                                            +el.optionsCheck.reduce(
                                                (acc, el) => acc + +el.price,
                                                0
                                            )) *
                                            +el.amount,
                                    0
                                )
                            )}{" "}
                            VND
                        </span>
                    </div>
                    <div className="mt-4 items-center">
                        <p className="italic font-semibold mb-4">
                            Xin chân thành cảm ơn quý khách đã tin tưởng và ủng
                            hộ To the Moon Bakery{" "}
                            <span className="text-red-600">♥️ ♥️ ♥️</span>. Quý
                            khách vui lòng thực hiện thanh toán trước cho đơn
                            hàng. Kính chúc quý khách ngon miệng khi hưởng thức những
                            sản phẩm của To The Moon{" "}
                            <span className="not-italic">🎂 🎂</span>
                        </p>

                        <div className="font-bold uppercase text-xl mb-4 text-center">
                            QR Thanh toán
                        </div>
                        <div className="w-full">
                          <div className="w-[240px] aspect-square m-auto">
                              <img
                                  src={`https://img.vietqr.io/image/546034-0906243664-compact.png?amount=${cart?.reduce(
                                      (acc, el) =>
                                          acc +
                                          (+el.product.price +
                                              +el.optionsCheck.reduce(
                                                  (acc, el) => acc + +el.price,
                                                  0
                                              )) *
                                              +el.amount,
                                      0
                                  )}`}
                                  alt="qrcode"
                                  className="w-[270px] p-4 border-2 border-blue-gray-700 rounded-lg"
                              />
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
