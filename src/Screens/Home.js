import React from "react";
import heroImg from "../Assets/ganeshaIdol.png";
import aboutImg from "../Assets/image3.png";
import gallery1 from "../Assets/image1.jpeg";
import gallery2 from "../Assets/image2.jpeg";
import gallery3 from "../Assets/image1.jpeg";
import gallery4 from "../Assets/image1.jpeg";
import cloudImg from "../Assets/cloud.png";

const ASSETS = {
  heroImg,
  aboutImg,
  gallery: [gallery1, gallery2, gallery3, gallery4],
  liveDarshanYoutubeId: "https://www.youtube.com/@NammaRTBGanesha",
  liveDarshanChannelUrl: "https://www.youtube.com/@NammaRTBGanesha",
  cloud: cloudImg,
};

const styles = `
/* =========================
   Global / Base
========================= */
:root { --ink:#111827; --muted:#6b7280; --tint:#F6E7AC; }

* { box-sizing: border-box; }
html, body { margin:0; padding:0; }
.page{
  color:var(--ink);
  background:#fff;
  font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,Helvetica,Arial;
}
.container{ max-width:1120px; margin:0 auto; padding:0 16px; }

/* =========================
   Header / Nav
========================= */
header.nav{
  position:sticky; top:0; z-index:30; backdrop-filter:saturate(180%) blur(8px);
  background:rgba(246,231,172,.85); border-bottom:1px solid rgba(0,0,0,.05);
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
.hero{
  position:relative; width:100%; min-height:640px;
  background:linear-gradient(180deg, var(--tint) 0%, var(--tint) 54.1%, var(--tint) 84.1%, rgba(120,175,207,0) 100%);
  overflow:hidden;
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
  opacity: 60%;
  border-radius: 14px;
  padding: clamp(10px, 2vw, 14px);
  box-shadow: 0 6px 20px rgba(0,0,0,.12);
  backdrop-filter: blur(6px);
  text-align: left;

  /* 👇 Add this line */
  color: #ffffff;
}

@media (max-width: 1200px) and (min-width: 900px) {
  .livecard {
    right: max(16px, calc((100vw - 1120px) / 2 + 16px));
    left: auto; transform: translateY(-50%); width: min(280px, 30vw);
  }
}
@media (min-width: 1440px) {
  .livecard { left: 800px; right: auto; transform: translateY(-50%); width: 320px; }
}
/* Tablet & down */
@media (max-width: 899px) {
  .hero__img { width: clamp(170px, 45vw, 300px); }
  .livecard { position: static; transform: none; margin: 16px auto 0; width: 92%; max-width: 300px; }
}
@media (max-width: 599px) {
  .hero__img { width: clamp(150px, 60vw, 240px); }
  .livecard { width: 100%; max-width: 260px; padding: 10px; border-radius: 12px; }
}

/* Live card inner UI */
.livecard__pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;    
  color: #dc2626;          
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 8px;
  padding: 4px 10px;     
  border-radius: 9999px;   
}
.livecard__dot{ width:8px; height:8px; background:#f43f5e; border-radius:50%; display:inline-block; }
.livecard__names{ font-size:14px; color:#111827; }
.muted{ color:#6b7280; }
.livecard__stats{ display:flex; gap:12px; margin-top:10px; }
.stat{
  flex:1; display:grid; grid-template-rows:auto auto; background:#fff;
  padding:8px 10px; border-radius:12px; box-shadow:0 1px 2px rgba(0,0,0,.05);
}
.stat__value{ font-weight:700; font-size:16px; color:#111827; }
.stat__label{ font-size:12px; color: #dc2626; }
.livecard__note{ margin:10px 2px 2px; font-size:12px; line-height:1.5; color:#6b7280; }

.hero__clouds {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -60px;   
  height: clamp(220px, 28vw, 420px);
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.cloud-track {
  position: absolute; bottom: 0; left: 0; width: 200%; height: 100%;
  display: flex; will-change: transform; animation: cloudLoop var(--dur, 60s) linear infinite;
}
.cloud-track.layer1 { --dur: 55s; opacity: 0.95; }
.cloud-track.layer2 { --dur: 90s; opacity: 0.75; transform: translateY(8px); }
.cloud-track.layer3 { --dur: 120s; opacity: 0.55; transform: translateY(16px); }
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
  width: 100%;
  margin: 0;
  padding: 56px 0;                /* base vertical rhythm */
  background: #fff;
}

/* Page container */
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;                /* gutter on small screens */
  box-sizing: border-box;
}

/* Title */
.about-title {
  color: #111827;
  font-weight: 700;
  text-align: center;
  margin: 0 0 28px;
  font-size: 28px;                /* Desktop default */
  line-height: 1.25;
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
  height: auto;                   /* default */
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
.card{ background:rgba(255,255,255,.7); border-radius:16px; padding:16px; box-shadow:0 6px 18px rgba(0,0,0,.08); }
.card h3{ margin:0 0 10px; font-weight:700; font-size:16px; }

.event-row{
  display:grid; grid-template-columns:1fr auto; gap:8px; align-items:center;
  background:#fff; border:1px solid #e5e7eb; padding:8px 12px; border-radius:10px; font-size:14px; margin-bottom:8px;
}
.event-row .time{ color:#6b7280; }

.aarti-row{ display:grid; grid-template-columns:24px 1fr auto; gap:10px; align-items:center; padding:6px 6px; font-size:14px; border-top:1px solid #f3f4f6; }
.aarti-row .idx{ color:#6b7280; text-align:right; }

/* Mini calendar */
.calendar .cal-head{ margin-bottom:8px; }
.cal-title{ font-weight:700; font-size:14px; }
.cal-grid{ display:grid; grid-template-columns:repeat(7,1fr); gap:4px; }
.cal-dow{ font-size:12px; font-weight:600; text-align:center; color:#6b7280; }
.cal-day{ font-size:12px; text-align:center; padding:4px 0; border-radius:6px; position:relative; background:#fff; border:1px solid #e5e7eb; }
.cal-day.today{ background:#fef3c7; font-weight:700; }
.cal-day.muted{ color:#d1d5db; }
.cal-dot{ width:4px; height:4px; background:#f43f5e; border-radius:50%; position:absolute; bottom:4px; left:50%; transform:translateX(-50%); }

/* Gallery */
.gallery{ background:rgba(255,255,255,.6); border-radius:16px; padding:16px; box-shadow:0 2px 8px rgba(0,0,0,.06); }
.scroller{ display:flex; gap:12px; overflow-x:auto; padding-bottom:8px; scrollbar-width:none; }
.scroller::-webkit-scrollbar{ display:none; }
.thumb{ width:auto; height:224px; object-fit:cover; border-radius:12px; box-shadow:0 6px 14px rgba(0,0,0,.12); flex:0 0 auto; }
.link{ text-decoration:none; font-size:14px; color:#374151; }
.link:hover{ text-decoration:underline; }

/* CTA / Video */
.cta{ display:grid; gap:16px; align-items:center; }
@media (min-width:900px){ .cta{ grid-template-columns:1fr 2fr; } }
.badge{ display:inline-flex; gap:8px; align-items:center; background:rgba(255,255,255,.85); color:#dc2626; padding:6px 10px; border-radius:999px; font-weight:600; font-size:12px; box-shadow:0 2px 8px rgba(0,0,0,.08); }
.badge .dot{ width:8px; height:8px; background:#f43f5e; border-radius:50%; }
.btn{ display:inline-flex; align-items:center; gap:8px; background:#111827; color:#fff; border-radius:16px; padding:10px 14px; font-size:14px; font-weight:600; text-decoration:none; }
.btn:hover{ background:#000; }
.video{ background:rgba(255,255,255,.7); border-radius:16px; padding:8px; box-shadow:0 8px 24px rgba(0,0,0,.12); }
.video .frame{ position:relative; width:100%; padding-top:56.25%; border-radius:12px; overflow:hidden; }
.video iframe{ position:absolute; inset:0; width:100%; height:100%; border:0; }

/* Footer */
footer{ border-top:1px solid rgba(0,0,0,.05); background:rgba(255,255,255,.5); }
.foot{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; justify-content:space-between; padding:24px 0; color:#6b7280; font-size:14px; }
`;

const NavLink = ({ label, active }) => (
  <a
    href="#"
    className={`nav-link ${active ? "active" : ""}`}
    style={{
      padding: "8px 12px",
      fontSize: 14,
      color: active ? "#111827" : "#4b5563",
      textDecoration: "none",
      borderBottom: active ? "2px solid #111827" : "none",
    }}
  >
    {label}
  </a>
);

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

function CalendarMini({ events = [] }) {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth();
  const first = new Date(y, m, 1);
  const startWeekday = (first.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const prevMonthDays = new Date(y, m, 0).getDate();

  const eventDates = new Set(
    events
      .filter((e) => e.date)
      .map((e) => new Date(e.date))
      .map(
        (d) =>
          `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
            d.getDate()
          ).padStart(2, "0")}`
      )
  );

  const cells = [];
  for (let i = 0; i < startWeekday; i++) {
    const dayNum = prevMonthDays - startWeekday + 1 + i;
    cells.push({ day: dayNum, muted: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ day: d, today: d === today.getDate(), event: eventDates.has(dateKey) });
  }
  const rem = cells.length % 7;
  if (rem !== 0) for (let i = 1; i <= 7 - rem; i++) cells.push({ day: i, muted: true });

  const dows = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthName = today.toLocaleString(undefined, { month: "long", year: "numeric" });

  return (
    <div className="card calendar">
      <div className="cal-head">
        <div className="cal-title">{monthName}</div>
      </div>
      <div className="cal-grid">
        {dows.map((d) => (
          <div key={d} className="cal-dow">
            {d}
          </div>
        ))}
        {cells.map((c, i) => (
          <div key={i} className={`cal-day ${c.muted ? "muted" : ""} ${c.today ? "today" : ""}`}>
            {c.day}
            {c.event && <div className="cal-dot" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const events = [
    { name: "Sahasra Modaka Homa", time: "9:00 AM – 11:00 AM", date: "2025-08-29" },
    { name: "Pradosham", time: "9:00 AM – 11:00 AM", date: "2025-09-01" },
  ];
  const aarti = [
    { name: "Suprabhata Seva", time: "6:00 AM" },
    { name: "Madhyana Aarti", time: "6:00 PM" },
    { name: "Pradosha Aarti", time: "6:00 PM" },
    { name: "Suprabhata Seva", time: "6:00 AM" },
    { name: "Madhyana Aarti", time: "6:00 PM" },
    { name: "Pradosha Aarti", time: "6:00 PM" },
  ];
  const hasVideo = Boolean(ASSETS.liveDarshanYoutubeId);

  return (
    <div className="page">
      <style>{styles}</style>

      {/* Header */}
      <header className="nav">
        <div className="container navbar">
          <div className="brand">Namma RTB Ganesha</div>
          <nav className="nav">
            <NavLink label="Home" active />
            <NavLink label="Homa" />
            <NavLink label="Events" />
            <NavLink label="Contact" />
          </nav>
        </div>
      </header>

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
              <div className="livecard__names">
                <div>Ram Kasibhatla</div>
                <div className="muted">Bhavani Shanmuka</div>
              </div>
              <div className="livecard__stats">
                <div className="stat">
                  <div className="stat__value">198+</div>
                  <div className="stat__label">Japa Counter</div>
                </div>
                <div className="stat">
                  <div className="stat__value">100+</div>
                  <div className="stat__label">Joiners</div>
                </div>
              </div>
              <p className="livecard__note">Every name matters. Every chant counts. Join in!</p>
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
        <img src={ASSETS.aboutImg} alt="About the Temple" />
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
            {events.map((e, i) => (
              <EventRow key={i} name={e.name} time={e.time} />
            ))}
          </div>

          <CalendarMini events={events} />

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
          <h3 style={{ fontWeight: 700, fontSize: 16, margin: "0 0 10px" }}>Gallery</h3>
          <div className="gallery">
            <div className="scroller">
              {ASSETS.gallery.map((src, i) => (
                <img key={i} src={src} alt={`Temple ${i + 1}`} className="thumb" />
              ))}
            </div>
            <div style={{ textAlign: "right", marginTop: 8 }}>
              <a href="#" className="link">View More →</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta">
          <div>
            <div className="badge">
              <span className="dot" />
              Live
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 700, margin: "8px 0" }}>
              Experience the live Darshan
            </h3>
            <p style={{ color: "#6b7280" }}>Join the spiritual journey</p>
            <a className="btn" target="_blank" rel="noreferrer" href={ASSETS.liveDarshanChannelUrl}>
              Visit Live Darshan
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

      <footer>
        <div className="container foot">
          <div>© {new Date().getFullYear()} Namma RTB Ganesha</div>
          <div>
            <a href="#" className="link" style={{ marginRight: 12 }}>Privacy</a>
            <a href="#" className="link" style={{ marginRight: 12 }}>Terms</a>
            <a href="#" className="link">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
