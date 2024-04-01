import {create} from 'zustand';

interface Clothes {
  clothingId: number,
  clothingImagePath: string,
  clothingName: string,
}


interface CurrentClothesState {
  CurrentClothesList: Clothes[];
  ChangeCurrentClothesList: (newList:Clothes[]) => void;
  DeleteCurrentClothes: (deleteClotehs:Clothes) => void;
  AddClothesList: Clothes[]
  AddCurrentClothes: (addClothes:Clothes) => void;
  DeleteAddCurrentClothes: (addDeleteClotehs:Clothes) => void;
}

export const useCurrentClothesStore = create<CurrentClothesState>((set) => ({
    CurrentClothesList: [],
    ChangeCurrentClothesList: (newList:Clothes[]) => set({CurrentClothesList:newList}),
    DeleteCurrentClothes: (deleteClothes: Clothes) =>
      set((state) => ({
          CurrentClothesList: state.CurrentClothesList.filter(
              (clothes) => clothes.clothingId !== deleteClothes.clothingId
          ),
      })),
    AddClothesList: [],
    AddCurrentClothes: (addClothes: Clothes) => set((state) => ({
      AddClothesList: [...state.AddClothesList, addClothes],
    })),
    DeleteAddCurrentClothes: (addDeleteClothes:Clothes) => set((state) => ({
      AddClothesList: state.AddClothesList.filter(
          (clothes) => clothes.clothingId !== addDeleteClothes.clothingId
      ),
  })),
}));
