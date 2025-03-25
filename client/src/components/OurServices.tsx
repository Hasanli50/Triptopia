import style from "../assets/style/our-services.module.scss";
import Group688 from "../assets/photo/Group688.png";
import Vector from "../assets/photo/Vector.png";
import PlaneVector from "../assets/photo/plane-vector.png";

const OurServices = () => {
  return (
    <>
      <section className={style.ourServices}>
        <p className={style.heading}>our services</p>
        <p className={style.sentence}>
          At <span style={{ color: "#faa935", cursor: "pointer" }}>Triptopia</span>, we offer a
          suite of services to make your travel planning and experience smooth
          and hassle-free:
        </p>

        <ul className={style.list}>
          <li className={style.item}>
            <span className={style.describe}>
              Personalized Itinerary Planning:
            </span>{" "}
            Whether you're a first-time traveler or a seasoned explorer, we
            tailor your trip to fit your style, preferences, and budget.
          </li>

          <li className={style.item}>
            <span className={style.describe}>Booking Hotels & Flights:</span>{" "}
            Find the best deals on flights and accommodations, so you can spend
            more time exploring and less time searching.
          </li>

          <li className={style.item}>
            <span className={style.describe}>Exclusive Guided Tours:</span>{" "}
            Discover hidden gems and must-see spots with our expert local guides
            who provide insider knowledge and unforgettable experiences.
          </li>

          <li className={style.item}>
            <span className={style.describe}>Travel Insurance:</span> Travel
            with confidence knowing you're covered with our affordable travel
            insurance options, offering protection for trips large and small.
          </li>

          <li className={style.item}>
            <span className={style.describe}>24/7 Support:</span> Have questions
            or need help? Our dedicated customer service team is available
            around the clock to assist you with anything you need on your trip.
          </li>
        </ul>

        <img
          className={style.groupImageFirst}
          src={Group688}
          alt="group images"
        />
        <img
          className={style.groupImageSecond}
          src={Vector}
          alt="group images"
        />
        <img
          className={style.groupImageThird}
          src={PlaneVector}
          alt="group images"
        />
      </section>
    </>
  );
};

export default OurServices;
