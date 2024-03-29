import { BASE_URL } from "@/config/config";
import { useMutation, QueryClient } from "@tanstack/react-query";
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
  const queryClient = new QueryClient();
  const userToken = localStorage.getItem("token");

  const { data, isPending, mutate } = useMutation({
    mutationFn: (data: dataType) => {
      const { id, putData } = data;
      console.log("useMutation");
      console.log(id);
      console.log(putData);

      return axios({
        method: "put",
        url: `${BASE_URL}/clothing/${id}`,
        headers: {
          "User-ID": userToken,
        },
        data: putData,
      }).then((res) => res.data);
    },
    onSuccess: (variables) => {
      queryClient.invalidateQueries({
        queryKey: ["get", `clothing/${variables.id}`],
      });
    },
  });

  return { data, isPending, mutate };
}
