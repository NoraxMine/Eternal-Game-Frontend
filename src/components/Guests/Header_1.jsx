import Image from "../../photoes/logo.jpg"


function Header_1() {

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
        </div>
      </div>
    </section>
  );
}

export default Header_1;