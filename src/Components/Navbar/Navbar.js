import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import classes from "./Navbar.css";
import { withRouter } from "react-router";
import { FaEnvelope, FaBell, FaSignOutAlt } from "react-icons/fa";
import logo from "../../Images/Logo2.png";
import Hamburger from "hamburger-react";

const navbar = (props) => {
  const { location } = props;
  let attachedClass = [classes.Navbar, classes.Close];
  if (props.sideBarStatus) {
    attachedClass = [classes.Navbar, classes.Open];
  } else {
    attachedClass = [classes.Navbar, classes.Close];
  }
  return (
    <Navbar expand="md" variant="dark" className={attachedClass.join(" ")}>
      <Hamburger
        toggled={props.sideBarStatus}
        toggle={props.click}
        color="white"
        size="20"
        style={{ padding: "0px" }}
      />

      <Navbar.Brand style={{ textDecoration: "none", display: "flex" }}>
        <img
          alt="logo"
          src={logo}
          height="25px"
          style={{
            margin: "2px 30px",
          }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
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
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(navbar);
