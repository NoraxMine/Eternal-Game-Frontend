import { useState, useEffect } from "react";

function Download({ currentUser }) {
  const [downloads, setDownloads] = useState([]);
  const [filteredDownloads, setFilteredDownloads] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isAdmin] = useState(currentUser?.role === "admin");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategories, setEditCategories] = useState(["Документы"]);
  const [editImage, setEditImage] = useState(null);
  const [editFile, setEditFile] = useState(null);

  const allCategories = ["Документы", "Изображения", "Программы", "Видео", "Архивы"];

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("https://back-305q.onrender.com/api/downloads");
        const data = await res.json();
        setDownloads(data);
        setFilteredDownloads(data);
      } catch (err) {
        console.error("Ошибка загрузки файлов:", err);
      }
    };
    load();
  }, []);

  useEffect(() => {
    let filtered = downloads;

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(lowerQuery)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item =>
        item.categories && item.categories.some(cat => selectedCategories.includes(cat))
      );
    }

    setFilteredDownloads(filtered);
  }, [searchQuery, selectedCategories, downloads]);

  const toggleFilterCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  const toggleEditCategory = (cat) => {
    setEditCategories(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  const startAdd = () => {
    setEditingId("new");
    setEditTitle("");
    setEditDescription("");
    setEditCategories(["Документы"]);
    setEditImage(null);
    setEditFile(null);
  };

  const handleSave = async () => {
    if (!editTitle.trim()) {
      return;
    }
    if (editCategories.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append("title", editTitle.trim());
    formData.append("description", editDescription.trim());
    formData.append("categories", editCategories.join(","));
    if (editImage) formData.append("image", editImage);
    if (editFile) formData.append("file", editFile);

    try {
      const res = await fetch("https://back-305q.onrender.com/api/downloads", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Ошибка сервера");
      }
      const updatedRes = await fetch("https://back-305q.onrender.com/api/downloads");
      const updatedData = await updatedRes.json();
      setDownloads(updatedData);
      setFilteredDownloads(updatedData);
      setEditingId(null);
      alert("Файл успешно добавлен!");
    } catch (err) {
      console.error("Ошибка сохранения:", err);
      alert("Ошибка: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот файл? Это действие нельзя отменить.")) {
      return;
    }
    try {
      const res = await fetch(`https://back-305q.onrender.com/api/downloads/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Ошибка удаления");
      const updated = downloads.filter(d => d.id !== id);
      setDownloads(updated);
      setFilteredDownloads(updated);
    } catch (err) {
      console.error("Ошибка удаления:", err);
    }
  };

  const handleDownload = (fileUrl, fileName) => {
    if (!fileUrl) return;
    const link = document.createElement("a");
    link.href = `http://127.0.0.1:8000${fileUrl}`;
    link.download = fileName || "file";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="download_page">
      <div className="download_container">
        <h1 className="download_title">Скачать файлы</h1>

        <div className="download_search">
          <input type="text" placeholder="Поиск по названию..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          <button>Найти</button>
        </div>

        <div className="download_content">
          <div className="download_categories">
            <h4>Категории</h4>
            {allCategories.map(cat => (
              <button key={cat} className={selectedCategories.includes(cat) ? "active" : ""} onClick={() => toggleFilterCategory(cat)}>
                {cat}
              </button>
            ))}
            {selectedCategories.length > 0 && (
              <button onClick={() => setSelectedCategories([])} className="clear_btn">Сбросить фильтр</button>
            )}
          </div>

          <div className="download_grid">
            {isAdmin && editingId !== "new" && (
              <div className="download_card add_card">
                <button className="add_btn" onClick={startAdd}>+ Добавить файл</button>
              </div>
            )}

            {isAdmin && editingId === "new" && (
              <div className="download_card editing_card">
                <div className="card_content">
                  <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Название файла"/>
                  <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Краткое описание (необязательно)" rows="4"/>

                  <div className="categories_checkboxes">
                    <label>Категории (выберите одну или несколько):</label>
                    {allCategories.map(cat => (
                      <label key={cat} className="checkbox_label">
                        <input type="checkbox" checked={editCategories.includes(cat)} onChange={() => toggleEditCategory(cat)}/>
                        {cat}
                      </label>
                    ))}
                  </div>

                  <label>Изображение
                    <input type="file" accept="image/*" onChange={(e) => setEditImage(e.target.files[0] || null)}/>
                  </label>
                  <label>Файл
                    <input type="file" onChange={(e) => setEditFile(e.target.files[0] || null)}/>
                  </label>

                  <div className="edit_buttons">
                    <button onClick={handleSave}>Сохранить</button>
                    <button onClick={() => setEditingId(null)}>Отмена</button>
                  </div>
                </div>
              </div>
            )}

            {filteredDownloads.map((item, index) => (
              <div key={item.id} className="download_card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="card_image">
                  {item.image_url ? (
                    <img src={`http://127.0.0.1:8000${item.image_url}`} alt={item.title} />
                  ) : (
                    <div className="no_image">Нет изображения</div>
                  )}
                </div>
                <div className="card_info">
                  <h3 className="card_title">{item.title}</h3>
                  <div className="card_categories">
                    {item.categories.map(cat => (
                      <span key={cat} className="cat_tag">{cat}</span>
                    ))}
                  </div>
                  <p className="card_description">
                    {item.description || "Нет описания"}
                  </p>
                </div>
                <div className="card_actions">
                  <button className="download_btn"onClick={() => handleDownload(item.file_url, item.file_name)}>Скачать</button>
                  {isAdmin && (
                    <button className="delete_btn"onClick={() => handleDelete(item.id)}>Удалить</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Download;