import React, { useState } from "react";
import { Form, Button, Spinner, Toast } from "react-bootstrap";
import {
  projectFirestore,
  projectStorage,
  timestamp,
} from "../../firebase/config";
import classes from "./EditForm.css";
import imageCompression from "browser-image-compression";
import { motion } from "framer-motion";

const ProductEdit = (props) => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState(null);
  const [loading, loadingStatus] = useState(false);
  const [uploadedImages, setUploadedImages] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [listUrl, seturlList] = useState(null);

  const [showB, setShowB] = useState(false);

  const showToastB = () => {
    setShowB(true);
    setTimeout(() => {
      setShowB(false);
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
    showToastB();
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

      const collectionRef = projectFirestore
        .collection("products")
        .doc(props.doc.id);
      let product = {
        productName: event.target.name.value,
        description: event.target.description.value,
        ImageUrl: listUrl === null ? props.doc.product.ImageUrl : listUrl,
        genderName: props.doc.product.genderName,
        categoryName: props.doc.product.categoryName,
        brandName: props.doc.product.brandName,
        Date: timestamp(),
      };
      collectionRef.update({ product });
      setLoading(false);
      setImages(null);
      setUploadedImages(null);
      setProgress(0);
      form.reset();
      setValidated(false);
      props.onSave();
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
          defaultValue={
            props.doc == null ? "Loading" : props.doc.product.productName
          }
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
          defaultValue={
            props.doc == null ? "Loading" : props.doc.product.description
          }
        />
        <Form.Control.Feedback type="invalid">
          Please enter a product description.
        </Form.Control.Feedback>
      </Form.Group>
      <label
        className={classes.customfileinputMultiple}
        style={{ height: "35px" }}
      >
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
          disabled={isLoading || images === null}
          onClick={handleSubmit}
          className={classes.Button}
          style={{
            marginBottom: showB ? "0px" : "20px",
            marginRight: "20px",
          }}
        >
          {isLoading ? "Loading…" : "Upload Images"}
        </Button>
        <Button
          size="sm"
          variant="success"
          type="submit"
          disabled={isLoading}
          className={classes.Button}
          style={{
            marginBottom: showB ? "0px" : "20px",
            marginRight: "20px",
          }}
        >
          {isLoading ? "Loading…" : "Submit"}
        </Button>
      </div>
      {showB && (
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
            <Toast.Body>Images Uploaded Successfully!</Toast.Body>
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

export default ProductEdit;
