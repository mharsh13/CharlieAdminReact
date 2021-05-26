import React, { useState } from "react";
import classes from "./Layout.css";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Layout = (props) => {
  const [sideBar, setSideBar] = useState(false);

  const toggleSidebar = () => {
    setSideBar(!sideBar);
  };

  let attachedClass = [classes.content, classes.Close];
  if (sideBar) {
    attachedClass = [classes.content, classes.Open];
  } else {
    attachedClass = [classes.content, classes.Close];
  }

  return (
    <React.Fragment>
      <Navbar click={toggleSidebar} sideBarStatus={sideBar} />
      <Sidebar open={sideBar}></Sidebar>
      <main className={attachedClass.join(" ")}>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
