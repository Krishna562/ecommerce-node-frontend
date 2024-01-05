import { ProductI } from "../store/reducers/product";
import Select from "react-select";
import addCurrencySymbol from "../utils/formatter";

type Props = {
  prod: {
    productId: ProductI;
    qty: number;
  };
};

const CartProd = ({ prod }: Props) => {
  const { productId } = prod;
  const { images, stock, name, price } = productId;

  const options = [];
  for (let i = 0; i < stock; i++) {
    if (i <= 10) {
      options.push({ label: i, value: i });
    }
  }
  return (
    <div className="cart-prod">
      {/* SM PROD */}
      <div className="cart-prod__top">
        {/* LEFT (Everything except price) */}
        <div className="cart-prod__left">
          {/* IMAGE */}
          <img src={images[0]} alt="product image" className="cart-prod__img" />
          {/* INFO AND ACTIONS */}
          <div className="cart-prod__info-actions">
            <p className="cart-prod__name">{name}</p>
            {/* PRICE FOR SM SCREEN */}
            <p className="cart-prod__price cart-prod__price--sm">
              {addCurrencySymbol(price)}
            </p>
            {/* STATUS */}
            <p
              className="cart-prod__status"
              style={{ color: stock > 0 ? "green" : "red" }}
            >
              {stock > 0 ? "In stock" : "Out of stock"}
            </p>
            {/* ACTIONS FOR LG SCREENS */}
            <div className="cart-prod__actions-con">
              <Select options={options} />
              <button className="btn cart-prod__remove-btn">
                Remove from cart
              </button>
            </div>
          </div>
        </div>
        {/* PRICE FOR LG SCREENS */}
        <p className="cart-prod__price cart-prod__price--lg">
          {addCurrencySymbol(price)}
        </p>
      </div>
      {/* ONLY FOR SM SCREEN */}
      <div className="cart-prod__bottom">
        <Select options={options} />
        <button className="btn cart-prod__remove-btn">Remove from cart</button>
      </div>
    </div>
  );
};

export default CartProd;
