import React, { useState } from "react";

function Footer() {
  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} My E-Commerce Site. All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
