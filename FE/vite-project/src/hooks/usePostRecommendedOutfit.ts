import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type dataType = {
  rate: string;
  date: string;
  locate: string;
  schedule: string;
  count: string;
};

export function usePostRecommendedOutfit() {
  const userToken = localStorage.getItem("token");
  // const queryClient = useQueryClient();

  const { data, mutate, isPending, isError } = useMutation({
    mutationFn: (data: dataType) => {
    // mutationFn: () => {
      const formData = new FormData();
      formData.append("rate", data.rate);
      formData.append("date", data.date);
      formData.append("locate", data.locate);
      formData.append("schedule", data.schedule);
      formData.append("count", data.count)
      // formData.append("rate", "0");
      // formData.append("date", "2024-03-28");
      // formData.append("locate", "223680");
      // formData.append("schedule", "졸업식");
      // formData.append("count", "2");

      return axios({
        method: "post",
        url: `http://127.0.0.1:8000/ML-api/test`,
        headers: {
          userid: userToken,
        },
        data: formData,
      }).then((res) => res.data);
    },
    // onSuccess: (data
    //   // queryClient.invalidateQueries({
    //   //   queryKey: ["detail", data.id],
    //   // });
    //   // queryClient.invalidateQueries({
    //   //   queryKey:
    //   // })

    // ) => {
    // },
  });

  return { recommenddata: data, mutate, isPending, isError };
}
