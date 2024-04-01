import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/config/config";
import axios, { AxiosRequestConfig } from "axios";

export function useApi(method: string, url: string, requestData?: string) {
  // const userToken = localStorage.getItem("token");

  const axiosRequestConfig: AxiosRequestConfig = {
    method: method,
    url: `${BASE_URL}/${url}`,
    headers: {
      // "User-ID": userToken,
      "User-ID": 2,
    },
    ...(requestData && { data: requestData }),
  };
  const { isLoading, isError, data, isSuccess } = useQuery({
    queryKey: [url, method],
    queryFn: () => axios(axiosRequestConfig).then((res) => res.data),
    select: (res) => res.dataBody,
  });
  return {
    isLoading,
    isError,
    data,
    isSuccess,
  };
}
