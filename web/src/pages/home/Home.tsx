import React from "react";

import "./style.css";

import codeTypingImg from "../../assets/code_typing.svg";

const Home = () => {
  return (
    <div className="container">
      <div className="content">
        <h2>
          Quer conhecer a comunidade de devs e fazer parte? Basta clicar em
          "Desenvolvedores"
        </h2>
        <img src={codeTypingImg} alt="Developers" />
      </div>
    </div>
  );
};

export default Home;
