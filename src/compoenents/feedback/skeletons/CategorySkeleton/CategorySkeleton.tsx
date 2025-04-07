import ContentLoader from "react-content-loader";
import { Row, Col } from "react-bootstrap";

const CategorySkeleton = () => {
    
    const renderSkeleton = Array(4).fill(0).map((_, index) => (
        <Col xs={3} key={index} className="d-flex justify-content-center mb-5 mt-2">
            <ContentLoader 
    speed={2}
    width={180}
    height={180}
    viewBox="0 0 180 180"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"

  >
    <rect x="24" y="164" rx="3" ry="3" width="100" height="9" /> 
    <circle cx="77" cy="76" r="77" />
  </ContentLoader>
        </Col>
    ))
  return <Row>{renderSkeleton}</Row>;


};

export default CategorySkeleton;
