import { useSelector } from "react-redux";
import { State } from "../redux/userSlice";
import { Outlet } from "react-router";
import { Logout } from "../pages/Logout";

export const ProtectedRoot = () => {
  const { user } = useSelector((state: State) => state.userStore);
  return user !== null ? <Outlet /> : <Logout />;
};
