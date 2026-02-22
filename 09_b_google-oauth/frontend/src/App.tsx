import { useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = localStorage.getItem("app_token");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("app_token", tokenFromUrl);
      window.history.replaceState({}, document.title, "/");
      window.location.reload();
    }
  }, []);

  return token ? <Dashboard /> : <Login />;
}

export default App;