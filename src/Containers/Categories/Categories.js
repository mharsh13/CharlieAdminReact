import React from "react";
import CategoryUpload from "../../Components/UploadForms/CategoryUpload";
import classes from "./Categories.css"

const Categories= () => {
  return (
    <div className={classes.Categories}>
    <CategoryUpload></CategoryUpload>
    </div>
  );
};

export default Categories;
