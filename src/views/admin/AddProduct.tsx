import { Controller, FormProvider, useForm } from "react-hook-form";
import Input from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import addProductSchema from "../../yupSchema/addProduct";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { BiErrorCircle } from "react-icons/bi";
import { FileRejection, useDropzone } from "react-dropzone";
import "../../css/admin/addProduct.css";
import { useEffect, useState } from "react";
import {
  FormDataProductI,
  ProductI,
  addProduct,
  editProduct,
} from "../../store/reducers/product";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

const AddProduct = () => {
  const currentPath = useLocation().pathname;
  const prodToEditId = useParams().productId;

  const allProducts = useAppSelector((state) => state.product.allProducts);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let isEditing: boolean = false;

  if (currentPath.includes("/admin/edit-product/")) {
    isEditing = true;
  }

  const productToEdit: ProductI | undefined = allProducts.find(
    (prod) => prod._id === prodToEditId
  );

  useEffect(() => {
    if (isEditing && !productToEdit) navigate("/admin/products");
  }, []);

  if (isEditing && !productToEdit) {
    return;
  }

  interface FormValuesI {
    name: string;
    description: string;
    stock: number;
    price: number;
    category: { label: string; value: string };
  }

  const { name, price, stock, description } = productToEdit || {
    name: "",
    price: undefined,
    stock: undefined,
    description: "",
  };

  const preValues = {
    name,
    price,
    stock,
    description,
  };

  const methods = useForm<FormValuesI>({
    resolver: yupResolver(addProductSchema),
    defaultValues: isEditing ? preValues : undefined,
  });

  const categories = useAppSelector((state) => state.product.categories);

  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [dropzoneError, setDropzoneError] = useState("");

  const onDrop = (files: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length) {
      setDropzoneError(rejectedFiles[0].errors[0].message);
    } else {
      setDropzoneError("");
      setImgFiles(files);
    }
  };

  const editProd = async (productId: string, data: FormDataProductI) => {
    await dispatch(editProduct({ productId, data }));
  };

  const thumbs = (
    <div className="add-product__prev-img-con">
      {!isEditing || imgFiles.length
        ? imgFiles.map((file) => (
            <img
              key={file.name}
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="add-product__prev-img"
            />
          ))
        : productToEdit?.images.map((img) => (
            <img
              key={img}
              src={img}
              alt={"product img"}
              className="add-product__prev-img"
            />
          ))}
    </div>
  );

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    onDrop,
    maxFiles: 3,
  });

  const validationErrors = methods.formState.errors;
  const descriptionError = validationErrors.description?.message;
  const categoryError = validationErrors.category?.value?.message;

  // HANDLING FORM SUBM

  const handleFormSubmit = methods.handleSubmit(async (data) => {
    if (!imgFiles.length && !isEditing) {
      setDropzoneError("Please provide image/images of your product");
      return;
    }
    const productData = {
      ...data,
      imgFiles: imgFiles,
      category: data.category.value,
    };
    try {
      isEditing
        ? editProd(prodToEditId!, productData)
        : await dispatch(addProduct(productData));
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
    }
  });

  const selectOptions = categories.map((cat) => {
    return { value: cat, label: cat };
  });

  return (
    <FormProvider {...methods}>
      <section className="add-product">
        {/* HEADING */}
        <h1 className="add-product__heading">
          {isEditing ? "Edit Product" : "Add Product"}
        </h1>
        {/* FIELDS CON */}
        <div className="add-product__fields-con">
          <div className="add-product__left">
            {/* NAME FIELD */}
            <Input field="name" type="text" placeholder="Product Name" />
            {/* PRICE FIELD */}
            <Input field="price" type="number" placeholder="Price" />
            {/* STOCK FIELD */}
            <Input field="stock" type="number" placeholder="Stock" />

            {/* CATEGORIES OPTIONS */}

            <div className="add-product__category-con">
              <Controller
                name="category"
                control={methods.control}
                defaultValue={
                  isEditing
                    ? {
                        label: productToEdit!.category,
                        value: productToEdit!.category,
                      }
                    : undefined
                }
                render={({ field: { value, name, onChange } }) => {
                  return (
                    <Select
                      value={value}
                      name={name}
                      onChange={onChange}
                      options={selectOptions}
                      placeholder="Select a category"
                    />
                  );
                }}
              />
              {categoryError && (
                <p className="input__errMessage">
                  <BiErrorCircle />
                  {categoryError}
                </p>
              )}
            </div>

            {/* DROPZONE IMAGE UPLOAD */}
            <div
              className={`dropzone ${isDragActive ? "drag-active" : null}`}
              {...getRootProps()}
            >
              <input
                type="file"
                {...getInputProps()}
                className="dropzone__input"
              />
              <div className="dropzone__text">
                {isDragActive
                  ? "Drop files here"
                  : "Drag n drop or click to upload"}
              </div>
            </div>
          </div>
          {dropzoneError && (
            <p
              className="input__errMessage"
              style={{ alignSelf: "flex-start", marginTop: "-1rem" }}
            >
              <BiErrorCircle />
              {dropzoneError}
            </p>
          )}
          {/* IMG PREVIEW */}

          {(imgFiles.length !== 0 || isEditing) && thumbs}

          {/* DESCRIPTION */}
          <div className="add-product__fields-right">
            <textarea
              placeholder="Add product description"
              {...methods.register("description")}
              name="description"
              className="add-product__description"
            />
            {descriptionError && (
              <p className="input__errMessage">
                <BiErrorCircle />
                {descriptionError}
              </p>
            )}
          </div>
        </div>
        {/* CREATE PRODUCT BUTTON */}
        <button
          className="add-product__btn btn"
          onClick={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
        >
          {isEditing ? "Edit" : "Create Product"}
        </button>
      </section>
    </FormProvider>
  );
};

export default AddProduct;
