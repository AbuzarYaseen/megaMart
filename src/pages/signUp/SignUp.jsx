import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./signUp.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import hide from "../../assets/hide.svg";

const signUpSchema = yup.object({
  firstName: yup
    .string()
    .required(
      "Hold on! First name required."
    )
    .matches(/^[A-Za-z]/, "Hold on! First name can only include letters."),
  lastName: yup
    .string()
    .required(
      "Hold on! Last name required"
    )
    .matches(/^[A-Za-z]/, "Hold on! Last name can only include letters."),
  email: yup
    .string()
    .email()
    .required(
      "Hold on! Something may be missing. It should look something like this “johndoe@gmail.com”"
    ),
  password: yup
    .string()
    .min(5)
    .required(
      "Password must include at least one alphabet, one number, and one special character"
    )
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must include at least one alphabet, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password is empty")
    .oneOf([yup.ref("password")], "Password not matched"),
});

const SignUp = () => {
  const navigate = useNavigate();

  const onSubmit = (values, { resetForm }) => {
    toast.success("Congratulations Sign up successfull !", {
      position: "top-right",
      onClose: () => {
        // Reset the form after the toast is closed
        resetForm();

        // Navigate to signIn screen after a delay
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      },
    });
    // Store the user data in local storage
    localStorage.setItem("userData", JSON.stringify(values));
    console.log(JSON.stringify(values));
    // resetForm();
  };
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: onSubmit,
    validationSchema: signUpSchema,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div className="container">
        <p className="title">MegaMart Sign Up</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="outer-handler">
            <label className="names">First Name</label>
            <input
              className={`namesInput  ${
                touched.firstName && errors.firstName ? "errorInputColor" : ""
              }`}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter first name"
              onChange={handleChange}
              onBlur={() => setFieldTouched("firstName")}
              value={values.firstName}
            />
            {touched.firstName && errors.firstName && (
              <div className="errorMessages">{errors.firstName}</div>
            )}
          </div>

          <div className="outer-handler">
            <label className="names">Last Name</label>
            <input
              className={`namesInput  ${
                touched.lastName && errors.lastName ? "errorInputColor" : ""
              }`}
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter last name"
              onChange={handleChange}
              onBlur={() => setFieldTouched("lastName")}
              value={values.lastName}
            />
            {touched.lastName && errors.lastName && (
              <div className="errorMessages">{errors.lastName}</div>
            )}
          </div>

          <div className="outer-handler">
            <label className="names">Email</label>
            <input
              className={`namesInput  ${
                touched.email && errors.email ? "errorInputColor" : ""
              }`}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              onBlur={() => setFieldTouched("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <div className="errorMessages">{errors.email}</div>
            )}
          </div>

          <div className="outer-handler">
            <label className="names">Password</label>
            <input
              className={`namesInput  ${
                touched.password && errors.password ? "errorInputColor" : ""
              }`}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="**********"
              onChange={handleChange}
              onBlur={() => setFieldTouched("password")}
              value={values.password}
            />

            <img
              src={hide}
              alt="Hide Password"
              className="hide-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
            {touched.password && errors.password && (
              <div className="errorMessages">{errors.password}</div>
            )}
          </div>

          <div className="outer-handler">
            <label className="names">Comfirm Password</label>
            <input
              className={`namesInput  ${
                touched.confirmPassword && errors.confirmPassword
                  ? "errorInputColor"
                  : ""
              }`}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="**********"
              onChange={handleChange}
              onBlur={() => setFieldTouched("confirmPassword")}
              value={values.confirmPassword}
            />
            <img
              src={hide}
              alt="Hide Password"
              className="hide-password-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <div className="errorMessages">{errors.confirmPassword}</div>
            )}
          </div>

          <button className="signUpbutton" type="submit">
            Submit
          </button>
        </form>

        <div className="terms">
          <span>
            By signing up, you are creating a Noshly account and agree to
            Noshly’s
            <a href="" className="terms-privacy-signin-link">
              Terms{" "}
            </a>
            and
            <a href="" className="terms-privacy-signin-link">
              {" "}
              Privacy Policy{" "}
            </a>
          </span>
        </div>

        <div className="signIn-text">
          <span>Already have an account?</span>
          <a
            href=""
            className="signIn-link"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign in
          </a>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
