import React, { useState } from "react";
import Header from "./Header";
import GaneshaImg from "../Assets/contact.png";
import "@fontsource/montserrat-alternates";
import "@fontsource/space-grotesk";
import Footer from "./Footer";
import Select from "react-select";

export default function Contact() {
  const today = new Date().toISOString().split("T")[0];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [poojaName, setPoojaName] = useState("");
  const [date, setDate] = useState(today);
  const [selectedNakshatra, setSelectedNakshatra] = useState(null);
  const [selectedRasi, setSelectedRasi] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null); // { type: "success" | "error", text: string }

  const nakshatras = [
    { value: "Ashwini", label: "Ashwini" },
    { value: "Bharani", label: "Bharani" },
    { value: "Krittika", label: "Krittika" },
    { value: "Rohini", label: "Rohini" },
    { value: "Mrigashira", label: "Mrigashira" },
    { value: "Ardra", label: "Ardra" },
    { value: "Punarvasu", label: "Punarvasu" },
    { value: "Pushya", label: "Pushya" },
    { value: "Ashlesha", label: "Ashlesha" },
    { value: "Magha", label: "Magha" },
    { value: "Purva Phalguni", label: "Purva Phalguni" },
    { value: "Uttara Phalguni", label: "Uttara Phalguni" },
    { value: "Hasta", label: "Hasta" },
    { value: "Chitra", label: "Chitra" },
    { value: "Swati", label: "Swati" },
    { value: "Vishakha", label: "Vishakha" },
    { value: "Anuradha", label: "Anuradha" },
    { value: "Jyeshtha", label: "Jyeshtha" },
    { value: "Mula", label: "Mula" },
    { value: "Purva Ashadha", label: "Purva Ashadha" },
    { value: "Uttara Ashadha", label: "Uttara Ashadha" },
    { value: "Shravana", label: "Shravana" },
    { value: "Dhanishta", label: "Dhanishta" },
    { value: "Shatabhisha", label: "Shatabhisha" },
    { value: "Purva Bhadrapada", label: "Purva Bhadrapada" },
    { value: "Uttara Bhadrapada", label: "Uttara Bhadrapada" },
    { value: "Revati", label: "Revati" },
  ];

  const zodiacSigns = [
    { value: "Aries", label: "Aries (Mesha)" },
    { value: "Taurus", label: "Taurus (Vrishabha)" },
    { value: "Gemini", label: "Gemini (Mithuna)" },
    { value: "Cancer", label: "Cancer (Karka)" },
    { value: "Leo", label: "Leo (Simha)" },
    { value: "Virgo", label: "Virgo (Kanya)" },
    { value: "Libra", label: "Libra (Tula)" },
    { value: "Scorpio", label: "Scorpio (Vrishchika)" },
    { value: "Sagittarius", label: "Sagittarius (Dhanu)" },
    { value: "Capricorn", label: "Capricorn (Makara)" },
    { value: "Aquarius", label: "Aquarius (Kumbha)" },
    { value: "Pisces", label: "Pisces (Meena)" },
  ];

  const selectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#fff",
      color: "#000",
      borderRadius: "8px",
      padding: "4px",
      marginBottom: "15px",
      border: "1px solid #ccc",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#000",
      fontFamily: "Montserrat, sans-serif",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#666",
      fontStyle: "italic",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#fff",
      borderRadius: "8px",
      marginTop: "2px",
      zIndex: 9999,
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? "#efb6b6" : isFocused ? "#f3f3f3" : "#fff",
      color: "#000",
      cursor: "pointer",
      padding: "10px 15px",
    }),
  };

  const handleSubmit = async () => {
    setMessage(null);

    if (!name) return setMessage({ type: "error", text: "Name is required" });
    if (!phone) return setMessage({ type: "error", text: "Phone is required" });
    if (!selectedRasi) return setMessage({ type: "error", text: "Rasi is required" });
    if (!selectedNakshatra) return setMessage({ type: "error", text: "Nakshatra is required" });
    if (!poojaName) return setMessage({ type: "error", text: "Pooja name is required" });
    if (!date) return setMessage({ type: "error", text: "Date is required" });

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      rasi: selectedRasi.value,
      nakshatra: selectedNakshatra.value,
      poojaName: poojaName.trim(),
      date, // yyyy-mm-dd from input[type=date]
    };

    try {
      setSubmitting(true);
      const res = await fetch("https://nammaganesharender.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to submit form");
      }

      // Optionally use the saved contact returned from backend
      await res.json();

      setMessage({ type: "success", text: "Submitted! We'll get back to you shortly." });

      // reset form
      setName("");
      setPhone("");

      setSelectedRasi(null);
      setSelectedNakshatra(null);
      setPoojaName("");
      setDate(today);
    } catch (e) {
      setMessage({ type: "error", text: e.message || "Server error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <div className="contact-container">
        {/* Left Side: Form */}
        <div className="contact-card">
          <h3 className="form-heading">Contact Ganapathy</h3>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* ✅ Custom Dropdowns */}
          <Select
            options={nakshatras}
            placeholder="Select Nakshatra"
            menuPlacement="bottom"
            styles={selectStyles}
            value={selectedNakshatra}
            onChange={(opt) => setSelectedNakshatra(opt)}
            isSearchable
          />

          <Select
            options={zodiacSigns}
            placeholder="Select Zodiac Sign"
            menuPlacement="bottom"
            styles={selectStyles}
            value={selectedRasi}
            onChange={(opt) => setSelectedRasi(opt)}
            isSearchable
          />

          <textarea
            placeholder="Pooja Details"
            rows="3"
            value={poojaName}
            onChange={(e) => setPoojaName(e.target.value)}
          ></textarea>

          <input
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button
            className="submitBtn"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>

          {message && (
            <p
              style={{
                marginTop: 12,
                fontWeight: 600,
                color: message.type === "success" ? "#0b5137" : "#7a1f1f",
                background: message.type === "success" ? "#d1e7dd" : "#f8d7da",
                border: `1px solid ${
                  message.type === "success" ? "#badbcc" : "#f5c2c7"
                }`,
                padding: "10px 12px",
                borderRadius: 6,
              }}
            >
              {message.text}
            </p>
          )}
        </div>

        {/* Right Side: Image */}
        <div className="contact-img">
          <img src={GaneshaImg} alt="Ganesha" />
        </div>
      </div>

      <Footer />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Space Grotesk', sans-serif;
          background: #F6E4A5;
        }

        h1,h2,h3,h4,h5 {
          font-family: 'Montserrat Alternates', sans-serif;
        }

        .contact-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 5px 0px 100px;
          min-height: calc(100vh - 120px); /* full screen minus header + footer */
          gap: 40px;
          margin-bottom: 40px;
        }

        .contact-card {
          flex: 1;
          max-width: 420px;
          background: #67896E;
          color: #fff;
          padding: 30px;
          border-radius: 15px;
          z-index: 2;
          padding-bottom: 80px;
        }

        .form-heading {
          text-align: center;
          margin-bottom: 20px;
        }

        .contact-card input,
        .contact-card select,
        .contact-card textarea {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 5px;
          margin-bottom: 15px;
          font-family: 'Space Grotesk';
        }

        .row-2 {
          display: flex;
          gap: 10px;
        }

        .contact-img {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .contact-img img {
          width: 900px;     /* large like figma */
          max-width: 100%;  /* still responsive */
          height: auto;
          object-fit: contain;
        }

        .submitBtn {
          width: 100%;
          padding: 12px;
          background: #F6E4A5;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
        }

        .submitBtn[disabled] {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .contact-footer {
          text-align: center;
          padding: 15px;
          background: #EEE2A8;
        }

        /* ------------------------ */
        /* Responsive Breakpoints   */
        /* ------------------------ */

        /* Tablets */
        @media (max-width: 992px) {
          .contact-container {
            flex-direction: column;
            padding: 30px 5px;
            text-align: center;
          }
          .contact-img {
            order: -1;              /* ✅ Move image above form */
            justify-content: center;
            width: 100%;    
          }

          .contact-card {
            max-width: 100%;
          }

          .contact-img img {
            width: 100%;           /* ✅ take full width of container */
            max-width: 600px;      /* prevent it from being *too* huge */
            margin: 0 auto;        /* center align */
            display: block;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .contact-container {
            padding: 20px 5px;
          }
          .contact-card {
            padding: 20px;
          }
          .form-heading {
            font-size: 18px;
          }
          .contact-img img {
            width: 100%;          /* ✅ full width */
            max-width: 500px;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .contact-card {
            padding: 10px;
          }
          .contact-card input,
          .contact-card select,
          .contact-card textarea {
            font-size: 14px;
            padding: 10px;
          }
          .submitBtn {
            font-size: 14px;
            padding: 10px;
          }
          .form-heading {
            font-size: 16px;
          }
          .contact-img img {
            width: 100%;          /* ✅ stretch properly */
            max-width: 400px;
          }
        }
      `}</style>
    </>
  );
}
