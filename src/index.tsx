import "bulmaswatch/darkly/bulmaswatch.min.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state";
import TextEditor from "./components/text-editor/text-editor";
// import CodeCell from "./components/code-cell";

const App = () => {
  return (
    <Provider store={store}>
      <div
        style={{
          padding: "3%",
          minHeight: "100vh",
          backgroundColor: "#343642",
        }}
      >
        <TextEditor />
      </div>
    </Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
