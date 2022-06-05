import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";
import React, { useState, useEffect, useRef } from "react";

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  // onBlur로 해결
  // const onBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
  //   if (value) {
  //     setEditing(false);
  //   }
  // };

  if (editing) {
    return (
      <div ref={ref} className="text-editor">
        <MDEditor value={value} onChange={(v) => setValue(v || "")} />
      </div>
    );
  }

  return (
    <div className="text-editor " onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={value} />
    </div>
  );
};

export default TextEditor;
