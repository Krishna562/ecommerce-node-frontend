import gmailImage from "../../assets/gmail.png";
import "../../css/auth/requestSent.css";

const RequestSent = () => {
  return (
    <section className="request-sent">
      <h1>Password reset request sent</h1>
      <p>Check your email inbox for resetting your password</p>
      <img src={gmailImage} alt="gmail logo" />
    </section>
  );
};

export default RequestSent;
