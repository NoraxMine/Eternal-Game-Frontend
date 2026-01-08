import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Image from "../../photoes/logo.jpg"

const DEFAULT_AVATAR_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgNDAgNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM5OTk5OTkiLz4KICA8Y2lyY2xlIGN4PSIxNSIgY3k9IjE0IiByPSIzIiBmaWxsPSJ3aGl0ZSIvPgogIDxjaXJjbGUgY3g9IjI1IiBjeT0iMTQiIHI9IjMiIGZpbGw9IndoaXRlIi8+CiAgPHBhdGggZD0iTTEwIDI2YyAwIDYtNSA5LTkgOWgxOGMwIDYtNSA5LTkgOXoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==";

function Admin_Header({ user, onLogout }) {
  const navig = useNavigate();
  const [selected, setSelected] = useState("");

  const selChange = (e) => {
    const path = e.target.value;

    if (path === "logout") {
      if (onLogout) onLogout();
      navig("/");
      setSelected("");
    } else if (path) {
      navig(path);
      setSelected("");
    }
  };

  const avatarSrc = localStorage.getItem(`avatar_${user?.id}`) || DEFAULT_AVATAR_SRC;

  return (
    <section className="sec1">
      <div className="win_top">
        <div className="up_logo">
          <img src={Image} alt="logo" className="logo" />
          <p className="logo_name">Eternal Game</p>
        </div>

        <div className="setting_list">
          <p>Быстро</p>
          <p>Интересно</p>
          <p>Бесплатно</p>

          <div className="header_user">
            <img src={avatarSrc} alt="avatar" className="header_avatar" />
            <p>{user?.username || "Админ"}</p>
          </div>

          <select className="list_sp" value={selected} onChange={selChange}>
            <option value="">Меню</option>
            <option value="/home">Главная</option>
            <option value="/home/download">Скачать файлы</option>
            <option value="/home/chat">Чат</option>
            <option value="/home/admin">Профиль админа</option>
            <option value="/home/finduser">Найти пользователя</option>
            <option value="logout">Выйти</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default Admin_Header;