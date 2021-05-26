import React from "react";
import BrandUpload from "../../Components/UploadForms/BrandUpload";
import classes from "./Brands.css"

const Brands= () => {
  return (
    <div className={classes.Brands}>
    <BrandUpload></BrandUpload>
    </div>
  );
};

export default Brands;
