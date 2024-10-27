import "./App.css";
import Landing from "./Landing";
import Results from "./Results";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Derms from "./Derms";
import { StageProvider, useStage } from "./contexts/StageContext";
import { ImageProvider, useImage } from "./contexts/ImageContext";
import Info from "./Info";
import { InfoProvider } from "./contexts/InfoContext";

const Main = () => {
  const { stage, setStage } = useStage()!;
  const { image, setImage, setFilename } = useImage()!;

  return (
    <div className="App">
      {stage === "landing" && (
        <Landing
          setStage={setStage}
          setImage={setImage}
          setFilename={setFilename}
        />
      )}
      {stage == "info-page" && <Info />}
      {stage === "results" && !!image && <Results image={image} />}
    </div>
  );
};

function App() {
  return (
    <div>
      <StageProvider>
        <ImageProvider>
          <InfoProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/derms" element={<Derms />} />
              </Routes>
            </Router>
          </InfoProvider>
        </ImageProvider>
      </StageProvider>
    </div>
  );
}

export default App;
