import Product from "../../components/Product";
import { useAppSelector } from "../../hooks/hooks";
import "../../css/admin/products.css";

const AdminProducts = () => {
  const products = useAppSelector((state) => state.product.allProducts);

  return (
    <div className="products">
      <h1 className="products__heading">Products</h1>
      {products.length ? (
        <div className="products__grid">
          {products.map((product) => {
            return <Product product={product} from="admin" key={product._id} />;
          })}
        </div>
      ) : (
        <p className="products__no-products">No products added</p>
      )}
    </div>
  );
};

export default AdminProducts;
