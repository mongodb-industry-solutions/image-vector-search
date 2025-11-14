"use client";

import { useState } from "react";
import styles from "./imageSearch.module.css";
import axios from "axios";

const ImageSearch = () => {
  const [droppedImage, setDroppedImage] = useState(null);
  const [showLossAmount, setShowLossAmount] = useState(false);
  const [similarDocs, setSimilarDocs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setDroppedImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    // Use local Next.js API route instead of direct backend call
    const apiUrl = "/api/imageSearch";
    setShowLossAmount(true);
    setLoading(true);

    try {
      const response = await axios.post(
        apiUrl,
        { droppedImage },
        { headers: { "Content-Type": "application/json" } }
      );
      setSimilarDocs(response.data.similar_documents);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
  };

  return (
    <div className={styles.content}>
      <div className={styles.imageSearchSection}>
        <h2>Image Search</h2>
        <div
          className={styles.dragBox}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {droppedImage ? (
            <img
              className={styles.droppedImage}
              src={droppedImage}
              alt="Dropped"
            />
          ) : (
            <p className={styles.dragText}>Drag &amp; Drop your image here</p>
          )}
        </div>
        <button
          className={styles.uploadBtn}
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? <div className={styles.spinner}></div> : "Upload Photo"}
        </button>

        <br></br>

        {showLossAmount && (
          <div className={styles.uploadedImgInfo}>
            <InfoItem title="CustomerID" content="C1234" />
            <InfoItem title="Claim Date" content={formatDate()} />
            <InfoItem
              title="Claim Status"
              content="Active"
              customStyle={styles.statusTag}
            />
            <InfoItem
              title="Loss Amount"
              content="TBD"
              customStyle={styles.lossTbd}
            />
          </div>
        )}
      </div>

      <div className={styles.similarImageSection}>
        <h2>Similar Claims</h2>
        {similarDocs.map((doc, index) => (
          <ReferenceCard key={index} doc={doc} />
        ))}
      </div>
    </div>
  );
};

const InfoItem = ({ title, content, customStyle }) => (
  <div className={styles.info}>
    <p className={styles.fieldTitle}>{title}:</p>
    <p className={`${styles.fieldContent} ${customStyle}`}>{content}</p>
  </div>
);

const ReferenceCard = ({ doc }) => (
  <div className={styles.referenceCards}>
    <div className={styles.imgSection}>
      <img src={`/car-damages/${doc.photo}`} alt="Reference" />
    </div>
    <div className={styles.contentSection}>
      <div className={styles.topRow}>
        <InfoItem title="Customer ID" content={doc.customerID} />
        <InfoItem title="Claim Date" content={doc.claimClosedDate} />
        <InfoItem
          title="Loss Amount"
          content={`$${doc.totalLossAmount}`}
          customStyle={styles.lossAmount}
        />
      </div>
      <div className={styles.lowerSection}>
        <p className={styles.fieldTitle}>Damage Description:</p>
        <p className={styles.fieldContent}>{doc.damageDescription}</p>
      </div>
    </div>
  </div>
);

export default ImageSearch;
