import React from "react";
import GenderUpload from "../../Components/UploadForms/GenderUpload";
import classes from "./Gender.css";

const Gender = () => {
  return (
    <div className={classes.Gender}>
      <GenderUpload></GenderUpload>
    </div>
  );
};

export default Gender;
