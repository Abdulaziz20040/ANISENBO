import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Allnewcard from "./pages/Home/Allnewcard";
import Detals from "./pages/Derails/Deatals";
import Login from "./components/Login";
import Profil from "./components/Profil/Profil";
import Rotlayout from "./Rotlayout/Rotlayout";
import Chat from "./components/Chat";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "profil",
      element: <Profil />,
    },
    {
      path: "chat",
      element: <Chat />,
    },
    {
      path: "details/:id",
      element: <Detals />,
    },
    // {
    //   path: "/allnewCard/details/:id",
    //   element: <Detals />,
    // },
    {
      path: "/",
      element: <Rotlayout />,
      children: [
        {
          // path: "/",
          index: true,
          element: <Home />,
        },

        {
          path: "allnewCard",
          element: <Allnewcard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
