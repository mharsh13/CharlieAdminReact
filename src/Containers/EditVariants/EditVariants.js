import React from "react";
import classes from "./EditVariants.css";
import VariantData from "../../Components/UploadedData/VariantData";

const EditVariants = (props) => {
  return (
    <div className={classes.EditVariants}>
     <VariantData product={props.location.state}></VariantData>
    </div>
  );
};

export default EditVariants;
