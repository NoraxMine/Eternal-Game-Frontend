import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Find_User() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [avatars, setAvatars] = useState({});

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) {
      setUsers([]);
      setError("");
      setHasSearched(true);
      setAvatars({});
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const response = await fetch(
        `https://back-305q.onrender.com/api/search_users?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Не удалось найти пользователей");
      }

      const data = await response.json();
      setUsers(data);

      const newAvatars = {};
      for (const user of data) {
        const cached = localStorage.getItem(`avatar_${user.id}`);
        if (cached) {
          newAvatars[user.id] = cached;
          continue;
        }

        try {
          const profileRes = await fetch(`https://back-305q.onrender.com/api/profile/${user.id}`);
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            if (profileData.avatar_base64) {
              const src = `data:image/jpeg;base64,${profileData.avatar_base64}`;
              newAvatars[user.id] = src;
              localStorage.setItem(`avatar_${user.id}`, src);
            }
          }
        } catch (err) {
          console.error(`Ошибка аватара для ${user.id}:`, err);
        }
      }
      setAvatars(newAvatars);
    } catch (err) {
      setError(err.message || "Ошибка соединения");
      setUsers([]);
      setAvatars({});
    } finally {
      setLoading(false);
    }
  };

  const goToProfile = (userId) => {
    navigate(`/home/profile/${userId}`);
  };

  return (
    <div className="find_user_page">
      <div className="find_user_container">
        <h1 className="find_user_title">Поиск пользователей</h1>

        <div className="search_bar">
          <input type="text" placeholder="Введите имя пользователя..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} disabled={loading}/>
          <button onClick={handleSearch} disabled={loading} className="search_btn">{loading ? "Поиск..." : "Найти"}</button>
        </div>

        {error && <p className="search_error">{error}</p>}

        <div className="users_results">
          {hasSearched && users.length === 0 && !loading && query.trim() && (
            <p className="no_users_found">Пользователи не найдены</p>
          )}

          {users.map((user, index) => {
            const avatarSrc = avatars[user.id] || "";

            return (
              <div key={user.id} className="user_card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="user_avatar">
                  {avatarSrc ? (
                    <img src={avatarSrc} alt={`${user.username}'s avatar`} />
                  ) : (
                    <div className="avatar_placeholder">
                      <span>{user.username[0]?.toUpperCase() || "?"}</span>
                    </div>
                  )}
                </div>

                <div className="user_details">
                  <h3 className="username">{user.username}</h3>
                  <p className="user_role">Роль: {user.role || "Пользователь"}</p>
                </div>

                <button className="profile_btn" onClick={() => goToProfile(user.id)}>Профиль</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Find_User;