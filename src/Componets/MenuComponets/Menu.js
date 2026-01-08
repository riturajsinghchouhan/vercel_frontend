// src/components/Menu.jsx
import './Menu.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Menu() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/category/fetch")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Category fetch error:", err));
  }, []);

  return (
    <section id="cake-menu">
      <div className="menu-container">
        <h2 className="menu-heading">Our Delicious Cakes</h2>

        <div className="cake-grid">
          {categories.length > 0 ? (
            categories.map((cat, index) => (
              <Link to={`/category/${cat.catnm}`} className="cake-card" key={index}>
                <img
                  src={`http://localhost:3001/uploads/caticons/${cat.caticonnm}`}
                  alt={cat.catnm}
                />
                <h3>{cat.catnm} Cakes</h3>
              </Link>
            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Menu;
