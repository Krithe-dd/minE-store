import ProductCard from "../components/ProductCard";
import Layout from "../layouts/Layout";
import FilterSection from "../components/FilterSection";
import Skeleton from "../components/Skeleton";
import classes from "./Electronics.module.css";
import usePageLoad from "../hooks/usePageLoad";
import Error from "./Error";
const Electronics = () => {
  const { isError, isLoading, products, noresults } = usePageLoad(
    process.env.REACT_APP_ELEC_API,
    "ELEC"
  );
  return (
    <div className={classes.electronicsWrapper}>
      {isError ? (
        <Error />
      ) : (
        <>
          <FilterSection products={products} />
          {isLoading && <Skeleton />}
          {noresults && <Layout heading="No results found for this filter" />}
          {!noresults && !isLoading && (
            <Layout heading="Electronics">
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
export default Electronics;
