import { useContext, createContext, useState } from "react";

interface StageContext {
  stage: "landing" | "results";
  setStage: React.Dispatch<React.SetStateAction<"landing" | "results">>;
}

const StageContext = createContext<StageContext | undefined>(undefined);

export const useStage = () => useContext(StageContext);

export const StageProvider = ({ children }: { children: React.ReactNode }) => {
  const [stage, setStage] = useState<"landing" | "results">("landing");

  return (
    <StageContext.Provider value={{ stage, setStage }}>
      {children}
    </StageContext.Provider>
  );
};
