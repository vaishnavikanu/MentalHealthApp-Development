import {
  useState,
  useEffect,
  useRef
} from "react";
import {
  useLocation,
  useNavigate
} from "react-router-dom";
import API from "../api/api";
import { FaPaperclip } from "react-icons/fa";
import {
  useLanguage
} from "../context/LanguageContext";
function Chat({ newChat, darkMode }) {

  const user = JSON.parse(
  localStorage.getItem("user")
  );

  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const defaultMessages = [
  {
    sender: "bot",
    text: t("chat.welcome")
  }
];

  const [messages, setMessages] =
    useState(defaultMessages);

  const [input, setInput] =
    useState("");

    const [attachments, setAttachments] =
      useState([]);

    const [showAttachmentMenu, setShowAttachmentMenu] =
      useState(false);  

    const fileInputRef =
      useRef(null);

    const cameraInputRef =
      useRef(null);

    const textareaRef =
      useRef(null);

    const isMobile =
      /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
      );  
    
/* CHAT SESSION CURRENT OPEN*/
  const [sessionId, setSessionId] =
  useState(null);

  const queryParams =
  new URLSearchParams(
    location.search
  );

  const urlSessionId =
  queryParams.get("session");

  const messagesEndRef =
    useRef(null);

  const isInitialLoad =
  useRef(true);  

useEffect(() => {

  if (!urlSessionId) {

    setMessages(defaultMessages);

    setSessionId(null);

  }

}, [newChat, urlSessionId]);
/* AUTOMATIC SCROLLING*/
  useEffect(() => {

  if (isInitialLoad.current) {

    messagesEndRef.current?.scrollIntoView({
      behavior: "auto"
    });

    isInitialLoad.current = false;

  }

  else {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }

}, [messages]);
//TO LOAD OLD CHAT MESSAGES
  useEffect(() => {

    if (urlSessionId) {

      loadMessages(
        urlSessionId
      );

    }

    else {

      setMessages(defaultMessages);

    }

  }, [urlSessionId]);

const loadMessages = async (
  session_id
) => {

  try {

    const response =
      await API.get(
        `/messages/${session_id}`
      );

    const formattedMessages =
      response.data.map(
        (msg) => ({
          sender: msg.sender,
          text: msg.message,
          attachments:
            msg.attachments || []
        })
      );

    isInitialLoad.current = true;  
    setMessages(
      formattedMessages
    );

    setSessionId(
      session_id
    );

  } catch (error) {

    console.log(error);

  }

};

  const sendMessage = async () => {

  if (
  input.trim() === "" &&
  attachments.length === 0
) {
  return;
}//nothing is typed so NO SEND

  const currentAttachments =
  [...attachments];

  const currentInput = input;
const userMessage = {
  sender: "user",
  text: input,
  attachments: currentAttachments
};

    setMessages(prev => [
  ...prev,
  userMessage
]);

setInput("");
setAttachments([]);

textareaRef.current?.focus();

  try {

    let currentSessionId =
      sessionId;

    /* CREATE NEW SESSION */
    if (!currentSessionId) {

      const sessionResponse =
        await API.post(
          "/chat-session",
          {
            user_id: user.id,
            title: currentInput
          }
        );

      currentSessionId =
        sessionResponse.data.session_id;

      setSessionId(
        currentSessionId
      );

      

    }

    /* SAVE USER MESSAGE IN DB */
    const messageResponse =
        await API.post(
          "/message",
          {
            session_id:
              currentSessionId,
            sender: "user",
            message: currentInput
          }
        );

      const messageId =
        messageResponse.data.id;
      
      for (const file of currentAttachments) {

        await API.put(
          `/attachment/${file.id}`,
          {
            message_id: messageId
          }
        );

      }  
      if (!sessionId) {

        navigate(
          `/?session=${currentSessionId}`,
          { replace: true }
        );

      }

    /* TEMP BOT RESPONSE */
   const botText =
  t("chat.botReply");

    const botReply = {
      sender: "bot",
      text: botText
    };

    setTimeout(async () => {

      setMessages(prev => [
        ...prev,
        botReply
      ]);

      /* SAVE BOT MESSAGE */
      await API.post(
        "/message",
        {
          session_id:
            currentSessionId,
          sender: "bot",
          message: botText
        }
      );

    }, 800);

  } catch (error) {

    console.log(error);

  }

};

  const handleKeyDown = (e) => {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileUpload = async (e) => {

    const files =
      Array.from(e.target.files);

    for (const file of files) {

      try {

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const response =
          await API.post(
            "/upload",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data"
              }
            }
          );

        setAttachments(prev => [
          ...prev,
          response.data
        ]);

      }

      catch (error) {

        console.log(error);

      }

    }
    textareaRef.current?.focus();
    e.target.value = "";
  };

  const removeAttachment = async (id) => {

    try {

      await API.delete(
        `/attachment/${id}`
      );

      setAttachments(prev =>
        prev.filter(
          file => file.id !== id
        )
      );

    }

    catch (error) {

      console.log(error);

    }

  };
  return (

    <>
  <input
    type="file"
    multiple
    hidden
    ref={fileInputRef}
    onChange={handleFileUpload}
  />

  <input
    type="file"
    accept="image/*"
    capture="environment"
    hidden
    ref={cameraInputRef}
    onChange={handleFileUpload}
  />
    <div
      className={`
        h-full
        flex
        flex-col
        transition-colors
        duration-300
        ${
          darkMode
            ? "bg-[#0f172a]"
            : "bg-[#f7f5fc]"
        }
      `}
    >

      {/* CHAT MESSAGES */}
      <div
        className={`
          flex-1
          overflow-y-auto
          px-10
          py-8
          transition-colors
          duration-300
          ${
            darkMode
              ? "bg-[#0f172a]"
              : "bg-[#f7f5fc]"
          }
        `}
      >

        <div className="flex flex-col gap-5">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`
                max-w-[70%]
                px-6
                py-4
                rounded-3xl
                text-[18px]
                leading-relaxed
                whitespace-pre-wrap
                break-words
                shadow-sm
                transition-all
                duration-300
                ${
                  msg.sender === "user"
                    ? `
                      self-end
                      bg-gradient-to-r
                      from-purple-600
                      to-fuchsia-500
                      text-white
                      shadow-lg
                    `
                    : `
                      ${
                        darkMode
                          ? "bg-[#1e293b] text-gray-100 shadow-md"
                          : "bg-[#e9e9ee] text-black"
                      }
                    `
                }
              `}
            >
              {msg.text}

              {msg.attachments?.map((file) => (

                <a
                  key={file.id}
                  href={`http://localhost:8000/${file.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    block
                    mt-2
                    text-sm
                    underline
                    hover:opacity-80
                  "
                >
                  📎 {file.filename}
                </a>

              ))}
            </div>

          ))}

          <div ref={messagesEndRef} />

        </div>

      </div>

      {/* FIXED INPUT AREA */}
      <div
        className={`
          px-10
          py-5
         
          shrink-0
          transition-colors
          duration-300
          ${
            darkMode
              ? "border-gray-700 bg-[#0f172a]"
              : "border-gray-200 bg-[#f7f5fc]"
          }
        `}
      >

        {attachments.length > 0 && (

  <div className="flex flex-wrap gap-2 mb-3">

    {attachments.map((file) => (

      <div
        key={file.id}
        className={`
          flex
          items-center
          gap-2
          px-3
          py-2
          rounded-xl
          text-sm
          ${
            darkMode
              ? "bg-[#1e293b] text-white"
              : "bg-white"
          }
        `}
      >

        <span>
          📎 {file.filename}
        </span>

        <button
          onClick={() =>
            removeAttachment(file.id)
          }
          className="
            ml-1
            font-bold
            hover:text-red-500
            transition
          "
        >
          ×
        </button>

      </div>

    ))}

        </div>

    )}

        <div className="flex items-end gap-4 relative">

          <button
            onClick={() =>
              setShowAttachmentMenu(
                !showAttachmentMenu
              )
            }
            className={`
              p-5
              rounded-2xl
              text-white
              bg-gradient-to-r
              from-purple-600
              to-fuchsia-500
              shrink-0
            `}
          >
            <FaPaperclip fontSize={18} />
          </button>

          {showAttachmentMenu && (

            <div
              className={`
                absolute
                bottom-20
                left-0
                w-52
                rounded-2xl
                shadow-xl
                overflow-hidden
                z-50
                ${
                  darkMode
                    ? "bg-[#1e293b] border border-gray-700"
                    : "bg-white border border-gray-200"
                }
              `}
            >

              <button
                onClick={() => {

                  fileInputRef.current.click();

                  setShowAttachmentMenu(false);

                }}
                className={`
                  w-full
                  text-left
                  px-4
                  py-3
                 ${
                    darkMode
                      ? "text-white hover:bg-[#334155]"
                      : "text-black hover:bg-purple-100"
                  }
                `}
              >
                {t("chat.upload")}
              </button>

              {isMobile && (

                <button
                  onClick={() => {

                    cameraInputRef.current.click();

                    setShowAttachmentMenu(false);

                  }}
                  className={`
                    w-full
                    text-left
                    px-4
                    py-3
                    hover:bg-purple-100
                    ${
                      darkMode
                        ? "hover:bg-[#334155]"
                        : ""
                    }
                  `}
                >
                  {t("chat.takePhoto")}
                </button>

              )}

            </div>

          )}      

          <textarea
            ref={textareaRef}
            placeholder={t("chat.typeMessage")}
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
            rows={1}
            className={`
              flex-1
              rounded-2xl
              border
              px-5
              py-4
              text-[17px]
              outline-none
              resize-none
              transition-all
              duration-300
              ${
                darkMode
                  ? `
                    border-gray-600
                    bg-[#1e293b]
                    text-white
                    placeholder-gray-500
                    focus:border-purple-500
                    focus:ring-2
                    focus:ring-purple-500/30
                  `
                  : `
                    border-gray-300
                    bg-white
                    text-black
                    placeholder-gray-600
                    focus:border-purple-600
                    focus:ring-2
                    focus:ring-purple-200
                  `
              }
            `}
          />

          <button
            onClick={sendMessage}
            className={`
              px-8
              py-4
              rounded-2xl
              text-white
              text-[17px]
              font-medium
              bg-gradient-to-r
              from-purple-600
              to-fuchsia-500
              transition-all
              duration-300
              shrink-0
              ${
                darkMode
                  ? "hover:opacity-80 shadow-lg shadow-purple-600/30"
                  : "hover:opacity-90 shadow-md"
              }
            `}
          >
            {t("chat.send")}
          </button>

        </div>

      </div>

    </div>
    </>
  );
}

export default Chat;
