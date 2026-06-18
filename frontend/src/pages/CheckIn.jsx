import { useState, useEffect } from "react";
import API from "../api/api";
import {
  useLanguage
} from "../context/LanguageContext";
function CheckIn({ darkMode }) {

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );
  const { t } = useLanguage();

  const moods = [
    "😊",
    "😔",
    "😡",
    "😰",
    "😴",
    "😍"
  ];

  const [selectedMood, setSelectedMood] =
    useState("");

  const [note, setNote] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [recentCheckins, setRecentCheckins] =
    useState([]);

  const [showAll, setShowAll] =
    useState(false);

  /* FETCH CHECKINS */
  const fetchCheckins = async () => {

    try {

      const response =
        await API.get(`/moods/${user.id}`);

      const formattedData =
        response.data.map((item) => ({

          mood: item.mood,

          note: item.note,

          date: new Date(
            item.created_at
          ).toLocaleDateString(),

          time: new Date(
            item.created_at
          ).toLocaleTimeString()

        }));

      setRecentCheckins(
        formattedData.reverse()
      );

    } catch (error) {

      console.log(error);

    }

  };

  /* LOAD ON PAGE OPEN */
  useEffect(() => {

    fetchCheckins();

  }, []);

  /* SAVE CHECKIN */
  const saveCheckIn = async () => {

    if (!selectedMood) {
    setMessage(
    t("checkin.selectMood")
    );
      /*TIME THE MSG STAY ON SCREEN*/
      setTimeout(() => {

        setMessage("");

      }, 3000);

      return;
    }

    try {

      /* SEND TO BACKEND */
      await API.post("/mood", {

        user_id: user.id,

        mood: selectedMood,

        note: note

      });

      /* REFRESH RECENT CHECKIN DATA */
      await fetchCheckins();

      setMessage(
  t("checkin.saved")
);

      setSelectedMood("");

      setNote("");

      setTimeout(() => {

        setMessage("");

      }, 3000);

    } catch (error) {

      console.log(error);

      setMessage(
  t("checkin.failed")
);

    }

  };

  /* SHOW ONLY 5 */
  const displayedEntries =
    showAll
      ? recentCheckins
      : recentCheckins.slice(0, 5);

  return (

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
      <h1 className="text-5xl font-bold mb-2">
        {t("checkin.title")}
      </h1>

      <p
        className={`text-lg mb-8 ${
          darkMode
            ? "text-gray-300"
            : "text-gray-500"
        }`}
      >
        {t("checkin.subtitle")}
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

      {/* MOOD CARD */}
      <div
        className={`
          rounded-3xl
          p-5
          mb-8
          ${
            darkMode
              ? "bg-[#1f2937]"
              : "bg-white"
          }
        `}
      >

        <h2 className="text-3xl font-semibold mb-6">
          {t("checkin.howFeeling")}
        </h2>

        <div className="flex gap-5 flex-wrap">

          {moods.map((mood, index) => (

            <button
              key={index}
              onClick={() =>
                setSelectedMood(mood)
              }
              className={`
                text-4xl
                p-5
                rounded-2xl
                transition
                ${
                  selectedMood === mood
                    ? "bg-purple-600 scale-110"
                    : darkMode
                    ? "bg-[#374151]"
                    : "bg-gray-100"
                }
              `}
            >
              {mood}
            </button>

          ))}

        </div>

      </div>

      {/* NOTE CARD */}
      <div
        className={`
          rounded-3xl
          p-5
          mb-8
          ${
            darkMode
              ? "bg-[#1f2937]"
              : "bg-white"
          }
        `}
      >

        <h2 className="text-3xl font-semibold mb-5">
          {t("checkin.addNote")}
        </h2>

        <textarea
          rows={6}
          placeholder={t("checkin.notePlaceholder")}
          value={note}
          onChange={(e) =>
            setNote(e.target.value)
          }
          className={`
            w-full
            rounded-2xl
            p-5
            outline-none
            resize-none
            mb-5
            transition-all
            ${
              darkMode
                ? "bg-[#374151] text-white placeholder-gray-400 border border-gray-600"
                : "bg-white text-black border border-gray-300"
            }
          `}
        />

        <button
          onClick={saveCheckIn}
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
         {t("checkin.save")}
        </button>

      </div>

      {/* RECENT HEADER */}
      <div className="flex items-center justify-between mb-5">

        <h2 className="text-3xl font-semibold">
          {t("checkin.recent")}
        </h2>

        {recentCheckins.length > 5 && (

          <button
            onClick={() =>
              setShowAll(!showAll)
            }
            className="
              bg-purple-600
              hover:bg-purple-700
              transition
              text-white
              px-4
              py-2
              rounded-xl
              text-sm
            "
          >
            {showAll
              ? t("common.showLess")
              : t("common.seeMore")}
          </button>

        )}

      </div>

      {/* RECENT ENTRIES */}
      <div className="flex flex-col gap-4">

        {displayedEntries.map((item, index) => (

          <div
            key={index}
            className={`
              rounded-2xl
              p-5
              ${
                darkMode
                  ? "bg-[#1f2937]"
                  : "bg-white"
              }
            `}
          >

            <div className="flex justify-between mb-3">

              <span className="text-5xl">
                {item.mood}
              </span>

              <div
                className={`text-sm text-right ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >

                <p>{item.date}</p>

                <p>{item.time}</p>

              </div>

            </div>

            <p
              className={`text-sm ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >
              {item.note}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default CheckIn;