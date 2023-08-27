import { useState, useEffect, useCallback} from "react";
import axios from "axios";
import "./bootstrap.css";

function App() {
  const [data, setData] = useState(null);
  const [isResultShowing, setIsResultShowing] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const updateCounter = async () => {
    try {
      await axios.get(baseUrl);
    } catch (error) {
      console.error("Error updating counter:", error);
      alert("An error occurred while updating the counter. Please try again later.");
    }
  };

  const updateCounterCallback = useCallback(updateCounter, [baseUrl]);

  useEffect(() => {
    if (!sessionStorage.getItem("visit")) {
      updateCounterCallback();
    }
    sessionStorage.setItem("visit", "x");
  }, [updateCounterCallback]);

  const handleShowButton = async () => {
    const response = await axios.get(`${baseUrl}api/visitorCount`);
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
          {data !== null && isResultShowing ? (
          data === 0 ? (
          <p>No data</p>
          ) : (
          <p className="big-number">{data}</p>
          )
          ) : null}
        </div>
      </header>
    </div>
  );
}

export default App;
