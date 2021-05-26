import React, { useState } from "react";
import { Form, Button, Spinner, Toast } from "react-bootstrap";
import imageCompression from "browser-image-compression";
import classes from "./UploadForm.css";
import { motion } from "framer-motion";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../../firebase/config";

const CategoryUpload = () => {
  const [validated, setValidated] = useState(false);
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, loadingStatus] = useState(false);

  const [progress, setProgress] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      setValidated(true);
      event.preventDefault();
      setLoading(true);
      const collectionRef = projectFirestore.collection("categories");
      const uploadTask = projectStorage
        .ref(`Category/${image.name}`)
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
            .ref("Category")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              const category = {
                CategoryName: event.target.name.value,
                ImageUrl: url,
                Date: timestamp(),
              };
              collectionRef.add({ category });
              setLoading(false);
              setImage(null);
              setUploadedImage(null);
              setProgress(0);
              showToast();
              form.reset();
              setValidated(false);
            });
        }
      );
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

  const [showA, setShowA] = useState(false);

  const showToast = () => {
    setShowA(true);
    setTimeout(() => {
      setShowA(false);
    }, 3000);
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <Form
      noValidate
      validated={validated}
      className="form"
      onSubmit={!isLoading ? handleSubmit : null}
    >
      <Form.Group controlId="name">
        <Form.Label>Enter Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          required
          className={classes.Form}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a category name.
        </Form.Control.Feedback>
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
            <Toast.Body>Category Uploaded Successfully!</Toast.Body>
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

export default CategoryUpload;
