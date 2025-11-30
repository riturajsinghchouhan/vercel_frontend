import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdsDisplay.css";

const AdsDisplay = () => {
  const [ads, setAds] = useState([]);
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

  return (
    <div className="user-ads-container">
      {ads.map(ad => (
        <div className="user-ad-card" key={ad._id}>
          {/* ⭐ Correct Render Image URL */}
          {ad.image && (
            <img
              src={`${API}/${ad.image}`}
              alt={ad.title}
              className="user-ad-image"
            />
          )}

          <h4>{ad.title}</h4>
          <p>{ad.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AdsDisplay;
