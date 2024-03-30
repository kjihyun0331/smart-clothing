import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type dataType = {
  rate: string;
  date: string;
  locate: string;
  schedule: string;
};

export function usePostRecommendedOutfit() {
  const userToken = localStorage.getItem("token");

  const { data, mutate } = useMutation({
    mutationFn: (data: dataType) => {
      const formData = new FormData();
      formData.append("rate", data.rate);
      formData.append("date", data.date);
      formData.append("locate", data.locate);
      formData.append("schedule", data.schedule);

      return axios({
        method: "post",
        url: `http://j10s006.p.ssafy.io:8000/recommend/test`,
        headers: {
          userid: userToken,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      }).then((res) => res.data);
    },
    onSuccess: () => {},
  });

  return { recommenddata: data, mutate };
}
