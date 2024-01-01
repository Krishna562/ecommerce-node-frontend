import { Link } from "react-router-dom";
import Input from "../../components/Input.js";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yupSignupSchema from "../../yupSchema/signup";
import { useNavigate, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.js";
import { setValidationErr, signup } from "../../store/reducers/userReducer.js";

const Signup = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to={"/profile"} />;
  }

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const methods = useForm({ resolver: yupResolver(yupSignupSchema) });

  const onSumbit = methods.handleSubmit(async (data) => {
    const { email, password, confirmPassword } = data;
    try {
      const result = await dispatch(
        signup({ email, password, confirmPassword })
      ).unwrap();
      navigate("/login");
    } catch (err) {
      dispatch(setValidationErr(err.response.data));
    }
  });

  return (
    <FormProvider {...methods}>
      <form
        className="form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input placeholder="Email" type="text" field="email" />
        <Input placeholder="Password" type="password" field="password" />
        <Input
          placeholder="Confirm Password"
          type="password"
          field="confirmPassword"
        />
        <button
          className="btn"
          onClick={() => {
            onSumbit();
          }}
        >
          Sign Up
        </button>
        <p className="form__loginLink">
          Already a user ? <Link to="/login">Log In</Link>
        </p>
      </form>
    </FormProvider>
  );
};

export default Signup;
