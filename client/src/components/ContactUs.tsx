import style from "../assets/style/contactUs.module.scss";
import Grid from "@mui/material/Grid";
import touristMale from "../assets/photo/male-tourist.png";

const ContactUs = () => {
  return (
    <>
      <section className={style.contactUs}>
        <div className={style.contactUs__box}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <p className={style.heading}>contact us</p>
              <div className={style.contact}>
                <div className={style.inputBox}>
                  <input
                    className={style.input}
                    type="text"
                    placeholder="Enter your message"
                  />
                </div>
                <button className={style.btn}>send</button>
              </div>
              <p className={style.sentence}>We pleasure help you :)</p>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <div className={style.imageBox}>
                <img
                  className={style.image}
                  src={touristMale}
                  alt="male tourist"
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
