import { useState } from "react";
import API from "../api/api";
function Settings({
  darkMode,
  setDarkMode
}) {

  /* LOGGED USER */
  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  /* TEMP THEME */
  const [tempDarkMode, setTempDarkMode] =
    useState(darkMode);

  const [message, setMessage] =
    useState("");

  const [showChatPopup, setShowChatPopup] =
    useState(false);

  const [showDataPopup, setShowDataPopup] =
    useState(false);  

  /* SHOW MESSAGE */
  const showMessage = (text) => {

    setMessage(text);

    setTimeout(() => {

      setMessage("");

    }, 3000);
  };

  /* SAVE SETTINGS */
  const saveSettings = () => {

    setDarkMode(tempDarkMode);

    localStorage.setItem(
      "theme",
      tempDarkMode ? "dark" : "light"
    );

    showMessage(
      "Settings saved successfully!"
    );
  };

  /* CLEAR DATA */
  const clearAllData = async () => {

    try {

      await API.delete(
        `/clear-data/${user.id}`
      );

      showMessage(
        "All data cleared successfully!"
      );

    } catch (error) {

      console.log(error);

      showMessage(
        "Failed to clear data."
      );

    }

  };
  /*CLEAR CHAT HISTORY*/
  const clearChatHistory = async () => {


    try {

      await API.delete(
        `/clear-chat-history/${user.id}`
      );

      showMessage(
        "Chat history cleared!"
      );

    } catch (error) {

      console.log(error);

      showMessage(
        "Failed to clear chat history."
      );

    }

  };
  /* LOGOUT */
  const logoutUser = () => {

    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <>
          {showChatPopup && (

        <div className="
          fixed inset-0
          bg-black/50
          flex items-center justify-center
          z-50
        ">

          <div className={`
            w-[400px]
            rounded-3xl
            p-8
            ${
              darkMode
                ? "bg-[#1f2937] text-white"
                : "bg-white text-black"
            }
          `}>

            <h2 className="text-2xl font-bold mb-4">
              Clear Chat History
            </h2>

            <p className="mb-6">
              Are you sure you want to delete all chat history?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() =>
                  setShowChatPopup(false)
                }
                className="
                  px-5 py-2 rounded-xl
                  bg-gray-300 text-black
                "
              >
                Cancel
              </button>

              <button
                onClick={async () => {

                  setShowChatPopup(false);

                  await clearChatHistory();

                }}
                className="
                  px-5 py-2 rounded-xl
                  bg-red-500 text-white
                "
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}
      {showDataPopup && (

        <div className="
          fixed inset-0
          bg-black/50
          flex items-center justify-center
          z-50
        ">

          <div className={`
            w-[400px]
            rounded-3xl
            p-8
            ${
              darkMode
                ? "bg-[#1f2937] text-white"
                : "bg-white text-black"
            }
          `}>

            <h2 className="text-2xl font-bold mb-4">
              Clear All Data
            </h2>

            <p className="mb-6">
              This will permanently delete all your data.
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() =>
                  setShowDataPopup(false)
                }
                className="
                  px-5 py-2 rounded-xl
                  bg-gray-300 text-black
                "
              >
                Cancel
              </button>

              <button
                onClick={async () => {

                  setShowDataPopup(false);

                  await clearAllData();

                }}
                className="
                  px-5 py-2 rounded-xl
                  bg-red-500 text-white
                "
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}
    <div
      className={`
        min-h-full
        px-8
        py-6
        pb-20
        transition-all
        duration-300
        ${
          darkMode
            ? "bg-[#111827] text-white"
            : "bg-[#f5f5f7] text-black"
        }
      `}
    >

      {/* HEADING */}
      <h1 className="text-4xl font-bold mb-2">
        Settings
      </h1>

      <p
        className={`mb-8 ${
          darkMode
            ? "text-gray-300"
            : "text-gray-500"
        }`}
      >
        Manage your account and preferences.
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
            mb-6
            text-sm
            font-medium
          "
        >
          {message}
        </div>

      )}

      {/* PROFILE */}
      <div
        className={`
          rounded-2xl
          p-6
          mb-6
          ${
            darkMode
              ? "bg-[#1f2937]"
              : "bg-white"
          }
        `}
      >

        <h2 className="text-xl font-semibold mb-5">
          Profile
        </h2>

        <div className="flex flex-col gap-5">

          {/* NAME */}
          <div>

            <p
              className={`text-sm mb-1 ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-400"
              }`}
            >
              Name
            </p>

            <div
              className={`
                rounded-xl
                px-4
                py-3
                ${
                  darkMode
                    ? "bg-[#374151]"
                    : "bg-gray-50 border border-gray-200"
                }
              `}
            >
              {user?.username}
            </div>

          </div>

          {/* EMAIL */}
          <div>

            <p
              className={`text-sm mb-1 ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-400"
              }`}
            >
              Email
            </p>

            <div
              className={`
                rounded-xl
                px-4
                py-3
                ${
                  darkMode
                    ? "bg-[#374151]"
                    : "bg-gray-50 border border-gray-200"
                }
              `}
            >
              {user?.email}
            </div>

          </div>

        </div>

      </div>

      {/* PREFERENCES */}
      <div
        className={`
          rounded-2xl
          p-6
          mb-6
          ${
            darkMode
              ? "bg-[#1f2937]"
              : "bg-white"
          }
        `}
      >

        <h2 className="text-xl font-semibold mb-5">
          Preferences
        </h2>

        <div className="flex items-center justify-between">

          <div>

            <h3 className="font-medium">
              Dark Mode
            </h3>

            <p
              className={`text-sm ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-500"
              }`}
            >
              Enable dark appearance
            </p>

          </div>

          <button
            onClick={() =>
              setTempDarkMode(!tempDarkMode)
            }
            className={`
              w-14
              h-7
              rounded-full
              transition
              relative
              ${
                tempDarkMode
                  ? "bg-purple-600"
                  : "bg-gray-300"
              }
            `}
          >

            <div
              className={`
                absolute
                top-1
                w-5
                h-5
                bg-white
                rounded-full
                transition-all
                duration-300
                ${
                  tempDarkMode
                    ? "left-8"
                    : "left-1"
                }
              `}
            />

          </button>

        </div>

      </div>

      {/* DATA MANAGEMENT */}
      <div
        className={`
          rounded-2xl
          p-6
          mb-6
          ${
            darkMode
              ? "bg-[#1f2937]"
              : "bg-white"
          }
        `}
      >

        <h2 className="text-xl font-semibold mb-5">
          Data Management
        </h2>

        <div className="flex flex-col gap-4">

          <button
            onClick={() =>
              setShowChatPopup(true)
            }
            className={`
              px-5
              py-3
              rounded-xl
              text-left
              transition
              ${
                darkMode
                  ? "bg-[#374151]"
                  : "bg-gray-100"
              }
            `}
          >
            Clear Chat History
          </button>

          <button
            onClick={() =>
              setShowDataPopup(true)
            }
            className="
              bg-red-100
              hover:bg-red-200
              transition
              text-red-600
              px-5
              py-3
              rounded-xl
              text-left
            "
          >
            Clear All Data
          </button>

        </div>

      </div>

      {/* SUPPORT */}
      <div
        className={`
          rounded-2xl
          p-6
          mb-6
          ${
            darkMode
              ? "bg-[#1f2937]"
              : "bg-white"
          }
        `}
      >

        <h2 className="text-xl font-semibold mb-4">
          Help & Support
        </h2>

        <p
          className={`mb-3 ${
            darkMode
              ? "text-gray-300"
              : "text-gray-600"
          }`}
        >
          Need help? Contact our support team.
        </p>

        <div
          className={`
            rounded-xl
            px-4
            py-3
            font-medium
            ${
              darkMode
                ? "bg-[#374151]"
                : "bg-gray-100"
            }
          `}
        >
          📞 Support: +91 9876543210
        </div>

      </div>

      {/* TERMS */}
      <div
        className={`
          rounded-2xl
          p-6
          mb-8
          ${
            darkMode
              ? "bg-[#1f2937]"
              : "bg-white"
          }
        `}
      >

        <h2 className="text-xl font-semibold mb-5">
          Terms & Privacy
        </h2>

        <div className="flex flex-col gap-4">

          {/* PRIVACY */}
          <div
            className={`
              rounded-xl
              p-4
              ${
                darkMode
                  ? "bg-[#374151]"
                  : "bg-gray-100"
              }
            `}
          >

            <h3 className="font-semibold mb-2">
              Privacy Policy
            </h3>

            <p className="text-sm leading-6">
              Your journals, moods and emotional
              data are stored securely and are
              never shared with third parties.
            </p>

          </div>

          {/* TERMS */}
          <div
            className={`
              rounded-xl
              p-4
              ${
                darkMode
                  ? "bg-[#374151]"
                  : "bg-gray-100"
              }
            `}
          >

            <h3 className="font-semibold mb-2">
              Terms & Conditions
            </h3>

            <p className="text-sm leading-6">
              Mindful Ally provides emotional
              wellness support and is not a
              replacement for professional
              medical advice.
            </p>

          </div>

        </div>

      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 flex-wrap">

        {/* SAVE */}
        <button
          onClick={saveSettings}
          className="
            bg-purple-600
            hover:bg-purple-700
            transition
            text-white
            px-6
            py-3
            rounded-xl
            text-base
          "
        >
          Save Settings
        </button>

        {/* LOGOUT */}
        <button
          onClick={logoutUser}
          className="
            bg-red-500
            hover:bg-red-600
            transition
            text-white
            px-6
            py-3
            rounded-xl
            text-base
          "
        >
          Logout
        </button>

      </div>

    </div>
    </>
  );
}

export default Settings;