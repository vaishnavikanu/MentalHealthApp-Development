import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

function Login({ darkMode }) {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
  useState("patient");

  const [message, setMessage] =
    useState("");

  const loginUser = async () => {

    if (!email || !password) {

      setMessage(
        "Please fill all fields."
      );

      return;
    }

    try {

      const response =
        await API.post(
          "/login",
          {
            email,
            password,
            role
          }
        );

      if (
        response.data.message ===
          "User not found" ||

        response.data.message ===
          "Incorrect password"
      ) {

        setMessage(
          response.data.message
        );

        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      setMessage(
        "Login successful!"
      );

      setTimeout(() => {

        window.location.href = "/";

      }, 1000);

    } catch (error) {

      console.log(error);

      setMessage(
        "Login failed."
      );

    }

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    loginUser();

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
        transition-all
        duration-300
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
          p-5
          shadow-lg
          transition-all
          duration-300
          ${
            darkMode
              ? "bg-[#1f2937] text-white"
              : "bg-white text-black"
          }
        `}
      >

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-2">
          Welcome Back
        </h1>

        <p
          className={`mb-8 ${
            darkMode
              ? "text-gray-300"
              : "text-gray-500"
          }`}
        >
          Login to continue.
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
              font-medium
            "
          >
            {message}
          </div>

        )}

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
            transition-all
            ${
              darkMode
                ? "bg-[#374151] text-white placeholder-gray-400"
                : "bg-gray-100 text-black"
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
              null,
              emailRef
            )
          }
          className={`
            w-full
            px-4
            py-3
            rounded-xl
            outline-none
            mb-6
            transition-all
            ${
              darkMode
                ? "bg-[#374151] text-white placeholder-gray-400"
                : "bg-gray-100 text-black"
            }
          `}
        />

        <div className="mb-6">

          <p className="mb-3 font-medium">
            Login As
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

        {/* LOGIN BUTTON */}
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
          Login
        </button>

        {/* SIGNUP LINK */}
        <p
          className={`text-sm text-center ${
            darkMode
              ? "text-gray-300"
              : "text-gray-500"
          }`}
        >
          Don't have an account?{" "}

          <Link
            to="/signup"
            className="
              text-purple-600
              font-medium
              hover:underline
            "
          >
            Sign Up
          </Link>

        </p>

      </form>

    </div>

  );
}

export default Login;