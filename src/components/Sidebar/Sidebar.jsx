import { calendario, notificacion, eventos, ajustes, desplegable } from '../SVG';
import './Sidebar.css';
import { useState } from 'react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    { title: 'Mis eventos', icon: eventos, hasDropdown: false },
    { title: 'Calendario', icon: calendario, hasDropdown: false },
    { title: 'Notificaciones', icon: notificacion, hasDropdown: false },
    { 
      title: 'Ajustes', 
      icon: ajustes, 
      hasDropdown: true, 
      dropdownItems: ['Modo oscuro'] 
    },
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div className={`sidebar ${isOpen ? '' : 'closed'}`}>
      <h1>Desplegable</h1>

      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Cerrar' : 'Abrir'}
      </button>

      <nav className='Opciones'> 
        {navItems.map((item, index) => (
          <div key={item.title}>
            <div className="menu-item" onClick={() => item.hasDropdown && toggleDropdown(index)}>
              {item.icon}
              <span>{item.title}</span>
            </div>
            {item.hasDropdown && activeDropdown === index && (
              <div className="dropdown"> 
                {item.dropdownItems.map((subItem, i) => (
                  <div key={i}>{subItem}</div>

                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
