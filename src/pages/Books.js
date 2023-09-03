import React from "react";
import classes from "./Books.module.css";
import ProductCard from "../components/ProductCard";
import Layout from "../layouts/Layout";
import FilterSection from "../components/FilterSection";
import Skeleton from "../components/Skeleton";
import Error from "./Error";
import usePageLoad from "../hooks/usePageLoad";
const Books = () => {
  const { isError, isLoading, products, noresults } = usePageLoad(
    `${process.env.REACT_APP_BACKEND_API}.json`,
    "BOOKS"
  );

  return (
    <div className={classes.booksWrapper}>
      {isError ? (
        <Error />
      ) : (
        <>
          <FilterSection products={products} />
          {noresults && <Layout heading="No results found for this filter" />}
          {isLoading && <Skeleton />}
          {!noresults && !isLoading && (
            <Layout heading="Books">
              <section>
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </section>
            </Layout>
          )}
        </>
      )}
    </div>
  );
};

export default Books;
