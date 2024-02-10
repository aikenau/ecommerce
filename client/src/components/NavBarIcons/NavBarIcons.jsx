import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faHeart,
  faShoppingCart,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import "./NavbarIcons.css";

const NavBarIcons = () => {
  return (
    <div className="navbar-icons">
      <FontAwesomeIcon icon={faSearch} />
      <FontAwesomeIcon icon={faUser} />
      <FontAwesomeIcon icon={faHeart} />
      <FontAwesomeIcon icon={faShoppingCart} />
      <FontAwesomeIcon icon={faBars} />
    </div>
  );
};

export default NavBarIcons;
