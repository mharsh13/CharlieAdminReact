import React from "react";
import classes from "./Sidebar.css";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaEnvelope,
  FaVenusMars,
  FaThLarge,
  FaStar,
  FaFlag,
  FaTshirt,
  FaShoppingCart,
  FaImage,
  FaUserAlt,
} from "react-icons/fa";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const { location } = props;
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
        }}
      ></hr>
      <Container style={{ marginTop: "20px" }}>
        <Link to="/">
          <Row
            className="justify-content-md-center"
            style={{ paddingLeft: "20px", paddingBottom: "10px" }}
          >
            <Col md="auto">
              <FaThLarge
                size="1.2rem"
                color={location.pathname === "/" ? "#fdae26" : "white"}
                style={{ cursor: "pointer" }}
              />
            </Col>
            <Col>
              <div
                style={{
                  cursor: "pointer",
                  color: location.pathname === "/" ? "#fdae26" : "white",
                }}
              >
                Dashboard
              </div>
            </Col>
          </Row>
        </Link>
        <Link to="/gender">
          <Row
            className="justify-content-md-center"
            style={{ paddingLeft: "20px", paddingBottom: "10px" }}
          >
            <Col md="auto">
              <FaVenusMars
                size="1.2rem"
                color={location.pathname === "/gender" ? "#fdae26" : "white"}
                style={{ cursor: "pointer" }}
              />
            </Col>
            <Col>
              <div
                style={{
                  cursor: "pointer",
                  color: location.pathname === "/gender" ? "#fdae26" : "white",
                }}
              >
                Male/Female
              </div>
            </Col>
          </Row>
        </Link>
        <Link to="/categories">
          <Row
            className="justify-content-md-center"
            style={{ paddingLeft: "20px", paddingBottom: "10px" }}
          >
            <Col md="auto">
              <FaStar
                size="1.2rem"
                color={
                  location.pathname === "/categories" ? "#fdae26" : "white"
                }
                style={{ cursor: "pointer" }}
              />
            </Col>
            <Col>
              <div
                style={{
                  cursor: "pointer",
                  color:
                    location.pathname === "/categories" ? "#fdae26" : "white",
                }}
              >
                Categories
              </div>
            </Col>
          </Row>
        </Link>

        <Row
          className="justify-content-md-center"
          style={{ paddingLeft: "20px", paddingBottom: "10px" }}
        >
          <Col md="auto">
            <FaFlag
              size="1.2rem"
              color={location.pathname === "/brands" ? "#fdae26" : "white"}
              style={{ cursor: "pointer" }}
            />
          </Col>
          <Col>
            <div
              style={{
                cursor: "pointer",
                color: location.pathname === "/brands" ? "#fdae26" : "white",
              }}
            >
              Brands
            </div>
          </Col>
        </Row>
        <Row
          className="justify-content-md-center"
          style={{ paddingLeft: "20px", paddingBottom: "10px" }}
        >
          <Col md="auto">
            <FaTshirt
              size="1.2rem"
              color={location.pathname === "/products" ? "#fdae26" : "white"}
              style={{ cursor: "pointer" }}
            />
          </Col>
          <Col>
            <div
              style={{
                cursor: "pointer",
                color: location.pathname === "/products" ? "#fdae26" : "white",
              }}
            >
              Products
            </div>
          </Col>
        </Row>
        <hr
          style={{
            backgroundColor: "white",
            margin: "0px 0px 10px 0px",
          }}
        ></hr>
        <Row
          className="justify-content-md-center"
          style={{ paddingLeft: "20px", paddingBottom: "10px" }}
        >
          <Col md="auto">
            <FaShoppingCart
              size="1.2rem"
              color={location.pathname === "/orders" ? "#fdae26" : "white"}
              style={{ cursor: "pointer" }}
            />
          </Col>
          <Col>
            <div
              style={{
                cursor: "pointer",
                color: location.pathname === "/orders" ? "#fdae26" : "white",
              }}
            >
              Orders
            </div>
          </Col>
        </Row>
        <Row
          className="justify-content-md-center"
          style={{ paddingLeft: "20px", paddingBottom: "10px" }}
        >
          <Col md="auto">
            <FaImage
              size="1.2rem"
              color={location.pathname === "/banners" ? "#fdae26" : "white"}
              style={{ cursor: "pointer" }}
            />
          </Col>
          <Col>
            <div
              style={{
                cursor: "pointer",
                color: location.pathname === "/banners" ? "#fdae26" : "white",
              }}
            >
              Banners
            </div>
          </Col>
        </Row>
        <Row
          className="justify-content-md-center"
          style={{ paddingLeft: "20px", paddingBottom: "10px" }}
        >
          <Col md="auto">
            <FaUserAlt
              size="1.2rem"
              color={location.pathname === "/users" ? "#fdae26" : "white"}
              style={{ cursor: "pointer" }}
            />
          </Col>
          <Col>
            <div
              style={{
                cursor: "pointer",
                color: location.pathname === "/users" ? "#fdae26" : "white",
              }}
            >
              User Manangement
            </div>
          </Col>
        </Row>
        <Row
          className="justify-content-md-center"
          style={{ paddingLeft: "20px", paddingBottom: "10px" }}
        >
          <Col md="auto">
            <FaEnvelope
              size="1.2rem"
              color={location.pathname === "/chats" ? "#fdae26" : "white"}
              style={{ cursor: "pointer" }}
            />
          </Col>
          <Col>
            <div
              style={{
                cursor: "pointer",
                color: location.pathname === "/chats" ? "#fdae26" : "white",
              }}
            >
              Customer Messages
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(Sidebar);
