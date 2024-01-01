import { useParams } from "react-router-dom";
import "../../css/user/products.css";
import { useAppSelector } from "../../hooks/hooks";
import Product from "../../components/Product";

const Products = () => {
  const { category } = useParams();
  const products = useAppSelector((state) => state.product.allProducts).filter(
    (prod) => {
      if (category === "All products") {
        return prod;
      } else {
        return prod.category === category;
      }
    }
  );
  return (
    <section className="cat-products">
      <h1 className="cat-products__heading">{category}</h1>
      {products.length !== 0 ? (
        <div className="cat-products__con">
          {products.map((product) => {
            return <Product product={product} from="home" key={product._id} />;
          })}
        </div>
      ) : (
        <p className="cat-products__not-available">
          No {category === "All products" ? "products" : category} available
        </p>
      )}
    </section>
  );
};

export default Products;
