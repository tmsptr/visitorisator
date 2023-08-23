import { useState } from "react";
import "./bootstrap.css";

function App() {
  const [data, setData] = useState(null);
  const [isResultShowing, setIsResultShowing] = useState(false);
  const baseUrl = "http://localhost:3001/";

  const updateCounter = () => {
    fetch(baseUrl);
  };

  if (sessionStorage.getItem("visit") === null) {
    updateCounter();
  }

  sessionStorage.setItem("visit", "x");

  const handleShowButton = async () => {
    const response = await fetch(`${baseUrl}api/visitorCount`);
    const responseData = await response.json();
    setIsResultShowing(!isResultShowing);
    setData(responseData.count);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>How many visitors up to date?</h3>
        {!isResultShowing ? (
          <button onClick={handleShowButton}>Find out!</button>
        ) : (
          <button onClick={handleShowButton}>Don`t show</button>
        )}
        <div className="centerView">
          {data && isResultShowing && <h4>{data}</h4>}
        </div>
      </header>
    </div>
  );
}

export default App;
