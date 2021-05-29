import React from "react";
import classes from "./EditVariants.css";
import VariantData from "../../Components/UploadedData/VariantData";

const EditVariants = () => {
  return (
    <div className={classes.EditVariants}>
     <VariantData></VariantData>
    </div>
  );
};

export default EditVariants;
