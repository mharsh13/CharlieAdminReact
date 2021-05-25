import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import classes from "./Navbar.css";
import { withRouter } from "react-router";
import { FaEnvelope, FaBars, FaBell, FaSignOutAlt } from "react-icons/fa";

const navbar = (props) => {
  const { location } = props;
  let attachedClass = [classes.Navbar, classes.Close];
  if (props.sideBarStatus) {
    attachedClass = [classes.Navbar, classes.Open];
  } else {
    attachedClass = [classes.Navbar, classes.Close];
  }
  return (
    <Navbar
      expand="md"
      variant="dark"
      className={attachedClass.join(" ")}
    >
      <FaBars
        onClick={props.click}
        size="1.2rem"
        color="white"
        style={{ cursor: "pointer" }}
      />

      <Navbar.Brand style={{ textDecoration: "none", display: "flex" }}>
        <div style={{ padding: "0px 30px" }}>Charlie - Admin Portal</div>
      </Navbar.Brand>
      <Nav className="ml-auto" activeKey={location.pathname}>
        <FaEnvelope
          size="1.2rem"
          color="white"
          style={{ cursor: "pointer", margin: "0px 10px" }}
        />
        <FaBell
          size="1.2rem"
          color="white"
          style={{ cursor: "pointer", margin: "0px 10px" }}
        />
        <FaSignOutAlt
          size="1.2rem"
          color="white"
          style={{ cursor: "pointer", margin: "0px 10px" }}
        />
      </Nav>
    </Navbar>
  );
};

export default withRouter(navbar);
