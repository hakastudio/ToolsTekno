import React from "react";
import Head from "next/head";

export default function ContactUs() {
  return (
    <>
      <Head>
        <title>Contact Us - Tools Tekno</title>
        <meta name="description" content="Get in touch with Tools Tekno. Send us a message via the contact form." />
      </Head>
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Contact Us</h1>
      <p style={{ marginBottom: "1.5rem" }}>
        We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out using the form below.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Placeholder: handle form submission as needed.
          alert("Thank you for your message!");
        }}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <label>
          Name:
          <input type="text" name="name" required style={{ width: "100%", padding: "0.5rem" }} />
        </label>
        <label>
          Email:
          <input type="email" name="email" required style={{ width: "100%", padding: "0.5rem" }} />
        </label>
        <label>
          Message:
          <textarea name="message" rows={5} required style={{ width: "100%", padding: "0.5rem" }} />
        </label>
        <button type="submit" style={{ padding: "0.75rem 1.5rem", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Send Message
        </button>
      </form>
    </main>
    </>
  );
}
