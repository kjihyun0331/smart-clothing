import { create } from "zustand";
import { SimpleClothesResponseDataType } from "@/types/ClothesTypes";

interface SelectedItem {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  url: string;
}

interface SelectedItemsState {
  selectedItems: SelectedItem[];
  toggleItem: (item: SimpleClothesResponseDataType) => void;
  clearItems: () => void;
  confirmOutfit: string;
  setConfirmOutfit: (item: string) => void;
}

export const useSelectedItemsStore = create<SelectedItemsState>((set) => ({
  selectedItems: [],
  toggleItem: (item) =>
    set((state) => {
      const isSelected = state.selectedItems.some(
        (selectedItem) => Number(selectedItem.id) === item.clothingId
      );

      if (isSelected) {
        return {
          selectedItems: state.selectedItems.filter(
            (selectedItem) => Number(selectedItem.id) !== item.clothingId
          ),
        };
      } else {
        const newItem = {
          id: item.clothingId.toString(),
          name: item.clothingId.toString(),
          width: 100,
          height: 100,
          url: item.clothingImagePath,
          x: 10,
          y: 10,
        };

        // // category가 하의인 경우 x, y 값을 조정
        // if (item.category === "하의") {
        //   newItem.x = 300;
        //   newItem.y = 100;
        // }
        // 아이템 추가
        return {
          selectedItems: [...state.selectedItems, newItem],
        };
      }
    }),
  clearItems: () =>
    set(() => ({
      selectedItems: [],
    })),
  confirmOutfit: "",
  setConfirmOutfit: (input) =>
    set(() => {
      return {
        confirmOutfit: input,
      };
    }),
}));
