import { useState, useEffect, useCallback} from "react";
import axios from "axios";
import "./bootstrap.css";

function App() {
  const [data, setData] = useState(null);
  const [isResultShowing, setIsResultShowing] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const updateCounter = async () => {
    try {
      const response = await axios.get(baseUrl);
    } catch (error) {
      console.error("Error updating counter:", error);
    }
  };

  const updateCounterCallback = useCallback(updateCounter, []);

  useEffect(() => {
    if (!sessionStorage.getItem("visit")) {
      updateCounterCallback();
    }
    sessionStorage.setItem("visit", "x");
  }, [updateCounterCallback]);

  const handleShowButton = async () => {
    const response = await axios.get(`${baseUrl}api/visitorCount`);
    console.log("RESPONSE BELOW", response);
    console.log(response.data.count);
    setIsResultShowing(!isResultShowing);
    setData(response.data.count);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>How many visitors up to date?</h3>
        <button onClick={handleShowButton}>
          {!isResultShowing ? "Find out!" : "Don`t show"}
        </button>
        <div className="centerView">
          {data && isResultShowing && <h4>{data}</h4>}
        </div>
      </header>
    </div>
  );
}

export default App;
