import * as yup from "yup";

const resendOtpSchema = yup.object({
  verificationCode: yup
    .string()
    .matches(/^\d{6}$/, "You must enter exactly 6 digits")
    .required("OTP verificatioon code is required!"),
});

export default resendOtpSchema;
