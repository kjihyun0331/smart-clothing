import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "routes/Router";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { GlobalStyles } from "@/styles/reset";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
    </ThemeProvider>
  </React.StrictMode>
);
