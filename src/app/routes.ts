import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { Home } from "./pages/Home";
import { NokoPOS } from "./pages/NokoPOS";
import { NokoAcademy } from "./pages/NokoAcademy";
import { NokoSupply } from "./pages/NokoSupply";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

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
      {
        path: "blog",
        Component: Blog,
      },
      {
        path: "blog/:slug",
        Component: BlogPost,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
    ],
  },
]);
