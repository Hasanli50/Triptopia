import * as yup from "yup";

const userLoginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email adress")
    .matches(
      /@gmail\.com$|@mail\.ru$/,
      "Email must be from either Gmail or Mail.ru."
    )
    .required("Email is required!")
    .trim(),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .matches(/\d/, "Password must contain at least one number.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .required("Password is required!")
    .trim(),
});

export default userLoginSchema;
