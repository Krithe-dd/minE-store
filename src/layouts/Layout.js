import React from 'react'
import classes from './Layout.module.css'
const Layout = ({children,heading}) => {
  return (
    <div>
    <div className={classes.layout}>
    <h3>{heading}</h3>
    {children}
    </div>
    </div>
  )
}

export default Layout