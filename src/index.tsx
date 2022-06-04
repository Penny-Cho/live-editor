import "bulmaswatch/darkly/bulmaswatch.min.css";
import { createRoot } from "react-dom/client";
import TextEditor from "./components/text-editor/text-editor";
// import CodeCell from "./components/code-cell";

const App = () => {
  return (
    <div
      style={{ padding: "3%", minHeight: "100vh", backgroundColor: "#343642" }}
    >
      <TextEditor />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
