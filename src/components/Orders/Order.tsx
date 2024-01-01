import { FaEdit } from "react-icons/fa";
import addCurrencySymbol from "../../utils/formatter";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { OrderI } from "../../store/reducers/orderReducer";

type Props = {
  order: OrderI;
};

const Order = ({ order }: Props) => {
  const { items, orderAmount, _id, status } = order;

  const [isOptionVisible, setIsOptionVisible] = useState(false);

  const optionRef = useRef<HTMLDivElement>(null);
  const editBtnRef = useRef<HTMLElement>(null);

  // FUNCTIONS

  const handleClickOutside = (e: MouseEvent) => {
    if (
      optionRef.current!.contains(e.target as Node) ||
      editBtnRef.current!.contains(e.target as Node)
    )
      return;
    setIsOptionVisible(false);
  };

  const changeStatus = async (productId: string, updatedStatus: string) => {
    // CHANGE THE STATUS
  };

  // USE EFFECTS

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
    <div className="order" key={_id}>
      <span>{_id}</span>
      <span>{items.length}</span>
      <span>{addCurrencySymbol(orderAmount)}</span>
      <span className={`order-status--${status} order-status`}>
        {status}{" "}
        {status !== "delivered" && (
          <i
            className="order-edit-btn"
            ref={editBtnRef}
            onClick={() => {
              setIsOptionVisible(!isOptionVisible);
            }}
          >
            <FaEdit />
          </i>
        )}
        <div
          className="order-status-options-con"
          ref={optionRef}
          style={{ display: isOptionVisible ? "flex" : "none" }}
        >
          {statusEditOptions.map((option: string) => (
            <div
              className="order-status-option"
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
      </span>
      <Link to={`/admin/order/${_id}`}>Details</Link>
    </div>
  );
};

export default Order;
