import { useContext, createContext, useState } from "react";

const InfoContext = createContext<any>(undefined);

export const useInfo = () => useContext(InfoContext);

export const InfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [age, setAge] = useState<number>(0);
  const [medications, setMedications] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");

  return (
    <InfoContext.Provider
      value={{
        gender,
        setGender,
        age,
        setAge,
        medications,
        setMedications,
        additionalInfo,
        setAdditionalInfo,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
