import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoMdClose } from "react-icons/io";
import { BiErrorCircle } from "react-icons/bi";
import { MdOutlineStar } from "react-icons/md";
import { useAppDispatch } from "../../hooks/hooks";
import { addProductReview } from "../../store/reducers/product";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  productId: string;
};

const AddReviewModal = ({ isModalOpen, setIsModalOpen, productId }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const starsConRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const [starRating, setStarRating] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [ratingErr, setRatingErr] = useState<string | null>(null);

  const tooltipArr = ["Poor", "Below Average", "Average", "Good", "Excellent"];

  useEffect(() => {
    if (isModalOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isModalOpen]);

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

  const addYellowBackgroundAndTooltip = (currIndex: number) => {
    const starsArr = Array.from(
      starsConRef.current?.children as HTMLCollectionOf<HTMLElement>
    );
    starsArr.forEach((star, i) => {
      if (currIndex >= i) {
        star.style.color = "goldenrod";
      }

      // set Tooltip
      setTooltip(tooltipArr.find((tip, index) => currIndex === index)!);
    });
  };

  const removeYellowBackgroundAndTooltip = () => {
    if (starRating) {
      const starsArr = Array.from(
        starsConRef.current?.children as HTMLCollectionOf<HTMLElement>
      );
      starsArr.forEach((star, i) => {
        if (starRating - 1 >= i) {
          star.style.color = "goldenrod";
        } else {
          star.style.color = "black";
        }
      });

      setTooltip(tooltipArr.find((tip, index) => starRating - 1 === index)!);
    } else {
      const starsArr = Array.from(
        starsConRef.current?.children as HTMLCollectionOf<HTMLElement>
      );
      starsArr.forEach((star, i) => {
        star.style.color = "black";
      });
      // remove Tooltip
      setTooltip(null);
    }
  };

  const handleStarClick = (currIndex: number) => {
    setStarRating(currIndex + 1);
    setRatingErr(null);
    const starsArr = Array.from(
      starsConRef.current?.children as HTMLCollectionOf<HTMLElement>
    );
    starsArr.forEach((star, i) => {
      if (currIndex >= i) {
        star.style.color = "goldenrod";
      } else {
        star.style.color = "black";
      }

      // set Tooltip
      setTooltip(tooltipArr.find((tip, index) => currIndex === index)!);
    });
  };

  const stars = [];
  for (let i = 0; i < 5; i++) {
    const star = (
      <i
        key={i}
        className="star"
        onMouseEnter={() => addYellowBackgroundAndTooltip(i)}
        onMouseLeave={() => removeYellowBackgroundAndTooltip()}
        onClick={() => handleStarClick(i)}
      >
        <MdOutlineStar />
      </i>
    );
    stars.push(star);
  }

  const onSubmit = handleSubmit((data) => {
    if (!starRating) return;

    dispatch(
      addProductReview({
        stars: starRating,
        comment: data.comment,
        productId: productId,
      })
    );

    setIsModalOpen(false);
  });

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
        <div className="add-review__stars-con" ref={starsConRef}>
          {stars.map((star) => star)}
          {tooltip && <span className="add-review__tooltip">{tooltip}</span>}
        </div>
        {ratingErr && (
          <p className="input__errMessage add-review__err-msg">
            <BiErrorCircle />
            {ratingErr}
          </p>
        )}
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
        <button
          className="add-review__add-btn btn"
          onClick={(e) => {
            onSubmit(e);
            if (!starRating)
              setRatingErr("Please give a rating to the product");
          }}
        >
          Add review
        </button>
      </form>
    </dialog>
  );
};

export default AddReviewModal;
