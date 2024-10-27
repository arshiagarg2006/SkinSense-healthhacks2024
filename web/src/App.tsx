import "./App.css";
import Landing from "./Landing";
import Results from "./Results";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Derms from "./Derms";
import { StageProvider, useStage } from "./contexts/StageContext";
import { ImageProvider, useImage } from "./contexts/ImageContext";

const Main = () => {
  const { stage, setStage } = useStage()!;
  const { image, setImage } = useImage()!;

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
      <StageProvider>
        <ImageProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/derms" element={<Derms />} />
            </Routes>
          </Router>
        </ImageProvider>
      </StageProvider>
    </div>
  );
}

export default App;
