import React, { useEffect, useState } from "react";
import style from "../../assets/style/user/login.module.scss";
import airplane from "../../assets/photo/freepik__upload__54828.png";
import googleIcon from "../../assets/icons/Google__G__Logo.svg";
import Group688 from "../../assets/photo/Group688.png";
import Vector from "../../assets/photo/Vector.png";
import PlaneVector from "../../assets/photo/plane-vector.png";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import userLoginSchema from "../../schema/userLoginSchema";
import { useUserLoginMutation } from "../../api/slice/userApi";
import { saveToken } from "../../utils/localeStorage";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { ErrorMessageType } from "../../types";
import { Eye, EyeOff } from "lucide-react";
import Triptopia from "../../assets/photo/logo-dark.png";
import Footer from "../../components/Footer";

const Login: React.FC = () => {
  const [userLogin, { isLoading, isError }] = useUserLoginMutation();
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();

  const getTokenFromQuery = (): string | null => {
    const token = new URLSearchParams(location.search).get("token");
    if (token) {
      return token;
    }
    return null;
  };

  useEffect(() => {
    const token = getTokenFromQuery();

    const tokenProcessed = localStorage.getItem("tokenProcessed");

    if (token && !tokenProcessed) {
      saveToken(token);
      localStorage.setItem("userauth", "true");
      localStorage.setItem("tokenProcessed", "true");

      toast.success("Successfully signed in with Google!");

      setTimeout(() => {
        navigate("/");
      }, 300);
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:6060/auth-user/google";
  };

  type valuesType = {
    email: string;
    password: string;
  };

  const formik = useFormik<valuesType>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, actions) => {
      try {
        const user = { email: values.email, password: values.password };
        const data = await userLogin(user).unwrap();
        const token = data.token;
        saveToken(token);
        localStorage.setItem("user", "true");
        console.log(data.token);
        actions.resetForm();
        toast.success("You successfully sign in");
        setTimeout(() => {
          navigate("/");
        }, 300);
      } catch (error: unknown) {
        if (isError) {
          const axiosError = error as AxiosError;
          const errorData = axiosError.response?.data as ErrorMessageType;
          console.log("Occurred error: ", errorData?.message);
          console.log(error);
          toast.error(
            errorData?.message ||
              "Email or password is wrong. Please try again."
          );
        }
        actions.setSubmitting(false);
      }
    },
    validationSchema: userLoginSchema,
  });
  return (
    <>
      <section className={style.header}>
        <div className={style.headerBox}>
          <div className={style.headerBox__imgBox}>
            <img
              className={style.headerBox__image}
              src={Triptopia}
              alt="logo"
            />
          </div>
          <div className={style.headerBox__btnBox}>
            <Link className={style.link} to={"/login"}>
              <button
                type="button"
                className={`${style.headerBox__loginBtn} ${style.headerBox__btn}`}
              >
                login
              </button>
            </Link>
            <Link className={style.link} to={"/register"}>
              <button
                type="button"
                className={`${style.headerBox__registerBtn} ${style.headerBox__btn}`}
              >
                register
              </button>
            </Link>
          </div>
        </div>
      </section>

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

              <form className={style.form} onSubmit={formik.handleSubmit}>
                <div style={{ width: "100%", marginBottom: "25px" }}>
                  <input
                    className={`${style.input} ${style.email}`}
                    type="email"
                    placeholder="Enter Email"
                    autoComplete="currect-email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <p style={{ color: "#7bcbdb" }}>{formik.errors.email}</p>
                  ) : null}
                </div>
                <div style={{ width: "100%", marginBottom: "5px" }}>
                  <input
                    className={`${style.input} ${style.password}`}
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <p style={{ color: "#7bcbdb" }}>{formik.errors.password}</p>
                  ) : null}

                  {show ? (
                    <span onClick={() => setShow(false)}>
                      {" "}
                      <Eye className={style.passState} />
                    </span>
                  ) : (
                    <span onClick={() => setShow(true)}>
                      {" "}
                      <EyeOff className={style.passState} />
                    </span>
                  )}
                </div>
                <Link to={"/forgot-password"} className={style.link}>
                  <p className={style.forgotPass}>Forgot your password?</p>
                </Link>
                <div style={{ textAlign: "center" }}>
                  <button type="submit" className={style.submitBtn}>
                    {isLoading ? (
                      <span className={style.loader}></span>
                    ) : (
                      "login"
                    )}
                  </button>
                </div>
              </form>

              <p className={style.or}>or</p>
              <div className={style.btnBox}>
                <button className={style.btn} onClick={handleGoogleLogin}>
                  <img className={style.iconImg} src={googleIcon} alt="icon" />
                  <span className={style.word}>google</span>
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

      <Footer />
    </>
  );
};

export default Login;
