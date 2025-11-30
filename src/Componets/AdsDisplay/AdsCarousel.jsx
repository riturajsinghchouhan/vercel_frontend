import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdsCarousel.css';

const AdsCarousel = () => {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const API = "https://lt-oimp.onrender.com";

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get(`${API}/ads/fetch`);
        if (res.data.success) {
          const activeAds = res.data.ads.filter(ad => ad.status);
          setAds(activeAds);
        }
      } catch (err) {
        console.error("Ads fetch error:", err);
      }
    };
    fetchAds();
  }, []);

  // Auto move every 3 seconds
  useEffect(() => {
    if (ads.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % ads.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [ads]);

  if (ads.length === 0) return null;

  const ad = ads[currentIndex];

  return (
    <div className="ads-carousel-container">
      {/* ⭐ Correct Image URL */}
      {ad.image && (
        <img
          src={`${API}/${ad.image}`}
          alt={ad.title}
          className="carousel-image"
        />
      )}

      <div className="ads-carousel-info">
        <h3>{ad.title}</h3>
        <p>{ad.description}</p>
      </div>
    </div>
  );
};

export default AdsCarousel;
