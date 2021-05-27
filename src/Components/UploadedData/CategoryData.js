import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Modal,
  Button,
  Spinner,
} from "react-bootstrap";
import { projectFirestore } from "../../firebase/config";
import CategoryEdit from "../EditForms/CategoryEdit";

const CategoryData = () => {
  const [docs, setDocs] = useState([]);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [selectedCategory,setCategory]=useState(null);

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
        setDocs(documents);
        setLoading(false);
      });
    return () => unsub();
  }, []);

  const deleteCategory = () => {
    setLoading(true);
    setDeleteModal(false);
    projectFirestore
      .collection("categories")
      .doc(selectedId)
      .delete()
      .then((res) => {
        setLoading(false);
      });
  };

  const closeEditModal=()=>{
      setEditModal(false);
  }

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
            Edit Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryEdit doc={selectedCategory} onSave={closeEditModal}></CategoryEdit>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <Container style={{ marginLeft: "0px", maxWidth: "100%" }}>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Row>
          {docs.map((doc) => (
            <Col xs={12} md={4} sm={6} key={doc.id}>
              <motion.div layout>
                <Card style={{ margin: "10px" }} className="text-right">
                  <Card.Img
                    variant="top"
                    src={doc.category.ImageUrl}
                    style={{ height: "150px", objectFit: "cover" }}
                  />

                  <Card.Body>
                    <Card.Title className="text-left">
                      {doc.category.CategoryName}
                    </Card.Title>
                    <Card.Link
                      onClick={() => {
                        setEditModal(true);
                        setSelectedId(doc.id);

                        docs.forEach((cat)=>{
                            if(cat.id===doc.id){
                                setCategory(cat);
                            }
                        })
                      }}
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
                        setDeleteModal(true);
                        setSelectedId(doc.id);
                        
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
      )}

      <DeleteModal
        show={showDeleteModal}
        onHide={() => setDeleteModal(false)}
      />
      <EditModal show={showEditModal} onHide={() => setEditModal(false)} />
    </Container>
  );
};

export default CategoryData;
