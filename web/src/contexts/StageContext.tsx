import { useContext, createContext, useState } from "react";

export type Stages = "landing" | "info-page" | "results";

interface StageContext {
  stage: Stages;
  setStage: React.Dispatch<React.SetStateAction<Stages>>;
}

const StageContext = createContext<StageContext | undefined>(undefined);

export const useStage = () => useContext(StageContext);

export const StageProvider = ({ children }: { children: React.ReactNode }) => {
  const [stage, setStage] = useState<Stages>("landing");

  return (
    <StageContext.Provider value={{ stage, setStage }}>
      {children}
    </StageContext.Provider>
  );
};
