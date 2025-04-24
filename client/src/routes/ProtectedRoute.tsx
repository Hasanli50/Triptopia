import { useNavigate } from "react-router";
import { getToken } from "../utils/localeStorage";
import { PropsWithChildren, useEffect } from "react";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const auth = getToken();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!auth || !user) {
      navigate("/login");
    }
  }, [navigate, auth, user]);

  if (!auth || !user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
