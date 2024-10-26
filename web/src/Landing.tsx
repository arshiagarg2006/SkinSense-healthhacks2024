import { useRef, ChangeEvent } from "react";
import "./App.css";
import { IoCloudUploadOutline as UploadIcon } from "react-icons/io5";
import { IoSparkles as SparkleIcon } from "react-icons/io5";
import { FaWandMagicSparkles as WandIcon } from "react-icons/fa6";

interface LandingProps {
  setStage: React.Dispatch<React.SetStateAction<"landing" | "results">>;
  setImage: React.Dispatch<React.SetStateAction<FormData | null>>;
}

const Landing: React.FC<LandingProps> = ({ setStage, setImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: ChangeEvent<HTMLInputElement>): void => {
    const potentialFile = e.target.files;
    if (potentialFile) {
      const file = potentialFile[0];
      console.log(file);
      const formData = new FormData();
      formData.append("image", file);
      console.log(formData);
      setImage(formData);
      setStage("results");
    }
  };

  // try {
  //   const response = await fetch("https://your-api-url.com/upload", {
  //     method: "POST",
  //     body: formData,
  //     headers: {
  //     },
  //   });

  //   if (!response.ok) {
  //     throw new Error("Upload failed: " + response.statusText);
  //   }

  //   const result = await response.json();
  //   console.log("Image uploaded successfully:", result);
  // } catch (error) {
  //   console.error("Error uploading image:", error);
  // }
  // };

  const typewriterWords = ["spot", "mole", "blemish", "rash", "pimple"];

  return (
    <div className="h-screen bg-zinc-900 text-white flex">
      <div className="m-auto text-center">
        <div className="font-bold text-6xl m-5">
          What's this{" "}
          <a className="relative w-[max-content] font-mono before:absolute before:inset-0 before:animate-typewriter before:bg-zinc-900 after:absolute after:inset-0 after:w-[0.125em] after:animate-caret after:bg-zinc-900">
            {typewriterWords[0]}..?
          </a>
        </div>
        <div className="font-thin text-zinc-200 text-base m-5 max-w-lg mx-auto">
          Finding spots since 1999. With the power of AI, we can help you find
          any skin problems you might have. Just upload a photo and we'll do the
          rest. And then, provide you with derm reccs in your area!
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              fileInputRef.current?.click();
            }}
            className="items-center bg-indigo-800 p-3 rounded-lg ring-1 ring-indigo-600 hover:ring-indigo-500 outline-none"
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
            <div className="bg-cyan-500 p-3 rounded-lg outline-none">
              <div className="items-center flex justify-center font-medium text-xl">
                Upload photo
                <UploadIcon className="ml-1" />
              </div>
              <div className="m-5 max-w-60 mx-auto">
                Finding spots since 1999. With the power of AI, we can help you
                find any skin problems you might have. Just upload a photo and
              </div>
            </div>
          </div>
          <div className="flex items-center mx-5">
            <div className="bg-orange-500 p-3 rounded-lg outline-none">
              <div className="items-center flex justify-center font-medium text-xl">
                Get Suggestions
                <SparkleIcon className="ml-1" />
              </div>
              <div className="m-5 max-w-60 mx-auto">
                Finding spots since 1999. With the power of AI, we can help you
                find any skin problems you might have. Just upload a photo and
              </div>
            </div>
          </div>
          <div className="flex items-center mx-5">
            <div className="bg-lime-500 p-3 rounded-lg outline-none">
              <div className="items-center flex justify-center font-medium text-xl">
                Find Derma
                <WandIcon className="ml-1" />
              </div>
              <div className="m-5 max-w-60 mx-auto">
                Finding spots since 1999. With the power of AI, we can help you
                find any skin problems you might have. Just upload a photo and
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
