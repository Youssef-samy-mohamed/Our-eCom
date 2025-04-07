import { useEffect } from "react";
import { actGetCategories } from "../../store/categories/categoriesSlice";
import { cleanUpCategoriesRecords } from "../../store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";


const useCategories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    const promise = dispatch(actGetCategories()); // if the records length is 0, then dispatch the action because no need to fetch again and not change the categories everyday or so

    return () => {
      dispatch(cleanUpCategoriesRecords());
      promise.abort();
    };
  }, [dispatch]);

  return {
    loading,
    error,
    records,    
  };
};

export default useCategories;
