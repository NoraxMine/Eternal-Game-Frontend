import { Link } from "react-router-dom";
import Image from "../../photoes/big_logo.png"


function Main_1() {
  return (
    <div className="main_1_page">
      <div className="main_content">
        <div className="text_top">
          <img className="big_logo logo_text" src={Image} alt="logo" />
          <h1 className="big_logo text neon_title typing_effect">Добро пожаловать</h1>
          <h3 className="big_logo subtitle">Общайтесь</h3>
        </div>

        <div >
          <button className="main_btn act_main_btn pulse_btn secondary_btn" onClick={() => {
            const link = document.createElement("a");
            link.href = "http://127.0.0.1:8000/api/download_launcher";
            link.download = "MyGame_Launcher.exe";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}>Скачать</button>
          
        </div>

        <div className="buttons_win">
          <Link to="/registr"><button className="act_btn pulse_btn">Регистрация</button></Link>
          <Link to="/login"><button className="act_btn pulse_btn">Войти</button></Link>
        </div>

        <section className="sec_info">
          <section className="sec_info_1 floating_card">
            <div className="div_info">
              <img src="" alt="img" className="info_img" />
              <div className="left_div">
                <h3>Быстрые сообщения</h3>
                <p>Общайтесь в реальном времени.</p>
              </div>
            </div>
          </section>

          <section className="sec_info_2 floating_card delay_1">
            <div className="div_info">
              <div className="right_div">
                <h3>Безопасность превыше всего</h3>
                <p>Ваши данные защищены.</p>
              </div>
              <img src="" alt="img" className="info_img" />
            </div>
          </section>

          <section className="sec_info_3 floating_card delay_2">
            <div className="div_info">
              <img src="" alt="img" className="info_img" />
              <div className="left_div">
                <h3>Доступность</h3>
                <p>Всегда и везде.</p>
              </div>
            </div>
          </section>

          <section className="sec_info_4 floating_card delay_3">
            <div className="div_info">
              <div className="right_div">
                <h3>Бесплатно</h3>
                <p>Все основные функции — бесплатно.</p>
              </div>
              <img src="" alt="img" className="info_img" />
            </div>
          </section>

          <section className="sec_info_btm">
            <h3 className="text_box_h3 neon_glow">Начните прямо сейчас</h3>
            <div className="features_grid">
              <div className="feature_item">
                <p className="text_box">1</p>
                <p>Активный пользователь</p>
              </div>
              <div className="feature_item">
                <p className="text_box">24/7</p>
                <p>Поддержка</p>
              </div>
              <div className="feature_item">
                <p className="text_box">Бесплатно</p>
                <p>Базовый тариф</p>
              </div>
              <div className="feature_item">
                <p className="text_box">5★</p>
                <p>Отзыв пользователя</p>
              </div>
            </div>
            <div className="text_box_box">
              <p className="text_box_other neon_border">Присоединяйтесь к сообществу</p>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}

export default Main_1;