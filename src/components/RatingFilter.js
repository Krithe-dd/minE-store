import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  productActions } from '../store';

const RatingFilter = ({label}) => {
  const {rating} = useSelector(state=>state.products)
    const dispatch = useDispatch();
    const setRating=(e)=>{
        const {id} = e.target
        dispatch(productActions.setRatingFilter(+id))
    }
  return (
    <div>
        <div>
          <label htmlFor={label}>{label} stars +</label>
          <input onChange={setRating}  id={label} checked={rating === +label || false} type="radio" name="rating" value=''/>
        </div>
    </div>
  )
}

export default RatingFilter