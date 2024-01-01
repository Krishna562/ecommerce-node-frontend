import "../../css/user/home.css";
import bags from "../../assets/bags.png";
import { useAppSelector } from "../../hooks/hooks";
import Product from "../../components/Product";
import questions from "../../data/questions";
import Question from "../../components/Accordion/Question";
import { useState } from "react";

const Home = () => {
  const featuredProducts = useAppSelector((state) => state.product.allProducts)
    .slice()
    .reverse()
    .slice(0, 4);

  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="home">
      {/* BANNER */}
      <section className="banner">
        <div className="banner__con">
          {/* BANNER TEXT */}
          <div className="banner__text">
            <h1 className="banner__heading">
              Everything you need, at one place
            </h1>
            <p className="banner__p">
              Shopper is an online ecommerce store where you can buy a wide
              variety of products. From clothes to hardware, we have it all.
            </p>
            {/* BANNER BTN */}
            <button className="banner__button">Shop now</button>
          </div>
          {/* BANNER GRAPHIC */}
          <img src={bags} alt="banner graphic" className="banner__bags" />
        </div>
      </section>
      <section className="featured">
        <h1 className="featured__heading">Featured products</h1>
        <div className="featured__products-con">
          {featuredProducts.map((product) => {
            return <Product product={product} from="home" key={product._id} />;
          })}
        </div>
      </section>
      <section className="accordion">
        <h1 className="accordion__heading">FAQs</h1>
        <div className="accordion__con">
          {questions.map((ques, i) => {
            return (
              <Question
                ques={ques}
                key={ques.question}
                index={i}
                selected={selected}
                setSelected={setSelected}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
