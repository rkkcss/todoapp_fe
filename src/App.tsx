import { Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { ProtectedRoot } from "./components/ProtectedRoot";
import { Logout } from "./pages/Logout";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoot />}>
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<HomePage />} />
      </Route>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
