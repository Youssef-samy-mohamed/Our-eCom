import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetUI } from "@store/auth/authSlice";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginType, loginSchem } from "src/validations/loginSchema";


const useLogin = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const { error, loading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<loginType>({
    mode: "onBlur",
    resolver: zodResolver(loginSchem),
  });

  const submitForm: SubmitHandler<loginType> = async (data) => {
    if (searchParams.get("message")) {
      setSearchParams("");
    }
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    }
  }, [dispatch]);
  

  return {
    error,
    loading,
    resetUI,
    formErrors,
    searchParams,
    register,
    handleSubmit,
    submitForm,
  };
};

export default useLogin;
