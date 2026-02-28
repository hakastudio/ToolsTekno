import React from "react";
import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Tools Tekno</title>
        <meta name="description" content="Read the privacy policy of Tools Tekno, explaining how we handle your data." />
      </Head>
      <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Privacy Policy</h1>
        <section style={{ marginBottom: "1.5rem" }}>
          <p>We respect your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, and safeguard information.</p>
          <h2>Information We Collect</h2>
          <ul>
            <li>Personal details you provide when contacting us.</li>
            <li>Technical data such as IP address, browser type, and usage statistics.</li>
          </ul>
          <h2>How We Use Data</h2>
          <ul>
            <li>To respond to inquiries and provide support.</li>
            <li>To improve our services and website performance.</li>
            <li>To comply with legal obligations.</li>
          </ul>
          <h2>Data Sharing</h2>
          <p>We do not sell or rent your personal information to third parties. Data may be shared with service providers only as necessary to operate the site.</p>
          <h2>Your Rights</h2>
          <p>You may request access, correction, or deletion of your personal data by contacting us via the Contact Us page.</p>
        </section>
      </main>
    </>
  );
}
