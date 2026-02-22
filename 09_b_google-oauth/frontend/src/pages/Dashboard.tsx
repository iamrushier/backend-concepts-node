// 09_b_google-oauth/frontend/src/pages/Dashboard.tsx
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("app_token");
        setToken(storedToken);
    }, []);

    const logout = () => {
        localStorage.removeItem("app_token");
        window.location.href = "/";
    };

    if (!token) {
        return <h2>Unauthorized</h2>;
    }

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Dashboard</h1>
            <p>You are logged in!</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;