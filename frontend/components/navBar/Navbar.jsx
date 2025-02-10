"use client";

import UserProfile from "../userProfile/UserProfile";
import styles from "./navbar.module.css";
import Image from "next/image";
import { useState } from "react";
import InfoWizard from "../InfoWizard/InfoWizard";

const Navbar = () => {
  const [openHelpModal, setOpenHelpModal] = useState(false);
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src="/assets/logo.png" alt="Logo" width={200} height={40} />{" "}
      </div>
      <InfoWizard
          open={openHelpModal}
          setOpen={setOpenHelpModal}
          tooltipText="Tell me more!"
          iconGlyph="Wizard"
          sections={[
            {
              heading: "Instructions and Talk Track",
              content: [
                {
                  heading: "Image Search",
                  body: "Claim adjustment is slow and error-prone, requiring adjusters to manually search past claims and guidelines across multiple systems. In a car accident scenario, the adjuster traditionally reviews past cases to estimate damages. With a vector database, AI can instantly retrieve similar accident images from claim history, enabling faster and more accurate assessments.",
                },
                {
                  heading: "How to Demo",
                  body: [
                          "Drag and drop the image of a car in the box (you can download the one below).",
                          "Press 'Upload Photo'.",
                          "Under 'Similar Claims' you can see the results of the Vector Search, similar images and the related fields."
                  ],
                },
                {
                  image: {
                    src: "assets/68.jpg",
                    alt: "reference image",
                  },
                },
              ],
            },
            {
              heading: "Behind the Scenes",
              content: [
                {
                  heading: "Data Flow",
                  body: "This section explains how data moves through the system, from ingestion to query execution.",
                  images: [
                    {
                      src: "assets/ingest.png",
                      alt: "Ingest Architecture",
                    },
                    {
                      src: "assets/query.png",
                      alt: "Query Architecture",
                    },
                  ],
                },
              ],
            },
            {
              heading: "Why MongoDB?",
              content: [
                {
                  heading: "Operational and Vector database combined",
                  body: "MongoDB stores vectors alongside operational data, eliminating the need to having two separate solutions. Enabling features such as pre-filtering.",
                        
                },
                {
                  heading: "Performance",
                  body: "MongoDB's Vector Search is extremely fast at retrieving vectors.",
                        
                },
              ],
            },
          ]}
        />
      <div className={styles.user}>
        <UserProfile />
      </div>
    </nav>
  );
};

export default Navbar;
