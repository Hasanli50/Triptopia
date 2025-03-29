import React from "react";
import style from "../../assets/style/user/register.module.scss";
import registerImg from "../../assets/photo/freepik__upload__61111.png";
import googleIcon from "../../assets/icons/Google__G__Logo.svg";
import appleIcon from "../../assets/icons/Icon awesome-apple.svg";
import facebookIcon from "../../assets/icons/XMLID_22_.svg";
import Group688 from "../../assets/photo/Group688.png";
import Vector from "../../assets/photo/Vector.png";
import PlaneVector from "../../assets/photo/plane-vector.png";
import Grid from "@mui/material/Grid";
import { Link } from "react-router";

const Register: React.FC = () => {
  return (
    <>
      <section className={style.register}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className={style.imgBox}>
              <img
                className={style.img}
                src={registerImg}
                alt="registerImage"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className={style.box}>
              <h2 className={style.heading}>create an account</h2>
              <p className={style.agreeWithCondition}>
                By creating an account, you agree to our{" "}
                <span style={{ color: "#FAA935" }}>Privacy policy</span> and{" "}
                <span style={{ color: "#FAA935" }}>Terms of use</span>.
              </p>

              <form className={style.form}>
                <div className={style.inputBox}>
                  <input
                    type="text"
                    className={`${style.input} ${style.username}`}
                    placeholder="Enter Username"
                  />

                  <input
                    className={`${style.input} ${style.phoneNumber}`}
                    type="tel"
                    pattern="\+994 [0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}"
                    placeholder="Mobile Number"
                    title="Please enter the phone number in the format: +994703454545"
                  />
                </div>

                <input
                  className={`${style.input} ${style.email}`}
                  type="email"
                  placeholder="Enter Email"
                />

                <input
                  className={`${style.input} ${style.password}`}
                  type="password"
                  placeholder="Enter Password"
                />

                <button className={style.submitBtn}>create account</button>
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

export default Register;
