import React from "react";
import { json, useLoaderData, useParams } from "react-router-dom";
import SingleItemComponent from "../components/SingleItemComponent";
import classes from './SingleItem.module.css'
import {popularProducts} from '../data'
import Error from "./Error";
const SingleItem = () => {
  const params = useParams();
  const { id,trendingId } = params;
  const data = useLoaderData();
  const { products } = data;
  const selectedItem = products?.find((item) => (item.id === +id) || (item.id === +trendingId)) || data.find((item) => item.id === +id)
  return (
    <>
    <div className={classes.singleItemComponentWrapper}>
      {selectedItem ? <SingleItemComponent product={selectedItem} /> : <Error/>}
    </div>
    </>
  );
};
let cachedBooks = null;
let cachedRest = null;
export const loaderFn = async ({ request }) => {
  const { url } = request;
  if (url.includes("/books")) {
    if (cachedBooks) {
      return cachedBooks;
    } else {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}.json`
      );
      console.log(res);
      if(!res.ok){
        throw json()
      }
      cachedBooks =await res.json();
      return cachedBooks;
    }
  } else if(url.includes("/styles")||url.includes("/electronics")){
    if (cachedRest) {
      return cachedRest;
    } else {
      const res = await fetch(process.env.REACT_APP_PRODUCTS_API);
      if(!res.ok){
        throw json()
      }
      cachedRest =await res.json();
      return cachedRest;
    }
  }else{
    return {products:popularProducts}
  }
};
export default SingleItem;
