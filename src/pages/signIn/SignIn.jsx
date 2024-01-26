import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./signIn.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// images
import hide from "../../assets/hide.svg";
import googleLogo from "../../assets/googleLogo.svg";
import appleLogo from "../../assets/appleLogo.svg";

const signUpSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(
      "Email required."
    ),
  password: yup.string().min(5).required("Password required."),
});

const SignIn = () => {
  // React Router hook for navigation
  const navigate = useNavigate();
  // Formik hooks for form handling
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const storedData = JSON.parse(localStorage.getItem("userData"));

      if (storedData) {
        // Compare entered email and password with stored data
        if (
          values.email === storedData.email &&
          values.password === storedData.password
        ) {
          //add signin data to new key
          sessionStorage.setItem("userLogin", JSON.stringify(values));
          console.log(JSON.stringify("login data:",values));
          toast.success("Logging in!", {
            position: "top-right",
            onClose: () => {
              navigate("/home");
            },
          });
          


          // console.log("login successful", storedData);
        } else {
          toast.warning("Email/password not correct!", {
            position: "bottom-center",
          });
          console.log("email/password not correct");
        }
      } else {
        toast.error("User not found!", {
          position: "bottom-center",
        });
        console.log("user not found");
      }
    },
    // Validation schema
    validationSchema: signUpSchema,
  });

  const [showPassword, setShowPassword] = useState(false);

  

  return (
    <>
      <div className="container">
        <p className="title">MegaMart Sign in</p>

        <button className="Googlebutton">
          <div className="continueWithGoogle_inner">
            <img src={googleLogo} alt="Google Logo" />
            Continue with Google
          </div>
        </button>

        <button className="Applebutton">
          <div className="continueWithApple_inner">
            <img src={appleLogo} alt="Apple Logo" />
            Continue with Apple
          </div>
        </button>

        <div className="or">
          <p>OR</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
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
            {touched.email && errors.email && (
              <div className="errorMessages">{errors.password}</div>
            )}
          </div>

          <button className="signInbutton"  type="submit">
            SignIn
          </button>

          <div className="signUp-text">
            <span>Don’t have an account?</span>
            <a
              href=""
              className="signUp-link"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
      {/* Toast container for displaying notifications */}
      <ToastContainer />
    </>
  );
};

export default SignIn;
