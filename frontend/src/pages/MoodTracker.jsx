import { useState, useEffect } from "react";
import API from "../api/api";
import MoodGraph from "../components/MoodGraph";
import {
  useLanguage
} from "../context/LanguageContext";
function MoodTracker({ darkMode }) {

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );
const { t } = useLanguage();

  const [moodEntries, setMoodEntries] =
    useState([]);


  const [showAll, setShowAll] =
    useState(false);

  // FETCH MOODS
  useEffect(() => {

    fetchMoods();

  }, []);

  
  const fetchMoods = async () => {

    try {

      const response =
        await API.get(`/moods/${user.id}`);

      

      setMoodEntries(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  // SHOW ONLY 5
  const displayedEntries =
    showAll
      ? moodEntries
      : moodEntries.slice(0, 5);

  return (

    //OVERALL CONTAINER
    <div
      className={`
        min-h-full
        px-3 md:px-6 lg:px-9
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
      <div
        className="
          flex
          flex-wrap
          justify-between
          items-start
          gap-4
          mb-8
        "
      >
        <div>
          <h1 className=" text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            {t("moodTracker.title")}
          </h1>
          <p
            className={`text-lg ${
              darkMode
                ? "text-gray-300"
                : "text-gray-500"
            }`}
          >
           {t("moodTracker.subtitle")}
          </p>

        </div>
      </div>
      {/*GRAPH SECTION*/}
      <div className="overflow-x-auto">

  <MoodGraph
        moods={moodEntries}
        darkMode={darkMode}
      />

</div>
      

      {/* RECENT ENTRIES */}
      <div className="flex items-center justify-between mb-5">

        <h2 className="text-3xl font-semibold">
          {t("moodTracker.recent")}
        </h2>

        {moodEntries.length > 5 && (

          <button
            onClick={() =>
              setShowAll(!showAll)
            }
            className="
               bg-[#2D6658]
               hover:bg-[#245246]
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

      {/* ENTRIES */}
      <div className="flex flex-col gap-4">

        {displayedEntries.map((entry) => (

          <div
            key={entry.id}
            className={`
              rounded-2xl
              p-5
              shadow-sm
              ${
                darkMode
                  ? "bg-[#1f2937]"
                  : "bg-white"
              }
            `}
          >

           <div className="   flex   flex-col   sm:flex-row   sm:items-center  sm:justify-between
                gap-3 mb-3">

              <div className="flex items-center justify-between w-full">

                <span className="text-5xl">
                  {entry.mood}
                </span>

                <div >
                  <p
                    className={`text-sm ${
                      darkMode
                        ? "text-gray-300"
                        : "text-gray-500"
                    }`}
                  >
                    {new Date(
                      entry.created_at
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

            </div>

            <p
              className={`text-sm ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >
              {entry.note}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MoodTracker;