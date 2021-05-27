import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Modal, Button } from "react-bootstrap";
import { projectFirestore } from "../../firebase/config";

const GenderData = () => {
  const [docs, setDocs] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("gender")
      .orderBy("gender.Date", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });
    return () => unsub();
  }, []);

  const deleteCategory = () => {
    projectFirestore
      .collection("gender")
      .doc(deleteId)
      .delete()
      .then((res) => {
        setModalShow(false);
      });
  };

  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this category and all its content?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteCategory} variant="danger" size="sm">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Container style={{ marginLeft: "0px", maxWidth: "100%" }}>
      <Row>
        {docs.map((doc) => (
          <Col xs={12} md={4} sm={6} key={doc.id}>
            <motion.div layout>
              <Card style={{ margin: "10px" }} className="text-right">
                <Card.Img
                  variant="top"
                  src={doc.gender.ImageUrl}
                  style={{ height: "150px", objectFit: "cover" }}
                />

                <Card.Body>
                  <Card.Title className="text-left">
                    {doc.gender.GenderName}
                  </Card.Title>
                  <Card.Link
                    onClick={() => {}}
                    style={{
                      color: "green",
                      textDecoration: "none",
                      cursor: "pointer",
                      textAlign: "right",
                    }}
                  >
                    EDIT
                  </Card.Link>
                  <Card.Link
                    onClick={() => {
                      setModalShow(true);
                      setDeleteId(doc.id);
                    }}
                    style={{
                      color: "red",
                      textDecoration: "none",
                      cursor: "pointer",
                      textAlign: "right",
                    }}
                  >
                    DELETE
                  </Card.Link>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Container>
  );
};

export default GenderData;
