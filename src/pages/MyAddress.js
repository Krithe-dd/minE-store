import React, { useState } from "react";
import classes from "./MyAddress.module.css";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import Address from "../components/Address";
import { useSelector } from "react-redux";
import { loginActions } from "../store";
const MyAddress = () => {
  const { userAddress } = useSelector((state) => state.login);
  console.log(userAddress);
  const { userId } = useSelector((state) => state.login);
  const [showAddress, setShowAddress] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);
  const dispatch = useDispatch();
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const updatedAddress = userAddress.filter((address) => address.id !== id);
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_API}/users/${userId}/addresses/.json`,
      {
        method: "PUT",
        body: JSON.stringify(updatedAddress),
        headers: { "Content-Type": "application/json" },
      }
      );
    if(!res.ok){
      throw new Error('Error deleting the item')
    }
    dispatch(loginActions.setUserAddress({ updatedAddress }));
  };
  const handleHide=()=>{
    setAddressToEdit(null)
    setShowAddress(false)
  }
  const handleEdit = (e,id)=>{
    e.stopPropagation();
    setShowAddress(true);
    const editAddress = userAddress.find(address=>address.id === id);
    setAddressToEdit(editAddress)
  }
  return (
    <div className={classes.addressesContainer}>
      <h3>Saved addresses</h3>
      <ul>
        {userAddress.map((address) => {
          return (
            <li
              onClick={() => {
                console.log("Hii");
              }}
              key={address.id}
              className={classes.individualAddress}
            >
              {address.name}
              <div className={classes.actions}>
                <i
                  onClick={(e) => handleDelete(e, address.id)}
                  className="fa-solid fa-trash-can"
                ></i>
                <i
                onClick={(e) => handleEdit(e, address.id)} 
                className="fa-regular fa-pen-to-square"></i>
              </div>
            </li>
          );
        })}
      </ul>
      <Button
        clickHandler={() => setShowAddress(true)}
        title="Add new address"
      />
      {showAddress && <Address savedAddress={addressToEdit} hideAddress={handleHide} />}
    </div>
  );
};

export default MyAddress;
