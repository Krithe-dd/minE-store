import React from 'react'
import ReactDOM from 'react-dom'
import { Login } from '../pages';
import classes from './InputModal.module.css'
import { useDispatch } from 'react-redux';
import { loginActions } from '../store';
const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm} />;
  };
  
const InputModal = () => {
    const dispatch = useDispatch()
    const removeBackdrop=()=>{
    document.body.classList.remove('no-scroll')
    dispatch(loginActions.setLoginState({type:'FALSE'}))
    }
  return (
    <div>
        {ReactDOM.createPortal(<Backdrop onConfirm={removeBackdrop}/>,document.getElementById('backdrop'))}
        {ReactDOM.createPortal(<Login/>,document.getElementById('overlay'))}
    </div>
  )
}

export default InputModal