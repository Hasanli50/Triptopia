import * as yup from "yup";

const userRegisterSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Must be 3 characters or more")
    .max(15, "Must be 15 characters or less")
    .trim()
    .required("Username is required!"),
  phone_number: yup
    .string()
    .matches(
      /^(\+994)(50|51|55|70|77|99|10)[0-9]{7}$/,
      "Invalid Azerbaijani phone number"
    )
    .required("Phone number is required")

    .trim(),
  email: yup
    .string()
    .email("Invalid email address")
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

export default userRegisterSchema;
