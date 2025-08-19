import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import {
  calendario,
  eventos,
  ajustes,
  desplegable,
  menu,
  cerrar,
  logout,
} from "../SVG";
import "./Sidebar.css";
import { useState, useEffect, useRef } from "react";

const Sidebar = ({ isOpen, setIsOpen })=> {
  const naviget = useNavigate();
  const [cookies, , removeCookie] = useCookies(["JWT"]);
  const sidebarRef = useRef(null);

  function logoutSubmit() {
    removeCookie("JWT", { path: "/" });
    naviget("/welcome");
  }

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  const navItems = [
    {
      title: "Mis eventos",
      path: "/",
      icon: eventos,
      hasDropdown: false,
    },
    {
      title: "Calendario",
      path: "/calendario",
      icon: calendario,
      hasDropdown: false,
    },
    {
      title: "Ajustes",
      icon: ajustes,
      hasDropdown: true,
      dropdownItems: ["Modo oscuro"],
    },
    {
      title: "Logout",
      icon: logout,
    },
  ];

  return (
    <div ref={sidebarRef} className={`sidebar ${isOpen ? "active" : ""}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? cerrar : menu}
      </button>

      <nav className="Opciones">
        {navItems.map((item, index) => (
          <div key={item.title} className="dropdown-container">
            {item.title === "Logout" ? (
              <div
                className="menu-item logout-item"
                onClick={logoutSubmit}
                style={{ cursor: "pointer" }}
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
            ) : !item.hasDropdown ? (
              <Link to={item.path} className="menu-item">
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ) : (
              <>
                <div
                  className="menu-item"
                  onClick={() => toggleDropdown(index)}
                >
                  {item.icon}
                  <span>{item.title}</span>
                  {desplegable}
                </div>
                {activeDropdown === index && (
                  <div className="dropdown">
                    {item.dropdownItems.map((subItem, i) => (
                      <div key={i} className="dropdown-item">
                        {subItem}
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={isOn}
                            onChange={toggleSwitch}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
