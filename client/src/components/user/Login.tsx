import React from "react";
import style from "../../assets/style/user/login.module.scss";
import airplane from "../../assets/photo/freepik__upload__54828.png";
import googleIcon from "../../assets/icons/Google__G__Logo.svg";
import appleIcon from "../../assets/icons/Icon awesome-apple.svg";
import facebookIcon from "../../assets/icons/XMLID_22_.svg";
import Group688 from "../../assets/photo/Group688.png";
import Vector from "../../assets/photo/Vector.png";
import PlaneVector from "../../assets/photo/plane-vector.png";
import Grid from "@mui/material/Grid";
import { Link } from "react-router";

const Login: React.FC = () => {
  return (
    <>
      <section className={style.login}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className={style.imgBox}>
              <img className={style.img} src={airplane} alt="airplane" />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className={style.box}>
              <h2 className={style.heading}>welcome</h2>
              <p className={style.loginWithEmail}>Login with Email</p>

              <form className={style.form}>
                <input
                  className={`${style.input} ${style.email}`}
                  type="email"
                  placeholder="Enter Email"
                />

                <input
                  className={`${style.input} ${style.password}`}
                  type="password"
                  placeholder="Enter password"
                />
                <Link to={"/forgot-password"} className={style.link}>
                  <p className={style.forgotPass}>Forgot your password?</p>
                </Link>
                <button className={style.submitBtn}>login</button>
              </form>

              <p className={style.or}>or</p>

              <div className={style.btnBox}>
                <button className={style.btn}>
                  <img className={style.iconImg} src={googleIcon} alt="icon" />
                </button>
                <button className={style.btn}>
                  <img
                    className={style.iconImg}
                    src={facebookIcon}
                    alt="icon"
                  />
                </button>
                <button className={style.btn}>
                  <img className={style.iconImg} src={appleIcon} alt="icon" />
                </button>
              </div>
              <Link to={"/host-login"} className={style.link}>
                <p className={style.hostSentence}>
                  If you want to be a host, click here
                </p>
              </Link>
            </div>

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
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default Login;
