import { create } from "zustand";

interface SelectedItem {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  url: string;
}

interface SelectedItemsState {
  selectedItems: SelectedItem[];
  toggleItem: (item: SelectedItem) => void;
  clearItems: () => void;
}

export const useSelectedItemsStore = create<SelectedItemsState>((set) => ({
  selectedItems: [],
  toggleItem: (item) =>
    set((state) => {
      const isSelected = state.selectedItems.some(
        (selectedItem) => selectedItem.id === item.id
      );
      if (isSelected) {
        return {
          ...state, // 현재 상태를 그대로 유지 (toggleItem 함수 포함)
          selectedItems: state.selectedItems.filter(
            (selectedItem) => selectedItem.id !== item.id
          ),
        };
      } else {
        return {
          ...state, // 현재 상태를 그대로 유지 (toggleItem 함수 포함)
          selectedItems: [...state.selectedItems, item],
        };
      }
    }),
  clearItems: () =>
    set((state) => ({
      ...state, // 현재 상태를 그대로 유지 (toggleItem 함수 포함)
      selectedItems: [],
    })),
}));
