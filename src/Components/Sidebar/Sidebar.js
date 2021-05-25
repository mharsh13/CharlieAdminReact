import React from "react";
import classes from "./Sidebar.css";

const Sidebar = (props) => {
  let attachedClass = [classes.Sidebar, classes.Close];
  if (props.open) {
    attachedClass = [classes.Sidebar, classes.Open];
  } else {
    attachedClass = [classes.Sidebar, classes.Close];
  }
  return (
    <div className={attachedClass.join(" ")}>
      <div>
        <h6 className={classes.Title}>Charlie - Admin Portal</h6>
      </div>
      <hr
        style={{
          backgroundColor: "#fdae26",
          margin: "0px",
          height: "1px",
        }}
      ></hr>
    </div>
  );
};

export default Sidebar;
