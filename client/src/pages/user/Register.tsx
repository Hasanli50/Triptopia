import React, { useEffect } from "react";
import style from "../../assets/style/user/register.module.scss";
import registerImg from "../../assets/photo/freepik__upload__61111.webp";
import googleIcon from "../../assets/icons/Google__G__Logo.svg";
import Group688 from "../../assets/photo/Group688.png";
import Vector from "../../assets/photo/Vector.png";
import PlaneVector from "../../assets/photo/plane-vector.png";
import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import userRegisterSchema from "../../schema/userRegisterSchema";
import { useUserRegisterMutation } from "../../api/slice/userApi";
import { AxiosError } from "axios";
import { ErrorMessageType } from "../../types";
import toast from "react-hot-toast";
import Triptopia from "../../assets/photo/logo-dark.png";
import Footer from "../../components/Footer";
import { setAuthToken } from "../../api/slice/baseApi";
import { Col, Divider, Input, Row } from "antd";

interface MyFormValues {
  username: string;
  email: string;
  password: string;
  phone_number: string;
}

const Register: React.FC = () => {
  const [userRegister, { isLoading, isError }] = useUserRegisterMutation();

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

  const formik = useFormik<MyFormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      phone_number: "",
    },
    onSubmit: async (values, actions) => {
      try {
        const request = await userRegister({
          username: values.username,
          email: values.email,
          password: values.password,
          phone_number: values.phone_number,
        }).unwrap();
        console.log(request);
        actions.resetForm();
        toast.success("Successfully sign up! Please verify your account.");
        setTimeout(() => {
          navigate(`/verify-account/${request.token}`);
        }, 300);
      } catch (error: unknown) {
        if (isError) {
          toast.error("Something went wrong. Please try again.");
          const axiosError = error as AxiosError;
          const dataError = axiosError.response?.data as ErrorMessageType;
          console.log("Occoured error: ", dataError?.message);
          console.log(error);
        }
        actions.setSubmitting(false);
      }
    },
    validationSchema: userRegisterSchema,
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

      <section className={style.register}>
        <Row gutter={[36, 16]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div className={style.imgBox}>
              <img
                className={style.img}
                src={registerImg}
                alt="registerImage"
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div className={style.box}>
              <h2 className={style.heading}>create an account</h2>
              <p className={style.agreeWithCondition}>
                By creating an account, you agree to our{" "}
                <Link to="/privacy-policy" className={style.link}>
                  <span style={{ color: "#FAA935", cursor: "pointer" }}>
                    Privacy policy
                  </span>{" "}
                </Link>
                and{" "}
                <Link to="/terms-conditions" className={style.link}>
                  <span style={{ color: "#FAA935", cursor: "pointer" }}>
                    Terms of use
                  </span>
                </Link>
                .
              </p>

              <form className={style.form} onSubmit={formik.handleSubmit}>
                <div className={style.inputBox}>
                  <div style={{ width: "100%" }}>
                    <Input
                      className={`${style.input} ${style.username}`}
                      placeholder="Enter Username"
                      autoComplete="current-username"
                      name="username"
                      value={formik.values.username}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.username && formik.touched.username ? (
                      <p className={style.error}>{formik.errors.username}</p>
                    ) : null}
                  </div>

                  <div style={{ width: "100%" }}>
                    <Input
                      className={`${style.input} ${style.phoneNumber}`}
                      type="tel"
                      pattern="^(\+994)(50|51|55|70|77|99|10)[0-9]{7}$"
                      placeholder="+994 XX XXX XX XX"
                      name="phone_number"
                      value={
                        formik.values.phone_number
                        // ? formik.values.phone_number
                        // : `+994 ${formik.values.phone_number}`
                      }
                      onBlur={formik.handleBlur}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (!value.startsWith("+994")) {
                          value = "+994" + value.replace(/^(\+994)?/, "");
                        }

                        value = value.replace(/[^\d+]/g, "");
                        if (value.length > 13) {
                          value = value.slice(0, 13);
                        }
                        formik.setFieldValue("phone_number", value);
                      }}
                    />

                    {formik.errors.phone_number &&
                    formik.touched.phone_number ? (
                      <p className={style.error}>
                        {formik.errors.phone_number}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div style={{ width: "100%", marginBottom: "25px" }}>
                  <Input
                    className={`${style.input} ${style.email}`}
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    autoComplete="current-email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <p className={style.error}>{formik.errors.email}</p>
                  ) : null}
                </div>

                <div style={{ width: "100%", marginBottom: "25px" }}>
                  <Input.Password
                    className={`${style.input} ${style.password}`}
                    placeholder="Enter Password"
                    autoComplete="current-password"
                    name="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <p className={style.error}>{formik.errors.password}</p>
                  ) : null}
                </div>

                <div style={{ margin: "auto", maxWidth: "300px" }}>
                  <button type="submit" className={style.submitBtn}>
                    {isLoading ? (
                      <span className={style.loader}></span>
                    ) : (
                      "create account"
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

export default Register;
