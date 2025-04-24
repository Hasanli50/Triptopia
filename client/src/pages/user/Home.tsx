import { Grid } from "@mui/material";
import firstSectionImage from "../../assets/photo/first section - home page.png";
import style from "../../assets/style/user/home.module.scss";

const Home = () => {
  return (
    <>
      <section className={style.home}>
        <Grid container spacing={8}>
          <Grid size={8}>
            <div className={style.firstColumn}>
              <p className={style.travellingWithUs}>Start Travelling with us</p>
              <h3 className={style.enjoyWithTourice}>Let’s enjoy your desired trip with Tourice</h3>
              <p className={style.paragraph}>
                The traveller where you can select your desired activity and
                destinations of your choice for vacations.
              </p>
            </div>
          </Grid>
          <Grid>
            <img className={style.secondSectionImage} src={firstSectionImage} alt="ffirst section image" />
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default Home;
