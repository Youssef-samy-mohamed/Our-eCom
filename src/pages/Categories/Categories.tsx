import { Category } from "../../compoenents/ecommerce";
import { Loading } from "../../compoenents/feedback";
import { GridList } from "../../compoenents/common";
import Heading from "../../compoenents/common/Heading/Heading";
import useCategories from "./useCategories";
import { TCategory } from "@customTypes/category";






const Categories = () => {
  
  const { loading, error, records } = useCategories();
  
  return (
    <>
      
        <>
          <Heading title="Categories" />
          <Loading status={loading} error={error} type="category">
            <GridList<TCategory>
              records={records}
              renderItem={(record) => <Category {...record} />}
            />
          </Loading>
        </>
      
    </>
  );
};


export default Categories;