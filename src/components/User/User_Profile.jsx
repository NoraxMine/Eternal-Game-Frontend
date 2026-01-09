import { useState, useEffect } from "react";

function User_Profile({ user }) {
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
        body: formData,
      });

      if (!response.ok) throw new Error("Ошибка сохранения");

      setIsEditing(false);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const avatarSrc = avatarPreview || localStorage.getItem(`avatar_${user?.id}`) || "";
  const bigImageSrc = bigImagePreview || avatarSrc || ""; 

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
          <p className="profile_name">{user?.username || "Пользователь"}</p>
          <p className="profile_info">Пользователь системы</p>
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
            <p>{about || "Информация отсутствует"}</p>
          )}
        </div>

        <div className="about_btn">
          {isEditing ? (
            <>
              <button onClick={handleSave} disabled={loading}>{loading ? "Сохранение..." : "Сохранить"}</button>
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

export default User_Profile;