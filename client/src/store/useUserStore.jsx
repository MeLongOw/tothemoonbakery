import { apiGetProductById } from "src/apis/product";
import { apiGetCurrentUser } from "src/apis/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
    persist(
        (set, get) => ({
            cart: [],
            token: null,
            current: null,

            checkCart: async (cart) => {
                const promises = cart?.map((el) =>
                    apiGetProductById(el.product?._id)
                );
                const responses = await Promise.all(promises);

                return set((state) => {
                    return {
                        cart: [
                            ...state.cart.filter((el, index) => {
                                if (responses[index]?.success) {
                                    return (
                                        el.product.updatedAt ===
                                        responses[index].product.updatedAt
                                    );
                                }
                            }),
                        ],
                    };
                });
            },

            setAmountInCart: (id, amount) =>
                set((state) => ({
                    cart: [
                        ...state.cart.map((el) => {
                            if (el.id === id) return { ...el, amount };
                            else return el;
                        }),
                    ],
                })),

            clearCart: () =>
                set((state) => ({
                    cart: [],
                })),

            deleteFormCart: (id) =>
                set((state) => ({
                    cart: [...state.cart.filter((el) => el.id !== id)],
                })),

            addToCart: (product) => {
                return set((state) => {
                    if (state.cart.some((el) => el.id === product.id)) {
                        return {
                            cart: [
                                ...state.cart.map((el) => {
                                    if (el.id === product.id) {
                                        return {
                                            ...el,
                                            amount: +el.amount + product.amount,
                                        };
                                    } else {
                                        return el;
                                    }
                                }),
                            ],
                        };
                    }
                    return { cart: [...state.cart, product] };
                });
            },

            setToken: (token) => set((state) => ({ token })),

            getCurrent: async () => {
                const res = await apiGetCurrentUser();
                if (res?.success) {
                    return set(() => ({
                        current: res.currentUser,
                    }));
                }
                if (!res?.success) {
                    return set(() => ({
                        current: null,
                        token: null,
                    }));
                }
            },
        }),
        {
            name: "tothemoon", // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(([key]) =>
                        ["token", "current", "cart"].includes(key)
                    )
                ),
        }
    )
);
