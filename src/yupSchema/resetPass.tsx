import * as yup from "yup";

const resetPassSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Password is required")
    .min(4, "Password must be atleast 4 characters long"),
  confirmNewPassword: yup
    .string()
    .required("Please retype the new password")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});

export default resetPassSchema;
