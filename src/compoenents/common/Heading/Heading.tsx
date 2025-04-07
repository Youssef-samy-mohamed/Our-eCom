import { memo } from "react";
const Heading = memo(({ title }: { title: string }) => {

  return <h2 className="mb-3 font-size-6">{title}</h2>;
});

export default Heading;
