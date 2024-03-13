import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Card,
  CardBody,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { User, loginUser } from "../redux/userSlice";
import { useEffect } from "react";
import { PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";
import { APILogin } from "../utils/APILogin";

export const LoginPage = () => {
  const dispatch: ThunkDispatch<User, User, PayloadAction> = useDispatch();
  const { user, error, msg } = useSelector(
    (state: FieldValues) => state.userStore
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  const setCsrfCall = async () => {
    await APILogin.get("api/account");
  };

  const handleLogin = (data: FieldValues) => {
    dispatch(loginUser(data));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Card className="w-[400px] flex justify-center">
        <CardBody>
          <h1 className="text-2xl mb-5  text-purple-700 font-black">Login</h1>

          {error && (
            <Alert status="error" className="mb-3">
              <AlertIcon />
              <AlertDescription>{msg}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-3">
              <FormControl isInvalid={!!errors.username}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaRegUser className="text-gray-500/60" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    {...register("username", {
                      required: "Kötelező mező!",
                      minLength: {
                        value: 4,
                        message: "Must be at least 4 characters long!",
                      },
                      maxLength: {
                        value: 30,
                        message: "Maximum length is 30 characters!",
                      },
                    })}
                    placeholder="Felhasználónév..."
                  />
                </InputGroup>
                {errors.username && (
                  <span className="text-red-500 text-sm">
                    {errors.username.message as string}
                  </span>
                )}
              </FormControl>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiLock className="text-gray-500/60" />
                </InputLeftElement>
                <Input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Jelszó..."
                />
              </InputGroup>
            </div>

            <Button
              className="w-full mt-6"
              colorScheme="purple"
              type="submit"
              onClick={setCsrfCall}
            >
              Belépés
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
