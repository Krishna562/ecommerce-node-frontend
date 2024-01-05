import * as yup from "yup";

const signupSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(2, "Username must be atleast 2 characters long"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be atleast 4 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm password"),
});

export default signupSchema;
