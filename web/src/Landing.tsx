import { useRef, ChangeEvent } from "react";
import "./App.css";

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

  return (
    <div className="h-screen bg-zinc-900 text-white flex">
      <div className="m-auto text-center">
        <div className="font-bold text-6xl m-5">What's this spot...?</div>
        <div className="font-thin text-zinc-200 text-base m-5 max-w-lg mx-auto">
          Finding spots since 1999. With the power of AI, we can help you find
          any skin problems you might have. Just upload a photo and we'll do the
          rest. And then, provide you with derm reccs in your area!
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
      </div>
    </div>
  );
};

export default Landing;
