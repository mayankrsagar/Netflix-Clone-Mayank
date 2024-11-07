import './Navbar.css';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useSnackbar } from 'notistack';

import bell_icon from '../../assets/bell_icon.svg';
import caret_icon from '../../assets/caret_icon.svg';
import logo from '../../assets/logo.png';
import profile_img from '../../assets/profile_img.png';
import search_icon from '../../assets/search_icon.svg';
import { logout } from '../../firebase';

const Navbar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [menuOpen, setMenuOpen] = useState(false);  // State to manage menu visibility
  const ref = useRef();
  const logoRef = useRef();

  const handleScroll = () => {
    if (window.scrollY > 80) {
      ref.current.classList.add('navbar-dark');
      logoRef.current.classList.add('navbar-logo-small');
    } else {
      ref.current.classList.remove('navbar-dark');
      logoRef.current.classList.remove('navbar-logo-small');
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
  };

  useEffect(() => {
    const debouncedHandleScroll = () => {
      window.requestAnimationFrame(handleScroll);
    };
    window.addEventListener('scroll', debouncedHandleScroll);

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, []);

  return (
    <div className="navbar" ref={ref}>
      <div className="navbarLeft">
        <img src={logo} alt="Logo" ref={logoRef} className="logo" />
        <ul className={`navbarMenu ${menuOpen ? 'active' : ''}`}>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbarRight">
        <img src={search_icon} alt="Search Icon" className="icons" />
        <p>Children</p>
        <img src={bell_icon} alt="Notification Bell Icon" className="icons" />
        <div className="navbarProfile">
          <img src={profile_img} alt="Profile" className="profile" />
          <img src={caret_icon} alt="Caret Icon" />
          <div className="dropdown">
            <p onClick={() => logout(enqueueSnackbar)}>Sign out of Netflix</p>
          </div>
        </div>
      </div>
      {/* Hamburger Icon for Mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default Navbar;
