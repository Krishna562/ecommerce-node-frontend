import { Navigate, useParams } from "react-router-dom";
import "../../css/user/products.css";
import { useAppSelector } from "../../hooks/hooks";
import Review from "../../components/Review/Review";
import addCurrencySymbol from "../../utils/formatter";
import { useState } from "react";
import AddReviewModal from "../../components/Review/AddReviewModal";

const SpecificProduct = () => {
  const { productId } = useParams();

  const isLoading = useAppSelector((state) => state.product.isLoading);
  const product = useAppSelector((state) => state.product.allProducts).find(
    (prod) => prod._id === productId
  );

  const [selectedImg, setSelectedImg] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (isLoading) {
    return;
  }

  if (!product) {
    return <Navigate to={"/"} />;
  }

  const { images, price, name, description, reviews, stock } = product;

  return (
    <section className="s-product">
      <div className="s-product__info-con">
        <div className="s-product__graphic-con">
          {/* IMAGES */}
          <div className="s-product__img-con">
            {images.map((img) => (
              <img
                src={img}
                alt="product image"
                className="s-product__img"
                key={img}
                style={{ transform: `translateX(-${100 * selectedImg}%)` }}
              />
            ))}
          </div>
          {/* IMAGE SELECTORS */}
          <div className="s-product__img-selector-con">
            {images.map((img, index) => (
              <img
                src={img}
                alt="product image"
                className={`s-product__img-selector ${
                  index === selectedImg
                    ? "s-product__img-selector-active"
                    : null
                }`}
                key={img}
                onClick={() => setSelectedImg(index)}
              />
            ))}
          </div>
        </div>
        <div className="s-product__right">
          {/* NAME AND AVERAGE RATING */}
          <div className="s-product__info-top">
            {/* Name */}
            <div className="s-product__name">{name}</div>
            <div className="s-product__info-reviews">
              {/* Stars */}
              <span className="s-product__average-stars">stars</span>
              {/* Average */}
              <span className="s-product__average-number">4.3</span>
              {/* Total reviews */}
              <span className="s-product__total-reviews">
                {reviews.length} reviews
              </span>
            </div>
          </div>
          <div className="s-product__info-bottom">
            {/* PRICE */}
            <div className="s-product__price">{addCurrencySymbol(price)}</div>
            {/* STATUS AND ADD TO CART BTN */}
            <div className="s-product__status-to-cart">
              {/* Status */}
              <span style={{ color: stock > 0 ? "green" : "firebrick" }}>
                {stock > 0 ? "In stock" : "Out of stock"}
              </span>
              {/* Add to cart button */}
              {stock > 0 && (
                <button className="btn s-product__to-cart-btn">
                  Add to cart
                </button>
              )}
            </div>
            {/* DESCRIPTION */}
            <div className="s-product__description">{description}</div>
          </div>
        </div>
      </div>

      {/* REVIEWS */}

      {/* Modal */}
      <AddReviewModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <div className="s-product__reviews">
        {/* Head */}
        <div className="s-product__reviews-head">
          <h2 className="s-product__reviews-heading">Reviews</h2>
          {isLoggedIn && (
            <button
              className="btn s-product__add-review-btn"
              onClick={() => setIsModalOpen(true)}
            >
              Add a product review
            </button>
          )}
        </div>
        {/* Grid */}
        {reviews.length !== 0 ? (
          <div className="s-product__reviews-con">
            {reviews.map((review) => (
              <Review review={review} key={review.userId} />
            ))}
          </div>
        ) : (
          <p className="s-product__no-reviews">No reviews</p>
        )}
      </div>
    </section>
  );
};

export default SpecificProduct;
