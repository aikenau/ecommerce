import React from "react";
import "./NavbarItem.css";

const NavbarItem = ({ Items }) => {
  return (
    <ul className="navbar-nav">
      {Items.map((item, index) => (
        <li key={index} className="nav-item">
          <a href={item.url} className="nav-link">
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NavbarItem;
