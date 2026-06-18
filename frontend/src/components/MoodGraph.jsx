import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";  // ← ADD THIS

function MoodGraph({ moods, darkMode }) {

  const { t } = useLanguage();  // ← ADD THIS
  const [selected, setSelected] = useState("Weekly");
  const [selectedPeriod, setSelectedPeriod] = useState("Current");
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    generateGraphData(moods);
  }, [moods, selected, selectedPeriod]);

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

    const weeksBack =
  selectedPeriod === "Current"
    ? 0
    : Number(selectedPeriod);

const weekStart =
  new Date(today);

weekStart.setDate(
  today.getDate()
  - today.getDay()
  - (weeksBack * 7)
);

weekStart.setHours(
  0, 0, 0, 0
);

    const monthsBack =
  selectedPeriod === "Current"
    ? 0
    : Number(selectedPeriod);

const targetMonth =
  new Date(
    today.getFullYear(),
    today.getMonth() - monthsBack,
    1
  );

    if (selected === "Weekly") {


      const end =
  new Date(weekStart);

end.setDate(
  weekStart.getDate() + 7
);

      filteredData =
        data.filter((item) => {

          const date =
            new Date(
              item.created_at
            );

          return (
            date >= weekStart &&
date < end
          );

        });

    }

    else {


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
      const weeklyMap = 
      {

        Sun: [],
        Mon: [],
        Tue: [],
        Wed: [],
        Thu: [],
        Fri: [],
        Sat: []

      };

      filteredData.forEach((item) => 
      {

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

      const weeklyData = daysOrder.map((day, index) => {

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

        // Create a new date by adding days properly
        const labelDate =
          new Date(weekStart);

        labelDate.setDate(
          weekStart.getDate() + index
        );

        // Format with month and date correctly
        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const monthLabel =
          monthNames[labelDate.getMonth()];

        return {

          day:
            `${day} ${labelDate.getDate()} ${monthLabel}`,

          value: average

        };

      });

      setGraphData(
        weeklyData
      );

    }

    else {

      const monthlyMap = {};

      filteredData.forEach((item) => {

        const date =
          new Date(item.created_at);

        const dayOfMonth = date.getDate();

        // Calculate which week this day belongs to (1-7, 8-14, 15-21, 22-28, 29+)
        const weekIndex = Math.floor((dayOfMonth - 1) / 7);

  if (!monthlyMap[weekIndex]) {

    monthlyMap[weekIndex] = [];

  }

  monthlyMap[weekIndex].push(
    moodValues[item.mood] || 0
  );

});

      const monthlyData = [];

const lastDay =
  new Date(
    targetMonth.getFullYear(),
    targetMonth.getMonth() + 1,
    0
  ).getDate();

for (
  let weekIndex = 0;
  weekIndex <= Math.floor((lastDay - 1) / 7);
  weekIndex++
) {

  const values =
    monthlyMap[weekIndex] || [];

  let average = 0;

  if (values.length > 0) {

    average = Math.round(

      values.reduce(
        (sum, value) => sum + value,
        0
      ) / values.length

    );

  }

  const rangeStart =
    weekIndex * 7 + 1;

  const rangeEnd =
    Math.min(
      rangeStart + 6,
      lastDay
    );

  monthlyData.push({

    day:
      `${rangeStart}-${rangeEnd}`,

    value: average

  });

}

setGraphData(monthlyData);

    }

  };

  return (

    <>

      <div className="flex flex-wrap gap-3 items-center mb-6">

        {/* WEEKLY BUTTON - CHANGE TEXT */}
        <button
          onClick={() => setSelected("Weekly")}
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
         {t("moodGraph.weekly")}
        </button>

        {/* MONTHLY BUTTON - CHANGE TEXT */}
        <button
          onClick={() => setSelected("Monthly")}
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
        {t("moodGraph.monthly")}
        </button>

        {/* DROPDOWN - CHANGE OPTIONS */}
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
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
            {t("moodGraph.current") || "Current"}
          </option>

          {selected === "Weekly" ? (

            <>

              <option value="1">
                {t("moodGraph.lastWeek") || "Last Week"}
              </option>

              <option value="2">
                {t("moodGraph.twoWeeksAgo") || "2 Weeks Ago"}
              </option>

              <option value="3">
                {t("moodGraph.threeWeeksAgo") || "3 Weeks Ago"}
              </option>

            </>

          ) : (

            <>

              <option value="1">
                {t("moodGraph.lastMonth") || "Last Month"}
              </option>

              <option value="2">
                {t("moodGraph.twoMonthsAgo") || "2 Months Ago"}
              </option>

              <option value="3">
                {t("moodGraph.threeMonthsAgo") || "3 Months Ago"}
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

        {/* TITLE - CHANGE THIS */}
        <h2 className="text-2xl font-semibold mb-8">
          {t("moodGraph.analysis")}
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
                      item.value === 0
                        ? "2px"
                        : "1px"
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
