import React from "react";
import CategoryData from "../../Components/UploadedData/CategoryData";
import CategoryUpload from "../../Components/UploadForms/CategoryUpload";
import classes from "./Categories.css"

const Categories= () => {
  return (
    <div className={classes.Categories}>
    <CategoryUpload></CategoryUpload>
    <br></br>
      <h5>List of added categories</h5>
      <CategoryData></CategoryData>
    </div>
  );
};

export default Categories;
