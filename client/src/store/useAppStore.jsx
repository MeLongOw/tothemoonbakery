import { apiGetCategories } from "src/apis/category";
import { create } from "zustand";

export const useAppStore = create((set) => ({
    isShowModal: false,
    modalChildren: null,
    isFetchingCategory: false,
    categoryList: [],

    closeModal: () =>
        set((state) => {
            if (state.isShowModal) {
                return {
                    ...state,
                    isShowModal: false,
                    modalChildren: null,
                };
            }
        }),
    openModal: () =>
        set((state) => {
            if (!state.isShowModal) {
                return {
                    ...state,
                    isShowModal: true,
                };
            }
        }),
    setModalChildren: (children) =>
        set((state) => {
            return {
                ...state,
                modalChildren: children,
            };
        }),

    setIsFetchingCategory: (boolean) =>
        set(() => {
            return { isFetchingCategory: boolean };
        }),

    getCategoryList: async () => {
        const res = await apiGetCategories();
        if (res?.success) {
            return set(() => ({
                categoryList: res.categories,
            }));
        }
    },
}));
