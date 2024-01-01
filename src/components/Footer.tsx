import "../css/other/footer.css";
import logo from "../assets/logo.svg";
import { FaArrowUp } from "react-icons/fa6";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { useAppSelector } from "../hooks/hooks";
import { Link } from "react-router-dom";

const Footer = () => {
  const categories = useAppSelector((state) => state.product.categories);
  const year = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="footer__con">
        {/* FOOTER TOP */}
        <div className="footer__top">
          {/* LOGO (AND UP BTN FOR SMALL SCREEN) */}
          <div className="footer__logo-con">
            <div className="footer__logo">
              <img src={logo} alt="logo" className="footer__graphic" />
              <p className="footer__para">
                Shopper is an online ecommerce store where you can buy a wide
                variety of products.
              </p>
            </div>
            <i
              className="footer__up-btn footer__up-btn--sm"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <FaArrowUp />
            </i>
          </div>

          {/* SHOP CATEGORIES */}
          <div className="footer__shop">
            <h3 className="footer__shop-head">Shop</h3>
            <div className="footer__categories-con">
              <Link to={"#"} className="footer__category">
                All Products
              </Link>
              {categories.map((cat) => (
                <Link to={"#"} key={cat} className="footer__category">
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* SOCIAL LINKS */}
          <div className="footer__social">
            <h3 className="footer__social-head">Social</h3>
            <div className="footer__social-links-con">
              <i className="footer__social-link">
                <AiFillInstagram />
              </i>
              <i className="footer__social-link">
                <FaTwitter />
              </i>
              <i className="footer__social-link">
                <FaFacebook />
              </i>
            </div>
          </div>
          <i
            className="footer__up-btn footer__up-btn--lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <FaArrowUp />
          </i>
        </div>
        <div className="footer__copyright">
          &copy; {year} Shopper. All rights reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
