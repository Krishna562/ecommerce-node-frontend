type Props = {
  review: {
    userId: string;
    stars: Number;
    comment: string;
  };
};

const Review = ({ review }: Props) => {
  const { userId, stars, comment } = review;

  return (
    <div className="review">
      <div className="review__username">{userId}</div>
      <div className="review__stars">{stars.toString()} stars</div>
      <div className="review__comment">{comment}</div>
    </div>
  );
};

export default Review;
