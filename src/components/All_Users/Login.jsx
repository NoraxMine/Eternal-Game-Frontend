import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ openMain }) {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: login,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Ошибка входа");
      }

      openMain({ id: data.id, username: data.username, role: data.role });
      navigate("/home");
    } catch (err) {
      setError(err.message || "Не удалось подключиться к серверу");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login_page">
      <div className="login_container">
        <h2 className="login_title">Login</h2>
        {error && <p className="login_error">{error}</p>}
        <form onSubmit={handleSubmit} className="login_form">
          <input type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} required disabled={loading} className="login_input"/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} className="login_input"/>
          <button type="submit" disabled={loading} className="login_button">{loading ? "Вход..." : "Войти"}</button>
        </form>

        <div className="login_links">
          <p>Забыли пароль?</p>
          <p onClick={() => navigate("/registr")} className="login_register_link">Регистрация</p>
        </div>
      </div>
    </div>
  );
}

export default Login;