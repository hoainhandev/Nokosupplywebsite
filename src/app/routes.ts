import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { Home } from "./pages/Home";
import { NokoPOS } from "./pages/NokoPOS";
import { NokoAcademy } from "./pages/NokoAcademy";
import { NokoSupply } from "./pages/NokoSupply";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "pos",
        Component: NokoPOS,
      },
      {
        path: "academy",
        Component: NokoAcademy,
      },
      {
        path: "supply",
        Component: NokoSupply,
      },
    ],
  },
]);
