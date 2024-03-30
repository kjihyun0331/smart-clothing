import { BASE_URL } from "@/config/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useDeleteSchedule() {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");

  const { data, mutate } = useMutation({
    mutationFn: (data: string) => {
      return axios({
        method: "delete",
        url: `${BASE_URL}/calendar?date=${data}`,
        headers: {
          "User-ID": userToken,
        },
      }).then((res) => res.data);
    },
    onSuccess: () => {
      navigate(`/calendar`);
    },
  });

  return { deletedata: data, deletemutate: mutate };
}
