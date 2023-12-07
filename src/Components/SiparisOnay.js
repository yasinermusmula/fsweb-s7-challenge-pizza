import React from "react";
import "../Css/SiparişOnay.css";
import logoSvg from "../logo.svg";

const SiparişOnay = () => {
  return (
    <div className="order-container">
      <img className="logo" src={logoSvg} alt="teknolojik yemekler" />
      <p>TEBRİKLER!</p>
      <p>PİZZANIZ YOLA ÇIKTI!</p>
    </div>
  );
};

export default SiparişOnay;
