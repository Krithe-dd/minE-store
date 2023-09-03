import React,{ useRef, useState} from 'react'
import classes from './NewsLetter.module.css'
import Button from './Button'
const NewsLetter = () => {
  const [email, setEmail]=useState('')
  const emailref = useRef('')
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!emailref.current.value.includes('@')||!emailref.current.value.includes('.com')){
      setEmail('Please enter a valid email')
    }else{
      setEmail('Email registered successfully')

    }
  }
  return (
    <div className={classes.newsLetter}>
    <h1>NewsLetter</h1>
    <h4>Get timely updates from your favourite products</h4>
    <form>
        <input ref={emailref} type='email' placeholder='Your email'/>
        <Button clickHandler={handleSubmit} title='Submit'/>
    </form>
        {email && <p >{email}</p>}
    </div>
  )
}

export default NewsLetter