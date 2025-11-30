import './Contact.css';
import { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    request: '',
    service: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/contact/submit', formData);
      alert(res.data.message);
      setFormData({ name: '', email: '', request: '', service: '' });
    } catch (err) {
      alert("Failed to submit request.");
      console.error(err);
    }
  };

  return (
    <section className="bakery-form-block">
      <div className="bakery-wrapper">
        <div className="bakery-flex">
          <div className="bakery-image">
            <img src="./assets/images/contact.jpg" alt="Bakery ambiance" />
          </div>
          <div className="bakery-content">
            <div className="bakery-heading">
              <h5>Feel the Aroma</h5>
              <h2>Connect With Our Bakery</h2>
            </div>
            <form className="bakery-request-form" onSubmit={handleSubmit}>
              <div className="bakery-row">
                <div className="input-box">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. RituRaj"
                    required
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="input-box full">
                <label htmlFor="request">What Would You Like?</label>
                <input
                  type="text"
                  id="request"
                  name="request"
                  value={formData.request}
                  onChange={handleChange}
                  placeholder="e.g. Chocolate truffle for birthday"
                />
              </div>

              <div className="input-box full">
                <label htmlFor="service">Choose a Service</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option disabled value="">Select Option</option>
                  <option value="custom">Custom Cake Order</option>
                  <option value="party">Party Catering</option>
                  <option value="bulk">Bulk Bakery Order</option>
                  <option value="feedback">Feedback / Suggestions</option>
                </select>
              </div>

              <button type="submit" className="btn-bakery-submit">Place Request</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
