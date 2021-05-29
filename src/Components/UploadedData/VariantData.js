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
import { FaPen, FaTrash } from "react-icons/fa";
import { projectFirestore } from "../../firebase/config";
import VariantEdit from "../EditForms/VariantEdit";

const VariantData = () => {
  const [docs, setDocs] = useState([]);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedProduct, setProduct] = useState(null);
  const [variantList, setVariantList] = useState(null);
  const [selectedVariant, setVariant] = useState(null);

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
        setProduct(documents[0]);
        setLoading(false);
      });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (selectedProduct !== null) {
      setLoading(true);
      const unsub = projectFirestore
        .collection("products")
        .doc(selectedProduct.id)
        .collection("variants")
        .onSnapshot((snap) => {
          let documents = [];
          snap.forEach((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
          });
          setVariantList(documents);
          setLoading(false);
        });
      return () => unsub();
    }
  }, [selectedProduct]);

  const deleteProduct = () => {
    setLoading(true);
    setDeleteModal(false);
    projectFirestore
      .collection("products")
      .doc(selectedProduct.id)
      .collection("variants")
      .doc(selectedVariant.id)
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
      <Modal {...props} size="lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Variant
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VariantEdit
            choosenProduct={selectedProduct}
            choosenVariant={selectedVariant}
            onSave={closeEditModal}
          ></VariantEdit>
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
            <Form className="form">
              <Form.Group controlId="product">
                <Form.Label>Select Product</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={
                    selectedProduct && selectedProduct.product.productName
                  }
                  onChange={(event) => {
                    docs.forEach((prod) => {
                      if (prod.product.productName === event.target.value) {
                        setProduct(prod);
                      }
                      console.log(variantList);
                    });
                  }}
                >
                  {docs.map((doc) => (
                    <option key={doc.id}>{doc.product.productName}</option>
                  ))}
                </Form.Control>
              </Form.Group>{" "}
            </Form>
            {variantList && (
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Size</th>
                    <th>Color Name</th>
                    <th>Color Code</th>
                    <th>Cost Price</th>
                    <th>Selling Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {variantList.map((doc, index) => (
                    <tr key={doc.id}>
                      <td>{index + 1}</td>
                      <td>{doc.variant.size}</td>
                      <td>{doc.variant.colorName}</td>
                      <td>{doc.variant.colorCode}</td>
                      <td>{doc.variant.costPrice}</td>
                      <td>{doc.variant.sellingPrice}</td>
                      <td>{doc.variant.quantity}</td>
                      <td>
                        <Row className="justify-content-md-center">
                          <Col xs="2">
                            <FaPen
                              size="1rem"
                              color="green"
                              cursor="pointer"
                              onClick={() => {
                                setEditModal(true);

                                variantList.forEach((variant) => {
                                  if (variant.id === doc.id) {
                                    setVariant(variant);
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
                                variantList.forEach((variant) => {
                                  if (variant.id === doc.id) {
                                    setVariant(variant);
                                  }
                                });
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

export default VariantData;
