// import { useQuery } from "react-query";
// import axios from "axios";
// import { AxiosError } from "axios";

// export function useApi(method: string, url: string, option: any = null) {

//     const {
//         isLoading: isCommentLoading,
//         isError: isCommentError,
//         data: commentState,
//         isSuccess,
//       } = useQuery<Tcomment[], AxiosError>(["comment", shopId], () =>
//         fetchComments(shopId)
//       );

//     return { isCommentLoading, isCommentError, commentState, isSuccess }
//   };
// }

// export async function useMultiPartApi(
//   method: string,
//   url: string,
//   data: FormData
// ) {
//   const userToken: string | null = localStorage.getItem("token");

//   return () => {
//     return fetch(url, {
//       method,
//       body: data,
//       headers: {
//         Authorization: `Bearer ${JSON.parse(userToken)}`,
//       },
//     });
//   };
// }
