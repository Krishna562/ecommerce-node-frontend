import { ReactNode } from "react";
import { CurrentUserI } from "../store/reducers/userReducer";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  currentUser: CurrentUserI;
}

const AdminProtectedRoute = ({ children, currentUser }: Props) => {
  if (currentUser.isAdmin) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default AdminProtectedRoute;
