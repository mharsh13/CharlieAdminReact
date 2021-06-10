import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Table,
  Spinner,
  Form,
} from "react-bootstrap";
import { FaSortDown, FaPen, FaTrash, FaSortUp } from "react-icons/fa";
import { projectFirestore } from "../../firebase/config";
import ProductEdit from "../EditForms/ProductEdit";
import { Link } from "react-router-dom";

const ProductData = () => {
  const [docs, setDocs] = useState([]);
  const [alldocs, setAllDocs] = useState([]);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [selectedProduct, setProduct] = useState(null);
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
        setDocs(documents);
        setAllDocs(documents);
        setLoading(false);
      });
    return () => unsub();
  }, []);

  const deleteProduct = () => {
    setLoading(true);
    setDeleteModal(false);
    projectFirestore
      .collection("products")
      .doc(selectedId)
      .delete()
      .then((res) => {
        setLoading(false);
      });
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const DeleteModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this product and all its content?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteProduct} variant="danger" size="sm">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const EditModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductEdit
            doc={selectedProduct}
            onSave={closeEditModal}
          ></ProductEdit>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div>
      <Container style={{ marginLeft: "0px", maxWidth: "100%" }}>
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
                        <option key={doc.id}>
                          {doc.category.CategoryName}
                        </option>
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

                    setDocs(result);
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
                    setDocs(alldocs);
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
            <Table bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <Container>
                      <Row>
                        <Col>Name</Col>
                        <Col md="auto">
                          <FaSortUp
                            color="grey"
                            cursor="pointer"
                            onClick={() => {
                              const myData = []
                                .concat(docs)
                                .sort((a, b) =>
                                  a.product.productName > b.product.productName
                                    ? 1
                                    : -1
                                );
                              setDocs(myData);
                            }}
                          ></FaSortUp>

                          <FaSortDown
                            color="grey"
                            cursor="pointer"
                            onClick={() => {
                              const myData = []
                                .concat(docs)
                                .sort((a, b) =>
                                  b.product.productName > a.product.productName
                                    ? 1
                                    : -1
                                );
                              setDocs(myData);
                            }}
                          ></FaSortDown>
                        </Col>
                      </Row>
                    </Container>
                  </th>
                  <th>
                    {" "}
                    <Container>
                      <Row>
                        <Col>Gender</Col>
                        <Col md="auto">
                          <FaSortUp
                            color="grey"
                            cursor="pointer"
                            onClick={() => {
                              const myData = []
                                .concat(docs)
                                .sort((a, b) =>
                                  a.product.genderName > b.product.genderName
                                    ? 1
                                    : -1
                                );
                              setDocs(myData);
                            }}
                          ></FaSortUp>

                          <FaSortDown
                            color="grey"
                            cursor="pointer"
                            onClick={() => {
                              const myData = []
                                .concat(docs)
                                .sort((a, b) =>
                                  b.product.genderName > a.product.genderName
                                    ? 1
                                    : -1
                                );
                              setDocs(myData);
                            }}
                          ></FaSortDown>
                        </Col>
                      </Row>
                    </Container>
                  </th>
                  <th>
                    {" "}
                    <Container>
                      <Row>
                        <Col>Category</Col>
                        <Col md="auto">
                          <FaSortUp
                            color="grey"
                            cursor="pointer"
                            onClick={() => {
                              const myData = []
                                .concat(docs)
                                .sort((a, b) =>
                                  a.product.categoryName >
                                  b.product.categoryName
                                    ? 1
                                    : -1
                                );
                              setDocs(myData);
                            }}
                          ></FaSortUp>

                          <FaSortDown
                            color="grey"
                            cursor="pointer"
                            onClick={() => {
                              const myData = []
                                .concat(docs)
                                .sort((a, b) =>
                                  b.product.categoryName >
                                  a.product.categoryName
                                    ? 1
                                    : -1
                                );
                              setDocs(myData);
                            }}
                          ></FaSortDown>
                        </Col>
                      </Row>
                    </Container>
                  </th>
                  <th>
                    <Container>
                      <Row>
                        <Col>Brand</Col>
                        <Col md="auto">
                          <FaSortUp
                            color="grey"
                            cursor="pointer"
                            onClick={() => {
                              const myData = []
                                .concat(docs)
                                .sort((a, b) =>
                                  a.product.brandName > b.product.brandName
                                    ? 1
                                    : -1
                                );
                              setDocs(myData);
                            }}
                          ></FaSortUp>

                          <FaSortDown
                            color="grey"
                            cursor="pointer"
                            onClick={() => {
                              const myData = []
                                .concat(docs)
                                .sort((a, b) =>
                                  b.product.brandName > a.product.brandName
                                    ? 1
                                    : -1
                                );
                              setDocs(myData);
                            }}
                          ></FaSortDown>
                        </Col>
                      </Row>
                    </Container>
                  </th>
                  <th>
                    <Container>Action</Container>
                  </th>
                </tr>
              </thead>
              <tbody>
                {docs.map((doc, index) => (
                  <tr key={doc.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link
                        to={{
                          pathname: "/editvariants",
                          state: { product: doc },
                        }}
                        style={{ textDecoration: 'none' }}
                      >
                        <Container>
                          <div style={{ color:"black" }}>
                            {doc.product.productName}
                          </div>
                        </Container>
                      </Link>
                    </td>
                    <td>
                      <Container>{doc.product.genderName}</Container>
                    </td>
                    <td>
                      <Container>{doc.product.categoryName}</Container>
                    </td>
                    <td>
                      <Container>{doc.product.brandName}</Container>
                    </td>
                    <td>
                      <Row className="justify-content-md-center">
                        <Col xs="2">
                          <FaPen
                            size="1rem"
                            color="green"
                            cursor="pointer"
                            onClick={() => {
                              setEditModal(true);
                              setSelectedId(doc.id);

                              docs.forEach((prod) => {
                                if (prod.id === doc.id) {
                                  setProduct(prod);
                                }
                              });
                            }}
                          ></FaPen>
                        </Col>
                        <Col xs="2">
                          <FaTrash
                            size="1rem"
                            color="red"
                            cursor="pointer"
                            onClick={() => {
                              setDeleteModal(true);
                              setSelectedId(doc.id);
                            }}
                          ></FaTrash>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        )}

        <DeleteModal
          show={showDeleteModal}
          onHide={() => setDeleteModal(false)}
        />
        <EditModal show={showEditModal} onHide={() => setEditModal(false)} />
      </Container>
    </div>
  );
};

export default ProductData;
