import classes from "./Styles.module.css";
import ProductCard from "../components/ProductCard";
import Layout from "../layouts/Layout";
import FilterSection from "../components/FilterSection";
import Skeleton from "../components/Skeleton";
import usePageLoad from "../hooks/usePageLoad";
import Error from "./Error";
export const Styles = () => {
  const { isError, isLoading, products, noresults } = usePageLoad(
    process.env.REACT_APP_PRODUCTS_API,
    "STYLES"
  );
  return (
    <div className={classes.stylesWrapper}>
      {isError ? (
        <Error />
      ) : (
        <>
          {" "}
          <FilterSection products={products} />
          {noresults && <Layout heading="No results found for this filter" />}
          {isLoading && <Skeleton />}
          {!noresults && !isLoading && (
            <Layout heading="Styles">
              {" "}
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
