import React, { useState } from "react";
import api from "../restApi.json";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const data = api.data[0];
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate("/menu"); // navigate to MenuPage
    setShow(false);    // close mobile menu if open
  };

  return (
    <nav>
      <div className="logo">BookYourBite</div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          {data.navbarLinks.map((element) => (
            <ScrollLink
              to={element.link}
              spy={true}
              smooth={true}
              duration={500}
              key={element.id}
              onClick={() => setShow(false)}
            >
              {element.title}
            </ScrollLink>
          ))}
        </div>
        <button className="menuBtn" onClick={handleMenuClick}>
          MENU
        </button>
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
