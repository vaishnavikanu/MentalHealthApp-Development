import { useState, useEffect } from "react";
import API from "../api/api";

function Journal({ darkMode }) {

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  const [journals, setJournals] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");
/*TO SHOW SUCCESS MSG*/
  const [message, setMessage] =
    useState("");

  const [showAll, setShowAll] =
    useState(false);

  const displayedJournals =
    showAll
      ? journals
      : journals.slice(0, 5);

  // FETCH JOURNALS
  useEffect(() => {

    fetchJournals();

  }, []);

  const fetchJournals = async () => {

    try {

      const response =
        await API.get(`/journals/${user.id}`);//GETS ALL THE JOURNALS RELATED TO USER_ID

      setJournals(
        response.data.reverse()
      );

    } catch (error) {

      console.log(error);

    }

  };

  // ADD JOURNAL
  const addJournal = async () => {

    if (title.trim() === ""||content.trim() === "") 
    {

      setMessage(
        "Please fill all fields."
      );

      setTimeout(() => {

        setMessage("");

      }, 3000);

      return;
    }

    try {
      //STROING IN DB
      await API.post("/journal", {

        user_id: user.id,

        title: title,

        content: content

      });
      // TO SEE THE UPDATED LIST 
      fetchJournals();

      setTitle("");

      setContent("");

      setMessage(
        "Journal added successfully!"
      );

      setTimeout(() => {

        setMessage("");

      }, 3000);

    } catch (error) {

      console.log(error);

      setMessage(
        "Failed to save journal."
      );

    }

  };

  // DELETE JOURNAL
  const deleteJournal = async (
    journalId
  ) => {

    try {

      await API.delete(
        `/journal/${journalId}`
      );

      fetchJournals();

      setMessage(
        "Journal deleted successfully!"
      );

      setTimeout(() => {

        setMessage("");

      }, 3000);

    } catch (error) {

      console.log(error);

      setMessage(
        "Failed to delete journal."
      );

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
        Journal
      </h1>

      <p
        className={`mb-8 text-lg ${
          darkMode
            ? "text-gray-300"
            : "text-gray-500"
        }`}
      >
        Write your thoughts and reflect on your emotions.
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

      {/* ADD JOURNAL */}
      <div
        className={`
          rounded-2xl
          p-4
          shadow-sm
          mb-8
          ${
            darkMode
              ? "bg-[#1f2937]"
              : "bg-white"
          }
        `}
      >

        <h2 className="text-2xl font-semibold mb-5">
          New Journal Entry
        </h2>

        {/* TITLE */}
        <input
          type="text"
          placeholder="Journal title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className={`
            w-full
            rounded-xl
            px-4
            py-3
            outline-none
            mb-4
            transition-all
            ${
              darkMode
                ? "bg-[#374151] text-white placeholder-gray-400 border border-gray-600"
                : "bg-white text-black border border-gray-300"
            }
          `}
        />

        {/* CONTENT */}
        <textarea
          placeholder="Write your thoughts..."
          rows={6}
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          className={`
            w-full
            rounded-xl
            p-4
            outline-none
            resize-none
            mb-4
            transition-all
            ${
              darkMode
                ? "bg-[#374151] text-white placeholder-gray-400 border border-gray-600"
                : "bg-white text-black border border-gray-300"
            }
          `}
        />

        {/* SAVE BUTTON */}
        <button
          onClick={addJournal}
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
          Save Journal
        </button>

      </div>

      {/* JOURNAL HEADER */}
      <div className="flex items-center justify-between mb-5">

        <h2 className="text-3xl font-bold">
          Recent Journals
        </h2>

        {journals.length > 5 && (

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

      {/* JOURNAL ENTRIES */}
      <div className="flex flex-col gap-3">

        {displayedJournals.map((journal) => (

          <div
            key={journal.id}
            className={`
              rounded-2xl
              p-4
              shadow-sm
              ${
                darkMode
                  ? "bg-[#1f2937]"
                  : "bg-white"
              }
            `}
          >

            <div className="flex items-center justify-between mb-1">

              <h3 className="font-semibold text-xl">
                {journal.title}
              </h3>

              <span
                className={`text-sm ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-400"
                }`}
              >
                {new Date(
                  journal.created_at
                ).toLocaleString()}
              </span>

            </div>

            <p
              className={`text-sm mb-1 leading-6.5 ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >
              {journal.content}
            </p>

            <button
              onClick={() =>
                deleteJournal(
                  journal.id
                )
              }
              className="
                bg-red-500
                hover:bg-red-600
                transition
                text-white
                px-4
                py-2
                rounded-lg
                text-sm
              "
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Journal;