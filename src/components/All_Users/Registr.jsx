import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registr() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== repeatPassword) {
      setError("Пароли не совпадают");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
          repeat_password: repeatPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Ошибка регистрации");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message || "Не удалось подключиться к серверу");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registr_page">
      <div className="registr_container">
        <h2 className="registr_title">Регистрация</h2>
        {error && <p className="registr_error">{error}</p>}
        <form onSubmit={handleSubmit} className="registr_form">
          <input type="text" placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} required disabled={loading} className="registr_input"/>
          <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} className="registr_input"/>
          <input type="password"placeholder="Повторите пароль" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required disabled={loading} className="registr_input"/>
          <button type="submit" disabled={loading} className="registr_button">{loading ? "Регистрация..." : "Зарегистрироваться"}</button>
        </form>

        <div className="registr_links">
          <p onClick={() => navigate("/login")} className="registr_login_link">Уже есть аккаунт? Войти</p>
        </div>
      </div>
    </div>
  );
}

export default Registr;