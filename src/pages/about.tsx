import React from "react";
import Head from "next/head";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us - Tools Tekno</title>
        <meta name="description" content="Learn more about Tools Tekno, our mission, and the team behind the project." />
      </Head>
      <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>About Us</h1>
        <section style={{ marginBottom: "1.5rem" }}>
          <p>Tools Tekno is a platform dedicated to providing high‑quality technical tools and resources for developers.</p>
          <p>Our mission is to empower developers with intuitive, well‑designed utilities that enhance productivity and foster innovation.</p>
          <p>We are a small team of passionate engineers and designers committed to continuous improvement and open collaboration.</p>
        </section>
      </main>
    </>
  );
}
