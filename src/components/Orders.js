import React from 'react'
import classes from './Orders.module.css'
import {useSelector} from 'react-redux'
const Orders = () => {
  const {orders} = useSelector(state=>state.orders)
  return (
    <div className={classes.ordersWrapper}>
      {orders?.map((orderObj,idx)=>(
        <div className={classes.singleOrder} key={idx}>
        <div>
        {orderObj.date}
        </div>
        <div >
          {orderObj.items.map((order,i)=><div key={i}>{order.name} x {order.quantity}</div>)}
        </div>
        <div>
        ${orderObj.cost}
        </div>
        </div>
      ))}
    </div>
  )
}

export default Orders