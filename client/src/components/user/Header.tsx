/* eslint-disable @typescript-eslint/no-unused-vars */
import style from "../../assets/style/user/header.module.scss";
import Triptopia from "../../assets/photo/logo-dark.png";
import { Link } from "react-router";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const Header: React.FC = () => {
  //pages
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //-------------------------------------------------------------------------------
  //menu
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchor);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const selectMenuItem = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(null);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  //screen width
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className={style.header}>
        <div className={style.headerBox}>
          <div className={style.imgBox}>
            <img className={style.image} src={Triptopia} alt="logo" />
          </div>

          <nav className={style.nav}>
            <ul className={style.unorderList}>
              <Link to={"/home"} className={style.link}>
                <li className={style.item}>home</li>
              </Link>
              <Link to={"/about-us"} className={style.link}>
                <li className={style.item}>about</li>
              </Link>
              <Link to={"/tours"} className={style.link}>
                <li className={style.item}>tours</li>
              </Link>
              <li
                className={style.item}
                onClick={handleMenuClick}
                aria-haspopup="true"
              >
                pages
              </li>
              <Link to={"/contact-us"} className={style.link}>
                <li className={style.item}>contact</li>
              </Link>

              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "lock-button",
                  role: "listbox",
                }}
              >
                <MenuItem
                  onClick={(event) => handleMenuItemClick(event)}
                  className={style.menu}
                >
                  pagesss
                </MenuItem>
              </Menu>
            </ul>
          </nav>

          <div className={style.btnBox}>
            <Link className={style.link} to={"/login"}>
              <button
                type="button"
                className={`${style.loginBtn} ${style.btn}`}
              >
                login
              </button>
            </Link>
            <Link className={style.link} to={"/register"}>
              <button
                type="button"
                className={`${style.registerBtn} ${style.btn}`}
              >
                register
              </button>
            </Link>
          </div>

          <div className={style.menu} aria-haspopup="true" onClick={openMenu}>
            <MenuIcon />
          </div>
          <Menu
            id="lock-menu"
            anchorEl={menuAnchor}
            open={isMenuOpen}
            onClose={closeMenu}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
            }}
          >
            {screenWidth <= 600 ? (
              <>
                <MenuItem className={style.menuItem}>
                  <Link to={"/home"} className={style.link}>
                    Home
                  </Link>
                </MenuItem>
                <MenuItem className={style.menuItem}>
                  <Link to={"/about-us"} className={style.link}>
                    About
                  </Link>
                </MenuItem>
                <MenuItem className={style.menuItem}>
                  <Link to={"/tours"} className={style.link}>
                    Tours
                  </Link>
                </MenuItem>
                <MenuItem className={style.menuItem}>
                  <Link to={"/contact-us"} className={style.link}>
                    Contact
                  </Link>
                </MenuItem>
              </>
            ) : null}
            <MenuItem
              onClick={(event) => selectMenuItem(event)}
              className={style.menuItem}
            >
              <Link to={"/login"} className={style.link}>
                Login
              </Link>
            </MenuItem>
            <MenuItem
              onClick={(event) => selectMenuItem(event)}
              className={style.menuItem}
            >
              <Link to={"/register"} className={style.link}>
                Register
              </Link>
            </MenuItem>
          </Menu>
        </div>
      </header>
    </>
  );
};

export default Header;
