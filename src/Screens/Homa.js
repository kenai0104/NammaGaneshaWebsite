import React, { useState, useEffect } from "react";
import Header from "./Header";
import HomaImg from "../Assets/Homa1.png";
import SpiritualImg from "../Assets/Homa2.jpg";
import BlessingsImg from "../Assets/Homa4.png";
import EnvImg from "../Assets/Homa3.png";
import TransformImg from "../Assets/Homa5.png";
import Footer from "./Footer";

const tabImages = {
  "Spiritual Connection": SpiritualImg,
  "Blessings": BlessingsImg,
  "Environmental Purification": EnvImg,
  "Transformation": TransformImg,
};

// ---------------- CalendarMini ----------------
function CalendarMini({ events = [], blockedDates = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const y = currentDate.getFullYear();
  const m = currentDate.getMonth();

  const first = new Date(y, m, 1);
  const startWeekday = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const prevMonthDays = new Date(y, m, 0).getDate();

  // map events
  const eventDates = new Set(
    events.map((e) => e.date && new Date(e.date))
      .filter(Boolean)
      .map(
        (d) =>
          `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
            2,
            "0"
          )}-${String(d.getDate()).padStart(2, "0")}`
      )
  );

  // map blocked dates
  const blockedMap = {};
  blockedDates.forEach((b) => {
    const d = new Date(b.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
    blockedMap[key] = b.label;
  });

  // build calendar cells
  const cells = [];
  for (let i = 0; i < startWeekday; i++) {
    cells.push({ day: prevMonthDays - startWeekday + 1 + i, muted: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${y}-${String(m + 1).padStart(2, "0")}-${String(
      d
    ).padStart(2, "0")}`;
    cells.push({
      day: d,
      today: d === today.getDate() && m === today.getMonth() && y === today.getFullYear(),
      event: eventDates.has(dateKey),
      blocked: blockedMap[dateKey] ? true : false,
      label: blockedMap[dateKey] || "",
    });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length, muted: true });
  }

  const dows = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthName = currentDate.toLocaleString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="card calendar">
      <div className="cal-head">
        <button onClick={() => setCurrentDate(new Date(y, m - 1, 1))} className="cal-nav">◀</button>
        <div className="cal-title">{monthName}</div>
        <button onClick={() => setCurrentDate(new Date(y, m + 1, 1))} className="cal-nav">▶</button>
      </div>

      <div className="cal-grid">
        {dows.map((d) => (
          <div key={d} className="cal-dow">{d}</div>
        ))}
        {cells.map((c, i) => (
  <div
    key={i}
    className={`cal-day 
      ${c.muted ? "muted" : ""} 
      ${c.today ? "today" : ""} 
      ${c.blocked ? "blocked" : ""}`}
    title={c.blocked ? c.label : ""}   // ⬅ currently here
  >
    {c.day}
    {c.event && <div className="cal-dot" />}
  </div>
))}

      </div>
    </div>
  );
}



// ---------------- Homa Page ----------------
export default function Homa() {
  const [activeTab, setActiveTab] = useState("Spiritual Connection");
  const tabs = [
    "Spiritual Connection",
    "Blessings",
    "Environmental Purification",
    "Transformation",
  ];
  const activeIndex = tabs.indexOf(activeTab);

  // keyboard nav
  const onTabsKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      setActiveTab(tabs[(activeIndex + 1) % tabs.length]);
    } else if (e.key === "ArrowLeft") {
      setActiveTab(tabs[(activeIndex - 1 + tabs.length) % tabs.length]);
    }
  };

  // preload images
  useEffect(() => {
    Object.values(tabImages).forEach((src) => {
      const i = new Image();
      i.src = src;
    });
  }, []);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="hero">
        <div className="image-container">
          <img src={HomaImg} alt="Homa" className="hero-img" />
        </div>
        <div className="hero-text">
          <h1>Homa - </h1>
          <h2> Sacred Fire,</h2>
          <h2> Sacred Intent</h2>
          <p>
            A timeless act of spiritual networking, environmental healing, and
            community well-being.
          </p>
          <button>Join a Homa</button>
        </div>
      </section>

      {/* Info */}
      <section className="info-section">
        <div className="info-text">
          <p>
            At first glance, a Homa may seem like the creation of smoke by{" "}
            <b>offering</b> various items into fire. But look deeper—the true
            fuel is intent.
          </p>
          <p>
            <b>Agni (Fire)</b> becomes the divine messenger, the interface
            between us and the invited deity. Mantras act as the address,
            ingredients as the message, and Agni as the transporter.
          </p>
        </div>

        <div className="info-cards">
          <div className="info-card red">
            <h3>Agni (Fire)</h3>
            <p>The Messenger</p>
          </div>
          <div className="info-card yellow">
            <h3>Mantras</h3>
            <p>The Address</p>
          </div>
          <div className="info-card beige">
            <h3>Offerings (Samiths & Havya)</h3>
            <p>The Message</p>
          </div>
        </div>
      </section>

      {/* Why Homa */}
      <section className="why-homa">
        <h2>Why Perform a Homa?</h2>

        <div
          className="tabs"
          role="tablist"
          aria-label="Why Perform a Homa tabs"
          onKeyDown={onTabsKeyDown}
          style={{ ["--tabs"]: tabs.length }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab}
              role="tab"
              id={`tab-${i}`}
              aria-selected={activeTab === tab}
              aria-controls={`panel-${i}`}
              tabIndex={activeTab === tab ? 0 : -1}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}

          <span
            className="tab-indicator"
            style={{ ["--index"]: activeIndex }}
            aria-hidden="true"
          />
        </div>

        <div
          className="tab-content"
          role="tabpanel"
          id={`panel-${activeIndex}`}
          aria-labelledby={`tab-${activeIndex}`}
        >
          <div className="image-container1">
            <img
              key={activeTab}
              src={tabImages[activeTab]}
              alt={`${activeTab} illustration`}
              className="why-img fade-in"
            />
            <div className="overlay-box fade-in">
              <p>
                {activeTab === "Spiritual Connection" &&
                  "Nurture bonds with deities & cosmic forces."}
                {activeTab === "Blessings" &&
                  "Receive divine grace & positive energy."}
                {activeTab === "Environmental Purification" &&
                  "Purify the surroundings & harmonize space."}
                {activeTab === "Transformation" &&
                  "Ignite inner growth & spiritual awakening."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits">
        <h1>How The Side Effects?</h1>
        <h2>All Beneficial.</h2>
        <div className="benefit-cards">
          <div className="benefit-card">
            <span>1</span>
            <p>
              The dhooma (sacred smoke) cleanses not just the immediate air, but
              radiates beneficial energy to the fields that grow our food, the
              skies that bring us rain, and the minds that seek peace.
            </p>
          </div>
          <div className="benefit-card">
            <span>2</span>
            <p>
              Many scriptures and traditions affirm that Homa influences
              environmental balance and cosmic alignment, indirectly
              contributing to the wealth and welfare of all participants.
            </p>
          </div>
        </div>
      </section>

{/* Calendar */}
<section className="calendar-section">
  <div className="calendar-left">
    <p>This is why we regularly conduct Homas at the temple.</p>
    <p>
      Not as rituals alone—but as timeless acts of spiritual networking,</p>
     <p>environmental healing, and community well-being.
    </p>
  </div>

  <div className="calendar-right">
    <p className="calendar-heading">Join a Homa on below dates at 06:00 AM</p>
    <CalendarMini
      blockedDates={[
        { date: "2025-01-17", label: "Sankastahara Chaturthi – January" },
        { date: "2025-02-16", label: "Sankastahara Chaturthi – February" },
        { date: "2025-03-17", label: "Sankastahara Chaturthi – March" },
        { date: "2025-04-16", label: "Sankastahara Chaturthi – April" },
        { date: "2025-05-16", label: "Sankastahara Chaturthi – May" },
        { date: "2025-06-14", label: "Sankastahara Chaturthi – June" },
        { date: "2025-07-14", label: "Sankastahara Chaturthi – July" },
        { date: "2025-08-12", label: "Sankastahara Chaturthi – August" },
        { date: "2025-09-10", label: "Sankastahara Chaturthi – September" },
        { date: "2025-10-10", label: "Sankastahara Chaturthi – October" },
        { date: "2025-11-08", label: "Sankastahara Chaturthi – November" },
        { date: "2025-12-07", label: "Sankastahara Chaturthi – December" },
      ]}
    />
  </div>
</section>


      <Footer/>

      <style jsx>{`
        body {
          font-family: 'Space Grotesk', sans-serif;
          background: #F6E4A5;
          margin: 0;
          padding: 0;
        }

        .hero {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .hero-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        .image-container {
          position: relative;
          width: 100%;
          max-width: 1200px;
          border-radius: 20px;
          overflow: hidden; 
        }
        .hero-text {
          position: absolute;
          top: 50%;
          left: 11%;
          background: rgba(255, 255, 255, 0.8);
          padding: 15px;
          border-radius: 10px;
          max-width: 220px;
        }

        .hero-text h1 {
          font-size: 28px;
          margin: 0;
        }
        .hero-text h2 {
          font-size: 24px;
          margin: 5px 0;
        }
        .hero-text p {
          font-size: 16px;
          margin: 10px 0 0 0;
        }
        .hero-text button {
          margin-top: 15px;
          padding: 10px 20px;
          background: #e07b7b;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .hero-text {
            position: static; /* remove absolute */
            margin-top: 15px;
            max-width: 100%;
            text-align: center;
          }

          .hero-text h1 {
            font-size: 22px;
          }
          .hero-text h2 {
            font-size: 18px;
          }
          .hero-text p {
            font-size: 14px;
          }
        }

        /* Information Section */
        .info-section {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin: 30px 15px;
          flex-wrap: wrap;
        }

        .info-text {
          flex: 1;
          max-width: 50%;
        }

        .info-text h2 {
          font-size: 20px;
          margin-bottom: 10px;
        }

        .info-text p {
          font-size: 20px;
          line-height: 1.6;
        }

        /* Flexbox Layout for Cards (2 on top and 1 below) */
        .info-cards {
          display: flex;
          flex-wrap: wrap; /* Ensures responsive stacking */
          gap: 10px;
          flex: 1;
          justify-content: space-between;
          max-width: 50%;
        }

        .info-card {
          flex: 1 1 calc(50% - 20px); /* Two cards on the first row */
          padding: 15px;
          border-radius: 10px;
          color: #fff;
          text-align: center;
          box-sizing: border-box;
        }

        .info-card.red { background: #E07B7B; }
        .info-card.yellow { background: #F5C68A; color: #000; }
        .info-card.beige { background: #C1B197; color: #000; }

        .info-cards .info-card:nth-child(3) {
          flex: 1 1 100%; /* Make the third card take full width */
        }

        /* Media Query for Responsive Layout */
        @media (max-width: 992px) {
          .info-section {
            flex-direction: column;
            text-align: center;
          }

          .info-text {
            max-width: 100%;
            margin-bottom: 20px;
          }

          .info-cards {
            flex-direction: column;
            max-width: 100%;
          }

          .info-card {
            margin-bottom: 10px;
          }
        }

        .why-homa {
          background: #F6E4A5; /* yellow for whole section */
          padding: 2rem;
          border-radius: 10px;
        }

        .why-homa .tab-content {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 1rem;
          background: transparent; 
        }

         .why-homa .tabs {
            position: relative;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            width: 100%;
            margin: 0 auto 30px;
          }

            .why-homa .tabs button {
            width: 100%;
            padding: 12px 16px;
            font-size: 18px;
            border: 1px solid #ccc;
            border-radius: 10px;
            background: #fff;
            cursor: pointer;
            transition: background-color .25s ease, transform .15s ease;
            outline: none;
          }
          .why-homa .tabs button:hover { background: #f1f1f1; transform: translateY(-1px); }
          .why-homa .tabs .active { background: #f7e372ff; font-weight: 700; }

          .why-homa .tab-indicator {
            --gap: 16px;
            position: absolute;
            bottom: -8px;
            height: 4px;
            border-radius: 999px;
            background: #E07B7B;
            width: calc((100% - var(--gap) * (var(--tabs) - 1)) / var(--tabs));
            left: calc(var(--index) * ( (100% - var(--gap) * (var(--tabs) - 1)) / var(--tabs) + var(--gap) ));
            transition: left .35s ease;
          }

          /* Ensure no white panel background fights us */
          .why-homa .tab-content {
            background: transparent !important;
          }


          /* Responsive: 2 per row on tablets, 1 per row on phones */
          @media (max-width: 900px) {
            .why-homa .tabs { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 480px) {
            .why-homa .tabs { grid-template-columns: 1fr; }
          }


       .image-container1 {
        position: relative;
        display: inline-block;
        max-width: 100%;
        width: 90%;
        border-radius: 12px;
        overflow: hidden;
      }

      .why-img { width: 100%; height: auto; display: block; object-fit: cover; }


        .image-container1 img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        .overlay-box {
          position: absolute;
          top: 10%;
          left: 2%;
          color: #000;
          max-width: 250px;
          background: rgba(255, 255, 255, 0.7);
          padding: 10px;
          border-radius: 10px;
          text-align: left;
        }

        h2 {
          font-size: 36px;
          color: #333;
          margin-bottom: 30px;
        }
          
           h1 {
          font-size: 36px;
          color: #333;
          margin-bottom: 20px;
        }

        /* Tabs */
        .tabs {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .tabs button {
          padding: 10px 20px;
          font-size: 18px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #fff;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .tabs button:hover {
          background-color: black;
        }

        .tabs .active {
          background-color: black;
          font-weight: bold;
          font-color: #fff;
        }

        /* Content Section */
        .tab-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          border-radius: 10px;
          background-color: #fff;
        }

        .tab-content img {
          max-width: 100%;
          height: auto;
          margin-bottom: 20px;
        }

        .tab-content p {
          font-size: 18px;
          color: #666;
          text-align: center;
          line-height: 1.6;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .tabs {
            flex-direction: column;
            gap: 10px;
          }

          .tabs button {
            width: 100%;
            padding: 15px;
            font-size: 16px;
          }
        }

        /* Benefits Section */
        .benefits {
          margin: 40px 20px;
        }

        .benefit-cards {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .benefit-card {
          flex: 1;
          min-width: 250px;
          background: #fff;
          padding: 20px;
          border-radius: 10px;
        }

        .benefit-card span {
          font-weight: bold;
          font-size: 20px;
          background: #E07B7B;
          padding: 5px 10px;
          border-radius: 50%;
          margin-right: 10px;
        }
        /* Calendar Section Layout */
        .calendar-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 40px;
          margin: 40px 20px;
          padding: 30px;
          border-radius: 12px;
          background: #fdf6d8; /* soft warm tone */
        }

        /* Left Text */
        .calendar-left {
          flex: 1;
          font-size: 20px;
          line-height: 1.6;
          color: #333;
        }

        /* Right Calendar */
        .calendar-right {
          flex: 1;
          max-width: 320px;
        }

        .calendar-heading {
          font-weight: 600;
          margin-bottom: 10px;
          font-size: 14px;
          text-align: center;
          color: #444;
        }

        @media (min-width: 992px) {
          .calendar-section {
            align-items: center;
          }
        }

        /* Calendar Box */
        .card.calendar {
          background: #fff;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          font-family: 'Space Grotesk', sans-serif;
        }

        /* Calendar Header */
        .cal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .cal-title {
          font-weight: 600;
          font-size: 14px;
          color: #333;
        }
        .cal-nav {
          background: none;
          border: none;
          font-size: 16px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .cal-nav:hover {
          background: #f3f4f6;
        }

        /* Grid */
        .cal-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
        }
        .cal-dow {
          font-size: 12px;
          font-weight: 600;
          text-align: center;
          color: #888;
        }
        .cal-day {
          font-size: 13px;
          text-align: center;
          padding: 8px 0;
          border-radius: 8px;
          position: relative;
          background: #fff;
          border: 1px solid #eee;
          transition: background 0.2s ease;
        }
        .cal-day.today {
          background: #fef3c7;
          font-weight: 700;
        }
        .cal-day.blocked {
          background: #fde2e1;
          color: #b91c1c;
          font-weight: 600;
        }
        .cal-day.blocked:hover {
          background: #fca5a5;
        }
        .cal-day.muted {
          color: #ccc;
        }
        .cal-dot {
          width: 5px;
          height: 5px;
          background: #e07b7b;
          border-radius: 50%;
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Tooltip */
        .cal-day.blocked::after {
          content: attr(title);
          position: absolute;
          bottom: 120%;
          left: 50%;
          transform: translateX(-50%);
          background: #333;
          color: #fff;
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 4px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
          z-index: 10;
        }
        .cal-day.blocked:hover::after {
          opacity: 1;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .calendar-section {
            flex-direction: column;
            text-align: center;
          }
          .calendar-left {
            font-size: 15px;
          }
          .calendar-heading {
            text-align: center;
          }
          .calendar-right {
            max-width: 100%;
          }
        }


        footer {
          text-align: center;
          padding: 15px;
          background: #EEE2A8;
          margin-top: 30px;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .hero-text {
            position: static;
            background: transparent;
            padding: 10px;
            max-width: 100%;
          }

          .hero {
            flex-direction: column;
            padding: 20px;
          }

          .info-cards {
            flex-direction: column;
          }

          .tab-content {
            flex-direction: column;
          }

          .calendar {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
