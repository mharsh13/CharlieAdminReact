/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Form ,Button,Spinner} from "react-bootstrap";
import { projectFirestore } from "../../firebase/config";
import classes from "./UploadForm.css";
import imageCompression from "browser-image-compression";
import { motion } from "framer-motion";

const ProductUpload = () => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [genderList, setGenderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [loading, loadingStatus] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [progress, setProgress] = useState(0);

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

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleChange = (e) => {
    loadingStatus(true);
    if (e.target.files[0]) {
      var imageFile = e.target.files[0];
      var options = {
        maxSizeMB: 0.01,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
      };
      imageCompression(imageFile, options)
        .then(function (compressedFile) {
          loadingStatus(false);
          return setImage(compressedFile);
        })
        .catch(function (error) {
          console.log(error.message);
        });
      setUploadedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Form
      noValidate
      validated={validated}
      className="form"
      onSubmit={handleSubmit}
    >
      <Form.Group controlId="name">
        <Form.Label>Enter Product Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          required
          className={classes.Form}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a product name.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Enter Product Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter Description"
          required
          className={classes.Form}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a product description.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="gender">
        <Form.Label>Select Gender</Form.Label>
        <Form.Control as="select">
          {genderList.map((doc) => (
            <option key={doc.id}>{doc.gender.GenderName}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="category">
        <Form.Label>Select Category</Form.Label>
        <Form.Control as="select">
          {categoryList.map((doc) => (
            <option key={doc.id}>{doc.category.CategoryName}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="brand">
        <Form.Label>Select Brand</Form.Label>
        <Form.Control as="select">
          {brandList.map((doc) => (
            <option key={doc.id}>{doc.brand.BrandName}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <label className={classes.customfileinput} style={{ height: "35px" }}>
        <input
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleChange}
        />
      </label>
      {loading ? (
        <div style={{ marginBottom: "30px", marginTop: "20px" }}>
          <Spinner animation="border" variant="info" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div></div>
      )}
      {image && (
        <div>
          <img
            src={uploadedImage}
            alt="uploaded"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              marginBottom: "20px",
            }}
          ></img>
        </div>
      )}
      {progress !== 0 && (
        <motion.div
          className={classes.ProgressBar}
          initial={{ width: 0 }}
          animate={{ width: progress + "%" }}
        ></motion.div>
      )}

      <div>
        <Button
          size="sm"
          variant="success"
          type="submit"
          disabled={isLoading}
          className={classes.Button}
        >
          {isLoading ? "Loading…" : "Submit"}
        </Button>
      </div>

    </Form>
  );
};

export default ProductUpload;
