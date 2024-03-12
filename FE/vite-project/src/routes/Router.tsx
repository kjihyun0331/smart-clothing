// import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "@/pages/Login";
import SmartThings from "@/pages/SmartThings";
import PageNotFound from "@/pages/PageNotFound";
import AddDevice from "@/pages/Device";

const router = createBrowserRouter([
  {
    path: "",
    element: <Login />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/smarthome",
        element: <SmartThings />,
      },
      {
        path: "/device",
        element: <AddDevice />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;

// {
//   path: "",
//   // 3초 뒤에 finish가 반환된다.
//   loader: async () => {
//     return new Promise((res) => {
//       setTimeout(() => {
//         return res("finish!");
//       }, 3000);
//     });
//   },
//   element: <Intro />,
// },

// import DashboardLayout from "src/layouts/dashboard";

// export const IndexPage = lazy(() => import("src/pages/app"));
// export const BlogPage = lazy(() => import("src/pages/blog"));
// export const UserPage = lazy(() => import("src/pages/user"));
// export const LoginPage = lazy(() => import("src/pages/login"));
// export const ProductsPage = lazy(() => import("src/pages/products"));
// export const Page404 = lazy(() => import("src/pages/page-not-found"));

// // ----------------------------------------------------------------------

// interface RouterProps {
//   element: ReactElement;
//   children?: RouteObject[];
//   path?: string;
// }

// export default function Router(): ReactElement {
//   const routes: RouteObject[] = useRoutes([

// 		{
//       element: (
//         <DashboardLayout>
//           <Suspense fallback={<div>Loading...</div>}>
//             <Outlet />
//           </Suspense>
//         </DashboardLayout>
//       ),
//       children: [
//         { element: <IndexPage />, index: true },
//         { path: "user", element: <UserPage /> },
//         { path: "products", element: <ProductsPage /> },
//         { path: "blog", element: <BlogPage /> },
//       ],
//     },
//     {
//       path: "login",
//       element: <LoginPage />,
//     },
//     {
//       path: "404",
//       element: <Page404 />,
//     },
//     {
//       path: "*",
//       element: <Navigate to="/404" replace />,
//     },
//   ]);

//   return routes;
// }
