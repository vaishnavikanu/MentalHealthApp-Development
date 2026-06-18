import {
  useNavigate,
  useLocation
} from "react-router-dom";
import { useLanguage }
from "../context/LanguageContext";
import {
  useState,
  useEffect
} from "react";
import MoodGraph from "../components/MoodGraph";
import API from "../api/api";

function PatientHistory({ darkMode }) {

  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [chatHistory, setChatHistory] =
    useState([]);

  const [moodHistory, setMoodHistory] =
    useState([]);

  const [journalHistory, setJournalHistory] =
    useState([]);

  const [patientInfo, setPatientInfo] =
  useState(null);

  const [showAllChats, setShowAllChats] =
    useState(false);

  const [showAllMoods, setShowAllMoods] =
    useState(false);

  const [showAllJournals, setShowAllJournals] =
    useState(false);

  const queryParams =
  new URLSearchParams(
    location.search
  );

  const patientId =
    queryParams.get("patient");

  useEffect(() => {

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });

}, [patientId]);
  useEffect(() => {
    fetchHistory();
  }, [patientId]);

  const fetchHistory = async () => {

    try {

      const response =
        await API.get(
          `/history/${patientId}`
        );

      setPatientInfo(
        response.data.patient
      );
        
      setChatHistory(
        response.data.chats
      );

      setMoodHistory(
        response.data.moods.reverse()
      );

      setJournalHistory(
        response.data.journals.reverse()
      );

    } catch (error) {

      console.log(error);

    }

  };

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
      {t("history.patientHistory")}
      </h1>

      <p
        className={`mb-10 text-lg ${
          darkMode
            ? "text-gray-300"
            : "text-gray-500"
        }`}
      >
      {t("history.viewPatientRecords")}
      </p>

      {patientInfo && (

        <div
          className={`mb-10 rounded-2xl p-5 ${
            darkMode
              ? "bg-[#1f2937]"
              : "bg-white"
          }`}
        >

          <h2 className="text-2xl font-semibold mb-3">
          {t("history.patientInformation")}
          </h2>

          <p className="mb-2">
            <strong>{t("history.name")}:</strong> {patientInfo.username}
          </p>

          <p>
            <strong>{t("history.email")}:</strong> {patientInfo.email}
          </p>

        </div>

      )}

      {/* CHAT HISTORY */}
      <div className="mb-14">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-semibold">
          {t("history.chatHistory")}
          </h2>

          {chatHistory.length > 5 && (

            <button
              onClick={() =>
                setShowAllChats(
                  !showAllChats
                )
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
              {showAllChats
              ? t("common.showLess")
              : t("common.seeMore")}
            </button>

          )}

        </div>

        <div className="flex flex-col gap-5">

          {chatHistory.length === 0 ? (

            <div
              className={`
                rounded-2xl
                p-4
                ${
                  darkMode
                    ? "bg-[#1f2937]"
                    : "bg-white"
                }
              `}
            >
            {t("history.noChatHistory")}
            </div>

          ) : (

            (showAllChats
              ? chatHistory
              : chatHistory.slice(0, 5)
            ).map((chat) => (

              <div
                key={chat.id}
                onClick={() =>
  navigate(
    `/doctor-chat-view?session=${chat.id}`
  )
}
                className={`
                  rounded-2xl
                  p-4
                  cursor-pointer
                  transition
                  shadow-sm
                  ${
                    darkMode
                      ? "bg-[#1f2937] hover:bg-[#374151]"
                      : "bg-white hover:bg-gray-100"
                  }
                `}
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="text-xl font-semibold mb-2">
                      {chat.title}
                    </h3>

                    <p
                      className={`${
                        darkMode
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                    >
                    {t("history.continueChat")}
                    </p>

                  </div>

                  <p
                    className={`text-sm ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-400"
                    }`}
                  >
                    {new Date(
                      chat.updated_at
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      {/* MOOD HISTORY */}
      <div className="mb-14">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-semibold">
          {t("history.moodHistory")}
          </h2>

          {moodHistory.length > 5 && (

            <button
              onClick={() =>
                setShowAllMoods(
                  !showAllMoods
                )
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
              {showAllMoods
  ? t("common.showLess")
  : t("common.seeMore")}
            </button>

          )}

        </div>

        <div className="flex flex-col gap-5">

          {moodHistory.length === 0 ? (

            <div
              className={`
                rounded-2xl
                p-4
                ${
                  darkMode
                    ? "bg-[#1f2937]"
                    : "bg-white"
                }
              `}
            >
            {t("history.noMoodHistory")}
            </div>

          ) : (

            (showAllMoods
              ? moodHistory
              : moodHistory.slice(0, 5)
            ).map((mood) => (

              <div
                key={mood.id}
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

                <div className="flex justify-between items-center mb-3">

                  <h3 className="text-5xl font-semibold">
                    {mood.mood}
                  </h3>

                  <p
                    className={`text-sm ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-400"
                    }`}
                  >
                    {new Date(
                      mood.created_at
                    ).toLocaleString()}
                  </p>

                </div>

                <p
                  className={`${
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-600"
                  }`}
                >
                  {mood.note}
                </p>

              </div>

            ))

          )}

        </div>

      </div>

      {/* MOOD TRACKER */}
      <div className="mb-14">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">
          {t("history.moodTracker")}
          </h2>   
        </div>

        <MoodGraph
          moods={moodHistory}
          darkMode={darkMode}
        />
      </div>

      {/* JOURNAL HISTORY */}
      <div>

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-semibold">
          {t("history.journalHistory")}
          </h2>

          {journalHistory.length > 5 && (

            <button
              onClick={() =>
                setShowAllJournals(
                  !showAllJournals
                )
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
              {showAllJournals
  ? t("common.showLess")
  : t("common.seeMore")}
            </button>

          )}

        </div>

        <div className="flex flex-col gap-5">

          {journalHistory.length === 0 ? (

            <div
              className={`
                rounded-2xl
                p-4
                ${
                  darkMode
                    ? "bg-[#1f2937]"
                    : "bg-white"
                }
              `}
            >
            {t("history.noJournalHistory")}
            </div>

          ) : (

            (showAllJournals
              ? journalHistory
              : journalHistory.slice(0, 5)
            ).map((journal) => (

              <div
                key={journal.id}
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

                <div className="flex justify-between items-center mb-3">

                  <h3 className="text-lg font-semibold">
                    {journal.title}
                  </h3>

                  <p
                    className={`text-sm ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-400"
                    }`}
                  >
                    {new Date(
                      journal.created_at
                    ).toLocaleString()}
                  </p>

                </div>

                <p
                  className={`${
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-600"
                  }`}
                >
                  {journal.content}
                </p>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );
}

export default PatientHistory;