import React, { useState } from "react";
import classes from "./Address.module.css";
import Button from "./Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginActions } from "../store";

const Address = (props) => {
  const { savedAddress } = props;
  const [newAddress, setAddress] = useState(savedAddress);
  console.log(newAddress);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userId } = useSelector((state) => state.login);
  const closeWindow = () => {
    props.hideAddress();
  };
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRes = await fetch(
      `${process.env.process.env.REACT_APP_BACKEND_API}/users/${userId}.json`
    );
    const resData = await userRes.json();
    const id = newAddress?.id || Math.random();
    const name = e.target.name.value.trim();
    const address = e.target.address.value.trim();
    const city = e.target.city.value.trim();
    const pin = e.target.pin.value.trim();
    if (!name || !address || !city || !pin) {
      setError("Please fill in all the inputs");
      return;
    }
    setIsSubmitting(true)
    const updatedAddress = { name, id, address, pin, city };
    if (newAddress) {
      const { addresses } = resData;
      const editItemIndex = addresses.findIndex(
        (ad) => ad.id === newAddress.id
      );
      console.log(editItemIndex);
      const editRes = await fetch(
        `${process.env.process.env.REACT_APP_BACKEND_API}/users/${userId}/addresses/${editItemIndex}.json`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedAddress),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!editRes.ok) {
        throw new Error("Can't edit this address");
      }
      console.log(await editRes.json());
      dispatch(loginActions.setUserAddress({ type: "EDIT", updatedAddress }));
      setIsSubmitting(false)
      props.hideAddress();
      return;
    }

    const updatedUserData = {
      ...resData,
      addresses: [
        ...(resData.addresses || []),
        {
          id: id,
          name: name,
          address: address,
          city: city,
          pin: pin,
        },
      ],
    };
    const res = await fetch(
      `${process.env.process.env.REACT_APP_BACKEND_API}/users/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(updatedUserData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Error updating the cart");
    }
    try {
      await res.json();
    } catch (err) {
      console.log(err);
    }
    console.log(updatedAddress);
    dispatch(loginActions.addNewAddress({ updatedAddress }));
    setIsSubmitting(false)
    e.target.reset();
    props.hideAddress();
  };
  return (
    <div className={classes.addressContainer}>
      <div>
        <div className={classes.backDrop} onClick={closeWindow}></div>
        <div className={classes.addressWrapper}>
          <h3>Address</h3>
          <form onSubmit={handleSubmit}>
            <div className={classes.addressInput}>
              <label htmlFor="name">Save as</label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={newAddress?.name || ""}
              />
            </div>
            <div className={classes.addressInput}>
              <label htmlFor="line1">Address line 1</label>
              <input
                id="line1"
                name="address"
                type="text"
                defaultValue={newAddress?.address || ""}
              />
            </div>
            <div className={classes.addressInput}>
              <label>City</label>
              <input
                id="city"
                name="city"
                type="text"
                defaultValue={newAddress?.city || ""}
              />
            </div>
            <div className={classes.addressInput}>
              <label>Pin Code</label>
              <input
                id="pin"
                name="pin"
                type="text"
                defaultValue={newAddress?.pin || ""}
              />
            </div>
            {error && <p>{error}</p>}
            <Button
              type="submit"
              title={`${isSubmitting ? "Saving" : "Save"}`}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Address;
