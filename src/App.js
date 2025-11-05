// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screens/Home";
import Homa from "./Screens/Homa";
import Events from "./Screens/Events";
import Contact from "./Screens/Contact";
import Payment from "./Screens/Payment";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homa" element={<Homa />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment" element={<Payment/>} />

      </Routes>
    </Router>
  );
}
