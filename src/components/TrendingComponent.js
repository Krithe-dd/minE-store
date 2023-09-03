import React from 'react'
import { popularProducts } from '../data'
import classes from './Trending.module.css'
import Trending from './Trending'
const TrendingComponent = () => {
  return (
    <div className={classes.trending}>
      <h1>Trending</h1>
      <div className={classes.items}>
        {popularProducts.map(product=><Trending key={product.id} product={product}/>)}
    </div>
    </div>
  )
}

export default TrendingComponent