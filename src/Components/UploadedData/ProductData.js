/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Table,
  Spinner,
} from "react-bootstrap";
import { FaPen, FaTrash } from "react-icons/fa";
import { projectFirestore } from "../../firebase/config";
import ProductEdit from "../EditForms/ProductEdit";

const ProductData = () => {
  const [docs, setDocs] = useState([]);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [selectedProduct, setProduct] = useState(null);
  const [genderList, setGenderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);

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
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc, index) => (
                <tr key={doc.id}>
                  <td>{index + 1}</td>
                  <td>{doc.product.productName}</td>
                  <td>{doc.product.genderName}</td>
                  <td>{doc.product.categoryName}</td>
                  <td>{doc.product.brandName}</td>
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
