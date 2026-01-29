import { createBrowserRouter } from "react-router-dom";
import { UserCreatePage, UsersPage } from "@/pages/users";
import { Layout, ErrorPage, HomePage } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/register",
        element: <UserCreatePage />,
      },
    ],
  },
]);
