// 09_b_google-oauth/frontend/src/pages/Login.tsx
const Login = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:4000/auth/google";
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Google OAuth Demo</h1>
            <button onClick={handleLogin}>
                Login with Google
            </button>
        </div>
    );
};

export default Login;