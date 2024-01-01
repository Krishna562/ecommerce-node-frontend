import { useEffect, useRef, useState } from "react";
import "../../css/other/SpecificOrder.css";
import addCurrencySymbol from "../../utils/formatter";
import { FaEdit } from "react-icons/fa";

const SpecificOrder = () => {
  const [isOptionVisible, setIsOptionVisible] = useState(false);

  const optionRef = useRef<HTMLDivElement>(null);
  const editBtnRef = useRef<HTMLElement>(null);

  const tempOrder = {
    _id: "657576d45934be496e16f30b",
    orderAmount: 20000,
    status: "pending",
    items: [
      {
        _id: "adfadfaf",
        name: "Phone",
        quantity: 2,
        price: 2000,
        img: "https://img.freepik.com/free-photo/smartphone-balancing-with-pink-background_23-2150271746.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1703116800&semt=sph",
      },
      {
        _id: "adfaasdfadfdfaf",
        name: "Keyboard",
        quantity: 1,
        price: 2500,
        img: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXIlMjBrZXlib2FyZHxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        _id: "adfadasdfafaf",
        name: "Keyboard",
        quantity: 1,
        price: 2500,
        img: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXIlMjBrZXlib2FyZHxlbnwwfHwwfHx8MA%3D%3D",
      },
    ],
    userId: {
      email: "robin2007562@gmail.com",
    },
    address: "B-61 / Lohia Nagar, Ghaziabad",
  };

  const { _id, orderAmount, items, status, address, userId } = tempOrder;

  // FUNCTIONS

  const changeStatus = async (productId: string, updatedStatus: string) => {
    // CHANGE THE STATUS
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      optionRef.current!.contains(e.target as Node) ||
      editBtnRef.current!.contains(e.target as Node)
    )
      return;
    setIsOptionVisible(false);
  };

  useEffect(() => {
    if (status !== "delivered") {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const statusEditOptions =
    status === "pending"
      ? ["shipped", "delivered"]
      : status === "shipped"
      ? ["delivered"]
      : [];

  return (
    <section className="s-order">
      {/* HEADING */}

      <h1 className="s-order__heading">Order details</h1>

      {/* ORDER INFO */}

      <div className="s-order__info">
        {/* INFO - LEFT SIDE */}
        <div className="s-order__info-left">
          {/* INFO CON */}

          <div className="s-order__info-con">
            <h2 className="s-order__head">User details</h2>
            <div className="s-order__email">Email : {userId.email}</div>
            <div className="s-order__address">Address : {address}</div>
          </div>

          {/* INFO CON */}
          <div className="s-order__info-con">
            <h2 className="s-order__head">Order info</h2>
            <div className="s-order__amount">
              Total order value : {addCurrencySymbol(orderAmount)}
            </div>
          </div>

          {/* INFO CON */}
          <div className="s-order__info-con">
            <h2 className="s-order__head">Status</h2>
            <div className={`s-order__status--${status} s-order__status`}>
              {status}
              {/* EDIT BTN */}
              {status !== "delivered" && (
                <i
                  className="s-order__status-edit-btn"
                  ref={editBtnRef}
                  onClick={() => setIsOptionVisible(!isOptionVisible)}
                >
                  <FaEdit />
                </i>
              )}

              {/* EDIT OPTIONS */}
              <div
                className="s-order__status-options-con"
                ref={optionRef}
                style={{ display: isOptionVisible ? "flex" : "none" }}
              >
                {statusEditOptions.map((option: string) => (
                  <div
                    className="s-order__status-option"
                    key={option}
                    onClick={() => {
                      changeStatus(_id, option);
                      setIsOptionVisible(false);
                    }}
                  >
                    Update to {option}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* INFO - RIGHT SIDE */}

        <div className="s-order__info-right">
          {/* INFO CON */}
          <div className="s-order__info-con">
            <h2 className="s-order__head">Ordered Items</h2>
            <div className="s-order__items-con">
              {items.map((item) => {
                const { name, quantity, price, img, _id } = item;
                const totalItemAmount = price * quantity;
                return (
                  <div className="s-order__item" key={_id}>
                    <img src={img} alt={name} className="s-order__item-img" />
                    <div className="s-order__item-info">
                      <span className="s-order__item-name">{name}</span>
                      <span className="s-order__item-amount">
                        {addCurrencySymbol(price)} x {quantity} ={" "}
                        {addCurrencySymbol(totalItemAmount)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecificOrder;
