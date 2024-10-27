import { useState } from "react";

const Info = () => {
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [medications, setMedications] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");

  const handleSubmit = () => {
    console.log(gender, age, medications, additionalInfo);
  };

  const areInputsValid = () => {
    if (gender === null) {
      return false;
    }
    if (age === null) {
      return false;
    }
    return true;
  };

  return (
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
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
      </div>
      <div>
        <div>Any medications you might be taking</div>
        <input
          type="text"
          value={medications}
          onChange={(e) => setMedications(e.target.value)}
        />
      </div>
      <div>
        <div>Additional info</div>
        <input
          type="text"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
      </div>
      <button
        onClick={() => {
          if (areInputsValid()) {
            handleSubmit();
          } else {
            alert("Please fill out all fields");
          }
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Info;
