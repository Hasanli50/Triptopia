import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import style from "../../assets/style/user/verify-account.module.scss";
import {
  useGetUserByTokenFromParamsQuery,
  useResendOtpMutation,
  useVerifyAccountMutation,
} from "../../api/slice/userApi";
import toast from "react-hot-toast";
import { Flex, Input } from "antd";
import { useNavigate, useParams } from "react-router";
import { skipToken } from "@reduxjs/toolkit/query";
import resendOtpSchema from "../../schema/resendOtpSchema";
import verifiedImage from "../../assets/photo/Verified-pana.svg";

type valuType = {
  verificationCode: string;
};
const VerifyAccount: React.FC = () => {
  const [shouldResend, setShouldResend] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [resendTrigger, setResendTrigger] = useState(0);
  const { token } = useParams<{ token?: string }>();
  const [resendOtp, { isLoading }] = useResendOtpMutation();
  const { data: user } = useGetUserByTokenFromParamsQuery(
    token ? { token } : skipToken
  );
  const id = user?.data?.id;
  const [verifyAccount] = useVerifyAccountMutation();
  const navigate = useNavigate();

  const formik = useFormik<valuType>({
    initialValues: {
      verificationCode: "",
    },
    onSubmit: async (values, actions) => {
      if (!token) {
        toast.error("Invalid or missing token.");
        return;
      }
      try {
        const user = {
          verificationCode: values.verificationCode,
          token,
        };
        const data = await verifyAccount(user).unwrap();

        console.log("API Response:", data);
        actions.resetForm();
        toast.success("Your account successfully verified!");
        setTimeout(() => {
          navigate("/login");
        }, 300);
      } catch (error: unknown) {
        const err = error as { data?: { message?: string } };
        console.log("Occurred error: ", err.data?.message);
        toast.error(
          err.data?.message || "Email or password is wrong. Please try again."
        );
        actions.setSubmitting(false);
      }
    },
    validationSchema: resendOtpSchema,
  });
  useEffect(() => {
    setTimeLeft(60);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) clearInterval(interval);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTrigger]);

  useEffect(() => {
    const resend = async () => {
      if (!id) {
        toast.error("User ID is missing. Cannot resend OTP.");
        return;
      }
      try {
        await resendOtp({ id }).unwrap();
        toast.success("Opt verification code successfully resend!");
        setResendTrigger((prev) => prev + 1);
      } catch (error: unknown) {
        const err = error as { data?: { message?: string } };
        console.error(err.data?.message);
      }
    };
    if (shouldResend) {
      resend();
      setShouldResend(false);
    }
  }, [shouldResend, id, resendOtp]);

  return (
    <>
      {user?.data?.isVerified ? (
        <div className={style.imgBox}>
          <img className={style.img} src={verifiedImage} alt="verified image" />
        </div>
      ) : (
        <div className={style.verifyAccount}>
          <div className={style.container}>
            <div className={style.box}>
              <p className={style.heading}>OTP Verification</p>
              <p className={style.sentence}>Please enter your otp code:</p>
              <form onSubmit={formik.handleSubmit} className={style.form}>
                <div className={style.inputBox}>
                  <Flex gap="middle" align="flex-start" vertical>
                    <Input.OTP
                      type="string"
                      value={formik.values.verificationCode}
                      onChange={(val) =>
                        formik.setFieldValue("verificationCode", val)
                      }
                      onBlur={() =>
                        formik.setFieldTouched("verificationCode", true)
                      }
                      formatter={(str) => str.toUpperCase()}
                    />
                  </Flex>
                  {formik.errors.verificationCode &&
                  formik.touched.verificationCode ? (
                    <p style={{ color: "#ff7e01", marginTop: "5px" }}>
                      {formik.errors.verificationCode}
                    </p>
                  ) : null}
                </div>
                <p className={style.paragraph}>
                  Don't recive the OTP?{" "}
                  <span
                    className={style.resendCode}
                    onClick={() => setShouldResend(true)}
                  >
                    resend otp
                  </span>
                </p>
                {timeLeft === 0 ? (
                  " "
                ) : (
                  <p className={style.leftTimeMessage}>
                    You have {timeLeft} seconds to enter the code.
                  </p>
                )}
                <button className={style.confirmBtn} type="submit">
                  {isLoading ? (
                    <span className={style.loader}></span>
                  ) : (
                    "confirm"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyAccount;
