import React from "react";
import { Link } from "react-router-dom";
import "../Css/Anasayfa.css";
import pizzaImg from "../Fotolar/banner.png";
import logoSvg from "../logo.svg"

const AnaSayfa = () => {
  return (
    <div className="container">
      <img src={logoSvg} alt="" className="title" />
      <p>KOD ACIKTIRIR,</p>
      <p>PİZZA DOYURUR</p>
      <Link to="/order">
        <button className="order-button">ACIKTIM</button>
      </Link>

      <img src={pizzaImg} className="pizza-image" alt="" />
    </div>
  );
};

export default AnaSayfa;
