import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../store";

let cachedData;
const usePageLoad = (url, type) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const noresults = useSelector((state) => state.products.noResults);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (cachedData) {
        dispatch(productActions.setItems(cachedData));
      } else {
        const res = await fetch(url);
        if (!res.ok) {
          setIsError(true);
          return;
        } else {
          const data = await res.json();
            if (!data) {
              setIsError(true);
              return;
            }
            switch (type) {
                case 'BOOKS':
                    cachedData = data.products;
                    break;
                case 'STYLES':
                    cachedData = data.filter(
                        (item) =>
                          item.category.startsWith("men") ||
                          item.category.startsWith("women") ||
                          item.category.startsWith("jewelery")
                      );
                      break;
                case 'ELEC':
                    cachedData = data;
                    break;
                default:
                    break;
            }
          dispatch(productActions.setItems(cachedData));
        }
      }
      setIsLoading(false);
      cachedData=null
    };
    fetchData();
    return () => {
      dispatch(productActions.clearFilter());
    };
  }, []);// eslint-disable-next-line
  return { isLoading, isError, products, noresults };
};

export default usePageLoad;
