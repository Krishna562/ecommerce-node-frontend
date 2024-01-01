import Input from "../../components/Input";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yupLoginSchema from "../../yupSchema/login";
import { Navigate, Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import "../../css/auth/form.css";
import { login, setValidationErr } from "../../store/reducers/userReducer";

const Login = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isLoggedIn);
  const methods = useForm({ resolver: yupResolver(yupLoginSchema) });
  const dispatch = useAppDispatch();
  const location = useLocation();
  const from = location.state?.from.pathname || "/profile";

  if (isAuthenticated) {
    return <Navigate to={from} />;
  }

  const onSubmit = methods.handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (err) {
      dispatch(setValidationErr(err.response.data));
    }
  });

  return (
    <FormProvider {...methods}>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input field={"email"} type={"text"} placeholder={"Email"} />
        <Input field={"password"} type={"password"} placeholder={"Password"} />
        <Link className="form__forgotPassword" to={"/forgot-password"}>
          forgot password?
        </Link>
        <button className="btn" onClick={onSubmit}>
          Log In
        </button>
        <p className="form__signupLink">
          New to Shopper ?{" "}
          <Link
            to="/signup"
            onClick={() => {
              dispatch(setValidationErr({}));
            }}
          >
            Sign Up
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};

export default Login;
