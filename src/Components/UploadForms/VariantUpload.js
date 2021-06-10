import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import { projectFirestore } from "../../firebase/config";
import classes from "./UploadForm.css";

const VariantUpload = () => {
  const [isLoading, setLoading] = useState(false);
  const [alldocs, setAllDocs] = useState([]);
  const [validated, setValidated] = useState(false);
  const [productList, setProductList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsub = projectFirestore
      .collection("gender")
      .orderBy("gender.Date", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setGenderList(documents);
        setLoading(false);
      });

    return () => unsub();
  }, []);

  useEffect(() => {
    setLoading(true);
    const unsub = projectFirestore
      .collection("categories")
      .orderBy("category.Date", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setCategoryList(documents);
        setLoading(false);
      });
    return () => unsub();
  }, []);

  useEffect(() => {
    setLoading(true);
    const unsub = projectFirestore
      .collection("brands")
      .orderBy("brand.Date", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setBrandList(documents);
        setLoading(false);
      });
    return () => unsub();
  }, []);

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
        setAllDocs(documents);
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
      await collectionRef.add({ variant }).then(() => {
        form.reset();
        setValidated(false);
        setLoading(false);
        window.location.reload();
      });
    }
    setValidated(true);
  }

  return (
    <Container>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Container fluid>
          <Form id="form">
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group controlId="gender">
                  <Form.Control
                    as="select"
                    onChange={(event) => {
                      setSelectedGender(event.target.value);
                    }}
                  >
                    <option defaultValue style={{ display: "none" }}>
                      Select Gender
                    </option>
                    {genderList.map((doc) => (
                      <option key={doc.id}>{doc.gender.GenderName}</option>
                    ))}
                  </Form.Control>
                </Form.Group>{" "}
              </Col>
              <Col>
                <Form.Group controlId="category">
                  <Form.Control
                    as="select"
                    onChange={(event) => {
                      setSelectedCategory(event.target.value);
                    }}
                  >
                    <option defaultValue style={{ display: "none" }}>
                      Select Category
                    </option>
                    {categoryList.map((doc) => (
                      <option key={doc.id}>{doc.category.CategoryName}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="brand">
                  <Form.Control
                    as="select"
                    onChange={(event) => {
                      setSelectedBrand(event.target.value);
                    }}
                  >
                    <option defaultValue style={{ display: "none" }}>
                      Select Brand
                    </option>
                    {brandList.map((doc) => (
                      <option key={doc.id}>{doc.brand.BrandName}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Container fluid style={{ textAlign: "right" }}>
              <Button
                size="sm"
                variant="success"
                onClick={() => {
                  var temp1 = [];
                  var temp2 = [];
                  var temp3 = [];
                  if (selectedBrand == null) {
                    temp1 = alldocs;
                  } else {
                    alldocs.forEach((doc) => {
                      if (doc.product.brandName === selectedBrand) {
                        temp1.push(doc);
                      }
                    });
                  }
                  if (selectedGender == null) {
                    temp2 = alldocs;
                  } else {
                    alldocs.forEach((doc) => {
                      if (doc.product.genderName === selectedGender) {
                        temp2.push(doc);
                      }
                    });
                  }
                  if (selectedCategory == null) {
                    temp3 = alldocs;
                  } else {
                    alldocs.forEach((doc) => {
                      if (doc.product.categoryName === selectedCategory) {
                        temp3.push(doc);
                      }
                    });
                  }
                  var arrays = [temp1, temp2, temp3];
                  var result = arrays.shift().reduce(function (res, v) {
                    if (
                      res.indexOf(v) === -1 &&
                      arrays.every(function (a) {
                        return a.indexOf(v) !== -1;
                      })
                    )
                      res.push(v);
                    return res;
                  }, []);

                  setProductList(result);
                }}
                style={{
                  marginBottom: "20px",
                  marginRight: "20px",
                  width: "140px",
                }}
              >
                Filter
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => {
                  setSelectedBrand(null);
                  setProductList(alldocs);
                  setSelectedCategory(null);
                  setSelectedGender(null);
                  document.getElementById("form").reset();
                }}
                style={{
                  marginBottom: "20px",
                  width: "140px",
                }}
              >
                Remove Filter
              </Button>
            </Container>
          </Form>
          <Form
            noValidate
            validated={validated}
            className="form"
            id="form2"
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
          </Form>
        </Container>
      )}
    </Container>
  );
};

export default VariantUpload;
