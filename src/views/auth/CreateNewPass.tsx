import Input from "../../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import resetPassSchema from "../../yupSchema/resetPass";
import { useAppDispatch } from "../../hooks/hooks";
import {
  resetPassword,
  setValidationErr,
} from "../../store/reducers/userReducer";
import { useEffect } from "react";
import axios from "../../axios/axios";

const CreateNewPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const verifyResetToken = async (token: string): Promise<void> => {
    try {
      const result = await axios.get(`/verify-pass-reset-token/${token}`);
      if (!result.data.isValidToken) {
        navigate("/login");
      }
    } catch (err) {
      navigate("/login");
    }
  };

  const token = useParams().token!;
  useEffect(() => {
    verifyResetToken(token);
  }, []);

  const methods = useForm({ resolver: yupResolver(resetPassSchema) });

  const onSubmit = methods.handleSubmit(async (data) => {
    const { newPassword, confirmNewPassword } = data;
    try {
      await dispatch(resetPassword({ newPassword, confirmNewPassword }));
      navigate("/login");
    } catch (err) {
      dispatch(setValidationErr(err.reponse.data));
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
        <Input
          field={"newPassword"}
          type={"password"}
          placeholder={"New password"}
        />
        <Input
          field={"confirmNewPassword"}
          type={"password"}
          placeholder={"Confirm new password"}
        />
        <button className="btn" onClick={onSubmit}>
          Change Password
        </button>
      </form>
    </FormProvider>
  );
};

export default CreateNewPassword;
