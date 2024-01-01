import { OrderI } from "../../store/reducers/orderReducer";
import Order from "./Order";

interface OrdersPropsI {
  orders: Array<OrderI>;
}

const Orders = ({ orders }: OrdersPropsI) => {
  return (
    <div className="orders-con">
      <div className="orders-lower">
        <div className="orders-fields">
          <span>Order id</span>
          <span>Total items</span>
          <span>Order amount</span>
          <span>Status</span>
          <span></span>
        </div>
        {orders.map((order) => {
          return <Order order={order} key={order._id} />;
        })}
      </div>
    </div>
  );
};

export default Orders;
