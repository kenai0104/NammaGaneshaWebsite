import React, { useEffect, useRef, useState } from "react";
import heroImg from "../Assets/ganeshaIdol.png";
import aboutImg from "../Assets/image7.jpeg";
import gallery1 from "../Assets/image1.jpeg";
import gallery2 from "../Assets/image2.jpeg";
import gallery3 from "../Assets/image7.jpeg";
import gallery5 from "../Assets/image5.jpeg";
import gallery6 from "../Assets/image6.jpeg";
import gallery7 from "../Assets/image8.jpeg";
import gallery8 from "../Assets/image9.jpeg";
import gallery4 from "../Assets/image3.jpeg";
import gallery9 from "../Assets/image10.jpeg";
import cloudImg from "../Assets/cloud.png";
import '@fontsource/montserrat-alternates';  
import "@fontsource/space-grotesk"; 
import Header from '../Screens/Header';
import Footer from "./Footer";
import axios from "axios";




const ASSETS = {
  heroImg,
  aboutImg,
  gallery: [gallery1,gallery2,gallery3,gallery4,gallery5,gallery6,gallery7,gallery8,gallery9],
  liveDarshanYoutubeId: "https://www.youtube.com/@NammaRTBGanesha",
  liveDarshanChannelUrl: "https://www.youtube.com/@NammaRTBGanesha",
  cloud: cloudImg,
};



// const NavLink = ({ label, active }) => ( 
//   <a
//     href="#"
//     className={`nav-link ${active ? "active" : ""}`}
//     style={{
//       padding: "8px 12px",
//       fontSize: 14,
//       color: active ? "#111827" : "#4b5563",
//       textDecoration: "none",
//       borderBottom: active ? "2px solid #111827" : "none",
//     }}
//   >
//     {label}
//   </a>
// );

const EventRow = ({ name, time }) => (
  <div className="event-row">
    <div style={{ fontWeight: 600, color: "#1f2937" }}>{name}</div>
    <div className="time">{time}</div>
  </div>
);

const AartiRow = ({ idx, name, time }) => (
  <div className="aarti-row">
    <span className="idx">{idx}.</span>
    <span style={{ fontWeight: 600, color: "#1f2937" }}>{name}</span>
    <span className="time">{time}</span>
  </div>
);

function CalendarMini({ events = [], blockedDates = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const y = currentDate.getFullYear();
  const m = currentDate.getMonth();

  const first = new Date(y, m, 1);
  const startWeekday = (first.getDay() + 6) % 7; // Monday-first calendar
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const prevMonthDays = new Date(y, m, 0).getDate();

  // event dates set
  const eventDates = new Set(
    events
      .map((e) => e.date && new Date(e.date))
      .filter(Boolean)
      .map(
        (d) =>
          `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
            2,
            "0"
          )}-${String(d.getDate()).padStart(2, "0")}`
      )
  );

  // blocked dates map
  const blockedMap = {};
  blockedDates.forEach((b) => {
    const d = new Date(b.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
    blockedMap[key] = b.label;
  });

  // build cells
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
      today:
        d === today.getDate() &&
        m === today.getMonth() &&
        y === today.getFullYear(),
      event: eventDates.has(dateKey),
      blocked: !!blockedMap[dateKey],
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
        <button
          onClick={() => setCurrentDate(new Date(y, m - 1, 1))}
          className="cal-nav"
        >
          ◀
        </button>
        <div className="cal-title">{monthName}</div>
        <button
          onClick={() => setCurrentDate(new Date(y, m + 1, 1))}
          className="cal-nav"
        >
          ▶
        </button>
      </div>

      <div className="cal-grid">
        {dows.map((d) => (
          <div key={d} className="cal-dow">
            {d}
          </div>
        ))}
        {cells.map((c, i) => (
          <div
            key={i}
            className={`cal-day 
              ${c.muted ? "muted" : ""} 
              ${c.today ? "today" : ""} 
              ${c.blocked ? "blocked" : ""}`}
            title={c.blocked ? c.label : ""}
          >
            {c.day}
            {c.event && <div className="cal-dot" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const scrollerRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

const [participants, setParticipants] = useState([]);
const [overallTotalJapaCount, setOverallTotalJapaCount] = useState(0);
const [selectedImage, setSelectedImage] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get("https://nammaganesharender.onrender.com/users/japa-summary"); 
      console.log("Fetched data:", res.data);

      if (res.data) {
        setParticipants(res.data.users || []);
        setOverallTotalJapaCount(res.data.overallTotalJapaCount || 0);
      }
    } catch (err) {
      console.error("Error fetching participants:", err);
    }
  };

  fetchData();
}, []);



  const handleScrollMore = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({
        left: 3 * 200, 
        behavior: 'smooth', 
      });
    }
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 3, ASSETS.gallery.length - 1));
  };

  const handleScrollBack = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({
        left: -3 * 200, 
        behavior: 'smooth', 
      });
    }
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleScrollMore();
    }, 130000); 
     return () => clearInterval(interval); 
  }, []);
    
    const events = [
    { name: "10th September 2025"},
    { name: "10th October 2025"},
    { name: "08th November 2025"},
    { name: "07th December 2025"},
  ];

  const aarti = [
    { name: "Sunday", time: "10:30 AM" },
    { name: "Monday", time: "10:30 AM" },
    { name: "Tuesday", time: "10:30 AM" },
    { name: "Wednesday", time: "10:30 AM" },
    { name: "Thursday", time: "10:30 AM" },
    { name: "Friday", time: "10:30 AM" },
    { name: "Saturday", time: "10:30 AM" },
  ];
  const hasVideo = Boolean(ASSETS.liveDarshanYoutubeId);

  return (
    <div className="page">
      <style>{styles}</style>

      <Header />

      <div className="hero">
        <div className="hero__inner container">
          <div className="hero__title">|| Om Gam Ganapataye Namah ||</div>

          <div className="hero__stage">
            <div className="hero__idol">
              <img src={ASSETS.heroImg} alt="Lord Ganesha" className="hero__img" />
            </div>

<aside className="livecard" aria-label="Live Darshan card">
      <div className="livecard__pill">
        <span className="livecard__dot" /> Live
      </div>

<div className="vertical-scroll">
  <div className="scroll-inner">
    {participants
      .filter((p) => Number(p?.totalJapaCount ?? p?.japaCount ?? 0) > 0)
      .map((p, idx) => (
        <div key={idx} className="name-item">
          <span>{p.name}</span>
          <span className="count">
            {Number(p?.totalJapaCount ?? p?.japaCount).toLocaleString()}+
          </span>
        </div>
      ))}

    {/* Duplicate for infinite scroll */}
    {participants
      .filter((p) => Number(p?.totalJapaCount ?? p?.japaCount ?? 0) > 0)
      .map((p, idx) => (
        <div key={`dup-${idx}`} className="name-item">
          <span>{p.name}</span>
          <span className="count">
            {Number(p?.totalJapaCount ?? p?.japaCount).toLocaleString()}+
          </span>
        </div>
      ))}
  </div>
</div>

<div className="stat">
  <div className="stat__value">
    {overallTotalJapaCount.toLocaleString()}+
  </div>
  <div className="stat__label">Japa Counter</div>
</div>



      <p className="livecard__note">
        Every name matters. Every chant counts.
      </p>
      <a 
  href="https://play.google.com/store/apps/details?id=com.japatracker" 
  target="_blank" 
  rel="noopener noreferrer"
  className="livecard__note1"
>
  Join in!
</a>
    </aside>


          </div>
        </div>

        <div className="hero__clouds" aria-hidden="true">
          <div className="cloud-track layer1">
            <div className="sequence">
              {[...Array(8)].map((_, i) => (
                <img
                  key={`l1a-${i}`}
                  src={ASSETS.cloud}
                  alt=""
                  className={[
                    "cloud",
                    i % 7 === 0 ? "huge" : i % 5 === 0 ? "large" : i % 3 === 0 ? "small" : i % 4 === 0 ? "tiny" : "",
                    i % 3 === 0 ? "bob1" : i % 3 === 1 ? "bob2" : "bob3",
                  ].join(" ")}
                />
              ))}
            </div>
            <div className="sequence">
              {[...Array(8)].map((_, i) => (
                <img
                  key={`l1b-${i}`}
                  src={ASSETS.cloud}
                  alt=""
                  className={[
                    "cloud",
                    i % 7 === 0 ? "huge" : i % 5 === 0 ? "large" : i % 3 === 0 ? "small" : i % 4 === 0 ? "tiny" : "",
                    i % 3 === 0 ? "bob1" : i % 3 === 1 ? "bob2" : "bob3",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
          <div className="cloud-track layer2">
            <div className="sequence">
              {[...Array(9)].map((_, i) => (
                <img
                  key={`l2a-${i}`}
                  src={ASSETS.cloud}
                  alt=""
                  className={[
                    "cloud",
                    i % 9 === 0 ? "huge" : i % 4 === 0 ? "large" : i % 2 === 0 ? "small" : "",
                    i % 3 === 0 ? "bob2" : i % 3 === 1 ? "bob3" : "bob1",
                  ].join(" ")}
                />
              ))}
            </div>
            <div className="sequence">
              {[...Array(9)].map((_, i) => (
                <img
                  key={`l2b-${i}`}
                  src={ASSETS.cloud}
                  alt=""
                  className={[
                    "cloud",
                    i % 9 === 0 ? "huge" : i % 4 === 0 ? "large" : i % 2 === 0 ? "small" : "",
                    i % 3 === 0 ? "bob2" : i % 3 === 1 ? "bob3" : "bob1",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
          <div className="cloud-track layer3">
            <div className="sequence">
              {[...Array(10)].map((_, i) => (
                <img
                  key={`l3a-${i}`}
                  src={ASSETS.cloud}
                  alt=""
                  className={[
                    "cloud",
                    i % 11 === 0 ? "huge" : i % 6 === 0 ? "large" : i % 3 === 0 ? "small" : "tiny",
                    i % 3 === 0 ? "bob3" : i % 3 === 1 ? "bob1" : "bob2",
                  ].join(" ")}
                />
              ))}
            </div>
            <div className="sequence">
              {[...Array(10)].map((_, i) => (
                <img
                  key={`l3b-${i}`}
                  src={ASSETS.cloud}
                  alt=""
                  className={[
                    "cloud",
                    i % 11 === 0 ? "huge" : i % 6 === 0 ? "large" : i % 3 === 0 ? "small" : "tiny",
                    i % 3 === 0 ? "bob3" : i % 3 === 1 ? "bob1" : "bob2",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

   {/* About Section */}
    <section className="about-section">
  <div className="about-container">
    <h2 className="about-title">About the Temple</h2>
    <div className="about-card">
      <div className="about-media">
        <img src={gallery4} alt="About the Temple" />
      </div>
      <div className="about-body">
        <div className="about-text">
            <p>
              The Namma RTB Ganesha Temple, located in the serene surroundings of Raintree Boulevard, is a heartfelt initiative by the residents to create a spiritual and cultural cornerstone within our community. What began as a simple idea to bring people together has now blossomed into a divine space where prayers, peace, and positive energy come alive every day. It stands as a symbol of collective devotion and harmony, welcoming everyone with the grace and wisdom of Lord Ganesha.
            </p>
            <p>
              This temple is more than just a place of worship — it's where stories are shared, traditions are celebrated, and bonds are strengthened. From daily darshans and festival poojas to moments of quiet reflection, the temple invites each visitor to experience a deeper connection with themselves and the community. With every prayer offered here, our shared journey grows stronger, guided by blessings and the spirit of togetherness.
            </p>
           </div>
      </div>
    </div>
  </div>
</section>


      <section className="section">
        <div className="container grid-evt">
          <div className="card">
            <h3>Upcoming Events</h3>
            <h3>Sankastahara Chaturthi Dates - 2025</h3>

            {events.map((e, i) => (
              <EventRow key={i} name={e.name} time={e.time} />
            ))}
          </div>

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

          <div className="card">
            <h3>Daily Aarti Timings</h3>
            <div>
              {aarti.map((a, i) => (
                <AartiRow key={i} idx={i + 1} name={a.name} time={a.time} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery">
            <h3
              style={{
                fontWeight: 700,
                fontSize: 16,
                margin: "0 0 10px 0", 
              }}
            >
              Gallery
            </h3>
            <div className="scroller" ref={scrollerRef}>
              {ASSETS.gallery.map((src, i) => (
                <img 
                    key={i} 
                    src={src} 
                    alt={`Temple ${i + 1}`} 
                    className="thumb"
                    onClick={() => setSelectedImage(src)}
                  />
              ))}
            </div>
            <div style={{ textAlign: "right", marginTop: 8 }}>
              <button
                className="view-more-btn"
                onClick={handleScrollBack}
                style={{ marginRight: 10 }} 
              >
                ←
              </button>
              <button
                className="view-more-btn"
                onClick={handleScrollMore}
              >
                View More → 
              </button>
            </div>
          </div>
          {selectedImage && (
            <div className="fullscreen-modal" onClick={() => setSelectedImage(null)}>
              <img src={selectedImage} className="fullscreen-image" />
              <button className="close-btn" onClick={() => setSelectedImage(null)}>
                 close
              </button>
            </div>
          )}
        </div>
      </section>


      <section className="section">
  <div className="container cta" style={{ marginTop: "40px" }}>
    <div>
      
      <h3 style={{ fontSize: 24, fontWeight: 700, margin: "8px 0" }}>
Experience the Sacred Darshan      </h3>
      <p style={{ color: "#6b7280" }}>Join the spiritual journey</p>
      <a
        className="btn"
        target="_blank"
        rel="noreferrer"
        href={ASSETS.liveDarshanChannelUrl}
      >
        Visit Our Channel
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M13.5 4.5a.75.75 0 0 0 0 1.5h4.19L6.22 17.44a.75.75 0 0 0 1.06 1.06L18.75 7.06v4.19a.75.75 0 0 0 1.5 0v-6a.75.75 0 0 0-.75-.75h-6z"/>
        </svg>
      </a>
    </div>
    <div className="video">
      <div className="frame">
        {hasVideo ? (
          <iframe
            src={`https://www.youtube.com/embed/${ASSETS.liveDarshanYoutubeId}`}
            title="Live Darshan"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <iframe src="about:blank" title="placeholder" style={{ opacity: 0.0001 }} tabIndex={-1} />
        )}
      </div>
    </div>
  </div>
</section>


    <Footer/>
    </div>
  );
}

const styles = `
/* =========================
   Global / Base
========================= */
:root { --ink:#111827; --muted:#6b7280; --tint:#F6E7AC; }

h1, h2, h4, h5, h6 {
  font-family: 'Montserrat Alternates', sans-serif; /* Montserrat Alternative font for headings */
}

* { box-sizing: border-box; }
html, body { margin:0; padding:0; }
.page{
  color:var(--ink);
  background:#F6E7AC;
 font-family: 'Space Grotesk', sans-serif; }
.container{ max-width:1120px; margin:0 auto; padding:0 16px; }

/* =========================
   Header / Nav
========================= */
header.nav{
  position:sticky; top:0; z-index:30; backdrop-filter:saturate(180%) blur(8px);
  background:#F6E7AC; border-bottom:0px solid rgba(0,0,0,.05);
}
.navbar{ display:flex; align-items:center; justify-content:space-between; padding:14px 0; }
.brand{ font-weight:700; font-size:14px; letter-spacing:.2px; }

/* support both .nav a and .nav-link */
.nav a, .nav-link{
  padding:8px 12px; font-size:14px; color:#4b5563; text-decoration:none;
}
.nav a.active, .nav-link.active{ color:#111827; border-bottom:2px solid #111827; }

/* =========================
   HERO
========================= */
.hero {
  position: relative;
  width: 100%;
  min-height: 640px;
  background: linear-gradient(
    180deg,
    var(--tint) 0%,       /* clouds top color */
    var(--tint) 54%,      
    var(--tint) 84%,      
    #F6E7AC 100%          /* fade into About section color */
  );
  overflow: hidden;
}

/* Vertical scrollview for names */
.livecard__names.vertical-scroll {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 120px; /* adjust height as needed */
  overflow-y: auto;
  margin: 8px 0;
}

.vertical-scroll {
  max-height: 150px;     /* window height */
  overflow: hidden;      /* IMPORTANT: no auto scrollbars */
  position: relative;
}

/* inner wrapper that holds all items */
.scroll-inner {
  display: flex;
  flex-direction: column;
  animation: scrollUp 30s linear infinite; /* slow = 30s, adjust */
}

.scroll-inner {
  display: flex;
  flex-direction: column;
  animation: scroll-up 20s linear infinite; /* speed = 20s, adjust as needed */
}

.vertical-scroll .name-item {
  display: flex;
  justify-content: space-between;
  padding: 6px 10px;
  font-size: 14px;
}
.name-item .count {
  color: #888;
}

/* if you ever switch to real scroll, hide scrollbars too */
.vertical-scroll::-webkit-scrollbar {
  display: none;         /* Chrome, Safari, Edge */
}

.vertical-scroll {
  -ms-overflow-style: none;  /* IE 10+ */
  scrollbar-width: none;     /* Firefox */
}

/* Keyframes: move list upward */
@keyframes scroll-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%); /* move up by half (since list is duplicated) */
  }
}




.name-item:hover {
  background: rgba(255, 255, 255, 0.3);
}

.name-item.active {
  background: #fbbf24;
  color: #111;
  font-weight: 600;
}

.vertical-scroll {
  max-height: 150px; /* adjust as needed */
  overflow-y: auto;
}
.name-item {
  padding: 8px;
  cursor: pointer;
  color: #fff;
}
.name-item.active {
  background-color: #f0e68c; /* highlight selected */
  font-weight: bold;
}

.hero::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px; /* fade height */
  background: linear-gradient(to bottom, rgba(246,228,165,0) 0%, #F6E7AC 100%);
  pointer-events: none;
}

.hero__inner{ position:relative; z-index:1; padding:40px 0 72px; }
.hero__title{
  text-align:center; font-weight:600; color:#0D0000;
  font-size:clamp(18px, 2.2vw, 26px); margin:0 0 16px;
}

/* Stage = positioning context for idol + card */
.hero__stage {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 520px;
}

/* Idol image — fluid scale */
.hero__idol { z-index: 1; }
.hero__img {
  width: clamp(200px, 30vw, 420px);
  height: auto; display: block; object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,.1));
}

.livecard {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(calc(clamp(200px, 30vw, 420px) / 2 + 24px), -50%);
  width: clamp(200px, 24vw, 300px);
  background: #052927;
  opacity: 55%;
  border-radius: 14px;
  padding: clamp(10px, 2vw, 14px);
  box-shadow: 0 6px 20px rgba(0,0,0,.12);
  backdrop-filter: blur(6px);
  text-align: left;

  /* 👇 Add this line */
  color: #ffffffff;
}

/* Tablet & down */
@media (max-width: 899px) {
  .hero__stage {
    display: block;   /* stack idol + card */
    text-align: center;
  }

  .hero__idol {
    margin-bottom: 16px; /* space between idol & card */
  }

  .hero__img {
    width: clamp(170px, 45vw, 300px);
    margin: 0 auto;
  }

  .livecard {
    position: static;
    transform: none;
    margin: 0 auto;
    width: 92%;
    max-width: 300px;
    text-align: center; /* center text */
  }

  .livecard__pill {
    justify-content: center; /* center "Live" pill */
  }

  .livecard__names {
    display: flex;
    flex-direction: column;
    align-items: center; /* center names */
    gap: 4px;
  }

  .livecard__stats {
    display: flex;
    justify-content: center; /* center stats horizontally */
    gap: 16px;
  }

  .stat {
    text-align: center; /* center each stat */
  }
}

@media (max-width: 599px) {
  .hero__img {
    width: clamp(150px, 60vw, 240px);
    margin: 0 auto;
  }

  .livecard {
    width: 100%;
    max-width: 260px;
    padding: 10px;
    border-radius: 12px;
    margin: 12px auto 0;
  }
}


/* Live card inner UI */
.livecard__pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #052927;
  color: #ee1313ff;          
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
  padding: 4px 10px;     
  border-radius: 9999px;
  font-family: 'Space Grotesk', sans-serif;   
}
.livecard__dot{ width:8px; height:8px; background:#f43f5e; border-radius:50%; display:inline-block; }
.livecard__names{ font-size:14px; color:#111827; font-family: 'Space Grotesk', sans-serif; }
.muted{ color:#ffffffff; font-family: 'Space Grotesk', sans-serif; }
.livecard__stats{ display:flex; gap:12px; margin-top:10px; }
.stat{
  flex:1; display:grid; grid-template-rows:auto auto; background:#fff;
  padding:8px 10px; border-radius:12px; box-shadow:0 1px 2px rgba(0,0,0,.05); font-family: 'Space Grotesk', sans-serif;
}
.stat__value{ font-weight:700; font-size:16px; color:#111827; font-family: 'Space Grotesk', sans-serif; }
.stat__label{ font-size:12px; color: #dc2626; font-family: 'Space Grotesk', sans-serif; }
.livecard__note{ margin:10px 2px 2px; font-size:14px; line-height:1.5; color:#FFFFFF; font-family: 'Space Grotesk', sans-serif; }
.livecard__note1 {
  margin: 10px 2px 2px;
  font-size: 14px;
  line-height: 1.5;
  color: #f02525ff;
  font-family: 'Space Grotesk', sans-serif;
  text-decoration: underline;
  font-weight: bold;
}

.hero__clouds {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -60px;   
  height: clamp(220px, 28vw, 420px);
  pointer-events: none;
  overflow: hidden;
  z-index: 0.9;
}

.cloud-track {
  position: absolute; bottom: 0; left: 0; width: 200%; height: 100%;
  display: flex; will-change: transform; animation: cloudLoop var(--dur, 60s) linear infinite;
}
.cloud-track.layer1 { --dur: 55s; opacity: 0.95; }
.cloud-track.layer2 { --dur: 60s; opacity: 0.75; transform: translateY(8px); }
.cloud-track.layer3 { --dur: 80s; opacity: 0.55; transform: translateY(16px); }
.sequence { width: 50%; height: 100%; display: flex; align-items: flex-end; gap: 1.6vw; padding: 0 0.8vw; }
.cloud { flex: 0 0 auto; height: clamp(220px, 26vw, 420px); width: auto; filter: blur(0.35px) brightness(1.2); transform-origin: center bottom; }
.cloud.small { height: clamp(190px, 22vw, 370px); opacity: 0.95; }
.cloud.tiny { height: clamp(170px, 20vw, 330px); }
.cloud.large { height: clamp(260px, 30vw, 480px); }
.cloud.huge { height: clamp(300px, 34vw, 560px); }
.cloud.bob1 { animation: bob 7.5s ease-in-out infinite alternate; }
.cloud.bob2 { animation: bob 8.5s ease-in-out infinite alternate; }
.cloud.bob3 { animation: bob 9.5s ease-in-out infinite alternate; }
@keyframes cloudLoop { 0% { transform: translateX(0);} 100% { transform: translateX(-50%);} }
@keyframes bob { 0% { transform: translateY(0);} 100% { transform: translateY(-8px);} }
@media (prefers-reduced-motion: reduce) {
  .cloud-track, .cloud.bob1, .cloud.bob2, .cloud.bob3 { animation: none !important; }
}

/* Section wrapper */
/* ---------- About Section: layout + responsiveness ---------- */

/* Section wrapper (keeps spacing consistent with site) */
.about-section {
  position: relative; /* needed for the pseudo-element */
  width: 100%;
  margin: 0;
  padding: 56px 16px;
  background: #F6E7AC; /* default background */
  margin-bottom: 40px;
  box-sizing: border-box;
}

/* Gradient overlay at the top above the title */
.about-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px; /* height of the blended area */
  background: linear-gradient(to bottom, var(--tint) 0%, #F6E7AC 100%);
  z-index: 0;
  pointer-events: none; /* so it doesn't block clicks */
}

/* Ensure content sits above the gradient */
.about-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
}

/* Title stays above the gradient */
.about-title {
  color: #111827;
  font-weight: 700;
  text-align: center;
  margin: 0 0 28px;
  font-size: 28px;
  line-height: 1.25;
  position: relative;
  z-index: 2;
}


/* Card */
.about-card {
  display: grid;
  grid-template-columns: 460px 1fr; /* Desktop: fixed media + fluid text */
  gap: 32px;
  background: #f3f4f6;           /* grey card */
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0,0,0,.08);
  padding: 28px;
  box-sizing: border-box;
}

/* Media cell (image wrapper) */
.about-media {
  display: block;
}

/* Make image aligned, cropped nicely, and consistent height */
.about-media img {
  display: block;
  width: 100%;
  height: 100%;                   /* default */
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0,0,0,.08);
  /* Maintain nice aspect ratio; browsers that support will use this */
  aspect-ratio: 4 / 3;
}

/* Text cell */
.about-body {
  display: flex;
  align-items: center;            /* vertically centers text on large screens */
}

.about-text {
  color: #374151;
  font-size: 16px;                /* Desktop default */
  line-height: 1.7;
  display: grid;
  gap: 14px;
}

/* ---------- Breakpoints ---------- */

/* Large Tablets (<= 1200px) */
@media (max-width: 1200px) {
  .about-title {
    font-size: 26px;
    margin-bottom: 24px;
  }
  .about-card {
    grid-template-columns: 400px 1fr; /* shrink media column */
    gap: 28px;
    padding: 24px;
  }
  .about-text {
    font-size: 15px;
    line-height: 1.65;
  }
}

/* Tablets (<= 900px) */
@media (max-width: 900px) {
  .about-title {
    font-size: 22px;
    margin-bottom: 22px;
  }
  .about-card {
    grid-template-columns: 1fr;   /* stack: image over text */
    gap: 20px;
    padding: 22px;
  }
  .about-media img {
    max-width: 520px;             /* limit overly wide images */
    width: 100%;
    margin: 0 auto;               /* center image */
    aspect-ratio: 16 / 10;        /* a bit wider on tablets */
  }
  .about-text {
    font-size: 14px;
    line-height: 1.6;
  }
}

/* Phones (<= 600px) */
@media (max-width: 600px) {
  .about-container { padding: 0 14px; }
  .about-title {
    font-size: 18px;
    margin-bottom: 18px;
  }
  .about-card {
    gap: 16px;
    padding: 16px;
    border-radius: 14px;
  }
  .about-media img {
    max-width: 100%;
    aspect-ratio: 16 / 11;        /* a touch shorter on phones */
    border-radius: 10px;
  }
  .about-text {
    font-size: 13px;
    line-height: 1.5;
    gap: 12px;
  }
}

/* Very small phones (<= 380px) */
@media (max-width: 380px) {
  .about-title { font-size: 16px; }
  .about-text { font-size: 12.5px; }
}

.about h2{ font-size:20px; font-weight:700; margin:4px 0 6px; } /* kept for safety if used inside */
.about p{ color:#6b7280; line-height:1.7; font-size:14px; margin:0 0 10px; }

/* Events + Calendar + Aarti */
.grid-evt{ display:grid; grid-template-columns:1fr; gap:16px; }
@media (min-width:1100px){ .grid-evt{ grid-template-columns:1fr 1fr 1fr; } }
.card{ background:#F6E7E7; border-radius:16px; padding:16px; box-shadow:0 6px 18px rgba(0,0,0,.08); }
.card h3{ margin:0 0 10px; font-weight:700; font-size:16px; }

.event-row{
  display:grid; grid-template-columns:1fr auto; gap:8px; align-items:center;
  background:#fff; border:1px solid #e5e7eb; padding:8px 12px; border-radius:10px; font-size:14px; margin-bottom:8px;
}
.event-row .time{ color:#6b7280; }

.aarti-row{ display:grid; grid-template-columns:24px 1fr auto; gap:10px; align-items:center; padding:6px 6px; font-size:14px; border-top:1px solid #f3f4f6; }
.aarti-row .idx{ color:#6b7280; text-align:right; }

/* Mini calendar */
.card.calendar {
  background: #F6E7E7; /* soft pink */
  border-radius: 16px;
  padding: 20px; /* more breathing room */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  max-width: 450px;   /* wider */
  margin: auto;
  font-family: system-ui, sans-serif;
}

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px; /* bigger gaps */
}

.cal-day {
  position: relative;
  text-align: center;
  padding: 4px 0;     /* taller cells */
  border-radius: 10px;
  font-size: 1rem;     /* larger text */
  min-height: 10px;    /* ensure taller boxes */
  cursor: default;
}

.cal-day.today {
  background: #fcdde6;
  border: 2px solid #e75480; /* pink highlight */
  font-weight: 700;
  color: #b3124c;
}



.cal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.cal-title {
  font-size: 1rem;
  font-weight: 600;
}

.cal-nav {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s;
}

.cal-nav:hover {
  background: rgba(0, 0, 0, 0.05);
}


.cal-dow {
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
}




.cal-day.blocked {
  background: #fff2f2;
  color: #d32f2f;
  border: 1px solid #ffcdd2;
}

.cal-day.muted {
  color: #bbb;
}

.cal-day:hover:not(.muted) {
  background: #f0f0f0;
}

.cal-dot {
  width: 6px;
  height: 6px;
  background: #4caf50;
  border-radius: 50%;
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
}


.gallery {
  // background: #F6E7E7;
  border-radius: 16px;
  padding: 16px;
  box-shadow: none;
  margin-top: 20px;
  overflow-x: auto; /* Horizontal scrolling */
  padding-bottom: 20px; /* Optional: Add space at the bottom for scrolling */
  white-space: nowrap; /* Prevent the images from wrapping to the next line */
}
  .fullscreen-modal {
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: rgba(0,0,0,0.8);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:9999;
}

.fullscreen-image {
  max-width:90%;
  max-height:90%;
  border-radius:10px;
}

.close-btn {
  position:absolute;
  top:20px;
  right:20px;
  background:#fff;
  padding:6px 14px;
  border-radius:6px;
  cursor:pointer;
}

/* Scroller for images */
.scroller {
  display: flex; /* Align items horizontally */
  gap: 12px; /* Space between images */
  overflow-x: auto; /* Enable horizontal scrolling */
  -webkit-overflow-scrolling: touch; /* Smooth scrolling for mobile */
}

.scroller::-webkit-scrollbar {
  display: none; /* Hide the scrollbar */
}

.thumb {
  width: auto;
  height: 224px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
  flex: 0 0 auto; /* Prevent items from shrinking */
}

.link{ text-decoration:none; font-size:14px; color:#374151; }
.link:hover{ text-decoration:underline; }
.view-more-btn {
  display: inline-block;
  background-color: #e97278ff; 
  color: #111827;            
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.view-more-btn:hover {
  background-color: #d6c16f; /* slightly darker on hover */
}

/* CTA / Video */
.cta{ display:grid; gap:16px; align-items:center; }
@media (min-width:900px){ .cta{ grid-template-columns:1fr 2fr; } }
.badge {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  background: rgba(206, 160, 160, 0.43); /* 43% opacity */
  color: #dc2626;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
}
.badge .dot{ width:8px; height:8px; background:#f43f5e; border-radius:50%; }
.btn{ display:inline-flex; align-items:center; gap:8px; background:#e97278ff; color:rgb(0,0,0,.8); border-radius:16px; padding:10px 14px; font-size:14px; font-weight:600; text-decoration:none; }
.btn:hover{ background: #d6c16f; }
.video {
  background: rgba(255,255,255,.7);
  border-radius: 16px;
  padding: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,.12);
  margin-bottom: 20px;   /* ✅ space outside the box */
}

.video .frame {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;   /* ✅ gap below iframe if needed */
}

.video iframe{ position:absolute; inset:0; width:100%; height:100%; border:0; }

/* Footer */
footer{ border-top:1px solid rgba(0,0,0,.05); background:rgba(255,255,255,.5); }
.foot{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; justify-content:space-between; padding:24px 0; color:#6b7280; font-size:14px; }
`;