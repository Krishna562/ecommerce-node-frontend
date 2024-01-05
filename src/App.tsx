import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./views/accessable/Home";
import ProtectedRoute from "./protected routes/ProtectedRoute";
import Profile from "./views/profile/Profile";
import { fetchUserAndCheckAuth } from "./store/reducers/userReducer";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Signup from "./views/auth/Signup";
import Login from "./views/auth/Login";
import Cart from "./views/accessable/Cart";
import Products from "./views/accessable/Products";
import ForgotPassword from "./views/auth/ForgotPassword";
import RequestSent from "./views/auth/RequestSent";
import CreateNewPassword from "./views/auth/CreateNewPass";
import Admin from "./views/admin/Admin";
import Dashboard from "./views/admin/Dashboard";
import AdminProducts from "./views/admin/AdminProducts";
import Users from "./views/admin/Users";
import AddProduct from "./views/admin/AddProduct";
import AllOrders from "./views/admin/AllOrders";
import SpecificOrder from "./components/Orders/SpecificOrder";
import AdminProtectedRoute from "./protected routes/AdminProtectedRoute";
import { getAllProducts } from "./store/reducers/product";
import Footer from "./components/Footer";
import SpecificProduct from "./views/accessable/SpecificProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const setUserAndCheckAuth = async (): Promise<void> => {
    await dispatch(fetchUserAndCheckAuth());
  };

  // SET THE CART
  const setCart = () => {
    const alreadyExists = localStorage.getItem("cart") ? true : false;
    if (alreadyExists) return;
    localStorage.setItem("cart", JSON.stringify([]));
  };

  // GET ALL THE PRODUCTS
  const getProducts = async () => {
    await dispatch(getAllProducts());
  };

  useEffect(() => {
    setUserAndCheckAuth();
    getProducts();
    setCart();
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        {/* ACCESSABLE ROUTES */}

        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/product/:productId" element={<SpecificProduct />} />
        <Route path="/cart" element={<Cart />} />

        {/* PROTECTED ROUTES */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/*  ADMIN ROUTES */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AdminProtectedRoute currentUser={currentUser}>
                <Admin />
              </AdminProtectedRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AllOrders />} />
          <Route path="users" element={<Users />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="order/:orderId" element={<SpecificOrder />} />
          <Route path="edit-product/:productId" element={<AddProduct />} />
        </Route>

        {/* AUTH ROUTES */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/pass-reset-req-sent" element={<RequestSent />} />
        <Route
          path="/create-new-password/:token"
          element={<CreateNewPassword />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
