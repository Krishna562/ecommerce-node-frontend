import Input from "../../components/Input";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  sendPassResetReq,
  setValidationErr,
} from "../../store/reducers/userReducer";

const ForgotPassword = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  // IF NOT AUTHENTICATED

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const yupSchema = yup.object().shape({
    email: yup
      .string()
      .required("This field is required")
      .email("Invalid email"),
  });

  const methods = useForm({ resolver: yupResolver(yupSchema) });

  const sendRequestEmail = async (email: string): Promise<void> => {
    try {
      await dispatch(sendPassResetReq(email)).unwrap();
      navigate("/pass-reset-req-sent");
    } catch (err) {
      dispatch(setValidationErr(err.response.data));
    }
  };

  const onSubmit = methods.handleSubmit((data) => {
    sendRequestEmail(data.email);
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
        <button className="btn" onClick={onSubmit}>
          Send password reset request
        </button>
      </form>
    </FormProvider>
  );
};

export default ForgotPassword;
