import style from "../../assets/style/user/header.module.scss";
import Triptopia from "../../assets/photo/logo-dark.png";
import { Link } from "react-router";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import React from "react";

const options = [
  "Show all notification content",
  "Hide sensitive notification content",
  "Hide all notification content",
];

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                {options.map((option, index) => (
                  <MenuItem
                    key={option}
                    disabled={index === 0}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </ul>
          </nav>

          <div className={style.btnBox}>
            <button type="button" className={`${style.loginBtn} ${style.btn}`}>
              login
            </button>
            <button
              type="button"
              className={`${style.registerBtn} ${style.btn}`}
            >
              register
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
