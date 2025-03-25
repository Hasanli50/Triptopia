import style from "../assets/style/about-us.module.scss";
import aboutUs from "../assets/photo/about-img-7.png";
import Grid from "@mui/material/Grid";
import Group688 from "../assets/photo/Group688.png";
import Vector from "../assets/photo/Vector.png";
import PlaneVector from "../assets/photo/plane-vector.png";

const AboutUs = () => {
  return (
    <>
      <section className={style.aboutUs}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className={style.imgBox}>
              <img className={style.image} src={aboutUs} alt="about-us" />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <p className={style.heading}>about us</p>
            <p className={style.sentence}>
              Welcome to{" "}
              <span style={{ color: "#faa935", cursor: "pointer" }}>
                Triptopia
              </span>
              , your trusted travel companion. Our mission is to make travel
              easier, more enjoyable, and unforgettable for every traveler. We
              believe in helping you discover new destinations, craft your
              perfect itinerary, and provide seamless experiences that you can
              enjoy with ease. Whether you’re seeking the perfect beach
              vacation, a cultural city tour, or an off-the-beaten-path
              adventure, our expert team is here to guide you every step of the
              way. With{" "}
              <span style={{ color: "#faa935", cursor: "pointer" }}>
                Triptopia
              </span>
              , your next great adventure is just a few taps away.
            </p>
            <p className={style.sentence}>
              At{" "}
              <span style={{ color: "#faa935", cursor: "pointer" }}>
                Triptopia
              </span>
              , we understand that travel is not just about going to new places
              — it’s about creating memories that last a lifetime. That’s why we
              focus on personalization, ensuring that your travel experience
              matches your unique preferences, interests, and dreams. From the
              moment you start planning to the moment you return home, we’re
              here to ensure everything runs smoothly and efficiently.
            </p>
            <p className={style.sentence}>
              Our team consists of passionate travelers and experienced
              professionals who are dedicated to helping you unlock the best
              experiences at every destination. With insider tips, handpicked
              recommendations, and exclusive deals, we strive to give you access
              to experiences that you won’t find anywhere else
            </p>
          </Grid>
        </Grid>

        <p className={style.sentence}>
          We’re committed to sustainability and responsible travel, which is why
          we promote eco-friendly options, support local businesses, and aim to
          minimize the environmental impact of our services.
        </p>
        <p className={style.sentence}>
          Whether you’re an adventurer looking to conquer mountains or a culture
          enthusiast exploring hidden cities,{" "}
          <span style={{ color: "#faa935", cursor: "pointer" }}>Triptopia</span>{" "}
          offers you the tools, support, and inspiration to make your travel
          dreams a reality. Join us in exploring the world with confidence and
          excitement — let{" "}
          <span style={{ color: "#faa935", cursor: "pointer" }}>Triptopia</span>
          be your guide to endless possibilities.
        </p>
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

export default AboutUs;
