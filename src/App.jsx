import { useState } from "react";
import "./App.css";
// import axios from "axios";
import shortenURL from "./shortenURL";

const API_HOST = "https://q7ch03tyj8.execute-api.us-east-1.amazonaws.com"; // This is terrible practice, I am aware

function App() {
  const [html, setHtml] = useState("");
  // const click = async () => await axios.post(`${API_HOST}/shorten/${html}`);
  const click = () => shortenURL({ htmlFile: html });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setHtml(e.target.result);
    reader.onerror = (e) => console.error("Error reading file", e);
    reader.readAsText(file);
  };

  return (
    <>
      <h1>Shrink your html</h1>
      <div className="card">
        <input
          type="file"
          id="fileInput"
          accept=".html"
          onChange={handleFileChange}
        />
        <div className="description">Enter your html file here</div>
        <button onClick={click} disabled={!html}>
          Shrink urls
        </button>
        <div className="description">
          This will also download a new smaller file
        </div>
      </div>
    </>
  );
}

export default App;
