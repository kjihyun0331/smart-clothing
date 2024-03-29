import {create} from 'zustand';


interface CurrentClothesState {
  CurrentClothesList: number[];
  ChangeCurrentClothesList: (newList:number[]) => void;
  DeleteCurrentClothes: (deleteClotehs:number) => void;
  AddClothesList: number[]
  AddCurrentClothes: (addClothes:number) => void;
  DeleteAddCurrentClothes: (addDeleteClotehs:number) => void;
}

export const useCurrentClothesStore = create<CurrentClothesState>((set) => ({
    CurrentClothesList: [],
    ChangeCurrentClothesList: (newList:number[]) => set({CurrentClothesList:newList}),
    DeleteCurrentClothes: (deleteClothes) => set({}),
    AddClothesList: [],
    AddCurrentClothes: (addClothes) => set({}),
    DeleteAddCurrentClothes: (addDeleteClotehs) => set({}),
}));

