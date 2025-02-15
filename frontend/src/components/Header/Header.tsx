import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import css from './Header.module.css';

import menu_icon from '../../images/SVG/menu_icon.svg';
import clear_icon from '../../images/SVG/clear_icon.svg';
import search_icon from '../../images/SVG/search_icon.svg';
import user_icon from '../../images/PNG/user_icon.png';
import apartment_logo from '../../images/PNG/apartment_logo.png';
import ApartmentList from '../ApartmentList/ApartmentList';
import UserInfo from '../UserInfo/UserInfo';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false); // Відкриття/закриття меню
  const [apartmentsMenuOpen, setApartmentsMenuOpen] = useState<boolean>(false); // Стан для ApartmentList
  const [animationActive, setAnimationActive] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [isUserInfoOpen, setIsUserInfoOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  const handleLogoClick = () => {
    setApartmentsMenuOpen(prev => !prev);
    setAnimationActive(prev => !prev);
  };

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    [],
  );

  const handleClearSearchText = useCallback(() => {
    setSearchText('');
  }, []);

  const toggleUserInfo = () => {
    setIsUserInfoOpen(prev => !prev);
  };

  // Закриття меню при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className={css.header_container}>
      <div className={css.header}>
        <div className={css.menu_block} ref={menuRef}>
          <img
            className={`${css.menu_icon} ${menuOpen ? css.active : ''}`}
            src={menu_icon}
            alt="Меню"
            onClick={handleMenuToggle}
          />
          <p onClick={handleMenuToggle}>Меню</p>

          {menuOpen && (
            <ul className={css.dropdown_menu}>
              <li>
                <NavLink to="/apartments">Квартири</NavLink>
              </li>
              <li>
                <NavLink to="/houses">Будинки</NavLink>
              </li>
              <li>
                <NavLink to="/contacts">Контакти</NavLink>
              </li>
              <li>
                <NavLink to="/about">Про нас</NavLink>
              </li>
            </ul>
          )}
        </div>

        <div className={css.search_block}>
          <input
            type="text"
            placeholder="Пошук квартир"
            className={css.search_input}
            value={searchText}
            onChange={handleSearchInputChange}
          />
          {searchText && (
            <div className={css.clear_button} onClick={handleClearSearchText}>
              <img src={clear_icon} alt="Очистити пошук" />
            </div>
          )}
          <button className={css.search_button}>
            <img className={css.search_icon} src={search_icon} alt="Пошук" />
          </button>
        </div>

        <div className={css.logo_register}>
          <NavLink to="/">
            <img className={css.user_icon} src={user_icon} alt="Профіль" />
          </NavLink>
          <span onClick={toggleUserInfo}>Увійти</span>
        </div>
      </div>

      {isUserInfoOpen && <UserInfo onClose={toggleUserInfo} />}

      <button
        className={`${css.apartments_logo_block} ${animationActive ? css.animated : ''}`}
        onClick={handleLogoClick}>
        <img
          className={css.menu_icon}
          src={apartment_logo}
          alt="Знайти квартиру мрії"
        />
        <p>Знайди квартиру мрії</p>
      </button>

      {apartmentsMenuOpen && (
        <ApartmentList onClose={() => setApartmentsMenuOpen(false)} />
      )}
    </div>
  );
};

export default Header;
