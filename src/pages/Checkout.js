import React from 'react'
import Address from '../components/Address'
import classes from './Checkout.module.css'
const Checkout = () => {
  return (
    <div className={classes.checkoutWrapper}>
        <Address />
    </div>
  )
}

export default Checkout