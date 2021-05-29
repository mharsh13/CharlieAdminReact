import React from "react";
import ProductData from "../../Components/UploadedData/ProductData";
import classes from "./EditProducts.css";

const AddProducts = () => {
  return (
    <div className={classes.EditProducts}>
    <ProductData></ProductData>
    </div>
  );
};

export default AddProducts;
