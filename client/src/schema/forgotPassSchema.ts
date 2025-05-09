import * as yup from "yup";

const forgotPassSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email adress")
    .matches(
      /@gmail\.com$|@mail\.ru$/,
      "Email must be from either Gmail or Mail.ru."
    )
    .required("Email is required!")
    .trim(),
});

export default forgotPassSchema;
