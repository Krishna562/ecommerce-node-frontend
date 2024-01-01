import * as yup from "yup";

const addProductSchema = yup.object().shape({
  name: yup.string().typeError("asdf").required("Name is required"),
  price: yup
    .number()
    .typeError("Price must be a number value")
    .required("Price is required")
    .max(999999, "Price cannot exceed 999,999"),
  stock: yup
    .number()
    .typeError("Stock must be a number value")
    .required("Stock is required")
    .max(10000, "Price cannot exceed 10000"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be atleast 10 characters long"),
  category: yup.object().shape({
    value: yup.string().required("Category is required"),
    label: yup.string().required("Category is required"),
  }),
});

export default addProductSchema;
