import React from "react";
import ProductUpload from "../../Components/UploadForms/ProductUpload";
import classes from "./AddProducts.css";

const AddProducts = () => {
  return (
    <div className={classes.AddProducts}>
      <ProductUpload></ProductUpload>
    </div>
  );
};

export default AddProducts;
