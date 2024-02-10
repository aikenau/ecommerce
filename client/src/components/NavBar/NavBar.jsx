import React from "react";
import "./Navbar.css";
import NavbarItem from "../NavBarItem/NavBarItem";
import NavBarIcons from "../NavBarIcons/NavBarIcons";

const navItems = [
  { name: "HOME", url: "#home!!" },
  { name: "NEW-ARRIVAL", url: "#new!!" },
  { name: "PRODUCT", url: "#product!!!" },
  { name: "BLOG", url: "#blog!!!" },
  { name: "SUPPORT", url: "#support!!!" },
];

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavbarItem Items={navItems} />
      <NavBarIcons />
    </nav>
  );
};

export default NavBar;
