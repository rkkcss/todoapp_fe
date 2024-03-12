import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { useEffect } from "react";
import { PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Navigate } from "react-router";

export const Logout = () => {
  const dispatch: ThunkDispatch<void, void, PayloadAction> = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, []);

  return <Navigate to={"/"} />;
};
