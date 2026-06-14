import { useState, useEffect } from "react";

function SelfCare({ darkMode }) {

  //ARRAY OF AFFIRMATION
  const affirmations = [

    "You are stronger than you think 💜",
    "You are doing your best 🌸",
    "Your feelings are valid 💖",
    "You deserve peace and happiness ✨",
    "Take one step at a time 🌿",
    "You are enough 💕",
    "Progress matters more than perfection 🌈",
    "You can overcome difficult moments 🌻",
    "Believe in yourself 💫",
    "Rest is productive too ☁️",
    "You are growing every day 🌱",
    "Small steps still move you forward 🚶‍♀️",
    "You are capable of amazing things ⭐",
    "Your mental health matters 🩵",
    "You are not alone 🤍"

  ];

  const groundingSteps = [

    "5 things you can SEE",
    "4 things you can TOUCH",
    "3 things you can HEAR",
    "2 things you can SMELL",
    "1 thing you can TASTE"

  ];
//THESE ARE TO KNOW WHETHER THE POPUP IS OPEN OR CLOSE
  const [showBreathing, setShowBreathing] =
    useState(false);

  const [showMeditation, setShowMeditation] =
    useState(false);

  const [showGrounding, setShowGrounding] =
    useState(false);

  const [showSleep, setShowSleep] =
    useState(false);

  const [showGratitude, setShowGratitude] =
    useState(false);

  const [showAffirmation, setShowAffirmation] =
    useState(false);
//TELLS WHICH ONE TO DISPLAY CURRENTLY
  const [affirmation, setAffirmation] =
    useState("");
//FOR MEDITATION
  const [timeLeft, setTimeLeft] =
    useState(60);

  // RANDOM AFFIRMATION
  const generateAffirmation = () => {

    const random =
      affirmations[
        Math.floor(
          Math.random() *//GENERATES RANDOM NUMBER B/W 0,1
          affirmations.length
        )
      ];

    setAffirmation(random);

    setShowAffirmation(true);
  };

  // MEDITATION TIMER
  useEffect(() => {

    let timer;

    if (
      showMeditation &&
      timeLeft > 0
    ) {

      timer = setTimeout(() => {

        setTimeLeft(prev => prev - 1);

      }, 1000);
    }

    // SOUND
    if (
      showMeditation &&
      timeLeft === 0
    ) {

      let count = 0;

      const interval = setInterval(() => {

        const audio = new Audio(
          "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
        );

        audio.play();

        count++;

        if (count === 4) {

          clearInterval(interval);//STOPS THE BEEP
        }

      }, 700);
    }

    return () => clearTimeout(timer);

  }, [showMeditation, timeLeft]);
//STYLING OF CARDS AND BUTTON TO REUSE THEM 
  const cardStyle = `
    rounded-[28px]
    p-6
    text-center
    shadow-sm
    transition
  `;

  const buttonStyle = `
    bg-purple-600
    hover:bg-purple-700
    transition
    text-white
    px-7
    py-2.5
    rounded-2xl
    text-[17px]
    font-medium
  `;

  return (

    //ENTIRE PAGE DIV
    <div
      className={`
        h-full
        overflow-y-auto
        px-7
        py-5
        pb-20
        ${
          darkMode
            ? "bg-[#111827] text-white"
            : "bg-[#f7f5fc] text-black"
        }
      `}
    >

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-1">
        Self Care Tools
      </h1>

      <p
        className={`text-lg mb-6 ${
          darkMode
            ? "text-gray-300"
            : "text-gray-500"
        }`}
      >
        Practice calming wellness activities
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* BREATHING */}
        <div
          className={`
            ${cardStyle}
            ${
              darkMode
                ? "bg-[#1f2937]"
                : "bg-white"
            }
          `}
        >

          <h2 className="text-[22px] font-bold mb-4">
            Breathing Exercise
          </h2>

          <p
            className={`text-[16px] mb-8 ${
              darkMode
                ? "text-gray-300"
                : "text-gray-600"
            }`}
          >
            Relax with guided breathing.
          </p>

          <button
            onClick={() =>
              setShowBreathing(true)
            }
            className={buttonStyle}
          >
            Start
          </button>

        </div>

        {/* MEDITATION */}
        <div
          className={`
            ${cardStyle}
            ${
              darkMode
                ? "bg-[#1f2937]"
                : "bg-white"
            }
          `}
        >

          <h2 className="text-[22px] font-bold mb-4">
            Meditation Timer
          </h2>

          <p
            className={`text-[16px] mb-8 ${
              darkMode
                ? "text-gray-300"
                : "text-gray-600"
            }`}
          >
            1 minute calming meditation.
          </p>

          <button
            onClick={() => {

              setShowMeditation(true);

              setTimeLeft(60);

            }}
            className={buttonStyle}
          >
            Start
          </button>

        </div>

        {/* GROUNDING */}
        <div
          className={`
            ${cardStyle}
            ${
              darkMode
                ? "bg-[#1f2937]"
                : "bg-white"
            }
          `}
        >

          <h2 className="text-[22px] font-bold mb-4">
            Grounding Exercise
          </h2>

          <p
            className={`text-[16px] mb-8 ${
              darkMode
                ? "text-gray-300"
                : "text-gray-600"
            }`}
          >
            Reduce anxiety and stay present.
          </p>

          <button
            onClick={() =>
              setShowGrounding(true)
            }
            className={buttonStyle}
          >
            Start
          </button>

        </div>

        {/* AFFIRMATION */}
        <div
          className={`
            ${cardStyle}
            ${
              darkMode
                ? "bg-[#1f2937]"
                : "bg-white"
            }
          `}
        >

          <h2 className="text-[22px] font-bold mb-4">
            Positive Affirmation
          </h2>

          <p
            className={`text-[16px] mb-8 ${
              darkMode
                ? "text-gray-300"
                : "text-gray-600"
            }`}
          >
            Boost positivity and confidence.
          </p>

          <button
            onClick={generateAffirmation}
            className={buttonStyle}
          >
            Show
          </button>

        </div>

        {/* GRATITUDE */}
        <div
          className={`
            ${cardStyle}
            ${
              darkMode
                ? "bg-[#1f2937]"
                : "bg-white"
            }
          `}
        >

          <h2 className="text-[22px] font-bold mb-4">
            Gratitude Practice
          </h2>

          <p
            className={`text-[16px] mb-8 ${
              darkMode
                ? "text-gray-300"
                : "text-gray-600"
            }`}
          >
            Reflect on positive moments.
          </p>

          <button
            onClick={() =>
              setShowGratitude(true)
            }
            className={buttonStyle}
          >
            Start
          </button>

        </div>

        {/* SLEEP */}
        <div
          className={`
            ${cardStyle}
            ${
              darkMode
                ? "bg-[#1f2937]"
                : "bg-white"
            }
          `}
        >

          <h2 className="text-[22px] font-bold mb-4">
            Sleep Relaxation
          </h2>

          <p
            className={`text-[16px] mb-8 ${
              darkMode
                ? "text-gray-300"
                : "text-gray-600"
            }`}
          >
            Relax your mind before sleep.
          </p>

          <button
            onClick={() =>
              setShowSleep(true)
            }
            className={buttonStyle}
          >
            Start
          </button>

        </div>

      </div>

      {/* BREATHING POPUP */}
      {showBreathing && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"> {/*BG 40% OPACITY,Z-5 MEANS POPUP 
        ON TOP OF EVERYTHINGS*/}

          <div
            className={`
              w-[430px]
              rounded-[30px]
              p-5
              relative
              text-center
              ${
                darkMode
                  ? "bg-[#1f2937]"
                  : "bg-white"
              }
            `}
          >

            <button
              onClick={() =>
                setShowBreathing(false)
              }
              className="absolute right-5 top-4 text-3xl text-gray-400" //POSITION RELATIVE TO POPUP BOX
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-4">
              Breathing Exercise
            </h2>

            <div className="w-52 h-52 mx-auto rounded-full bg-purple-300 flex items-center justify-center text-4xl text-purple-800 mb-3 animate-pulse">

              Breathe

            </div>

            <p
              className={`text-xl leading-relaxed ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >
              Inhale slowly for 4 seconds...
              Hold...
              Exhale gently...
            </p>

          </div>

        </div>

      )}

      {/* MEDITATION POPUP */}
      {showMeditation && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div
            className={`
              w-[420px]
              rounded-[30px]
              p-4
              relative
              text-center
              ${
                darkMode
                  ? "bg-[#1f2937]"
                  : "bg-white"
              }
            `}
          >

            <button
              onClick={() =>
                setShowMeditation(false)
              }
              className="absolute right-5 top-4 text-3xl text-gray-400"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-3">
              Meditation Timer
            </h2>

            <div className="text-6xl font-bold text-purple-600 mb-6">

              {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")} {/*CONVERTING INTO CLOCK FORMAT*/}

            </div>

            <p
              className={`text-lg ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >
              Close your eyes and breathe calmly.
            </p>

          </div>

        </div>

      )}

      {/* GROUNDING POPUP */}
      {showGrounding && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div
            className={`
              w-[460px]
              rounded-[30px]
              p-4
              relative
              ${
                darkMode
                  ? "bg-[#1f2937]"
                  : "bg-white"
              }
            `}
          >

            <button
              onClick={() =>
                setShowGrounding(false)
              }
              className="absolute right-5 top-4 text-3xl text-gray-400"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold text-center mb-5">
              Grounding Exercise
            </h2>

            <div className="flex flex-col gap-3 text-xl">

              {/*CREATES DIV FOR EACH POINT*/}
              {groundingSteps.map((step, index) => (

                <div
                  key={index}
                  className={`
                    rounded-2xl
                    px-3.5
                    py-3
                    ${
                      darkMode
                        ? "bg-[#374151]"
                        : "bg-[#f3f4f6]"
                    }
                  `}
                >
                
                  { step}
                </div>

              ))}

            </div>

          </div>

        </div>

      )}

      {/* SLEEP POPUP */}
      {showSleep && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div
            className={`
              w-[430px]
              rounded-[30px]
              p-8
              relative
              text-center
              ${
                darkMode
                  ? "bg-[#1f2937]"
                  : "bg-white"
              }
            `}
          >

            <button
              onClick={() =>
                setShowSleep(false)
              }
              className="absolute right-5 top-4 text-3xl text-gray-400"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-6">
              Sleep Relaxation
            </h2>

            <p
              className={`text-[18px] leading-relaxed ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >
              Take deep breaths 🌙
              <br />
              Relax your body slowly.
              <br />
              Let your thoughts drift away.
            </p>

          </div>

        </div>

      )}

      {/* AFFIRMATION POPUP */}
      {showAffirmation && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div
            className={`
              w-[500px]
              rounded-[32px]
              p-5
              relative
              text-center
              ${
                darkMode
                  ? "bg-[#1f2937]"
                  : "bg-white"
              }
            `}
          >

            <button
              onClick={() =>
                setShowAffirmation(false)
              }
              className="absolute right-5 top-4 text-3xl text-gray-400"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-6">
              Positive Affirmation
            </h2>

            <p
              className={`text-[18px] leading-relaxed ${
                darkMode
                  ? "text-gray-200"
                  : "text-gray-600"
              }`}
            >
              {affirmation}
            </p>

          </div>

        </div>

      )}

      {/* GRATITUDE POPUP */}
      {showGratitude && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div
            className={`
              w-[520px]
              rounded-[32px]
              p-5
              relative
              text-center
              ${
                darkMode
                  ? "bg-[#1f2937]"
                  : "bg-white"
              }
            `}
          >

            <button
              onClick={() =>
                setShowGratitude(false)
              }
              className="absolute right-5 top-4 text-3xl text-gray-400"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-5">
              Gratitude Practice
            </h2>

            <p
              className={`text-2xl mb-2 ${
                darkMode
                  ? "text-gray-200"
                  : "text-gray-600"
              }`}
            >
              Think about:
            </p>

            <div className="flex flex-col gap-4 text-[19px]">

              <div>
                • Something good today
              </div>

              <div>
                • Someone you appreciate
              </div>

              <div>
                • One thing you're proud of
              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default SelfCare;