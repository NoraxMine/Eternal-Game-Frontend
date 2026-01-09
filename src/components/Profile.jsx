import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DEFAULT_AVATAR_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwcHgiIGhlaWdodD0iMTIvcHgiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iIzk5OTk5OSIgc3Ryb2tlPSIjY2NjY2NjIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8Y2lyY2xlIGN4PSIxNSIgY3k9IjE0IiByPSIzIiBmaWxsPSJ3aGl0ZSIvPgogIDxjaXJjbGUgY3g9IjI1IiBjeT0iMTQiIHI9IjMiIGZpbGw9IndoaXRlIi8+CiAgPHBhdGggZD0iTTEwIDI2YyAwIDYtNSA5LTkgOWgxOGMwIDYtNSA5LTkgOXoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==";

function Profile({ currentUser }) {
  const { userId: paramUserId } = useParams();

  const [profile, setProfile] = useState({ about: "", avatar_base64: null, image_base64: null });
  const [profileUsername, setProfileUsername] = useState(""); 
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [bigImagePreview, setBigImagePreview] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedBigImage, setSelectedBigImage] = useState(null);

  useEffect(() => {
    if (!paramUserId || !currentUser) {
      setLoading(false);
      return;
    }

    const targetId = parseInt(paramUserId, 10);
    const owner = currentUser.id === targetId;
    setIsOwner(owner);

    fetch(`http://127.0.0.1:8000/api/profile/${targetId}`)
      .then(res => {
        if (!res.ok) throw new Error("Профиль не найден");
        return res.json();
      })
      .then(data => {
        setProfile(data);
        setAbout(data.about || "");

        setProfileUsername(data.username || "Пользователь");

        if (data.avatar_base64) {
          const src = `data:image/jpeg;base64,${data.avatar_base64}`;
          setAvatarPreview(src);
          if (owner) {
            localStorage.setItem(`avatar_${currentUser.id}`, src);
          }
        }

        if (data.image_base64) {
          setBigImagePreview(`data:image/jpeg;base64,${data.image_base64}`);
        }
      })
      .catch(err => console.error("Ошибка загрузки профиля:", err))
      .finally(() => setLoading(false));
  }, [paramUserId, currentUser]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setAvatarPreview(result);
        if (isOwner) {
          localStorage.setItem(`avatar_${currentUser.id}`, result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBigImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedBigImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBigImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!currentUser?.id) return;

    const formData = new FormData();
    formData.append("about", about);
    if (selectedAvatar) formData.append("avatar", selectedAvatar);
    if (selectedBigImage) formData.append("image", selectedBigImage);

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/profile/${currentUser.id}`, {
        method: "POST",
        headers: {
          "X-User-ID": currentUser.id.toString(),
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Ошибка сохранения");
      }

      setProfile(prev => ({
        ...prev,
        about: about,
      }));
      setAbout(about);

      if (selectedAvatar) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          setAvatarPreview(result);
          localStorage.setItem(`avatar_${currentUser.id}`, result);
        };
        reader.readAsDataURL(selectedAvatar);
      }

      if (selectedBigImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setBigImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedBigImage);
      }

      setIsEditing(false);
    } catch (err) {
      console.error("Ошибка сохранения:", err);
    }
  };

  if (loading) return <p className="loading_text">Загрузка профиля...</p>;

  const avatarSrc = avatarPreview || localStorage.getItem(`avatar_${currentUser?.id}`) || DEFAULT_AVATAR_SRC;
  const bigImageSrc = bigImagePreview || avatarSrc || DEFAULT_AVATAR_SRC;

  return (
    <section className="profiles">
      <div className="prof_top">
        <div className="profile_mini">
          {isEditing ? (
            <label className="edit_avatar_label">
              <img src={avatarSrc} alt="Avatar" />
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
              <span className="edit_overlay_small">Изменить аватар</span>
            </label>
          ) : (
            <img src={avatarSrc} alt="Avatar" />
          )}
          <p className="profile_name">{profileUsername}</p>
          <p className="profile_info">{isOwner ? "Ваш профиль" : "Профиль пользователя"}</p>
        </div>
      </div>

      <div className="about_user">
        <div className="profile_about">
          <div className="profile_about_img">
            {isEditing ? (
              <label className="edit_image_label">
                <img src={bigImageSrc} alt="Big profile img" />
                <input type="file" accept="image/*" onChange={handleBigImageChange} />
                <span className="edit_overlay">Изменить главное фото</span>
              </label>
            ) : (
              <img src={bigImageSrc} alt="Big profile img" />
            )}
          </div>

          {isEditing ? (
            <textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Расскажите о себе..."/>
          ) : (
            <p>{profile.about || "Информация отсутствует"}</p>
          )}
        </div>

        <div className="about_btn">
          {isOwner && !isEditing && (
            <button onClick={() => setIsEditing(true)}>Редактировать профиль</button>
          )}
          {isEditing && (
            <>
              <button onClick={handleSave}>Сохранить</button>
              <button onClick={() => setIsEditing(false)}>Отмена</button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;