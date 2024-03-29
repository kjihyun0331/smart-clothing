import { BASE_URL } from "@/config/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type dataType = {
  id: string;
  putData: {
    clothingId: number;
    clothingName: string;
    category: string;
    styles: string[];
    seasons: number[];
    sharedUserIds: number[];
  };
};

export function usePatchClothes() {
  const queryClient = useQueryClient();
  const userToken = localStorage.getItem("token");

  const { data, isPending, mutate } = useMutation({
    mutationFn: (data: dataType) => {
      const { id, putData } = data;
      console.log("useMutation");

      return axios({
        method: "put",
        url: `${BASE_URL}/clothing/${id}`,
        headers: {
          "User-ID": userToken,
        },
        data: putData,
      }).then((res) => res.data);
    },
    onSuccess: (data) => {
      // queryClient.removeQueries({
      //   queryKey: ["detail", data.id],
      // });
      queryClient.invalidateQueries({
        queryKey: ["detail", data.id],
      });
    },
  });

  return { data, isPending, mutate };
}
