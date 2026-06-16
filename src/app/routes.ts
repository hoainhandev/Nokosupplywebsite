import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { NokoPOS } from "./pages/NokoPOS";
import { NokoAcademy } from "./pages/NokoAcademy";
import { NokoSupply } from "./pages/NokoSupply";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/pos",
    Component: NokoPOS,
  },
  {
    path: "/academy",
    Component: NokoAcademy,
  },
  {
    path: "/supply",
    Component: NokoSupply,
  },
]);
