import { Dispatch, SetStateAction } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

type Props = {
  ques: {
    question: string;
    answer: string;
  };
  index: number;
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
};

const Question = ({ ques, index, selected, setSelected }: Props) => {
  const { question, answer } = ques;

  const accordianShowOne = (index: number) => {
    if (selected === index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  };

  return (
    <div className="ques">
      <h1 className="ques__head" onClick={() => accordianShowOne(index)}>
        <p className="ques__question">{question}</p>
        <button className="ques__toggle btn">
          {selected === index ? <FaMinus /> : <FaPlus />}
        </button>
      </h1>
      <p
        className={selected === index ? "ques__answer active" : "ques__answer"}
      >
        {answer}
      </p>
    </div>
  );
};

export default Question;
