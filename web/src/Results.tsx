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
  const [loading, setLoading] = useState<boolean>(true);

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
      <div className="w-2/5 justify-center overflow-y-scroll h-full border-l-2">
        <div>Chat</div>
        <div className="flex">
          <div className="mx-auto w-4/5">
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
                    } mx-4 rounded-xl w-fit max-w-52 bg-indigo-600 mr-auto self-start ${
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
                    } mx-4 rounded-xl w-fit max-w-52 bg-zinc-800 ml-auto self-end ${
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
            {loading && (
              <div className="p-2 my-2 mx-4 rounded-lg max-w-52 bg-zinc-600 mr-auto self-start">
                Typing...
              </div>
            )}
            <form action="" className="flex">
              <div className="flex bg-zinc-900 p-3 ring-2 ring-zinc-700 rounded-full px-4 w-full">
                <input
                  type="text"
                  className="outline-none w-full bg-zinc-900"
                  value={message}
                  placeholder="Message the smort bot"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    if (message.trim() === "") return;
                    handleMessageSend(message);
                  }}
                >
                  <SendIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
