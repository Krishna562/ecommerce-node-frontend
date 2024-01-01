import logo from "../assets/logo.svg";
import "../css/other/header.css";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowDropDown, MdOutlineClose } from "react-icons/md";
import { PiMagnifyingGlass } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiBars3BottomRight } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import assertIsNode from "../utils/assertIsNode";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchCategories } from "../store/reducers/product";

const Header = () => {
  const [areCategoriesVisible, setAreCategoriesVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const categories = useAppSelector((state) => state.product.categories);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getAllCategories = async () => {
    await dispatch(fetchCategories());
  };

  const categoriesRef = useRef<HTMLDivElement[]>([]);

  const detectClickOutside = (e: MouseEvent): void => {
    assertIsNode(e.target);
    if (
      categoriesRef.current[0].contains(e.target) ||
      categoriesRef.current[1].contains(e.target)
    )
      return;

    setAreCategoriesVisible(false);
  };

  useEffect(() => {
    document.addEventListener("click", detectClickOutside);

    getAllCategories();

    return () => document.removeEventListener("click", detectClickOutside);
  }, []);

  return (
    <div className="header">
      <div className="header__con">
        {/* LOGO */}
        <img
          src={logo}
          alt="logo"
          className="header__logo"
          onClick={() => {
            navigate("/");
          }}
        />

        {/* SIDEBAR TOGGLE */}
        {!isSidebarVisible ? (
          <HiBars3BottomRight
            className="header__toggle"
            onClick={() => {
              setIsSidebarVisible(true);
            }}
          />
        ) : (
          <MdOutlineClose
            className="header__toggle"
            onClick={() => {
              setIsSidebarVisible(false);
            }}
          />
        )}

        {/* SIDEBAR */}

        <div
          className="header__sidebar"
          style={{
            transform: isSidebarVisible ? "translateX(0)" : "translate(100%)",
          }}
        >
          <div className="header__sidebarTop">
            {/* SIDEBAR SIGNUP AND CART BUTTONS */}

            <Link to={"/profile"} className="header__sidebarOption">
              <IoPersonOutline />
            </Link>
            <Link to={"/cart"} className="header__sidebarOption">
              <AiOutlineShoppingCart />
            </Link>
          </div>

          {/* SIDEBAR NAV */}

          <nav className="header__sidebarNav">
            <Link
              to={"/"}
              className="header__link"
              style={{ alignSelf: "flex-start" }}
            >
              Home
            </Link>

            {/* CATEGORIES - SMALL SCREEN */}
            <div
              className="header__categoriesDropdownBtn"
              ref={(el: HTMLDivElement) => (categoriesRef.current[0] = el)}
              style={{ alignSelf: "flex-start" }}
            >
              <button
                className="header__categoriesBtn"
                onClick={() => {
                  setAreCategoriesVisible(!areCategoriesVisible);
                }}
              >
                Shop <MdArrowDropDown />
              </button>
              <div
                className="header__categoriesCon"
                style={{ display: areCategoriesVisible ? "flex" : "none" }}
              >
                <Link
                  to={`/products/All products`}
                  className="header__category"
                >
                  All products
                </Link>
                {categories.map((category) => (
                  <Link
                    to={`/products/${category}`}
                    className="header__category"
                    key={category}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>

        {/* NAV */}

        <nav className="header__nav">
          <Link to={"/"} className="header__link">
            Home
          </Link>

          {/* CATEGORIES - LARGE SCREEN */}
          <div
            className="header__categoriesDropdownBtn"
            ref={(el: HTMLDivElement) => (categoriesRef.current[1] = el)}
          >
            <button
              className="header__categoriesBtn"
              onClick={() => {
                setAreCategoriesVisible(!areCategoriesVisible);
              }}
            >
              Shop <MdArrowDropDown />
            </button>
            <div
              className="header__categoriesCon"
              style={{ display: areCategoriesVisible ? "flex" : "none" }}
            >
              <Link to={`/products/All products`} className="header__category">
                All products
              </Link>
              {categories.map((category) => (
                <Link
                  to={`/products/${category}`}
                  className="header__category"
                  key={category}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
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
