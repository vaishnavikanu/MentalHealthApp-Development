import { NavLink, useNavigate } from "react-router-dom";

import {
  FaComments,
  FaSmile,
  FaChartLine,
  FaBook,
  FaHistory,
  FaHeart,
  FaCog,
  FaPhone,
  FaPlus
} from "react-icons/fa";

function Sidebar({
  startNewChat,
  darkMode
}) {

  const navigate = useNavigate();
  const user =
  JSON.parse(
    localStorage.getItem("user")
  );
  const handleNewChat = () => {
    startNewChat();
    navigate("/");
  };

  const navStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition text-[15px]
    ${
      isActive
        ? "bg-purple-100 text-purple-700 font-medium"
        : darkMode
        ? "hover:bg-[#374151] text-gray-200"
        : "hover:bg-gray-100 text-gray-700"
    }`;

  return (

    //THE MAIN DIV EVERYTHING IS INSIDE IT
    <div
      className={`
        h-full
        flex
        flex-col
        p-4
        transition-all
        duration-300
        ${
          darkMode
            ? "bg-[#1f2937]"
            : "bg-white"
        }
      `}
    >

      {/* LOGO */}
      <h1 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
        darkMode ? "text-purple-400" : "text-purple-600"
      }`}>
        Health buddy
      </h1>

      {/* NEW CHAT */}
      <button
        onClick={handleNewChat}
        className={`
          flex
          items-center
          justify-center
          gap-2
          transition
          text-white
          py-3
          rounded-xl
          mb-6
          text-base
          ${
            darkMode
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-purple-600 hover:bg-purple-700"
          }
        `}
      >
        <FaPlus />
        New Chat
      </button>

      {/* NAVIGATION */}
      <div className="flex flex-col gap-2.5">

  <NavLink to="/" className={navStyle}>
    <FaComments />
    <span>Chat</span>
  </NavLink>

  {user.role === "patient" && (
    <>
      <NavLink
        to="/checkin"
        className={navStyle}
      >
        <FaSmile />
        <span>Check-In</span>
      </NavLink>

      <NavLink
        to="/moodtracker"
        className={navStyle}
      >
        <FaChartLine />
        <span>Mood Tracker</span>
      </NavLink>

      <NavLink
        to="/journal"
        className={navStyle}
      >
        <FaBook />
        <span>Journal</span>
      </NavLink>

      <NavLink
        to="/history"
        className={navStyle}
      >
        <FaHistory />
        <span>History</span>
      </NavLink>

      <NavLink
        to="/selfcare"
        className={navStyle}
      >
        <FaHeart />
        <span>Self-Care</span>
      </NavLink>
    </>
  )}

  {user.role === "doctor" && (
  <>
    <NavLink
      to="/patients"
      className={navStyle}
    >
      <FaHistory />
      <span>Patients</span>
    </NavLink>
  </>
)}

  <NavLink
    to="/settings"
    className={navStyle}
  >
    <FaCog />
    <span>Settings</span>
  </NavLink>

</div>

      {/* HELPLINE COMPLETE BOX*/}
      <div
        className={`
          mt-auto
          rounded-xl
          p-3
          border
          transition-all
          duration-300
          ${
            darkMode
              ? "bg-[#111827] border-red-500"
              : "bg-red-50 border-red-200"
          }
        `}
      >
        {/* THE FIRST LINE*/}
        <div className="flex items-center gap-2 text-red-500 mb-2">

          <FaPhone />

          <span className="font-semibold text-sm">
            Emergency Help
          </span>

        </div>

        <p
          className={`text-sm transition-colors duration-300 ${
            darkMode
              ? "text-gray-300"
              : "text-gray-600"
          }`}
        >
          Mental Health Helpline
        </p>

        <p className="text-xl font-bold text-red-500 mt-2">
          1800-599-0019
        </p>

      </div>

    </div>
  );
}

export default Sidebar;
