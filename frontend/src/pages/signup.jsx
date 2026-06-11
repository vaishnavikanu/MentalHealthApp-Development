import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

function Signup({ darkMode }) {

  const navigate = useNavigate();

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [role, setRole] =
  useState("patient");

  const [message, setMessage] =
    useState("");

  const signupUser = async () => {

    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      setMessage(
        "Please fill all fields."
      );

      return;
    }

    if (
      password !== confirmPassword
    ) {

      setMessage(
        "Passwords do not match."
      );

      return;
    }

    try {

      const response =
        await API.post(
          "/signup",
          {
            username,
            email,
            password,
            role
          }
        );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      setMessage(
        "Signup successful!"
      );

      setTimeout(() => {

        window.location.href = "/";

      }, 1000);

    } catch (error) {

      console.log(error);

      setMessage(
        "Signup failed."
      );

    }

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    signupUser();

  };

  const handleArrowNavigation = (
    e,
    nextRef,
    prevRef
  ) => {

    if (
      e.key === "ArrowDown" &&
      nextRef
    ) {

      e.preventDefault();

      nextRef.current.focus();

    }

    if (
      e.key === "ArrowUp" &&
      prevRef
    ) {

      e.preventDefault();

      prevRef.current.focus();

    }

  };

  return (

    <div
      className={`
        min-h-screen
        flex
        items-center
        justify-center
        px-6
        ${
          darkMode
            ? "bg-[#111827]"
            : "bg-[#f5f5f7]"
        }
      `}
    >

      <form
        onSubmit={handleSubmit}
        className={`
          w-full
          max-w-md
          rounded-3xl
          p-8
          shadow-lg
          ${
            darkMode
              ? "bg-[#1f2937] text-white"
              : "bg-white text-black"
          }
        `}
      >

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-2">
          Create Account
        </h1>

        <p
          className={`mb-8 ${
            darkMode
              ? "text-gray-300"
              : "text-gray-500"
          }`}
        >
          Sign up to continue.
        </p>

        {/* MESSAGE */}
        {message && (

          <div
            className="
              bg-purple-100
              text-purple-700
              px-4
              py-3
              rounded-xl
              mb-5
              text-sm
            "
          >
            {message}
          </div>

        )}

        {/* USERNAME */}
        <input
          ref={usernameRef}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          onKeyDown={(e) =>
            handleArrowNavigation(
              e,
              emailRef,
              null
            )
          }
          className={`
            w-full
            px-4
            py-3
            rounded-xl
            outline-none
            mb-4
            ${
              darkMode
                ? "bg-[#374151] text-white"
                : "bg-gray-100"
            }
          `}
        />

        {/* EMAIL */}
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          onKeyDown={(e) =>
            handleArrowNavigation(
              e,
              passwordRef,
              usernameRef
            )
          }
          className={`
            w-full
            px-4
            py-3
            rounded-xl
            outline-none
            mb-4
            ${
              darkMode
                ? "bg-[#374151] text-white"
                : "bg-gray-100"
            }
          `}
        />

        {/* PASSWORD */}
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          onKeyDown={(e) =>
            handleArrowNavigation(
              e,
              confirmPasswordRef,
              emailRef
            )
          }
          className={`
            w-full
            px-4
            py-3
            rounded-xl
            outline-none
            mb-4
            ${
              darkMode
                ? "bg-[#374151] text-white"
                : "bg-gray-100"
            }
          `}
        />

        {/* CONFIRM PASSWORD */}
        <input
          ref={confirmPasswordRef}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          onKeyDown={(e) =>
            handleArrowNavigation(
              e,
              null,
              passwordRef
            )
          }
          className={`
            w-full
            px-4
            py-3
            rounded-xl
            outline-none
            mb-6
            ${
              darkMode
                ? "bg-[#374151] text-white"
                : "bg-gray-100"
            }
          `}
        />
        
        <div className="mb-6">

          <p className="mb-3 font-medium">
            Sign Up As
          </p>

          <div className="flex gap-4">

            <label className="flex items-center gap-2">

              <input
                type="radio"
                value="patient"
                checked={role === "patient"}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              />

              Patient

            </label>

            <label className="flex items-center gap-2">

              <input
                type="radio"
                value="doctor"
                checked={role === "doctor"}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              />

              Doctor

            </label>

          </div>

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="
            w-full
            bg-purple-600
            hover:bg-purple-700
            transition
            text-white
            py-3
            rounded-xl
            font-medium
            mb-5
          "
        >
          Sign Up
        </button>

        {/* LOGIN LINK */}
        <p
          className={`text-sm text-center ${
            darkMode
              ? "text-gray-300"
              : "text-gray-500"
          }`}
        >
          Already have an account?{" "}

          <Link
            to="/login"
            className="
              text-purple-600
              font-medium
            "
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Signup;