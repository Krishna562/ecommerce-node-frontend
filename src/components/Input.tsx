import { useFormContext } from "react-hook-form";
import { BiErrorCircle } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setValidationErr } from "../store/reducers/userReducer";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useRef, useState } from "react";

interface InputPropsI {
  field: string;
  type: string;
  placeholder: string;
}

interface BackendValidationErrI {
  errorsArr: [];
}

interface ErrObjI {
  path: string;
  field: string;
  msg: string;
  value: string;
}

const Input = ({ field, type, placeholder }: InputPropsI) => {
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isPass, setIsPass] = useState<boolean>(true);

  const {
    formState: { errors },
    register,
  } = useFormContext();

  const extractErrorMessage = () => {
    if (errors[field]) {
      return errors[field]?.message;
    }
  };

  let errMessage = extractErrorMessage() as string;

  const serverSideValidationErr = useAppSelector(
    (state) => state.user.err
  ) as BackendValidationErrI;

  if (serverSideValidationErr.errorsArr) {
    const errObj = serverSideValidationErr.errorsArr.find(
      (errObj: ErrObjI) => errObj.path === field
    ) as unknown as ErrObjI;

    if (errObj) {
      errMessage = errObj.msg;
    }
  }

  const { ref, ...rest } = register(field, {
    onChange: () => {
      dispatch(setValidationErr({}));
    },
  });

  return (
    <div className="input-con">
      <div className="input-full">
        <input
          {...rest}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
          type={type}
          placeholder={placeholder}
          name={field}
          className="input"
        />

        {type === "password" && (
          <i
            className="input__password-visibility-toggle"
            onClick={() => {
              if (inputRef.current!.type === "text") {
                inputRef.current!.type = "password";
                setIsPass(true);
              } else {
                inputRef.current!.type = "text";
                setIsPass(false);
              }
            }}
          >
            {isPass ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
          </i>
        )}
      </div>
      {errMessage && (
        <p className="input__errMessage">
          <BiErrorCircle />
          {errMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
