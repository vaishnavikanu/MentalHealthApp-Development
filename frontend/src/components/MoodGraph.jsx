import { useState, useEffect } from "react";

function MoodGraph({
  moods,
  darkMode
}) {

  const [selected, setSelected] =
    useState("Weekly");

  const [selectedPeriod, setSelectedPeriod] =
    useState("Current");
//STORE GRAPH VALUES WITH DAY
  const [graphData, setGraphData] =
    useState([]);

//UPDATES GRAPH WHEN BUTTON CHANGES
  useEffect(() => {

    generateGraphData(moods);

  }, [
    moods,
    selected,
    selectedPeriod
  ]);
  
  // GENERATE GRAPH
  const generateGraphData = (data) => {

    const moodValues = {

      "😊": 80,
      "😍": 100,
      "😴": 50,
      "😰": 40,
      "😡": 25,
      "😔": 10

    };

    let filteredData = [...data];

    const today = new Date();

    if (selected === "Weekly") {

      const weeksBack =
        selectedPeriod === "Current"
          ? 0
          : Number(selectedPeriod);

      const start =
        new Date(today);

      start.setDate(
        today.getDate()
        - today.getDay()
        - (weeksBack * 7)
      );

      start.setHours(
        0, 0, 0, 0
      );

      const end =
        new Date(start);

      end.setDate(
        start.getDate() + 7
      );

      filteredData =
        data.filter((item) => {

          const date =
            new Date(
              item.created_at
            );

          return (
            date >= start &&
            date < end
          );

        });

    }

    else {

      const monthsBack =
        selectedPeriod === "Current"
          ? 0
          : Number(selectedPeriod);

      const targetMonth =
        new Date(
          today.getFullYear(),
          today.getMonth()
          - monthsBack,
          1
        );

      filteredData =
        data.filter((item) => {

          const date =
            new Date(
              item.created_at
            );

          return (

            date.getMonth() ===
            targetMonth.getMonth()

            &&

            date.getFullYear() ===
            targetMonth.getFullYear()

          );

        });

    }

    if (selected === "Weekly") {

      const daysOrder = [

        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"

      ];

      const weeklyMap = {

        Sun: [],
        Mon: [],
        Tue: [],
        Wed: [],
        Thu: [],
        Fri: [],
        Sat: []

      };

      filteredData.forEach((item) => {

        const date =
          new Date(item.created_at);

        const dayName =
          daysOrder[
            date.getDay()
          ];

        const value =
          moodValues[item.mood] || 0;

        weeklyMap[dayName].push(
          value
        );

      });

      const weeklyData = [

        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"

      ].map((day) => {

        const values =
          weeklyMap[day];

        let average = 0;

        if (values.length > 0) {

          const total =
            values.reduce(

              (sum, value) =>

                sum + value,

              0

            );

          average =
            Math.round(
              total /
              values.length
            );

        }

        return {

          day,

          value: average

        };

      });

      setGraphData(
        weeklyData
      );

    }

    else {

      const monthlyMap = {

        W1: [],
        W2: [],
        W3: [],
        W4: []

      };

      filteredData.forEach((item) => {

        const date =
          new Date(item.created_at);

        const day =
          date.getDate();

        let week = "W1";

        if (day <= 7) {

          week = "W1";

        }

        else if (day <= 14) {

          week = "W2";

        }

        else if (day <= 21) {

          week = "W3";

        }

        else {

          week = "W4";

        }

        const value =
          moodValues[item.mood] || 0;

        monthlyMap[week].push(
          value
        );

      });

      const monthlyData = [

        "W1",
        "W2",
        "W3",
        "W4"

      ].map((week) => {

        const values =
          monthlyMap[week];

        let average = 0;

        if (values.length > 0) {

          const total =
            values.reduce(

              (sum, value) =>

                sum + value,

              0

            );

          average =
            Math.round(
              total /
              values.length
            );

        }

        return {

          day: week,

          value: average

        };

      });

      setGraphData(
        monthlyData
      );

    }

  };

  return (

    <>

      <div className="flex flex-wrap gap-3 items-center mb-6">

        <button
          onClick={() =>
            setSelected(
              "Weekly"
            )
          }
          className={`
            px-5
            py-2
            rounded-xl
            text-sm
            font-medium
            transition
            ${
              selected === "Weekly"
                ? "bg-purple-600 text-white"
                : darkMode
                ? "bg-[#1f2937] text-gray-300"
                : "bg-white text-black"
            }
          `}
        >
          Weekly
        </button>

        <button
          onClick={() =>
            setSelected(
              "Monthly"
            )
          }
          className={`
            px-5
            py-2
            rounded-xl
            text-sm
            font-medium
            transition
            ${
              selected === "Monthly"
                ? "bg-purple-600 text-white"
                : darkMode
                ? "bg-[#1f2937] text-gray-300"
                : "bg-white text-black"
            }
          `}
        >
          Monthly
        </button>

        <select
          value={selectedPeriod}
          onChange={(e) =>
            setSelectedPeriod(
              e.target.value
            )
          }
          className={`
            px-4
            py-2
            rounded-xl
            text-sm
            border
            outline-none
            ${
              darkMode
                ? "bg-[#1f2937] border-gray-700 text-white"
                : "bg-white border-gray-200"
            }
          `}
        >

          <option value="Current">
            Current
          </option>

          {selected === "Weekly" ? (

            <>

              <option value="1">
                Last Week
              </option>

              <option value="2">
                2 Weeks Ago
              </option>

              <option value="3">
                3 Weeks Ago
              </option>

            </>

          ) : (

            <>

              <option value="1">
                Last Month
              </option>

              <option value="2">
                2 Months Ago
              </option>

              <option value="3">
                3 Months Ago
              </option>

            </>

          )}

        </select>

      </div>

      <div
        className={`
          rounded-3xl
          p-6
          mb-10
          border
          overflow-x-auto
          ${
            darkMode
              ? "bg-[#1f2937] border-gray-700"
              : "bg-white border-gray-200"
          }
        `}
      >

        <h2 className="text-2xl font-semibold mb-8">
          Mood Analysis
        </h2>

        <div className="flex gap-5 h-72 overflow-hidden">

          <div
            className={`
              flex
              flex-col
              justify-between
              text-sm
              pb-10
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }
            `}
          >

            <span>100</span>
            <span>80</span>
            <span>60</span>
            <span>40</span>
            <span>20</span>
            <span>0</span>

          </div>

          <div
            className={`
              flex
              items-end
              gap-5
              h-full
              flex-1
              border-b
              border-l
              p-4
              rounded-xl
              overflow-x-auto
              min-w-0
              ${
                darkMode
                  ? "border-gray-500"
                  : "border-gray-300"
              }
            `}
          >

            {graphData.map((item, index) => (

              <div
                key={index}
                className="
                  flex
                  flex-col
                  items-center
                  justify-end
                  h-full
                  flex-1
                "
              >

                <div
                  style={{
                    height:
                      `${item.value}%`,
                    minHeight:
                      "1px"
                  }}
                  className="
                    w-full
                    bg-purple-600
                    rounded-t-xl
                    transition-all
                    duration-500
                  "
                />

                <p
                  className={`
                    mt-3
                    text-sm
                    font-medium
                    ${
                      darkMode
                        ? "text-gray-300"
                        : "text-gray-500"
                    }
                  `}
                >
                  {item.day}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </>

  );

}

export default MoodGraph;