import { useState } from "react";
import "./App.css";
import Landing from "./Landing";
import Results from "./Results";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Derms from "./Derms";

const Main = () => {
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
};

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/derms" element={<Derms />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
