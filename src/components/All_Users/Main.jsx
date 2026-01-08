import Image from "../../photoes/big_logo.png"


function Main({ user }) {
    return (
      <div className="main_page">
        <div className="main_content">
          <div className="text_top">
            <img className="big_logo logo_text" src={Image} alt="logo" />
            <h1 className="big_logo text neon_title">Добро пожаловать {user?.username || ", Друг"}!</h1>
            <h3 className="big_logo subtitle"></h3>
          </div>
  
          <section className="sec_info">
            <section className="sec_info_1 floating_card">
              <div className="div_info">
                <img src="" alt="img" className="info_img" />
                <div className="left_div">
                  <h3>Один</h3>
                  <p>Описание один.</p>
                </div>
              </div>
            </section>
  
            <section className="sec_info_2 floating_card delay_1">
              <div className="div_info">
                <div className="right_div">
                  <h3>Два</h3>
                  <p>Описание два.</p>
                </div>
                <img src="" alt="img" className="info_img" />
              </div>
            </section>
  
            <section className="sec_info_3 floating_card delay_2">
              <div className="div_info">
                <img src="" alt="img" className="info_img" />
                <div className="left_div">
                  <h3>Три</h3>
                  <p>Описание три.</p>
                </div>
              </div>
            </section>
  
            <section className="sec_info_4 floating_card delay_3">
              <div className="div_info">
                <div className="right_div">
                  <h3>Четыре</h3>
                  <p>Описание четыре.</p>
                </div>
                <img src="" alt="img" className="info_img" />
              </div>
            </section>
  
            <section className="sec_info_btm">
              <h3 className="text_box_h3 neon_glow">Почему мы?</h3>
              <div className="features_grid">
                <div className="feature_item">
                  <p className="text_box">Быстро</p>
                  <p>Бытрая загрузка</p>
                </div>
                <div className="feature_item">
                  <p className="text_box">Безопасно</p>
                  <p>Защита данных</p>
                </div>
                <div className="feature_item">
                  <p className="text_box">Удобно</p>
                  <p>Интуитивный интерфейс</p>
                </div>
                <div className="feature_item">
                  <p className="text_box">Надёжно</p>
                  <p>Безопасно</p>
                </div>
              </div>
              <div className="text_box_box">
                <p className="text_box_other neon_border">Присоединяйтесь к одному довольному пользователю</p>
              </div>
            </section>
          </section>
        </div>
      </div>
    );
  }
  
  export default Main;