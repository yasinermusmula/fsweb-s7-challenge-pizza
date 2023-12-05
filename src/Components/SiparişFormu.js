import React from "react";
import "../Css/SiparişFormu.css";
import LogoSvg from "../logo.svg";
import { Link } from "react-router-dom";

const SiparisFormu = () => {
  return (
    <div className="main-container">
      <nav className="nav">
        <img src={LogoSvg} alt="" className="logo" />
        <div className="info-container">
          <Link>Anasayfa</Link>
          <Link>Seçenekler</Link>
          <Link>Sipariş Oluştur</Link>
        </div>
      </nav>

      <div className="main-info-container">
        <h2>Position Absolute Acı Pizza</h2>
        <div className="about-pizza">
          <span>89TL</span>
          <div className="reviews">
            <span>4.9</span>
            <span>(200)</span>
          </div>
        </div>
        <p>
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
          pizza tam sana göre.Pizza, domates, peynir ve genellikle çeşitli diğer
          malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir
          fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak,
          düzleştirilmiş mayalı buğday bazlı hamurdan oluşanİtalyan kökenli
          lezzetli bir yemektir. Küçük bir pizzaya bazen pizetta denir.
        </p>
      </div>
    </div>
  );
};

export default SiparisFormu;
