import { useState, useEffect } from "react";

const DEFAULT_AVATAR_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwcHgiIGhlaWdodD0iMTIwcHgiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iIzk5OTk5OSIgc3Ryb2tlPSIjY2NjY2NjIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8Y2lyY2xlIGN4PSIxNSIgY3k9IjE0IiByPSIzIiBmaWxsPSJ3aGl0ZSIvPgogIDxjaXJjbGUgY3g9IjI1IiBjeT0iMTQiIHI9IjMiIGZpbGw9IndoaXRlIi8+CiAgPHBhdGggZD0iTTEwIDI2YyAwIDYtNSA5LTkgOWgxOGMwIDYtNSA5LTkgOXoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==";

function Admin_Profile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [bigImagePreview, setBigImagePreview] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedBigImage, setSelectedBigImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://127.0.0.1:8000/api/profile/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setAbout(data.about || "");
        if (data.avatar_base64) {
          const src = `data:image/jpeg;base64,${data.avatar_base64}`;
          setAvatarPreview(src);
          localStorage.setItem(`avatar_${user.id}`, src);
        }
        if (data.image_base64) {
          setBigImagePreview(`data:image/jpeg;base64,${data.image_base64}`);
        }
      })
      .catch(console.error);
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setAvatarPreview(result);
        localStorage.setItem(`avatar_${user.id}`, result);
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
    if (!user?.id) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("about", about);
    if (selectedAvatar) formData.append("avatar", selectedAvatar);
    if (selectedBigImage) formData.append("image", selectedBigImage);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/profile/${user.id}`, {
        method: "POST",
        headers: {
          "X-User-ID": user.id.toString(),
        },
        body: formData,
      });

      if (!response.ok) {
        let errorText = "Неизвестная ошибка";
        try {
          const errorData = await response.json();
          errorText = errorData.detail || JSON.stringify(errorData);
        } catch {
          errorText = await response.text();
        }
        throw new Error(errorText);
      }

      if (selectedAvatar) {
        const reader = new FileReader();
        reader.onloadend = () => {
          localStorage.setItem(`avatar_${user.id}`, reader.result);
        };
        reader.readAsDataURL(selectedAvatar);
      }

      setIsEditing(false);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const avatarSrc = avatarPreview || localStorage.getItem(`avatar_${user?.id}`) || DEFAULT_AVATAR_SRC;
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
          <p className="profile_name">{user?.username || "Админ"}</p>
          <p className="profile_info">Администратор системы</p>
        </div>
        <button className="admin_btn">Панель управления</button>
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
            <p>{about || "Информация отсутствует"}</p>
          )}
        </div>

        <div className="about_btn">
          {isEditing ? (
            <>
              <button onClick={handleSave} disabled={loading}>
                {loading ? "Сохранение..." : "Сохранить"}
              </button>
              <button onClick={() => setIsEditing(false)}>Отмена</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>Редактировать профиль</button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Admin_Profile;