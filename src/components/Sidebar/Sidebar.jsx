import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  calendario,
  notificacion,
  eventos,
  ajustes,
  desplegable,
  menu,
  cerrar,
  logout,
} from "../SVG";
import "./Sidebar.css";
import { useState } from "react";

const Sidebar = ({ isOpen, setIsOpen }) => {

  let naviget = useNavigate();
  function logoutSubmit(){
    naviget("/welcome"); 
  }
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const navItems = [
    { title: "Mis eventos",
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
    {
      title: "Logout",
      icon: logout,
    }
  ];

  return (
    <div className={`sidebar ${isOpen ? "" : "closed"}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? cerrar : menu}
      </button>

      <nav className="Opciones">
        {navItems.map((item, index) => (
          <div key={item.title} className="dropdown-container">
            {item.title === "Logout" ? (
              <div className="menu-item logout-item" onClick={logoutSubmit} style={{ cursor: "pointer" }}>
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
