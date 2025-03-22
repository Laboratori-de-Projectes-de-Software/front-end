import "./App.css";
import Header from "./modules/shared/header/Header";
import AuthProvider from "./auth/AuthProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            // TODO: Añadir la home
            <Route path="/" element={<h1>Home</h1>} />
            <Route element={<PrivateRoute />}>
              <Route path="/league" element={<h1>Consulta las ligas</h1>} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
