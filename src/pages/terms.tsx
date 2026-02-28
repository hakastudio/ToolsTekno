import React from "react";
import Head from "next/head";

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms and Conditions - Tools Tekno</title>
        <meta name="description" content="Read the Terms and Conditions for using Tools Tekno." />
      </Head>
      <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Terms and Conditions</h1>
        <section style={{ marginBottom: "1.5rem" }}>
          <p>Welcome to Tools Tekno. By accessing or using our website and services, you agree to be bound by the following terms and conditions:</p>
          <ol>
            <li><strong>Use of Service:</strong> You may use the service for lawful purposes only and must not violate any applicable laws.</li>
            <li><strong>Intellectual Property:</strong> All content, designs, and code provided by Tools Tekno remain the intellectual property of their respective owners.</li>
            <li><strong>Limitation of Liability:</strong> Tools Tekno is not liable for any indirect, incidental, or consequential damages arising from use of the service.</li>
            <li><strong>Changes to Terms:</strong> We reserve the right to modify these terms at any time. Continued use constitutes acceptance of the updated terms.</li>
            <li><strong>Contact:</strong> For any questions regarding these terms, please contact us via the Contact Us page.</li>
          </ol>
        </section>
      </main>
    </>
  );
}
