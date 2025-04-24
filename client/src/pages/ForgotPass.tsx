import { useFormik } from "formik";
import style from "../assets/style/forgot-password.module.scss";
import { AxiosError } from "axios";
import { ErrorMessageType } from "../types";
import forgotPasschema from "../schema/forgotPass";
import { useForgotPasswordMutation } from "../api/slice/userApi";
import toast from "react-hot-toast";
import { saveToken } from "../utils/localeStorage";

type valuType = {
  email: string;
};
const ForgotPass: React.FC = () => {
  const [forgotPassword, { isError, isLoading }] = useForgotPasswordMutation();
  const formik = useFormik<valuType>({
    initialValues: {
      email: "",
    },
    onSubmit: async (values, actions) => {
      try {
        const user = { email: values.email };
        const data = await forgotPassword(user).unwrap();
        console.log("API Response:", data);
        const token = data.token;
        saveToken(token);
        actions.resetForm();
        toast.success("We send message to your email. Please check.");
      } catch (error: unknown) {
        if (isError) {
          const axiosError = error as AxiosError;
          const errorData = axiosError.response?.data as ErrorMessageType;
          console.log("Occurred error: ", errorData?.message);
          console.log(error);
          toast.error("Something went wrong. Please try again.");
        }
        actions.setSubmitting(false);
      }
    },
    validationSchema: forgotPasschema,
  });
  return (
    <>
      <div className={style.forgotPass}>
        <div className={style.container}>
          <div className={style.box}>
            <p className={style.heading}>forgot password</p>
            <p className={style.sentence}>
              Please enter your email to reset the password:
            </p>
            <form onSubmit={formik.handleSubmit} className={style.form}>
              <div className={style.inputBox}>
                <input
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={style.input}
                  placeholder="Enter your email"
                  type="text"
                />
                {formik.errors.email && formik.touched.email ? (
                  <p style={{ color: "#ff7e01" }}>{formik.errors.email}</p>
                ) : null}
              </div>
              <button className={style.resetBtn} type="submit">
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

export default ForgotPass;
