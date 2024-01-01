import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import Orders from "../../components/Orders/Orders";
import { Link } from "react-router-dom";
import addCurrencySymbol from "../../utils/formatter";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const orders = [
    {
      userId: "adfasdfadgdgf",
      _id: "657576d45934be496e16f30b",
      orderAmount: 20000,
      status: "delivered",
      items: [{ qty: 1, productId: "adsfadfadfa" }],
    },
    {
      userId: "adfasdfadgdgf",
      _id: "6580649bc0867cf617e2c4ee",
      orderAmount: 2000,
      status: "pending",
      items: [{ qty: 2, productId: "adsfadfadfa" }],
    },
    {
      userId: "adfasdfadgdgf",
      _id: "65813a98543dbae43d1a6798",
      orderAmount: 500,
      status: "shipped",
      items: [{ qty: 4, productId: "adsfadfadfa" }],
    },
  ];

  const amount = orders.reduce((acc, curr) => {
    acc += curr.orderAmount;
    return acc;
  }, 0);

  return (
    <section className="dashboard">
      {/* HEADING */}

      <h1 className="dashboard__heading">Dashboard</h1>
      <div className="dashboard__status-con">
        {/* STATUS CARDS */}
        <div
          className="dashboard__status"
          onClick={() => navigate("/admin/orders")}
        >
          <div className="dashboard__status-head">
            <i className="dashboard__status-icon dashboard__status-icon--revenue">
              <MdOutlineCurrencyRupee className="ico" />
            </i>

            <span>Revenue</span>
          </div>
          <p className="dashboard__status-value">{addCurrencySymbol(amount)}</p>
        </div>
        <div
          className="dashboard__status"
          onClick={() => navigate("/admin/users")}
        >
          <div className="dashboard__status-head">
            <i className="dashboard__status-icon dashboard__status-icon--users">
              <FaUsers />
            </i>

            <span className="dashboard__status-">Users</span>
          </div>
          <p className="dashboard__status-value">2</p>
        </div>
        <div
          className="dashboard__status"
          onClick={() => navigate("/admin/products")}
        >
          <div className="dashboard__status-head">
            <IoBagHandleSharp className="dashboard__status-icon dashboard__status-icon--products" />
            <span className="dashboard__status-">Products</span>
          </div>
          <p className="dashboard__status-value">0</p>
        </div>
        <div
          className="dashboard__status"
          onClick={() => navigate("/admin/orders")}
        >
          <div className="dashboard__status-head">
            <CiCircleList className="dashboard__status-icon dashboard__status-icon--orders" />
            <span className="dashboard__status-">Orders</span>
          </div>
          <p className="dashboard__status-value">3</p>
        </div>
      </div>
      <h1 className="dashboard__orders-heading">Recent Orders</h1>
      <Orders orders={orders} />
      <Link to={"/admin/orders"} className="dashboard__orders-show-all">
        Show all
      </Link>
    </section>
  );
};

export default Dashboard;
