import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <nav className="nav-container">
      <div>
        <Link className="" to="/">
          Home
        </Link>
      </div>
      <div>
        <Link className="" to="/developers">
          Desenvolvedores
        </Link>
      </div>
    </nav>
  );
};

export default Header;
