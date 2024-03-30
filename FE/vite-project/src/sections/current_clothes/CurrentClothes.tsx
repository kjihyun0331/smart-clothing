// import { useEffect, useState } from "react";
import styled from "styled-components";
import HomeCurrentClothestsx from "./HomeCurrentClothes.tsx";
import HomeLocate from "../weather_location/HomeLocate.tsx";
import { useApi } from "@/hooks/useApi.ts";
import { useCurrentClothesStore } from "@/store/CurrentClothesStore";
import { useEffect } from "react";
import { Loader } from "@/components/Loader.tsx";


const CurrentClothes = () => {
    const todayClothes = {isPending: false, isError: false, data:{clothes: [1, 2, 3, 4]}}
    const { ChangeCurrentClothesList } = useCurrentClothesStore()

    // const {
    //     isLoading: isLoadingTodayClothesExistence,
    //     isError: isErrorTodayClothesExistence,
    //     data: dataTodayClothesExistence
    // } = useApi(
    //     "get",
    //     `outfit/past/today`
    // );

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

