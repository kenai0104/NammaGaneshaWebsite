import React from "react";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        For any enquiries, please contact:{" "}
        <span style={styles.link}>nammartbganesha@gmail.com</span> |{" "}
        <span style={styles.link}>Privacy Policy</span> |{" "}
        <span style={styles.link}>Terms & Conditions</span> |{" "}
        <span>© {new Date().getFullYear()} NammaRTB Ganesha. All rights reserved.</span>
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#F6E4A5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60px",
    borderTop: "1px solid #656565ff",
    fontSize: "14px",
    color: "#444",
    fontFamily: "'Space Grotesk', sans-serif",
    padding: "0 20px",
  },
  text: {
    margin: 0,
    textAlign: "center",
    lineHeight: "1.6",
  },
  link: {
    color: "#d62828",
    textDecoration: "none",
    fontWeight: "500",
    margin: "0 5px",
    cursor: "default", // makes it clear it's not clickable
  },
};
