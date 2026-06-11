import { useState, useEffect } from "react";
import API from "../api/api";
import MoodGraph from "../components/MoodGraph";
function MoodTracker({ darkMode }) {

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );


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

      const moods =
        response.data.reverse();

      setMoodEntries(moods);

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
        px-9
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
            Mood Tracker
          </h1>
          <p
            className={`text-lg ${
              darkMode
                ? "text-gray-300"
                : "text-gray-500"
            }`}
          >
            Track your emotional well-being.
          </p>

        </div>
      </div>
      {/*GRAPH SECTION*/}
      <MoodGraph
        moods={moodEntries}
        darkMode={darkMode}
      />

      {/* RECENT ENTRIES */}
      <div className="flex items-center justify-between mb-5">

        <h2 className="text-3xl font-semibold">
          Recent Mood Entries
        </h2>

        {moodEntries.length > 5 && (

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
              ? "Show Less"
              : "See More"}
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

            <div className="flex items-center justify-between mb-3">

              <div className="flex items-center gap-3">

                <span className="text-5xl">
                  {entry.mood}
                </span>

                <div>

                  <h3 className="font-semibold text-lg">
                    Mood Entry
                  </h3>

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