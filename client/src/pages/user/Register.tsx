import React, { useEffect, useState } from "react";
import style from "../../assets/style/user/register.module.scss";
import registerImg from "../../assets/photo/freepik__upload__61111.png";
import googleIcon from "../../assets/icons/Google__G__Logo.svg";
import Group688 from "../../assets/photo/Group688.png";
import Vector from "../../assets/photo/Vector.png";
import PlaneVector from "../../assets/photo/plane-vector.png";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import userRegisterSchema from "../../schema/userRegisterSchema";
import { useUserRegisterMutation } from "../../api/slice/userApi";
import { AxiosError } from "axios";
import { ErrorMessageType } from "../../types";
import toast from "react-hot-toast";
import { saveToken } from "../../utils/localeStorage";
import { Eye, EyeOff } from "lucide-react";
import Triptopia from "../../assets/photo/logo-dark.png";
import Footer from "../../components/Footer";

interface MyFormValues {
  username: string;
  email: string;
  password: string;
  phone_number: string;
}


const Register: React.FC = () => {
  const [userRegister, { isLoading, isError }] = useUserRegisterMutation();
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
        toast.success("Successfully sign up!");
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
                    <input
                      type="text"
                      className={`${style.input} ${style.username}`}
                      placeholder="Enter Username"
                      autoComplete="current-username"
                      name="username"
                      value={formik.values.username}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.username && formik.touched.username ? (
                      <p style={{ color: "#7bcbdb" }}>
                        {formik.errors.username}
                      </p>
                    ) : null}
                  </div>

                  <div style={{ width: "100%" }}>
                    <input
                      className={`${style.input} ${style.phoneNumber}`}
                      type="tel"
                      pattern="^(\+994)(50|51|55|70|77|99)[0-9]{7}$"
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
                      <p style={{ color: "#7bcbdb" }}>
                        {formik.errors.phone_number}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div style={{ width: "100%", marginBottom: "25px" }}>
                  <input
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
                    <p style={{ color: "#7bcbdb" }}>{formik.errors.email}</p>
                  ) : null}
                </div>

                <div style={{ width: "100%", marginBottom: "25px" }}>
                  <input
                    className={`${style.input} ${style.password}`}
                    type={show ? "text" : "password"}
                    placeholder="Enter Password"
                    autoComplete="current-password"
                    name="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
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

                <div style={{ textAlign: "center" }}>
                  <button type="submit" className={style.submitBtn}>
                    {isLoading ? (
                      <span className={style.loader}></span>
                    ) : (
                      "create account"
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

export default Register;
