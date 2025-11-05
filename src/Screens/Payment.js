import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import paymentImg from "../Assets/image7.jpeg";

export default function Payment() {
  return (
    <div className="page">
      <style>{styles}</style>

      <Header />

      {/* Payment Section */}
      <section className="payment-section">
        <div className="payment-container">
          <h2 className="payment-title">Payment</h2>
          <div className="payment-card">
            <div className="payment-media">
              <img src={paymentImg} alt="Payment" />
            </div>
            <div className="payment-body">
              <div className="payment-text">
                <h1>Coming Soon</h1>
                <p>We're working on something exciting. Stay tuned!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="footer-fixed">
        <Footer />
      </div>
    </div>
  );
}

const styles = `
 /* Global Reset */
        /* * { margin: 0; padding: 0; box-sizing: border-box; } */

        body {
          font-family: 'Space Grotesk', sans-serif;
          background: #F6E4A5;
        }

        h1,h2,h3,h4,h5 {
          font-family: 'Montserrat Alternates', sans-serif;
        }

.page {
  color: #111827;
  background: #F6E7AC;
  font-family: 'Space Grotesk', sans-serif;
  min-height: 100vh;
}

/* Payment Section */
.payment-section {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 56px 16px 100px;
  background: #F6E7AC;
  box-sizing: border-box;
  min-height: calc(100vh - 120px); /* Adjust for header and footer */
}

.payment-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: linear-gradient(to bottom, #F6E7AC 0%, #F6E7AC 100%);
  z-index: 0;
  pointer-events: none;
}

.payment-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
}

.payment-title {
  color: #111827;
  font-weight: 700;
  text-align: center;
  margin: 0 0 28px;
  font-size: 28px;
  line-height: 1.25;
  position: relative;
  z-index: 2;
}

.payment-card {
  display: grid;
  grid-template-columns: 460px 1fr;
  gap: 32px;
  background: linear-gradient(135deg, #F6E7E7 0%, #E8F4F8 100%);
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0,0,0,.08);
  padding: 28px;
  box-sizing: border-box;
}

.payment-media {
  display: block;
}

.payment-media img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0,0,0,.08);
  aspect-ratio: 4 / 3;
}

.payment-body {
  display: flex;
  align-items: center;
}

.payment-text {
  color: #374151;
  font-size: 16px;
  line-height: 1.7;
  display: grid;
  gap: 14px;
}

.payment-text h1 {
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #800000;
  margin: 0 0 16px;
  animation: fadeIn 2s ease-in-out infinite alternate;
}

@keyframes fadeIn {
  0% { opacity: 0.7; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}

.payment-text p {
  font-size: 16px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

/* Responsive */
@media (max-width: 1200px) {
  .payment-title {
    font-size: 26px;
    margin-bottom: 24px;
  }
  .payment-card {
    grid-template-columns: 400px 1fr;
    gap: 28px;
    padding: 24px;
  }
  .payment-text {
    font-size: 15px;
    line-height: 1.65;
  }
}

@media (max-width: 900px) {
  .payment-title {
    font-size: 22px;
    margin-bottom: 22px;
  }
  .payment-card {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 22px;
  }
  .payment-media img {
    max-width: 520px;
    width: 100%;
    margin: 0 auto;
    aspect-ratio: 16 / 10;
  }
  .payment-text {
    font-size: 14px;
    line-height: 1.6;
  }
}

@media (max-width: 600px) {
  .payment-container { padding: 0 14px; }
  .payment-title {
    font-size: 18px;
    margin-bottom: 18px;
  }
  .payment-card {
    gap: 16px;
    padding: 16px;
    border-radius: 14px;
  }
  .payment-media img {
    max-width: 100%;
    aspect-ratio: 16 / 11;
    border-radius: 10px;
  }
  .payment-text {
    font-size: 13px;
    line-height: 1.5;
    gap: 12px;
  }
}

.footer-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

@media (max-width: 380px) {
  .payment-title { font-size: 16px; }
  .payment-text { font-size: 12.5px; }
}
`;
