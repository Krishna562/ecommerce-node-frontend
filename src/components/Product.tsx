import { FaEdit, FaTrash } from "react-icons/fa";
import { ProductI, deleteProduct } from "../store/reducers/product";
import addCurrencySymbol from "../utils/formatter";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { MdOutlineStar, MdOutlineStarBorderPurple500 } from "react-icons/md";

interface ProductPropsI {
  product: ProductI;
  from: String;
}

const Product = ({ product, from }: ProductPropsI) => {
  const { images, name, price, category, reviews, _id } = product;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const averageRating =
    reviews.reduce((acc, curr) => acc + curr.stars, 0) / reviews.length;

  const stars = [];

  // for(let i = 0; i < averageRating.)

  const deleteProd = async (id: string) => {
    await dispatch(deleteProduct(id));
  };

  return (
    <div className="product">
      {/* PRODUCT THUMBNAIL */}
      <div className="product__img-con">
        <img src={images[0]} alt={name} className="product__img" />
        {/* RATING */}
        <div className="product__stars">stars.map()</div>
      </div>
      {/* INFORMATION */}
      <div className="product__info-con">
        <p className="product__name">{name}</p>
        <div className="product__info">
          <span className="product__price">{addCurrencySymbol(price)}</span>
          <span className="product__total-reviews">
            {reviews?.length || 0} reviews
          </span>
        </div>
        <div className="product__bottom">
          {from === "admin" ? (
            // BTNS FOR ADMIN
            <div className="product__actions-con">
              <div
                className="product__action product__action--edit"
                onClick={() => navigate(`/admin/edit-product/${_id}`)}
              >
                <FaEdit />
              </div>
              <div
                className="product__action product__action--delete"
                onClick={() => deleteProd(_id)}
              >
                <FaTrash />
              </div>
            </div>
          ) : (
            // BTNS FOR USER
            <div className="product__actions-con">
              <button
                className="btn product__btn"
                onClick={() => navigate(`/product/${_id}`)}
              >
                Details
              </button>
              <button className="btn product__btn ">Add to cart</button>
            </div>
          )}
          <div className="product__category">{category}</div>
        </div>
      </div>
    </div>
  );
};

export default Product;
