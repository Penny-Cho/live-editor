import { useEffect, useState } from "react";
import bundle from "../bundler";
import Preview from "../components/preview/preview";
import Resizable from "../components/resizable/resizable";
import CodeEditor from "./code-editor/code-editor";

const CodeCell = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const { code, err } = await bundle(input);
      setCode(code);
      setErr(err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} errStatus={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
