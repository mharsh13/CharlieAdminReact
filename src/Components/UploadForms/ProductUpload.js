/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Spinner, Toast } from "react-bootstrap";
import {
  projectFirestore,
  projectStorage,
  timestamp,
} from "../../firebase/config";
import classes from "./UploadForm.css";
import imageCompression from "browser-image-compression";
import { motion } from "framer-motion";

const ProductUpload = () => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [loading, loadingStatus] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [listUrl, seturlList] = useState([]);

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

  const [showA, setShowA] = useState(false);

  const showToast = () => {
    setShowA(true);
    setTimeout(() => {
      setShowA(false);
    }, 3000);
  };

  const handleSubmit = () => {
    setLoading(true);
    let urlList = [];

    images.forEach((image) => {
      const uploadTask = projectStorage
        .ref(`Products/${image.name}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (error) => {
          console.log(error);
          setError(true);
        },
        () => {
          projectStorage
            .ref("Products")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              urlList.push(url);
              setProgress(0);
            });
        }
      );
    });
    seturlList(urlList);
    setLoading(false);
  };

  async function uploadProduct(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      event.preventDefault();
      setLoading(true);

      const collectionRef = projectFirestore.collection("products");
      let product = {
        productName: event.target.name.value,
        description: event.target.description.value,
        ImageUrl: listUrl,
        genderName: event.target.gender.value,
        categoryName: event.target.category.value,
        brandName: event.target.brand.value,
        Date: timestamp(),
      };
      await collectionRef.add({ product });
      setLoading(false);
      setImages([]);
      setUploadedImages([]);
      seturlList([]);
      setProgress(0);
      showToast();
      setValidated(false);
    }
    setValidated(true);
  }

  async function handleChange(e) {
    loadingStatus(true);
    let imageList = [];
    let uploadedImageList = [];
    if (e.target.files) {
      for (var i = 0; i < e.target.files.length; i++) {
        var imageFile = e.target.files[i];
        var options = {
          maxSizeMB: 0.01,
          maxWidthOrHeight: 1080,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(imageFile, options);
        imageList.push(compressedFile);
        uploadedImageList.push(URL.createObjectURL(e.target.files[i]));
      }
    }
    setUploadedImages(uploadedImageList);
    setImages(imageList);
    loadingStatus(false);
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <Form
      noValidate
      validated={validated}
      className="form"
      onSubmit={uploadProduct}
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
          multiple
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
      {images && (
        <div>
          {uploadedImages.map((uploadedImage) => (
            <img
              key={uploadedImage}
              src={uploadedImage}
              alt="uploaded"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                marginBottom: "30px",
                marginRight: "30px",
              }}
            ></img>
          ))}
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
          disabled={isLoading}
          onClick={handleSubmit}
          className={classes.Button}
          style={{ marginBottom: showA ? "0px" : "20px", marginRight: "20px" }}
        >
          {isLoading ? "Loading…" : "Upload Images"}
        </Button>
        <Button
          size="sm"
          variant="success"
          type="submit"
          disabled={isLoading}
          className={classes.Button}
          style={{ marginBottom: showA ? "0px" : "20px", marginRight: "20px" }}
        >
          {isLoading ? "Loading…" : "Submit"}
        </Button>
      </div>

      <div></div>

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
      {error && (
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
            <Toast.Body>Error uploading task! Please try again...</Toast.Body>
          </Toast>
        </motion.div>
      )}
    </Form>
  );
};

export default ProductUpload;
