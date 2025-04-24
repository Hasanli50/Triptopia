import * as yup from "yup";

const resetPasschema = yup.object({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .matches(/\d/, "Password must contain at least one number.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .required("Password is required!")
    .trim(),

  confirmPass: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.") // Ensure `confirmPass` matches `password`
    .required("Please confirm your password."),
});

export default resetPasschema;
