import CartProd from "../../components/CartProd";
import "../../css/user/cart.css";
import { useAppSelector } from "../../hooks/hooks";
import addCurrencySymbol from "../../utils/formatter";

const Cart = () => {
  const cart = useAppSelector((state) => state.user.currentUser).cart;
  const totalPrice = cart.reduce((acc, curr) => {
    acc += curr.productId.price * curr.qty;
    return acc;
  }, 0);

  return (
    <section className="cart">
      <div className="cart__right-or-top">
        <h3 className="cart__subtotal">
          <span>
            Subtotal ({cart.length}) {cart.length === 1 ? "item" : "items"} :{" "}
          </span>

          <span>{addCurrencySymbol(totalPrice)}</span>
        </h3>
        <button className="btn cart__proceed-btn">Proceed to buy</button>
      </div>
      <div className="cart__left-or-bottom">
        <div className="cart__head">
          <h1 className="cart__heading">Your Cart</h1>
          <span className="cart__price-label">Price</span>
        </div>
        <div className="cart__prods-con">
          {cart.map((prod) => (
            <CartProd prod={prod} key={prod._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cart;
