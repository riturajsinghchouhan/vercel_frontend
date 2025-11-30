// src/pages/Payment.js
import React, { useState } from 'react';
import './payment.css';

function Payment() {
  const [paymentDetails, setPaymentDetails] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [totalAmount, setTotalAmount] = useState(799); // change this dynamically if needed
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    const { name, cardNumber, expiry, cvv } = paymentDetails;

    if (!name || !cardNumber || !expiry || !cvv) {
      setMessage('Please fill all fields.');
      return;
    }

    // Simulate payment success
    setMessage('Payment Successful! Thank you.');
    // Reset form
    setPaymentDetails({ name: '', cardNumber: '', expiry: '', cvv: '' });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="payment-box shadow p-4 rounded bg-white">
        <h3 className="text-center mb-4">Payment Details</h3>
        {message && <div className="alert alert-info">{message}</div>}

        <div className="mb-3">
          <label>Cardholder Name</label>
          <input
            type="text"
            name="name"
            value={paymentDetails.name}
            onChange={handleChange}
            className="form-control"
            placeholder="John Doe"
          />
        </div>
        <div className="mb-3">
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            className="form-control"
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label>Expiry Date</label>
            <input
              type="text"
              name="expiry"
              value={paymentDetails.expiry}
              onChange={handleChange}
              className="form-control"
              placeholder="MM/YY"
            />
          </div>
          <div className="col">
            <label>CVV</label>
            <input
              type="password"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={handleChange}
              className="form-control"
              placeholder="123"
            />
          </div>
        </div>
        <div className="mb-3">
          <strong>Total Amount: ₹{totalAmount}</strong>
        </div>
        <button className="btn btn-success w-100" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Payment;
