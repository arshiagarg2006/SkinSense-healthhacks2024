import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSend as SendIcon } from "react-icons/io";
import { useImage } from "./contexts/ImageContext";

interface ResultsProps {
  image: FormData;
}

interface Chat {
  from: "user" | "bot";
  message: string;
}

const Results: React.FC<ResultsProps> = ({ image }) => {
  const navigate = useNavigate();

  const [imageShown, setImageShown] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>("");
  const [sampleImage, setSampleImage] = useState<string>("");

  const { filename } = useImage()!;

  const [disease, setDisease] = useState<string>("");

  const [chat, setChat] = useState<Chat[]>([
    { from: "bot", message: "Hello! How can I help you today?" },
    // {
    //   from: "user",
    //   message: "How severe is this and how can I treat it at home?",
    // },
  ]);

  const [message, setMessage] = useState<string>("");
  const [_, __] = useState<boolean>(true);

  const handleMessageSend = (message: string): void => {
    console.log(message);

    // send prompt to backend
    setChat((chat) => [...chat, { from: "user", message }]);

    setTimeout(() => {
      setChat((chat) => [
        ...chat,
        {
          from: "bot",
          message:
            "It's rare, but monkeypox can cause severe health issues or death. Complications can cause many things like neurologic complications, and complications from mucosal lesions. People with weak immunity, like those with advanced HIV infection or transplant recipients, are more likely to experience severe illness.",
        },
        {
          from: "bot",
          message:
            "Drinking plenty of water and getting a good amount of rest can help, taking over the counter medication.. relieving the itchiness using antihistamine drugs and taking a bath in oatmeal. There's also anti itching medication that can be prescribed by your doctor.",
        },
      ]);
    }, 1000);
    setMessage("");
  };

  useEffect(() => {
    if (filename === "Monkeypox_1.jpg") {
      setDisease("Monkeypox");
      setSummary(
        "Monkeypox is a viral disease caused by the monkeypox virus, characterized by flu-like symptoms and a distinctive rash that often progresses to pustules. The virus primarily spreads through close contact with an infected person, including direct contact with bodily fluids or respiratory droplets, and sometimes through contaminated materials. While it is typically less severe than smallpox, monkeypox can still lead to complications in vulnerable populations. The World Health Organization (WHO) has recommended measures like isolation of infected individuals, vaccination for high-risk groups, and public health education to contain outbreaks. Treatment mainly focuses on symptom management, with antiviral drugs like tecovirimat being used in severe cases."
      );
      setSampleImage("20.jpg");
    } else if (filename === "Eczema.jpg") {
      setDisease("Eczema");
      setSummary(
        "Eczema, or atopic dermatitis, is a chronic skin condition that causes inflammation, itchiness, redness, and dry patches on the skin. It often affects children but can persist into adulthood, and it tends to flare up periodically due to triggers like stress, allergens, or irritants. While the exact cause is unknown, it’s believed to involve a combination of genetic and environmental factors, disrupting the skin barrier function. Treatment typically includes moisturizing regularly, using topical steroids to reduce inflammation, and avoiding known triggers."
      );
      setSampleImage("13.jpg");
    }
  }, []);

  return (
    <div className="bg-zinc-900 h-screen text-white flex items-center justify-center">
      <div className="flex flex-col w-3/5 items-start m-auto ml-12 h-full">
        <img
          src={
            image.get("image")
              ? URL.createObjectURL(image.get("image") as Blob)
              : ""
          }
          alt="Uploaded"
          className="w-1/5 h-auto max-w-full max-h-full rounded-lg my-10"
        />
        <div className="text-4xl mb-4">Likely disease: {disease}</div>
        <div className="flex flex-col items-start">
          <div className="text-lg max-w-2xl">
            {summary}
            <a
              onClick={(e) => {
                e.preventDefault();
                setImageShown(!imageShown);
              }}
              className="text-blue-500 cursor-pointer"
            >
              {imageShown ? "Hide Images" : "Show sample images of " + disease}
            </a>
          </div>
          <div>
            {imageShown && (
              <div className="flex flex-wrap mt-4">
                <img src={sampleImage} alt="Eczema 1" className="w-1/3" />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            navigate("/derms");
          }}
          className="mt-10 items-center bg-red-800 p-3 rounded-lg ring-1 ring-red-600 hover:ring-red-500 outline-none"
        >
          Find derms (Highly Recommended)
        </button>
        <div className="w-2/3 mt-2 text-xs text-zinc-500">
          The response is generated by an AI model trained on scholarly articles
          but it could still be inacturate. Please consult a professional too.
        </div>
      </div>
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="absolute bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full ring-1 ring-blue-600 hover:ring-blue-500"
        >
          Chat with Bot
        </button>
      )}
      {showChat && (
        <div className="w-2/5 justify-center h-full ring-2 ring-zinc-300">
          <div className="flex flex-col h-screen bg-zinc-900">
            <div className="bg-zinc-800 p-4 flex items-center justify-between shadow-md">
              <h1 className="text-xl font-semibold">Chatbot</h1>
              <button
                onClick={() => setShowChat(false)}
                className="bg-zinc-800 text-white p-2 rounded-full ring-1 ring-zinc-700 hover:ring-zinc-600"
              >
                Hide Chat
              </button>
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
            <div className="w-full text-center text-xs text-zinc-500">
              The chat could make mistakes. Please also consult a professional.
            </div>
            <div className="p-4 pt-2 flex items-center">
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
      )}
    </div>
  );
};

export default Results;
