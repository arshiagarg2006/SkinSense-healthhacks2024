import { useState } from "react";
import { useStage } from "./contexts/StageContext";

const Info = () => {
  const { setStage } = useStage()!;

  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [age, setAge] = useState<number>(0);
  const [medications, setMedications] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");

  const handleSubmit = () => {
    console.log(gender, age, medications, additionalInfo);
    setStage("results");
  };

  const areInputsValid = () => {
    if (gender === "") {
      return false;
    }
    if (age === 0) {
      return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <div>
          <div>Gender</div>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={() => setGender("male")}
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={() => setGender("female")}
          />{" "}
          Female
        </div>
        <div>
          <div>Age</div>
          <input
            type="text"
            value={age as number}
            className="text-zinc-900 p-2 m-2 rounded-md"
            onChange={(e) => setAge(parseInt(e.target.value))}
          />
        </div>
        <div>
          <div className="">Any medications you might be taking</div>
          <input
            type="text"
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            className="text-zinc-900 p-2 m-2 rounded-md"
          />
        </div>
        <div>
          <div>Additional info</div>
          <input
            type="text"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="text-zinc-900 m-2 p-2 rounded-md"
          />
        </div>
      </div>
      <button
        onClick={() => {
          if (areInputsValid()) {
            handleSubmit();
          } else {
            alert("Please fill out all fields");
          }
        }}
        className="bg-indigo-500 text-white py-3 px-6 m-2 rounded-md"
      >
        Get Results 🚀
      </button>
    </div>
  );
};

export default Info;
