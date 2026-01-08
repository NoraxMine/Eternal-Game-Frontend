import { useState, useEffect, useRef } from "react";

const DEFAULT_AVATAR_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgNDAgNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM5OTk5OTkiLz4KICA8Y2lyY2xlIGN4PSIxNSIgY3k9IjE0IiByPSIzIiBmaWxsPSJ3aGl0ZSIvPgogIDxjaXJjbGUgY3g9IjI1IiBjeT0iMTQiIHI9IjMiIGZpbGw9IndoaXRlIi8+CiAgPHBhdGggZD0iTTEwIDI2YyAwIDYtNSA5LTkgOWgxOGMwIDYtNSA5LTkgOXoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==";

function Chat2({ currentUser }) {
  const [chatPartners, setChatPartners] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [avatars, setAvatars] = useState({});
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!currentUser) {
      setChatPartners([]);
      return;
    }

    const loadActiveChats = () => {
      fetch("https://back-305q.onrender.com/api/active_chats", {
        headers: { "X-User-ID": currentUser.id.toString() }
      })
        .then(res => res.json())
        .then(data => {
          setChatPartners(data.users || []);
        })
        .catch(err => console.error("Ошибка загрузки активных чатов:", err));
    };

    loadActiveChats();
    const interval = setInterval(loadActiveChats, 5000); 

    return () => clearInterval(interval);
  }, [currentUser]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() && currentUser) {
        fetch(`https://back-305q.onrender.com/api/search_users?query=${encodeURIComponent(searchQuery)}`)
          .then(res => res.json())
          .then(data => {
            setSearchResults(data.filter(u => u.id !== currentUser.id));
          })
          .catch(err => console.error("Ошибка поиска:", err));
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, currentUser]);

  useEffect(() => {
    if (!selectedUser || !currentUser) {
      setMessages([]);
      return;
    }

    const loadMessages = () => {
      fetch(`https://back-305q.onrender.com/api/chat/${selectedUser.id}`, {
        headers: { "X-User-ID": currentUser.id.toString() }
      })
        .then(res => res.json())
        .then(data => {
          setMessages(data.messages || []);
        })
        .catch(err => console.error("Ошибка обновления чата:", err));
    };

    loadMessages();
    const intervalId = setInterval(loadMessages, 3000);

    return () => clearInterval(intervalId);
  }, [selectedUser, currentUser]);

  const getAvatarSrc = async (userId) => {
    const cached = localStorage.getItem(`avatar_${userId}`);
    if (cached) return cached;

    try {
      const res = await fetch(`https://back-305q.onrender.com/api/profile/${userId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.avatar_base64) {
          const src = `data:image/jpeg;base64,${data.avatar_base64}`;
          localStorage.setItem(`avatar_${userId}`, src);
          return src;
        }
      }
    } catch {}
    return DEFAULT_AVATAR_SRC;
  };

  useEffect(() => {
    const usersToLoad = [...chatPartners, ...searchResults];
    const uniqueIds = [...new Set(usersToLoad.map(u => u.id))];

    uniqueIds.forEach(async (id) => {
      if (!avatars[id]) {
        const src = await getAvatarSrc(id);
        setAvatars(prev => ({ ...prev, [id]: src }));
      }
    });
  }, [chatPartners, searchResults]);

  useEffect(() => {
    if (selectedUser && !avatars[selectedUser.id]) {
      getAvatarSrc(selectedUser.id).then(src => {
        setAvatars(prev => ({ ...prev, [selectedUser.id]: src }));
      });
    }
  }, [selectedUser]);

  const handleSend = () => {
    if (!currentUser || !selectedUser || !inputValue.trim()) return;

    const textToSend = inputValue.trim();

    fetch(`https://back-305q.onrender.com/api/chat/${selectedUser.id}`, {
      method: "POST",
      headers: {
        "X-User-ID": currentUser.id.toString(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ text: textToSend })
    })
      .then(res => res.json())
      .then(res => {
        setMessages(prev => [...prev, res.data]);
        setInputValue("");

        setTimeout(() => {
          const container = chatContainerRef.current;
          if (container) {
            container.scrollTop = container.scrollHeight;
          }
        }, 100);
      })
      .catch(err => {
        console.error("Ошибка отправки:", err);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const displayedUsers = searchQuery.trim() ? searchResults : chatPartners;

  return (
    <div className="chat_page">
      <div className="list_and_chat">
        <div className="users_panel">
          <div className="search_container">
            <input type="search" placeholder="Поиск пользователей..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>

          <div className="users_list">
            <ul>
              {displayedUsers.length > 0 ? (
                displayedUsers.map((u, index) => (
                  <li key={u.id} className={`chat_user_item ${selectedUser?.id === u.id ? "active" : ""}`} onClick={() => handleUserClick(u)} style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="user_avatar">
                      <img src={avatars[u.id] || DEFAULT_AVATAR_SRC} alt="avatar" />
                    </div>
                    <div className="user_info">
                      <p className="username">{u.username}</p>
                      <span className="status">
                        {searchQuery.trim() ? "Найден" : "Активный чат"}
                      </span>
                    </div>
                  </li>
                ))
              ) : searchQuery.trim() ? (
                <li className="no_results">Ничего не найдено</li>
              ) : (
                <li className="no_results">Нет активных чатов. Начните общение!</li>
              )}
            </ul>
          </div>
        </div>

        <div className="chat_area">
          {selectedUser ? (
            <>
              <div className="chat_header">
                <div className="header_user">
                  <img src={avatars[selectedUser.id] || DEFAULT_AVATAR_SRC} alt="avatar" />
                  <h3>{selectedUser.username}</h3>
                </div>
              </div>

              <div ref={chatContainerRef} className="messages_container">
                <div className="wave_overlay"></div>

                {messages.length === 0 ? (
                  <p className="empty_chat">Начните общение — напишите первое сообщение!</p>
                ) : (
                  messages.map((msg, i) => (
                    <div key={i} className={`message_bubble ${msg.from === currentUser.id ? "sent" : "received"}`} style={{ animationDelay: `${i * 0.05}s` }}>
                      <div className="bubble_content">
                        <p>{msg.text}</p>
                        <span className="timestamp">{new Date(msg.timestamp).toLocaleString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="input_area">
                <input type="text" placeholder="Введите сообщение..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown}/>
                <button onClick={handleSend}>Отправить</button>
              </div>
            </>
          ) : (
            <div className="no_chat_selected">
              <p>Выберите чат из списка слева</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat2;