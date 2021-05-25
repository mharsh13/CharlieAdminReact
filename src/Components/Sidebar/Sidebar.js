import React from "react";
import classes from "./Sidebar.css";

const Sidebar = (props) => {
  let attachedClass = [classes.Sidebar, classes.Close];
  if (props.open) {
    attachedClass = [classes.Sidebar, classes.Open];
  } else {
    attachedClass = [classes.Sidebar, classes.Close];
  }
  return <div className={attachedClass.join(" ")}></div>;
};

export default Sidebar;
