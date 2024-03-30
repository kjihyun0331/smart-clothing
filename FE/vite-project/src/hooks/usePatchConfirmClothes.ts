import { BASE_URL } from "@/config/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function usePatchConfirmClothes() {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");

  const { data, mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      ////////////////////
      console.log(
        "----------------useMutation에서 formData 상태 확인하기--------------"
      );
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      return axios({
        method: "post",
        url: `${BASE_URL}/calendar`,
        headers: {
          "User-ID": userToken,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      }).then((res) => res.data);
    },
    onSuccess: () => {
      navigate(`/calendar`);
    },
  });

  return { data, mutate };
}
