import React, { useEffect, useRef, useState } from "react";
import classes from "./Home.module.css";
import Carousel from "../components/Carousel";
import CategoryBrief from "../components/CategoryBrief";
import NewsLetter from "../components/NewsLetter";
import { useDispatch } from "react-redux";
import { headerActions } from "../store";
import Footer from '../components/Footer'
import TrendingComponent from "../components/TrendingComponent";
export const Home = () => {
  const dispatch = useDispatch();
  const targetRef = useRef(null);
  const[height,setHeight]=useState(null)
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(()=>{
    const h = targetRef.current.getBoundingClientRect().y
    setHeight(h)
  },[])
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entries]) => {
        setIsIntersecting(entries.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
      }
    );
    if (isIntersecting) {
      dispatch(headerActions.toggleHeader({ display: "hide" }));
    } else {
      dispatch(headerActions.toggleHeader({ display: "show" }));
    }
    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [isIntersecting]);
  return (
    <div className={classes.home}>
      <Carousel height={height}/>
      <CategoryBrief />
      <div ref={targetRef}>
        <TrendingComponent />
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
};
