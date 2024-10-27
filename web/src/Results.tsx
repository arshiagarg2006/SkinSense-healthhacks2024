import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSend as SendIcon } from "react-icons/io";

interface ResultsProps {
  image: FormData;
}

interface Chat {
  from: "user" | "bot";
  message: string;
}

const Results: React.FC<ResultsProps> = ({ image }) => {
  const navigate = useNavigate();

  const [chat, setChat] = useState<Chat[]>([
    { from: "bot", message: "Hello! How can I help you today?" },
    { from: "user", message: "I would like to know what disease I have." },
    { from: "bot", message: "Sure! Let me take a look at your image." },
    { from: "bot", message: "It seems like you have a skin disease." },
    {
      from: "bot",
      message: "Would you like me to find a dermatologist for you?",
    },
  ]);

  const [message, setMessage] = useState<string>("");
  const [_, __] = useState<boolean>(true);

  const handleMessageSend = (message: string): void => {
    console.log(message);

    // send prompt to backend
    setChat([...chat, { from: "user", message }]);
    setMessage("");
  };

  return (
    <div className="bg-gradient-to-b to-zinc-800 from-slate-600 h-screen text-white flex items-center justify-center">
      <div className="flex flex-col w-3/5 items-start m-auto ml-12 h-full">
        <img
          src={
            image.get("image")
              ? URL.createObjectURL(image.get("image") as Blob)
              : ""
          }
          alt="Uploaded"
          className="w-2/5 h-auto max-w-full max-h-full rounded-lg"
        />
        <div className="text-4xl mb-4">Likely disease</div>
        <div className="flex flex-col items-start">
          <div className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
        <button
          onClick={() => {
            navigate("/derms");
          }}
          className="mt-10 items-center bg-indigo-800 p-3 rounded-lg ring-1 ring-indigo-600 hover:ring-indigo-500 outline-none"
        >
          Find derms in my area!
        </button>
      </div>
      <div className="w-2/5 justify-center h-full ring-2 ring-zinc-300">
        <div className="flex flex-col h-screen bg-zinc-900">
          <div className="bg-zinc-800 p-4 flex items-center shadow-md">
            <h1 className="text-xl font-semibold">Chatbot</h1>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {chat.map((chat: Chat, i: number, arr) => {
              const isSameSenderAsPrevious =
                i > 0 && arr[i - 1].from === chat.from;
              const isSameSenderAsNext =
                i < arr.length - 1 && arr[i + 1].from === chat.from;

              if (chat.from === "bot") {
                return (
                  <div
                    key={i}
                    className={`p-2 ${
                      isSameSenderAsPrevious ? "mt-1 rounded-tl-none" : "my-2"
                    } mx-4 rounded-xl w-fit max-w-52 bg-zinc-800 mr-auto self-start ${
                      isSameSenderAsNext ? "mb-1 rounded-es-none" : "mb-2"
                    } ${
                      isSameSenderAsNext && isSameSenderAsPrevious
                        ? "rounded-tl-none"
                        : ""
                    }`}
                  >
                    {chat.message}
                  </div>
                );
              } else {
                return (
                  <div
                    key={i}
                    className={`p-2 ${
                      isSameSenderAsPrevious ? "mt-1 rounded-tr-none" : "my-2"
                    } mx-4 rounded-xl w-fit max-w-52 bg-blue-600 ml-auto self-end ${
                      isSameSenderAsNext ? "mb-1 rounded-br-none" : "mb-2"
                    } ${
                      isSameSenderAsNext && isSameSenderAsPrevious
                        ? "rounded-r-none"
                        : ""
                    }`}
                  >
                    {chat.message}
                  </div>
                );
              }
            })}
          </div>

          <div className="p-4 flex items-center">
            <input
              type="text"
              className="flex-1 py-2 px-4 border bg-zinc-900 border-none rounded-full outline-none ring-2 ring-zinc-800 focus:ring-zinc-700"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && handleMessageSend(message)
              }
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full"
              onClick={() => {
                if (!message) return;
                handleMessageSend(message);
              }}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
