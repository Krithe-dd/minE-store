import React, { useState } from "react";
import classes from "./Login.module.css";
import { useDispatch } from "react-redux";
import { cartActions, loginActions, ordersActions, wishlistActions } from "../store";
export const Login = () => {  
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [userNameTouched,setUserNameTouched]=useState(false)
  const [passwordTouched,setPasswordTouched]=useState(false)
  const inputsTouced = userNameTouched && passwordTouched;
  const userNameHandler = (e) => {
    setUserName(e.target.value)
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const handleUserBlur=()=>{
    setUserNameTouched(true)
  }
  const handlePasswordBlur =()=>{
    setPasswordTouched(true)
  }
  const handleLogin=async(e)=>{
    e.preventDefault()
    setIsSubmitting(true)
    setUserNameTouched(false)
    setPasswordTouched(false)
    const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/users.json`)
    const data =await res.json();
    for (const id in data) {
      const userId = data[id];
      if (userId.username === userName) {
        const userId = id;
        dispatch(loginActions.setUserId(userId))
      }
    }
    const user= Object.values(data).find(item=>item.username === userName && item.password === password)
    if(user){
      const {cartItems,wishlistItems,addresses,orders}= user
      setValidUser(true)
      setError(false)
      setUserName('')
      setPassword('')
      document.body.classList.remove('no-scroll')
      dispatch(loginActions.setLoginState({type:'FALSE',user:user}))
      dispatch(loginActions.setUserAddress({addresses}))
      dispatch(cartActions.addItemToCart({type:'INIT',cartItems}))
      dispatch(wishlistActions.addItemToList({type:'INIT',wishlistItems}))
      dispatch(ordersActions.addOrder(orders))
    }else{
      setValidUser(false)
      setError(true)
    } 
    setIsSubmitting(false)
    
  }
  return (
    <div className={classes.loginWrapper}>
      <form onSubmit={handleLogin} className={classes.loginForm}>
        <h2>Login</h2>
        <div>
          <label htmlFor="username">UserName</label>
          <input value={userName} autoFocus onBlur={handleUserBlur} onChange={userNameHandler} type="text" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input value={password} onBlur={handlePasswordBlur} onChange={passwordHandler} type="password" />
        </div>
        {validUser  && inputsTouced && <h6>Welcome back </h6>}
        {error && <p>Invalid username or password</p>}
        <button type="submit" >{isSubmitting ? 'Logging in' : 'Login'}</button>
      </form>
    </div>
  );
};
