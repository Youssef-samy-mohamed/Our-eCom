import React from "react";
import { Row, Col } from "react-bootstrap";
import { LottieHandler } from "@pages/index";

type GridListProps<T> = {
    records: T[];
    renderItem: (record: T) => React.ReactNode;
    emptyMessage?: string
}

type HasId = {
    id?: number;
}

const GridList = <T extends HasId> ({ records, renderItem , emptyMessage } : GridListProps<T>) => {
  const categoriesList =
    records.length > 0
      ? records.map((record) => (
          <Col
            xs={3}
            key={record.id}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            {renderItem(record)}
          </Col>
        ))
      : <LottieHandler type="empty" message={emptyMessage} />;
  return (
    <div>
      <Row>{categoriesList}</Row>
    </div>
  );
};

export default GridList