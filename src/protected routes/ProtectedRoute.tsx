import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

type Props = {
  isLoggedIn: boolean;
  children: ReactNode;
};

const ProtectedRoute = ({ isLoggedIn, children }: Props) => {
  const location = useLocation();

  const isLoading = useAppSelector((state) => state.user.isLoading);

  if (!isLoading && !isLoggedIn) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  } else if (!isLoading && isLoggedIn) {
    return children;
  }
};

export default ProtectedRoute;
