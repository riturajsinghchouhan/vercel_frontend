// Banner.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./banner.css";

function Banner() {
  return (
    <Swiper
      navigation={true}
      autoplay={{ delay: 3000 }}
      loop={true}
      modules={[Navigation, Autoplay]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div
          className="slide-inner"
          style={{ backgroundImage: "url(assets/images/cake1.jpg)" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="header-text">
                  <h2>
                    Baked <em>Fresh,</em>
                    <br />
                    Loved Always.
                  </h2>
                  <div className="div-dec"></div>
                  <p>
                    Baking joy into every bite — because we believe the best
                    memories are made with the warm aroma of freshly baked bread
                    and sweet treats shared with the ones you love.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div
          className="slide-inner"
          style={{ backgroundImage: "url(assets/images/cake2.jpg)" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="header-text">
                  <h2>
                    <em>The Taste</em> of Home, <br />
                    &amp; Best <em>One Slice at a Time.</em>
                  </h2>
                  <div className="div-dec"></div>
                  <p>
                    Crafted with precision, baked with passion — we bring you
                    handcrafted delights made from the finest ingredients, so
                    you can taste the magic in every layer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div
          className="slide-inner"
          style={{ backgroundImage: "url(assets/images/cake5.jpg)" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="header-text">
                  <h2>
                    Artisan <br />
                    <em> Bakes</em> for <em> Every Occasion.</em>
                  </h2>
                  <div className="div-dec"></div>
                  <p>
                    Crafted with precision, baked with passion — we bring you
                    handcrafted delights made from the finest ingredients, so
                    you can taste the magic in every layer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Banner;
