import { useRef, ChangeEvent, useState, useEffect } from "react";
import "./App.css";
import { IoCloudUploadOutline as UploadIcon } from "react-icons/io5";
import { IoSparkles as SparkleIcon } from "react-icons/io5";
import { FaWandMagicSparkles as WandIcon } from "react-icons/fa6";
import { Stages } from "./contexts/StageContext";

interface LandingProps {
  setStage: React.Dispatch<React.SetStateAction<Stages>>;
  setImage: React.Dispatch<React.SetStateAction<FormData | null>>;
}

const Landing: React.FC<LandingProps> = ({ setStage, setImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [typewriterText, setTypewriterText] = useState<string>("");

  const handleClick = (e: ChangeEvent<HTMLInputElement>): void => {
    const potentialFile = e.target.files;
    if (potentialFile) {
      const file = potentialFile[0];
      console.log(file);
      const formData = new FormData();
      formData.append("image", file);
      // fetch("", {
      //   method: "POST",
      //   body: formData,
      // })
      //   .then((response) => response.json())
      //   .then((result) => console.log("Image uploaded successfully:", result))
      //   .catch((error) => console.error("Error uploading image:", error));
      console.log(formData);
      setImage(formData);
      setStage("info-page");
    }
  };

  const typewriterWords = ["monkeypox", "eczema", "psoriasis", "melanoma"];

  const startTypewriterText = () => {
    let i = 0;
    let j = 0;
    let currentText = "";
    let currentWord = typewriterWords[i];
    let isDeleting = false;

    const interval = setInterval(() => {
      if (!isDeleting && j < currentWord.length) {
        currentText += currentWord[j];
        setTypewriterText(currentText);
        j++;
      } else if (isDeleting && j > 0) {
        currentText = currentText.slice(0, -1);
        setTypewriterText(currentText);
        j--;
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
          i = (i + 1) % typewriterWords.length;
          currentWord = typewriterWords[i];
        }
      }
    }, 200);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    startTypewriterText();
  }, []);

  return (
    <div className="h-screen bg-gradient-to-b from-teal-400 to-blue-700 text-white flex">
      <div className="m-auto text-center">
        <div className="font-bold text-6xl m-5">
          Is this <a className="font-mono">{typewriterText}..?</a>
        </div>
        <div className="font-light text-zinc-200 text-base m-5 max-w-lg mx-auto">
          Finding spots since 1999. With the power of AI, we can help you find
          any skin problems you might have. Just upload a photo and we'll do the
          rest. And then, provide you with derm reccs in your area!
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              fileInputRef.current?.click();
            }}
            className="items-center bg-indigo-800 p-3 rounded-lg ring-1 ring-indigo-600 hover:ring-indigo-500 outline-none drop-shadow-lg"
          >
            Upload Photo
          </button>
          <input
            type="file"
            className=""
            hidden
            onChange={handleClick}
            multiple={false}
            ref={fileInputRef}
            accept=".jpg, .jpeg, .png"
          />
        </div>
        <div className="flex mt-20">
          <div className="flex items-center mx-5">
            <div className="bg-cyan-500 p-3 rounded-lg outline-none drop-shadow-xl">
              <div className="items-center flex justify-center font-medium text-xl">
                Upload photo
                <UploadIcon className="ml-1" />
              </div>
              <div className="m-5 max-w-60 mx-auto">
                Snap a picture of your skin over time to track changes and
                detect any signs of skin conditions.
              </div>
            </div>
          </div>
          <div className="flex items-center mx-5">
            <div className="bg-orange-500 p-3 rounded-lg outline-none drop-shadow-xl">
              <div className="items-center flex justify-center font-medium text-xl">
                Get Suggestions
                <SparkleIcon className="ml-1" />
              </div>
              <div className="m-5 max-w-60 mx-auto">
                Receive AI-powered feedback based on your photos to help
                identify any potential skin issues.
              </div>
            </div>
          </div>
          <div className="flex items-center mx-5">
            <div className="bg-lime-500 p-3 rounded-lg outline-none drop-shadow-xl">
              <div className="items-center flex justify-center font-medium text-xl">
                Find Derma
                <WandIcon className="ml-1" />
              </div>
              <div className="m-5 max-w-60 mx-auto">
                If needed, we'll connect you with local dermatologists for
                expert care and advice.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
