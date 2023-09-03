import React, { useRef, useState } from "react";
import classes from "./Register.module.css";
import Button from "../components/Button";
const Register = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);
  const userRef = useRef();
  const pwRef = useRef();
  const confirmPwRef = useRef();
  const handleUsername = () => {};
  const registerHandler = async (e) => {
    e.preventDefault();
    setSuccess(false)
    if (userRef.current.value.length < 6 || pwRef.current.value.length < 6) {
      setError("Inputs must be at least 6 digits long");
      setSuccess("");
      return;
    }
    if (pwRef.current.value !== confirmPwRef.current.value) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }
    setRegistering(true);
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_API}/users.json`
    );
    const users = await res.json();
    const usersArray = users ? Object.values(users) : [];
    const existingItem = usersArray.find(
      (user) => user.username === userRef.current.value
    );
    if (existingItem) {
    setRegistering(false)
      setError("Username already exists");
    } else {
      const newUser = {
        username: userRef.current.value,
        password: pwRef.current.value,
      };
      const addUserResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/users.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (addUserResponse.ok) {
        setSuccess("Registered successfully, login to continue");
        setError("");
      } else {
        setError("There was error registering");
        setSuccess("");
      }
      userRef.current.value = pwRef.current.value = confirmPwRef.current.value = ''
      setRegistering(false);
    }
  };
  return (
    <div className={classes.registerWrapper}>
      <form onSubmit={registerHandler} className={classes.registerForm}>
        <h2>Register</h2>
        <div className={classes.registerInput}>
          <label htmlFor="username">UserName</label>
          <input onChange={handleUsername} ref={userRef} type="text" />
        </div>
        <div className={classes.registerInput}>
          <label htmlFor="password">Password</label>
          <input ref={pwRef} type="password" />
        </div>
        <div className={classes.registerInput}>
          <label htmlFor="password">Confirm Password</label>
          <input ref={confirmPwRef} type="password" />
        </div>
        {error && <p className={classes.error}>{error}</p>}
        {success && <p>{success}</p>}
        <Button
          type="submit"
          title={`${registering ? "Registering" : "Register"}`}
        />
      </form>
    </div>
  );
};

export default Register;
