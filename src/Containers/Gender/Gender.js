import React from "react";
import GenderData from "../../Components/UploadedData/GenderData";
import GenderUpload from "../../Components/UploadForms/GenderUpload";
import classes from "./Gender.css";

const Gender = () => {
  return (
    <div className={classes.Gender}>
      <GenderUpload></GenderUpload>
      <br></br>
      <h5>List of added gender categories</h5>
      <GenderData></GenderData>
    </div>
  );
};

export default Gender;
