import { Observer, observer } from "mobx-react-lite";
import "./App.css";
// import axios from "axios";
import URLStore from "./URLStore";

function Download({ htmlShort }) {
  if (!htmlShort) return;
  const download = () => URLStore.downloadHTML();
  return (
    <div className="download">
      Click
      <span className="linkText" onClick={download}>
        HERE
      </span>
      to download your shortened version.
    </div>
  );
}

const App = observer(() => {
  const { htmlFile, htmlShort } = URLStore || {};
  const click = () => URLStore.shortenURL();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => URLStore.setOriginalHTMLFile(e.target.result);
    // reader.onload = (e) => setHtml(e.target.result);
    reader.onerror = (e) => console.error("Error reading file", e);
    reader.readAsText(file);
  };

  return (
    <>
      <h1>Shrink your HTML</h1>
      <div className="card">
        <input
          type="file"
          id="fileInput"
          accept=".html"
          onChange={handleFileChange}
        />
        <div className="description">Enter your html file here</div>
        <button onClick={click} disabled={!htmlFile}>
          Shrink urls
        </button>
        <div className="description">This will create a new smaller file</div>
        <Download {...{ htmlShort }} />
      </div>
    </>
  );
});

export default App;
