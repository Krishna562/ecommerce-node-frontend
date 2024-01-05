import { MdOutlineStar } from "react-icons/md";

type Props = {
  rating: number;
};

const Stars = ({ rating }: Props) => {
  const formattedRating = Number(rating.toString().slice(0, 3));
  const noOfStars = Math.ceil(formattedRating);

  const ratingDecimalPart =
    formattedRating.toString().split(".")[1]?.length > 1
      ? Number(formattedRating.toString().split(".")[1])
      : Number(formattedRating.toString().split(".")[1]) * 10;

  const stars = [];
  for (let i = 0; i < noOfStars; i++) {
    const isLastStar = formattedRating - (i + 1) < 0 ? true : false;

    const star = (
      <i
        key={i}
        className="display-star"
        style={{
          background: isLastStar
            ? `linear-gradient(to right, goldenrod ${ratingDecimalPart}%, whitesmoke 50%)`
            : "goldenrod",
        }}
      >
        <MdOutlineStar />
      </i>
    );
    stars.push(star);
  }

  return <div className="display-stars__con">{stars.map((star) => star)}</div>;
};

export default Stars;
