import { useSelector } from "react-redux";
import { getUser } from "../redux/features/user/userSlice";
import { Navigate } from "react-router-dom";


const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const user = useSelector(getUser);
    return user ? <Component {...props} /> : <Navigate to={'/auth/login'} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;