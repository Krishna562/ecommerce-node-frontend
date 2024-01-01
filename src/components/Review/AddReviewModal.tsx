import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoMdClose } from "react-icons/io";
import { BiErrorCircle } from "react-icons/bi";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const AddReviewModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const schema = yup.object().shape({
    comment: yup
      .string()
      .required("Comment is required")
      .min(10, "Comment must be atleast 10 characters long")
      .max(500, "Comment cannot be greater than 500 characters"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const commentValidationErr = errors.comment?.message;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  useEffect(() => {
    if (isModalOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isModalOpen]);

  return (
    <dialog
      ref={modalRef}
      onClose={() => setIsModalOpen(false)}
      className="add-review"
    >
      <i
        className="add-review__close-btn"
        onClick={() => setIsModalOpen(false)}
      >
        <IoMdClose />
      </i>

      <form className="add-review__con" onSubmit={(e) => e.preventDefault()}>
        <h1 className="add-review__heading">Add a review</h1>
        <div className="add-review__stars">Stars</div>
        <textarea
          {...register("comment")}
          name="comment"
          placeholder="Add a comment"
          className="add-review__comment input"
        />
        {commentValidationErr && (
          <p className="input__errMessage add-review__err-msg">
            <BiErrorCircle />
            {commentValidationErr}
          </p>
        )}
        <button className="add-review__add-btn btn" onClick={onSubmit}>
          Add review
        </button>
      </form>
    </dialog>
  );
};

export default AddReviewModal;
