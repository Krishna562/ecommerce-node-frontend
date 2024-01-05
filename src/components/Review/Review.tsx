import { UserI } from "../../store/reducers/userReducer";
import Stars from "../Stars";

type Props = {
  review: {
    userId: UserI;
    stars: number;
    comment: string;
  };
};

const Review = ({ review }: Props) => {
  const { userId, stars, comment } = review;

  return (
    <div className="review">
      <div className="review__username">{userId.username}</div>
      <Stars rating={stars} />
      <div className="review__comment">{comment}</div>
    </div>
  );
};

export default Review;
