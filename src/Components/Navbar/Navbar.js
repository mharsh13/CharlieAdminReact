import React from "react";
import { Navbar } from "react-bootstrap";
import classes from "./Navbar.css";
import { withRouter } from "react-router";
import { FaBars } from "react-icons/fa";

const navbar = (props) => {
  return (
    <Navbar
      collapseOnSelect
      expand="md"
      variant="dark"
      className={classes.Toolbar}
      fixed="top"
    >
      <FaBars
        onClick={() => {}}
        size="1.2rem"
        color="white"
      ></FaBars>

      <Navbar.Brand
        href="/"
        style={{ textDecoration: "none", display: "flex" }}
      >
        <div style={{ padding: "0px 40px" }}>Charlie - Admin Portal</div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    </Navbar>
  );
};

export default withRouter(navbar);
