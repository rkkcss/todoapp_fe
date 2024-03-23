import { Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { ProtectedRoot } from "./components/ProtectedRoot";
import { Logout } from "./pages/Logout";
import { ProfilPage } from "./pages/ProfilPage";
import { RootHomeLayout } from "./pages/RootHomeLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoot />}>
        <Route path="/" element={<RootHomeLayout />}>
          <Route path="/profile" element={<ProfilPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route index path="/home" element={<HomePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
