import React, { useState } from "react";
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
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = (props) => {
  const [showProducts, setshowProducts] = useState(false);
  const { location } = props;
  let attachedClass = [classes.Sidebar, classes.Close];
  if (props.open) {
    attachedClass = [classes.Sidebar, classes.Open];
  } else {
    attachedClass = [classes.Sidebar, classes.Close];
  }

  const variants = {
    visible: { y: 0 },
    hidden: { y: -100 },
  };

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
        <Link to="/brands">
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
        </Link>

        <Row
          className="justify-content-md-center"
          style={{ paddingLeft: "20px", paddingBottom: "10px" }}
          onClick={() => {
            setshowProducts(!showProducts);
          }}
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
                color: "white",
              }}
            >
              Products
            </div>
          </Col>
          {showProducts ? (
            <motion.div animate={{ rotate: -180 }}>
              <Col md="auto">
                <FaChevronDown
                  size="1rem"
                  color="white"
                  style={{ cursor: "pointer" }}
                />
              </Col>
            </motion.div>
          ) : (
            <motion.div animate={{ rotate: 180 }}>
              <Col md="auto">
                <FaChevronUp
                  size="1rem"
                  color="white"
                  style={{ cursor: "pointer" }}
                />
              </Col>
            </motion.div>
          )}
        </Row>

        {showProducts && (
          <motion.div initial="hidden" animate="visible" variants={variants}>
            <Link to="/addproducts">
              <Row
                className="justify-content-md-center"
                style={{ paddingLeft: "60px", paddingBottom: "8px" }}
              >
                <Col md="auto">
                  <div
                    style={{
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      color:
                        location.pathname === "/addproducts"
                          ? "#fdae26"
                          : "white",
                    }}
                  >
                    Add Products
                  </div>
                </Col>
              </Row>
            </Link>
            <Link to="/editproducts">
              <Row
                className="justify-content-md-center"
                style={{ paddingLeft: "60px", paddingBottom: "8px" }}
              >
                <Col md="auto">
                  <div
                    style={{
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      color:
                        location.pathname === "/editproducts"
                          ? "#fdae26"
                          : "white",
                    }}
                  >
                    Edit Products
                  </div>
                </Col>
              </Row>
            </Link>
            <Link to="/addvariants">
              <Row
                className="justify-content-md-center"
                style={{ paddingLeft: "60px", paddingBottom: "8px" }}
              >
                <Col md="auto">
                  <div
                    style={{
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      color:
                        location.pathname === "/addvariants"
                          ? "#fdae26"
                          : "white",
                    }}
                  >
                    Add Variants
                  </div>
                </Col>
              </Row>
            </Link>
            <Link to="/editvariants">
              <Row
                className="justify-content-md-center"
                style={{ paddingLeft: "60px", paddingBottom: "8px" }}
              >
                <Col md="auto">
                  <div
                    style={{
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      color:
                        location.pathname === "/editvariants"
                          ? "#fdae26"
                          : "white",
                    }}
                  >
                    Edit Variants
                  </div>
                </Col>
              </Row>
            </Link>
          </motion.div>
        )}

        <hr
          style={{
            backgroundColor: "white",
            margin: "0px 0px 10px 0px",
          }}
        ></hr>

        <Link to="/orders">
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
        </Link>
        <Link to="/banners">
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
        </Link>
        <Link to="/users">
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
        </Link>
        <Link to="/chats">
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
        </Link>
      </Container>
    </div>
  );
};

export default withRouter(Sidebar);
