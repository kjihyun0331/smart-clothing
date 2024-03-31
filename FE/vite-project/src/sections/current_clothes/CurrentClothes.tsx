import HomeCurrentClothestsx from "./HomeCurrentClothes.tsx";
import { useApi } from "@/hooks/useApi.ts";
import { useCurrentClothesStore } from "@/store/CurrentClothesStore";
import { useEffect } from "react";


const CurrentClothes = () => {
    const { ChangeCurrentClothesList } = useCurrentClothesStore()

    const {isLoading, isError, data} = useApi(
        "get",
        `outfit/past/today`
    );


    useEffect(() => {
        if (data) {
            ChangeCurrentClothesList(data);
        }
    }, [data, ChangeCurrentClothesList]);

    return (
        <div>
            <HomeCurrentClothestsx isloading={isLoading} iserror={isError}/>
        </div>
    );
}; 

export default CurrentClothes;

