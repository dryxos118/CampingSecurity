import React, { useState, useRef, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Twitter, Facebook, LinkedIn } from "@mui/icons-material";
import logo from "../assets/react.svg";
import { useLocation } from "react-router-dom";

// Liste des liens de navigation
const links = [
  {
    id: 1,
    url: "/",
    text: "accueil",
  },
  {
    id: 2,
    url: "/",
    text: "House",
  },
  {
    id: 3,
    url: "/",
    text: "Reservation",
  },
];

// Liste des liens sociaux
const social = [
  {
    id: 1,
    url: "https://www.facebook.com",
    icon: <Facebook />,
  },
  {
    id: 2,
    url: "https://www.twitter.com",
    icon: <Twitter />,
  },
  {
    id: 3,
    url: "https://www.linkedin.com",
    icon: <LinkedIn />,
  },
];

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const navbarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setShowLinks(false);
  }, [location]);

  useEffect(() => {
    const closeNavOnClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setShowLinks(false);
      }
    };
    document.addEventListener("click", closeNavOnClickOutside);
    return () => {
      document.removeEventListener("click", closeNavOnClickOutside);
    };
  }, []);

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = 0;
    }
  }, [showLinks]);

  return (
    <nav ref={navbarRef}>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} alt="logo" className="logo" />
          <button
            className="nav-toggle"
            onClick={() => setShowLinks(!showLinks)}
          >
            <MenuIcon />
          </button>
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links mb-0" ref={linksRef}>
            {links.map((link) => {
              const { id, url, text } = link;

              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="social-icons">
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;

            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
