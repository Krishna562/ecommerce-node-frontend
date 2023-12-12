import logo from "../assets/logo.png";
import "../css/header.css";
import { Link } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { PiMagnifyingGlass } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = () => {
  return (
    <div className="header">
      <div className="header__con">
        {/* LOGO */}
        <img src={logo} alt="logo" className="header__logo" />

        {/* NAV */}
        <nav>
          <Link to={"/"} className="header__link">
            Home
          </Link>
          <button className="header__link header__categories">
            Categories <MdArrowDropDown />
          </button>
        </nav>

        {/* RIGHT SIDE */}

        <div className="header__right">
          {/* SEARCH BAR */}
          <div className="header__searchbar">
            <input
              type="text"
              placeholder="search products"
              className="header__input"
            />
            <PiMagnifyingGlass className="header__searchBtn" />
          </div>

          {/* SIGNUP AND CART BUTTONS */}

          <Link to={"/profile"} className="header__option">
            <IoPersonOutline />
          </Link>
          <Link to={"/cart"} className="header__option">
            <AiOutlineShoppingCart />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
