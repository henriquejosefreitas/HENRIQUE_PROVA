import { createBrowserRouter } from "react-router-dom";

//Importação das páginas
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import CadastroUsuario from "./pages/CadastroUsuario.jsx";
import CadastroTarefa from "./pages/CadastroTarefa.jsx";
import EditarLivro from "./pages/EditarLivro.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/cadastrausuario",
        element: <CadastroUsuario />,
      },
      {
        path:"/cadastralivro",
        element: <CadastroTarefa />
      },
      {
        path:"/editalivro/:id",
        element: <EditarLivro />
      }
    ],
  },
]);

export default router;
