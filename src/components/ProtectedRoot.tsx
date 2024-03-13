import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { Logout } from "../pages/Logout";
import { UserStore } from "../store/store";

export const ProtectedRoot = () => {
  const { user } = useSelector((state: UserStore) => state.userStore);
  return user !== null ? <Outlet /> : <Logout />;
};
