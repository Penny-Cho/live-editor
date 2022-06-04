import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";
import React, { useEffect, useRef, useState } from "react";

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  // click event로 특정 구역 제ㅣㅏ기
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

  if (editing) {
    return (
      <div ref={ref}>
        <MDEditor value={value} onChange={(v) => setValue(v!)} />
      </div>
    );
  }

  return (
    <div className="container" onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={"# header"} />
    </div>
  );
};

export default TextEditor;
