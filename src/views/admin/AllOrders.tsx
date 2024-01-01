import Orders from "../../components/Orders/Orders";

const AllOrders = () => {
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
      orderAmount: 5000,
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

  return (
    <section className="all-orders">
      <h1 className="all-orders__heading">All Orders</h1>
      <Orders orders={orders} />
    </section>
  );
};

export default AllOrders;
