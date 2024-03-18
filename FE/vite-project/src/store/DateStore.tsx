import { create } from "zustand";

interface SelectedDateState {
  selectedDate: string | null;
  setSelectedDate: (item: string) => void;
}

export const useSelectedDateStore = create<SelectedDateState>((set) => ({
  selectedDate: "",
  setSelectedDate: (input) =>
    set((state) => {
      return {
        ...state, // 현재 상태를 그대로 유지 (toggleItem 함수 포함)
        selectedDate: input,
      };
    }),
}));
