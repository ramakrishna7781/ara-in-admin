import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import axios from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const formReady = email.trim() !== "" && password.trim() !== "";

  const handleLogin = async () => {
    if (!formReady) return;

    try {
      const response = await axios.post("/auth/login", { email, password });

      const token = response.data.token || response.data;

      localStorage.setItem("admin_token", token);
      localStorage.setItem("admin_token_expiry", Date.now() + 900000);

      navigate("/home");
    } catch (err) {
      setErrorMsg("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "40px 30px",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
          Admin Login
        </h2>

        <InputField
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMsg("");
          }}
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMsg("");
          }}
        />

        {errorMsg && (
          <p style={{ color: "yellow", marginTop: "10px" }}>{errorMsg}</p>
        )}

        <Button
          text="Login"
          onClick={handleLogin}
          disabled={!formReady}
          style={{
            marginTop: "20px",
            background: formReady ? "white" : "rgba(255,255,255,0.3)",
            color: formReady ? "#ff4081" : "white",
          }}
        />
      </div>
    </div>
  );
}
