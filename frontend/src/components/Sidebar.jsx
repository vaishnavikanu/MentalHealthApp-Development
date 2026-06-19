import { NavLink, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

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
  darkMode,
  setSidebarOpen
})
 {
  const { t } = useLanguage();

  const navigate = useNavigate();
  const user =
  JSON.parse(
    localStorage.getItem("user")
  );
  const handleNavClick = () => {

  if (window.innerWidth < 900) {

    setSidebarOpen(false);

  }

};
const handleNewChat = () => {

  startNewChat();

  navigate("/");

  if (window.innerWidth < 900) {

    setSidebarOpen(false);

  }

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
        overflow-y-auto
        overflow-x-hidden
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
        {t("sidebar.newChat")}
      </button>

      {/* NAVIGATION */}
      <div className="flex flex-col gap-2.5">

  <NavLink to="/" className={navStyle} onClick={handleNavClick}>
    <FaComments />
    <span>{t("sidebar.chat")}</span>
  </NavLink>

  {user.role === "patient" && (
    <>
      <NavLink
        to="/checkin"
        className={navStyle}
        onClick={handleNavClick}
      >
        <FaSmile />
        <span>{t("sidebar.checkIn")}</span>
      </NavLink>

      <NavLink
        to="/moodtracker"
        className={navStyle}
        onClick={handleNavClick}
      >
        <FaChartLine />
        <span>{t("sidebar.moodTracker")}</span>
      </NavLink>

      <NavLink
        to="/journal"
        className={navStyle}
        onClick={handleNavClick}
      >
        <FaBook />
        <span>{t("sidebar.journal")}</span>
      </NavLink>

      <NavLink
        to="/history"
        className={navStyle}
        onClick={handleNavClick}
      >
        <FaHistory />
        <span>{t("sidebar.history")}</span>
      </NavLink>

      <NavLink
        to="/selfcare"
        className={navStyle}
        onClick={handleNavClick}
      >
        <FaHeart />
        <span>{t("sidebar.selfCare")}</span>
      </NavLink>
    </>
  )}

  {user.role === "doctor" && (
  <>
    <NavLink
      to="/patients"
      className={navStyle}
      onClick={handleNavClick}
    >
      <FaHistory />
      <span>{t("sidebar.patients")}</span>
    </NavLink>

    <NavLink
      to="/history"
      className={navStyle}
      onClick={handleNavClick}
    >
      <FaHistory />
      <span>{t("sidebar.history")}</span>
    </NavLink>
  </>
)}

  <NavLink
    to="/settings"
    className={navStyle}
    onClick={handleNavClick}
  >
    <FaCog />
    <span>{t("sidebar.settings")}</span>
  </NavLink>

</div>

      {/* HELPLINE COMPLETE BOX*/}
      <div
        className={`
          mt-6
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
          {t("helpline.emergency")}
          </span>

        </div>

        <p
          className={`text-sm transition-colors duration-300 ${
            darkMode
              ? "text-gray-300"
              : "text-gray-600"
          }`}
        >
        {t("helpline.title")}
        </p>

        <p className="text-xl font-bold text-red-500 mt-2">
          1800-599-0019
        </p>

      </div>

    </div>
  );
}

export default Sidebar;
