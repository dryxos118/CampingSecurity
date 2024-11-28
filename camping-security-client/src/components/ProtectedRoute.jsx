import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ userID, children }) => {
  if (!userID) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
