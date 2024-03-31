import { BASE_URL } from "@/config/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function usePatchConfirmClothes() {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");

  const { data, mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      // FormData 로깅을 위해 사용된 코드는 제거합니다.
      // 서버로 전송
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
