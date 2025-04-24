import Grid from "@mui/material/Grid";
import firstSectionImage from "../../assets/photo/first section - home page.png";
import style from "../../assets/style/user/home.module.scss";

const Home = () => {
  return (
    <section className={style.home}>
      <Grid container spacing={8}>
        <Grid item xs={12} md={8}>
          <div className={style.firstColumn}>
            <p className={style.travellingWithUs}>Start Travelling with us</p>
            <h3 className={style.enjoyWithTourice}>
              Let’s enjoy your desired trip with Tourice
            </h3>
            <p className={style.paragraph}>
              The traveller where you can select your desired activity and
              destinations of your choice for vacations.
            </p>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <img
            className={style.secondSectionImage}
            src={firstSectionImage}
            alt="first section image"
          />
        </Grid>
      </Grid>
    </section>
  );
};

export default Home;