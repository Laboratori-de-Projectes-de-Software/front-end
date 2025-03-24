import "./App.css";
import Header from "./modules/shared/header/Header";
import AuthProvider from "./auth/AuthProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute.tsx";
import Home from "./pages/home/home.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <main>
            <Routes>
              // TODO: Añadir la home
              <Route path="/" element={<Home />} />
              <Route element={<PrivateRoute />}>
                <Route path="/league" element={<h1>Consulta las ligas</h1>} />
              </Route>
            </Routes>
          </main>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
