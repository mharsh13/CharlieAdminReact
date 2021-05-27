import React from "react";
import BrandData from "../../Components/UploadedData/BrandData";
import BrandUpload from "../../Components/UploadForms/BrandUpload";
import classes from "./Brands.css"

const Brands= () => {
  return (
    <div className={classes.Brands}>
    <BrandUpload></BrandUpload>
    <br></br>
      <h5>List of added brands</h5>
      <BrandData></BrandData>
    </div>
  );
};

export default Brands;
