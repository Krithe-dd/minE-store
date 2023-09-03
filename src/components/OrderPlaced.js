import React from 'react'
import classes from './OrderPlaced.module.css'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
const OrderPlaced = () => {
    const nav=useNavigate();
    const goToHome=()=>[
        nav('/')
    ]
  return (
    <div >
        <div className={classes.backDrop}></div>
        <div className={classes.wrapperClass}>
            <h3>Order placed successfully..!!</h3>
            <Button clickHandler={goToHome} title='Back to Home'/>
        </div>
    </div>
  )
}

export default OrderPlaced