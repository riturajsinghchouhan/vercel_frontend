import './About.css'

function About(){
    return(<>
    <section className="about-us" id="about">
  <div className="container">
    <div className="row align-items-center">
      {/* Left Column - Text Story */}
      <div className="col-lg-6">
        <div className="section-heading">
          <h6>About Us</h6>
          <h4>Our Story</h4>
        </div>
        <p>
          Established in 2010, our bakery started with a simple dream — to fill the neighborhood
          with the aroma of fresh, handmade delights. What began as a family passion has grown into
          a beloved local favorite, where every cake, loaf, and pastry is crafted with tradition,
          love, and the finest ingredients.
        </p>
        <p>
          Our head chef, <strong>Chef Aarav Mehta</strong>, trained in Paris, brings a unique blend
          of classic European techniques and local flavors to everything we bake. From moist
          chocolate cakes to crusty artisan breads, every bite is a tribute to quality and care.
        </p>
        <p>
          Visit us at our cozy café in Indore, Madhya Pradesh. Sit down, sip a latte, and watch the
          world go by with something sweet in hand.
        </p>
        <div className="green-button mt-3">
          <a href="#contact">Visit Our Bakery</a>
        </div>
      </div>

      {/* Right Column - Images */}
      <div className="col-lg-6">
        <div className="row">
          {/* <div className="col-6 mb-3">
            <img src="./assets/images/cheff.jpg" alt="Our Chef" className="img-fluid rounded shadow" />
          </div>
          <div className="col-6 mb-3">
            <img src="./assets/images/menu2.jpg" alt="Our Bakery Front" className="img-fluid rounded shadow" />
          </div> */}
          <div className="col-12">
            <img src="./assets/images/cheff.jpg" alt="Interior Ambience" className="img-fluid rounded shadow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</>)
}
export default About;