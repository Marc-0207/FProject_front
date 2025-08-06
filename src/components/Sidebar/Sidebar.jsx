import { Link } from "react-router-dom";
import {
  calendario,
  notificacion,
  eventos,
  ajustes,
  desplegable,
  menu,
  cerrar,
} from "../SVG";
import "./Sidebar.css";
import { useState } from "react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const navItems = [
    { title: "Mis eventos", path: "/home", icon: eventos, hasDropdown: false },
    {
      title: "Calendario",
      path: "/calendario",
      icon: calendario,
      hasDropdown: false,
    },
    {
      title: "Notificaciones",
      path: "/notificaciones",
      icon: notificacion,
      hasDropdown: false,
    },
    {
      title: "Ajustes",
      icon: ajustes,
      hasDropdown: true,
      dropdownItems: ["Modo oscuro"],
    },
  ];

  return (
    <div className={`sidebar ${isOpen ? "" : "closed"}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? cerrar : menu}
      </button>

      <nav className="Opciones">
        {navItems.map((item, index) => (
          <div key={item.title} className="dropdown-container">
            {!item.hasDropdown ? (
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
                      <div key={i}>
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
