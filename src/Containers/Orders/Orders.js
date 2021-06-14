import React from "react";
import OrderTable from "../../Components/OrderForm/OrderTable";
import classes from "./Order.css";

const Order = () => {
  return (
    <div className={classes.Order}>
      <OrderTable></OrderTable>
    </div>
  );
};

export default Order;
