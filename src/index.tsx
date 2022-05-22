import "bulmaswatch/darkly/bulmaswatch.min.css";
import { createRoot } from "react-dom/client";
import CodeCell from "./components/code-cell";

const App = () => {
  return (
    <div
      style={{ padding: "3%", minHeight: "100vh", backgroundColor: "#343642" }}
    >
      <CodeCell />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
