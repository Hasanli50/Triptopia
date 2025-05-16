import React, { useEffect } from "react";
import style from "../../assets/style/user/login.module.scss";
import airplane from "../../assets/photo/freepik__upload__54828.png";
import googleIcon from "../../assets/icons/Google__G__Logo.svg";
import Group688 from "../../assets/photo/Group688.png";
import Vector from "../../assets/photo/Vector.png";
import PlaneVector from "../../assets/photo/plane-vector.png";
import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import userLoginSchema from "../../schema/userLoginSchema";
import { useUserLoginMutation } from "../../services/userApi";
import { toast } from "react-hot-toast";
import Triptopia from "../../assets/photo/logo-dark.png";
import Footer from "../../components/Footer";
import { setAuthToken } from "../../services/baseApi";
import { Col, Divider, Input, Row } from "antd";

const Login: React.FC = () => {
  const [userLogin, { isLoading }] = useUserLoginMutation();
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
      setAuthToken(token);
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
        setAuthToken(token);
        localStorage.setItem("user", "true");
        actions.resetForm();
        toast.success(data.message || "You successfully signed in");
        setTimeout(() => {
          navigate("/");
        }, 300);
      } catch (error: unknown) {
        const err = error as { data?: { message?: string } };

        console.log("Occurred error: ", err.data?.message);

        toast.error(
          err.data?.message || "Email or password is wrong. Please try again."
        );
      }
      actions.setSubmitting(false);
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
        <Row gutter={[36, 16]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div className={style.imgBox}>
              <img className={style.img} src={airplane} alt="airplane" />
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div className={style.box}>
              <h2 className={style.heading}>welcome</h2>
              <p className={style.loginWithEmail}>Login with Email</p>

              <form className={style.form} onSubmit={formik.handleSubmit}>
                <div style={{ width: "100%", marginBottom: "25px" }}>
                  <Input
                    className={style.input}
                    type="email"
                    placeholder="Enter Email"
                    autoComplete="currect-email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <p className={style.error}>{formik.errors.email}</p>
                  ) : null}
                </div>
                <div style={{ width: "100%", marginBottom: "5px" }}>
                  <Input.Password
                    className={style.input}
                    placeholder="Enter Password"
                    autoComplete="current-password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <p className={style.error}>{formik.errors.password}</p>
                  ) : null}
                </div>
                <Link to={"/forgot-password"} className={style.link}>
                  <p className={style.forgotPass}>Forgot your password?</p>
                </Link>
                <div style={{ margin: "auto", maxWidth: "300px" }}>
                  <button type="submit" className={style.submitBtn}>
                    {isLoading ? (
                      <span className={style.loader}></span>
                    ) : (
                      "login"
                    )}
                  </button>
                </div>
              </form>

              <div style={{ maxWidth: "300px", margin: "0 auto" }}>
                <Divider
                  style={{
                    borderColor: "#faa935",
                    fontSize: "16px",
                    color: "#faa935",
                    fontWeight: "600",
                    margin: "10px 0",
                  }}
                >
                  or
                </Divider>
              </div>
              {/* <p className={style.or}>or</p> */}
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
          </Col>
        </Row>
      </section>

      <Footer />
    </>
  );
};

export default Login;
