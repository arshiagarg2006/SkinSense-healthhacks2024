import { useState } from "react";
import "./App.css";
import Landing from "./Landing";
import Results from "./Results";

function App() {
  const [stage, setStage] = useState<"landing" | "results">("landing");
  const [image, setImage] = useState<FormData | null>(null);

  return (
    <div className="App">
      {stage === "landing" && (
        <Landing setStage={setStage} setImage={setImage} />
      )}
      {stage === "results" && !!image && <Results image={image} />}
    </div>
  );
}

export default App;
