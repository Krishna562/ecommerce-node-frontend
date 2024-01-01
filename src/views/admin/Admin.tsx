import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoBag, IoAdd } from "react-icons/io5";
import { FaTableList } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import { useEffect, useRef } from "react";
import "../../css/admin/admin.css";
import { useAppSelector } from "../../hooks/hooks";

const Admin = () => {
  const navigate = useNavigate();

  const sidebarRef = useRef<HTMLUListElement>(null);

  const currentPath = useLocation().pathname;

  const isLoading = useAppSelector((state) => state.product.isLoading);

  useEffect(() => {
    if (isLoading) return;
    const tabs = Array.from(sidebarRef.current?.children!);
    tabs.forEach((tab): void => {
      if (tab.id === currentPath) {
        tab.classList.add("admin__tab--active");
      } else if (
        currentPath.includes("/admin/order/") &&
        tab.id === "/admin/orders"
      ) {
        tab.classList.add("admin__tab--active");
      } else {
        tab.classList.remove("admin__tab--active");
      }
    });
  }, [currentPath, isLoading]);

  if (!isLoading)
    return (
      <section className="admin">
        <ul className="admin__sidebar" ref={sidebarRef}>
          <li
            className="admin__tab"
            onClick={() => {
              navigate("dashboard");
            }}
            id="/admin/dashboard"
          >
            <MdDashboard className="admin__tab-icons" /> <span>Dashboard</span>
          </li>
          <li
            className="admin__tab"
            onClick={() => {
              navigate("products");
            }}
            id="/admin/products"
          >
            <IoBag className="admin__tab-icons" /> <span>Products</span>
          </li>
          <li
            className="admin__tab"
            onClick={() => {
              navigate("orders");
            }}
            id="/admin/orders"
          >
            <FaTableList className="admin__tab-icons" /> <span>Orders</span>
          </li>
          <li
            className="admin__tab"
            onClick={() => {
              navigate("users");
            }}
            id="/admin/users"
          >
            <HiUsers className="admin__tab-icons" /> <span>Users</span>
          </li>
          <li
            className="admin__tab admin__tab--add-product"
            onClick={() => {
              navigate("add-product");
            }}
            id="/admin/add-product"
          >
            <IoAdd className="admin__tab-icons" /> <span>Add Products</span>
          </li>
        </ul>
        <Outlet />
      </section>
    );
};

export default Admin;
