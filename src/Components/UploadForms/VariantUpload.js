import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Spinner,
  Toast,
} from "react-bootstrap";
import { projectFirestore } from "../../firebase/config";
import classes from "./UploadForm.css";
import { motion } from "framer-motion";

const VariantUpload = () => {
  const [isLoading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setLoading(true);
    const unsub = projectFirestore
      .collection("products")
      .orderBy("product.Date", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setProductList(documents);
        setLoading(false);
      });
    return () => unsub();
  }, []);

  async function uploadVariant(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      setValidated(true);
      event.preventDefault();
      setLoading(true);
      let id;
      productList.forEach((prod) => {
        if (prod.product.productName === event.currentTarget.product.value) {
          id = prod.id;
        }
      });
      const collectionRef = projectFirestore
        .collection("products")
        .doc(id)
        .collection("variants");
      let variant = {
        size: event.currentTarget.size.value,
        colorName: event.currentTarget.colorName.value,
        colorCode: event.currentTarget.colorCode.value,
        costPrice: event.currentTarget.costPrice.value,
        sellingPrice: event.currentTarget.sellingPrice.value,
        quantity: event.currentTarget.quantity.value,
      };
      await collectionRef.add({ variant });
      showToast();
      setLoading(false);
    }
    setValidated(true);
  }

  const [showA, setShowA] = useState(false);

  const showToast = () => {
    setShowA(true);
    setTimeout(() => {
      window.location.reload();
      setShowA(false);
    }, 2000);
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <Container>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Form
          noValidate
          validated={validated}
          className="form"
          onSubmit={uploadVariant}
        >
          <Form.Group controlId="product">
            <Form.Label>Select Product</Form.Label>
            <Form.Control as="select">
              {productList.map((doc) => (
                <option key={doc.id}>{doc.product.productName}</option>
              ))}
            </Form.Control>
          </Form.Group>{" "}
          <Row className="justify-content-md-center">
            <Col>
              <Form.Group controlId="size">
                <Form.Label>Enter Size</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Size"
                  required
                  className={classes.Form}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a size.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="colorName">
                <Form.Label>Enter Color Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Color Name"
                  required
                  className={classes.Form}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a color name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="colorCode">
                <Form.Label>Enter Color Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Color Code"
                  required
                  className={classes.Form}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a color code.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col>
              <Form.Group controlId="costPrice">
                <Form.Label>Enter Cost Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Cost Price"
                  required
                  className={classes.Form}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a cost price.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="sellingPrice">
                <Form.Label>Enter Selling Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Selling Price"
                  required
                  className={classes.Form}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a selling price.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="quantity">
                <Form.Label>Enter Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Quantity"
                  required
                  className={classes.Form}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a quantity.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Button
            size="sm"
            variant="success"
            type="submit"
            disabled={isLoading}
            className={classes.Button}
            style={{
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            {isLoading ? "Loading…" : "Submit"}
          </Button>
          {showA && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={variants}
              aria-live="polite"
              aria-atomic="true"
              style={{
                position: "relative",
                minHeight: "60px",
              }}
            >
              <Toast
                style={{
                  position: "absolute",
                  top: 20,
                }}
              >
                <Toast.Body>Product Uploaded Successfully!</Toast.Body>
              </Toast>
            </motion.div>
          )}
        </Form>
      )}
    </Container>
  );
};

export default VariantUpload;
