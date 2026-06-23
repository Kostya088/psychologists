import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Psychologists from "../pages/Psychologists/Psychologists";
import Favorites from "../pages/Favorites/Favorites";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/psychologists", element: <Psychologists /> },
      { path: "/favorites", element: <Favorites /> },
    ],
  },
]);
