import React, { useState } from "react";
import HeroImg from "../Assets/event4.png"; 
import RitualImg from "../Assets/Dates.png";
import Event from "../Assets/event3.PNG";

import Header from "./Header";
import PoojaIcon from "../Assets/pooja.png";
import OmIcon from "../Assets/om.png";
import HomaIcon from "../Assets/homa.png";
import MusicIcon from "../Assets/music-note.png";
import Footer from "./Footer";

const events = {
  "Sankastahara Chaturthi": RitualImg,
  "Modaka Homam": Event,
  "Ganesh Chaturthi": Event,
};

export default function Events() {
const [activeTab, setActiveTab] = useState(Object.keys(events)[0]);




  return (
    <div className="events-page">
      {/* Header */}
<Header/>
      {/* Hero Section */}
      <section className="hero">
        <div className="image-container">
          <img src={HeroImg} alt="Homa" className="hero-img" />
        </div>
        <div className="hero-text">
          <h1>Let’s Celebrate Together</h1>
          <p>
            Sacred gatherings that purify, connect, and uplift.
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="info-section">
        <div className="info-text">
          <p>
            Imagine living in a beautiful house—spacious, well-designed, full of comforts. Yet each time we open the door, the surroundings are untidy.
          </p>
          <p>
           That’s why communities create systems to maintain shared spaces—because what surrounds us affects all of us, not just as individuals but as a collective.
          </p>
        </div>
        <div className="info-cards">
          <div className="info-card">
            <img src={PoojaIcon} alt="Pooja" className="icon" />
            <h3>Poojas</h3>
          </div>
          <div className="info-card">
            <img src={OmIcon} alt="Om" className="icon" />
            <h3>Abhishekams</h3>
          </div>
          <div className="info-card">
            <img src={HomaIcon} alt="Homa" className="icon" />
            <h3>Homas</h3>
          </div>
          <div className="info-card">
            <img src={MusicIcon} alt="Music" className="icon" />
            <h3>Namasankirtana</h3>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="events-section">
      <h2>Upcoming Events</h2>

      {/* Tabs */}
      <div className="tabs">
        {Object.keys(events).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Event Image */}
      <div className="event-card">
        <img
          src={events[activeTab]}
          alt={activeTab}
          className="event-img"
        />
      </div>
    </section>



    <section className="overview-card">
      <h2 className="overview-title">Event Overview</h2>
      <p>
        Sankastahara Chaturthi, also known as Sankashti Chaturthi, is a
        significant Hindu festival dedicated to Lord Ganesha, the
        elephant-headed deity known for removing obstacles and bestowing
        wisdom. This festival is observed on the fourth day (Chaturthi) of the
        Krishna Paksha (waning moon phase) each month.
      </p>

      <h3>Importance</h3>
      <p>
        The term “Sankastahara” means “remover of difficulties.” As the name
        suggests, this festival is observed to seek Lord Ganesha’s blessings
        for overcoming life’s challenges. Devotees believe that worshiping
        Ganesha on this day brings peace, prosperity and success.
      </p>

      <h3>Timings</h3>
      <p>
        The festival is observed during the Krishna Paksha Chaturthi, which is
        the fourth day after the full moon. Devotees fast from sunrise to
        moonrise on this day. The fast is broken after sighting the moon and
        performing special prayers and rituals dedicated to Lord Ganesha.
      </p>

      <h3>Naivedyam (Offerings)</h3>
      <p>
        On Sankastahara Chaturthi, devotees offer naivedyam, which is a variety
        of food items, to Lord Ganesha. Some popular offerings include:
      </p>
      <ul>
        <li>
          <b>Modak:</b> Sweet dumplings filled with coconut and jaggery,
          considered Ganesha’s favorite.
        </li>
        <li>
          <b>Ladoo:</b> Sweet balls made of flour, sugar and ghee.
        </li>
        <li>
          <b>Fruits:</b> Seasonal fruits like bananas, apples and pomegranates.
        </li>
        <li>
          <b>Durva:</b> A type of grass that is particularly favored by Lord
          Ganesha.
        </li>
      </ul>

      <p>
        Devotees perform the ritual called Ganapati Pooja, which involves
        chanting mantras, offering flowers, lighting lamps, and presenting
        naivedyam to the deity.
      </p>
    </section>


      {/* Beyond Rituals */}
        <section className="beyond-rituals">
      <div className="rituals-text">
        <h2>Beyond Rituals</h2>
        <p>
          At first glance, these may seem like ritualistic acts of devotion.
          But look deeper—they are hidden treasures of team-building,
          bonding, and knowledge-sharing.
        </p>
        <p>
          They are unsung classrooms where traditions, techniques, and
          spiritual values are passed down—not through lectures, but
          through participation and shared experience.
        </p>
      </div>
      <div className="rituals-img-wrapper">
        <img src={HeroImg} alt="Ritual" className="rituals-img" />
      </div>
    </section>

    <Footer/>

      {/* Styles */}
      <style>{`
        /* Global Reset */
        /* * { margin: 0; padding: 0; box-sizing: border-box; } */

        body {
          font-family: 'Space Grotesk', sans-serif;
          background: #F6E4A5;
        }

        h1,h2,h3,h4,h5 {
          font-family: 'Montserrat Alternates', sans-serif;
        }

        .events-page {
          background: #F6E4A5;
          color: #333;
          font-family: 'Space Grotesk', sans-serif;
        }

        /* Hero Section */
        .hero {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
          text-align: left;
          flex-direction: column;
        }

        .hero-img {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 15px; 
          display: block;
        }

        .image-container {
          width: 90%;
          height: 500px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          border-radius: 50px; 
        }

        .hero-text {
          position: absolute;
          left: 13%;
          bottom: 15%;
          color: #000;
          max-width: 300px;
          background: rgba(255, 255, 255, 0.7);
          padding: 10px;
          border-radius: 10px;
          text-align: left;
        }

        .hero-text h1 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        @media (max-width: 768px) {
          .image-container {
            width: 100%;
            height: auto;
            border-radius: 20px;
          }

          .hero-text {
            position: relative;   /* stack below image */
            left: 0;
            bottom: 0;
            max-width: 100%;
            margin-top: 15px;
            background: transparent; 
            padding: 8px;
          }

          .hero-text h1 {
            font-size: 20px;
          }

          .hero-text p {
            font-size: 14px;
          }
        }

        /* Info Section */
        .info-section {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin: -15px 5px 40px 35px;
          flex-wrap: wrap;
        }

        .info-text {
          flex: 1;
          max-width: 47%;
        }

        .info-text h2 {
          font-size: 20px;
          margin-bottom: 10px;
        }

        .info-text p {
          font-size: 24px;
          line-height: 1.6;
        }

        /* Flexbox Layout for Cards */
        .info-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr); 
          gap: 20px;
          max-width: 600px;
          margin:5px auto;
        }

        .info-card {
          padding: 10px;
          border-radius: 12px;
          text-align: center;
          font-weight: bold;
          font-size: 18px;
          color: #fff;
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        }

        /* Custom colors */
        .info-card:nth-child(1) {
          background: rgba(253, 11, 11, 0.5);
        }
        .info-card:nth-child(2) {
          background: rgba(255, 141, 40, 0.5);
        }
        .info-card:nth-child(3) {
          background: #F8B96F;
          color: #000;
        }
        .info-card:nth-child(4) {
          background: rgba(11, 172, 253, 0.5);
        }
              
        .icon {
          width: 30px;
          height: 30px;
          margin-bottom: 10px;
          object-fit: contain;
        }

        @media (max-width: 992px) {
          .info-section {
            flex-direction: column;
            text-align: center;
            margin: 20px;
          }

          .info-text {
            max-width: 100%;
            margin-bottom: 20px;
          }

          .info-text p {
            font-size: 18px;
          }

          .info-cards {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            max-width: 100%;
          }
        }   

        @media (max-width: 600px) {
          .info-text p {
            font-size: 16px;
          }
        }

        /* Events Section */
        .events-section {
          margin: 30px;
          font-family: "Space Grotesk", sans-serif;
        }

        .events-section h2 {
          font-size: 24px;
          margin-bottom: 20px;
          font-weight: 600;
        }

        /* Tabs */
        .tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 20px;
          justify-content: center;
        }

        .tab-btn {
          background: #fff;
          color: #000;
          border: none;
          padding: 15px 15px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
          flex: 1 1 auto;
          min-width: 120px;
          text-align: center;
        }

        .tab-btn:hover {
          background: #333;
          color: #fff;
        }

        .tab-btn.active {
          background: #efb6b6;
          color: #000;
          border: 2px solid #000;
        }

        @media (max-width: 600px) {
          .tab-btn {
            padding: 10px 20px;  
            font-size: 0.9rem;
            flex: 1 1 100%;  /* Full width on mobile */
          }
        }

        /* Event Image Card */
        .event-card {
          padding: 20px;
          border-radius: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .event-img {
          max-width: 130%;
          height: auto;
          border-radius: 12px;
        }

        /* Overview */
        .overview-section {
          background-color: #ffffff;
          padding: 40px 20px;
        }

        .overview-card {
          background-color: #f9f8f3;
          border-radius: 12px;
          padding: 20px 24px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: "Space Grotesk", sans-serif;
          color: #333;
          line-height: 1.6;
          box-shadow: 0 4px 8px rgba(0,0,0,0.08);
        }

        .overview-title {
          color: #e85c2b;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .overview-card h3 {
          color: #444;
          font-size: 16px;
          font-weight: 600;
          margin-top: 16px;
          margin-bottom: 6px;
        }

        .overview-card p {
          margin-bottom: 12px;
          font-size: 14px;
        }

        .overview-card ul {
          padding-left: 20px;
          margin-bottom: 12px;
        }

        .overview-card li {
          margin-bottom: 6px;
          font-size: 14px;
        }

        /* Beyond Rituals */
        .beyond-rituals {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #F6E4A5;
          padding: 60px 10%;
          border-radius: 12px;
          gap: 40px;
          font-family: "Space Grotesk", sans-serif;
        }

        .rituals-text {
          flex: 1;
        }

        .rituals-text h2 {
          font-size: 28px;
          font-weight: 700;
          color: #333;
          margin-bottom: 20px;
        }

        .rituals-text p {
          font-size: 16px;
          line-height: 1.6;
          color: #444;
          margin-bottom: 16px;
        }

        .rituals-img-wrapper {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .rituals-img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 900px) {
          .beyond-rituals {
            flex-direction: column;
            text-align: center;
            padding: 40px 20px;
          }

          .rituals-text {
            margin-bottom: 20px;
          }
        }

        /* Footer */
        footer { 
          text-align: center; 
          padding: 20px; 
          color: #666; 
        }

        .highlight { color: #dc2626; }
      `}</style>

    </div>
  );
}
