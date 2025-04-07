import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import LottieHander from "../compoenents/feedback/LottieHandler/LottieHandler";

const Error = () => {

  return (
    <Container className="notFound">
      <LottieHander type="error" />
      <Link to="/" replace={true}>
        How about going back to safety?
      </Link>
    </Container>
  );
};

export default Error;
