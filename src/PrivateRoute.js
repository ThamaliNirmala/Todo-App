import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

//private route logic
const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated || false
  );

  if (isAuthenticated) return children;

  return <Navigate to="/" />;
};

export default PrivateRoute;
