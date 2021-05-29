import React from "react";
import VariantUpload from "../../Components/UploadForms/VariantUpload";

import classes from "./AddVariants.css";

const AddVariants = () => {
  return (
    <div className={classes.AddVariants}>
      <VariantUpload></VariantUpload>
    </div>
  );
};

export default AddVariants;
