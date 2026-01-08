import { Link } from "react-router-dom";
import Image from "../photoes/logo.jpg"


function Footer() {
  return (
    <footer className="sec_foot">
      <div className="foot_container">
        <div className="foot_info">
          <div className="foot_brand">
            <div className="foot_logo_text">
              <img src={Image} alt="logo"/>
              <p className="brand_name">Eternal Game</p>
            </div>

            <div className="foot_media">
              <button aria-label="Telegram" className="social_btn">
                <a href="https://t.me/eternal_game_m">TG</a>
              </button>
              <button aria-label="Discord" className="social_btn">
                <a href="https://discord.gg/phpGxj2G">DS</a>
              </button>
              <button aria-label="Instagram" className="social_btn">
                <span>IG</span>
              </button>
              <button aria-label="YouTube" className="social_btn">
                <span>YT</span>
              </button>
              <button aria-label="VK" className="social_btn">
                <span>VK</span>
              </button>
            </div>
          </div>

          <div className="foot_copyright">
            <p>© 2026 Eternal Game. Все права защищены.</p>
          </div>
        </div>

        <div className="foot_lists">
          <div className="foot_list">
            <h5>Компания</h5>
            <ul>
              <li>О нас</li>
              <li>Команда</li>
              <li>Карьера</li>
              <li>Блог</li>
              <li>Контакты</li>
            </ul>
          </div>

          <div className="foot_list">
            <h5>Продукт</h5>
            <ul>
              <li>Функции</li>
              <li>Тарифы</li>
              <li>Безопасность</li>
              <li>Интеграции</li>
              <li>API</li>
            </ul>
          </div>

          <div className="foot_list">
            <h5>Поддержка</h5>
            <ul>
              <li>Помощь</li>
              <li>Документация</li>
              <li>FAQ</li>
              <li>Статус системы</li>
              <li>Обратная связь</li>
            </ul>
          </div>

          <div className="foot_list">
            <h5>Юридическое</h5>
            <ul>
              <li>Политика конфиденциальности</li>
              <li>Условия использования</li>
              <li>Правила сообщества</li>
              <li>Cookies</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;