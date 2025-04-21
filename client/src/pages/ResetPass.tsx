import { useState } from "react";
import style from "../assets/style/reset-pass.module.scss";
import { Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import { useResetPasswordMutation } from "../api/slice/userApi";
import { AxiosError } from "axios";
import { ErrorMessageType } from "../types";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

type ValuesType = {
  password: string;
  confirmPass: string;
  token: string;
};
const ResetPass = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [resetPassword, { isLoading, isError }] = useResetPasswordMutation();
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const formik = useFormik<ValuesType>({
    initialValues: {
      password: "",
      confirmPass: "",
      token: token || "",
    },
    onSubmit: async (values, actions) => {
      try {
        const data = {
          password: values.password,
          confirmPass: values.confirmPass,
          token: values.token,
        };
        await resetPassword(data).unwrap();
        actions.resetForm();
        toast.success("Password successfully reset!");
        setTimeout(() => {
          navigate("/login");
        }, 300);
      } catch (error) {
        if (isError) {
          const axiosError = error as AxiosError;
          const errorData = axiosError.response?.data as ErrorMessageType;
          console.log("Occurred error: ", errorData?.message);
        }
        console.log(error);
        toast.error("Something went wrong. Please try again.");
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className={style.resetPass}>
        <div className={style.container}>
          <div className={style.box}>
            <p className={style.heading}>reset password</p>
            <p className={style.sentence}>
              Please enter password and confirm password:
            </p>
            <form className={style.form} onSubmit={formik.handleSubmit}>
              <div className={style.inputBox}>
                <input
                  className={style.input}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type={showPass ? "text" : "password"}
                  placeholder="Enter password"
                />
                {formik.errors.password && formik.touched.password ? (
                  <p style={{ color: "#ff7e01" }}>{formik.errors.password}</p>
                ) : null}
                {showPass ? (
                  <span onClick={() => setShowPass(false)}>
                    {" "}
                    <Eye className={style.firstPassState} />
                  </span>
                ) : (
                  <span onClick={() => setShowPass(true)}>
                    {" "}
                    <EyeOff className={style.firstPassState} />
                  </span>
                )}
              </div>

              <div className={style.inputBox}>
                <input
                  className={style.input}
                  name="confirmPass"
                  value={formik.values.confirmPass}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Enter confirm password"
                />
                {showConfirmPass ? (
                  <span onClick={() => setShowConfirmPass(false)}>
                    {" "}
                    <Eye className={style.secondPassState} />
                  </span>
                ) : (
                  <span onClick={() => setShowConfirmPass(true)}>
                    {" "}
                    <EyeOff className={style.secondPassState} />
                  </span>
                )}
                {formik.errors.confirmPass && formik.touched.confirmPass ? (
                  <p style={{ color: "#ff7e01" }}>
                    {formik.errors.confirmPass}
                  </p>
                ) : null}
              </div>

              <button type="submit" className={style.resetBtn}>
                {isLoading ? (
                  <span className={style.loader}></span>
                ) : (
                  "reset password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPass;
